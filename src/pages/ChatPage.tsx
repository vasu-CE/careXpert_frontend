import { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import { MessageCircle, Bot, Users, Send, MapPin, Plus } from "lucide-react";
import { Navbar } from "../components/navbar";
import axios from "axios";
import { toast } from "sonner";
import {
  FormattedMessage,
  joinRoom,
  offMessage,
  onMessage,
  sendMessage,
  SendMessageToRoom,
  loadOneOnOneChatHistory,
  loadCityChatHistory,
  loadRoomChatHistory as _loadRoomChatHistory,
} from "@/sockets/socket";
import { useAuthStore } from "@/store/authstore";

type DoctorData = {
  id: string;
  specialty: string;
  clinicLocation: string;
  user: {
    name: string;
    profilePicture: string;
  };
  userId: string;
};

type SelectedChat =
  | "ai"
  | { type: "doctor"; data: DoctorData }
  | {
      type: "room";
      id: string;
      name: string;
      members: UserData[];
      admin: UserData[];
    }; // Added type for community room

type UserData = {
  id: string;
  name: string;
  profilePicture: string;
};

type CityRoomData = {
  id: string;
  name: string;
  members: UserData[];
  admin: UserData[];
};

type CityRoomApiResponse = {
  statuscode: number;
  message: string;
  success: string;
  data: CityRoomData;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [selectedChat, setSelectedChat] = useState<SelectedChat>("ai");
  const [messages, setMessages] = useState<FormattedMessage[]>([]);
  const [cityRoom, setCityRoom] = useState<CityRoomData[]>([]);

  // DM conversation state for doctors
  const [dmConversations, setDmConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling
  const url = `${import.meta.env.VITE_BASE_URL}/api`;
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    async function fetchAllDoctors() {
      try {
        const res = await axios.get(`${url}/patient/fetchAllDoctors`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setDoctors(res.data.data);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "Something went wrong");
        } else {
          toast.error("Unknown error occurred");
        }
      }
    }
    fetchAllDoctors();
  }, [url]);

  useEffect(() => {
    async function fetchCity() {
      if (!user) return;

      try {
        const endpoint =
          user.role === "DOCTOR"
            ? `${url}/doctor/city-rooms`
            : `${url}/patient/city-rooms`;

        const res = await axios.get<CityRoomApiResponse>(endpoint, {
          withCredentials: true,
        });

        if (res.data.success) {
          const data = res.data.data;
          setCityRoom(Array.isArray(data) ? data : [data]);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "Something went wrong");
        } else {
          toast.error("Unknown error ocurred");
        }
      }
    }
    fetchCity();
  }, [user]);

  // AI Chat state
  const [aiMessages, setAiMessages] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Load language from localStorage or default to English
    return localStorage.getItem("ai-chat-language") || "en";
  });

  // Language options for AI chat
  const languageOptions = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
    { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  ];
  

  // Handle language change and save to localStorage
  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    localStorage.setItem("ai-chat-language", newLanguage);
  };

  // Function to normalize severity values for badge styling
  const normalizeSeverity = (severity: string) => {
    const severityLower = severity.toLowerCase();
    if (
      severityLower.includes("severe") ||
      severityLower.includes("grave") ||
      severityLower.includes("severo") ||
      severityLower.includes("sévère")
    ) {
      return "severe";
    } else if (
      severityLower.includes("moderate") ||
      severityLower.includes("moderado") ||
      severityLower.includes("modéré") ||
      severityLower.includes("moderato")
    ) {
      return "moderate";
    } else {
      return "mild";
    }
  };

  // Fetch DM conversations for doctors
  useEffect(() => {
    if (user?.role === "DOCTOR") {
      fetchDmConversations();
    }
  }, [user]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, aiMessages, selectedChat]); // Scroll when messages, aiMessages, or selectedChat changes

  // Load AI chat history when AI tab is selected
  useEffect(() => {
    if (selectedChat === "ai") {
      loadAiChatHistory();
    }
  }, [selectedChat]);

  // Function to load AI chat history
  const loadAiChatHistory = async () => {
    try {
      const response = await axios.get(`${url}/ai-chat/history`, {
        withCredentials: true,
      });
      if (response.data.success) {
        const formattedMessages = response.data.data.chats
          .map((chat: any) => [
            {
              id: `${chat.id}-user`,
              type: "user",
              message: chat.userMessage,
              time: new Date(chat.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            {
              id: `${chat.id}-ai`,
              type: "ai",
              message: formatAiResponse(chat),
              time: new Date(chat.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              aiData: chat,
            },
          ])
          .flat();
        setAiMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading AI chat history:", error);
      // Show welcome message if no history
      setAiMessages([
        {
          id: "welcome",
          type: "ai",
          message:
            "Hello! I'm CareXpert AI, your health assistant. Describe your symptoms and I'll help analyze them for you.",
          time: "Just now",
        },
      ]);
    }
  };

  // Function to format AI response for display
  const formatAiResponse = (chat: any) => {
    // Handle both API response format (probable_causes) and database format (probableCauses)
    const probableCauses = chat.probable_causes || chat.probableCauses || [];
    const { severity: _severity, recommendation, disclaimer } = chat;

    let response = `**Probable Causes:**\n${probableCauses
      .map((cause: string) => `• ${cause}`)
      .join("\n")}\n\n`;
    // response += `**Severity:**\n ${
    //   severity.charAt(0).toUpperCase() + severity.slice(1)
    // }\n\n`;
    response += `**Recommendation:**\n${recommendation}\n\n`;
    response += `**Disclaimer:**\n${disclaimer}`;

    return response;
  };

  // Function to send message to AI
  const sendAiMessage = async (userMessage: string) => {
    try {
      setIsAiLoading(true);

      // Add user message immediately
      const userMsg = {
        id: `user-${Date.now()}`,
        type: "user",
        message: userMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setAiMessages((prev) => [...prev, userMsg]);

      // Clear the input immediately
      setMessage("");

      const response = await axios.post(
        `${url}/ai-chat/process`,
        {
          symptoms: userMessage,
          language: selectedLanguage,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const aiData = response.data.data;
        const aiMsg = {
          id: `ai-${Date.now()}`,
          type: "ai",
          message: formatAiResponse(aiData),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          aiData: aiData,
        };
        setAiMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error("Error sending AI message:", error);
      toast.error("Failed to get AI response. Please try again.");

      // Add error message
      const errorMsg = {
        id: `error-${Date.now()}`,
        type: "ai",
        message:
          "Sorry, I'm having trouble processing your request. Please try again.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setAiMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  function generateRoomId(id1: string, id2: string) {
    return [id1, id2].sort().join("_");
  }

  // Function to fetch DM conversations for doctors
  const fetchDmConversations = async () => {
    try {
      const response = await axios.get(`${url}/chat/doctor/conversations`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setDmConversations(response.data.data.conversations);
      }
    } catch (error) {
      console.error("Error fetching DM conversations:", error);
    }
  };

  // Function to handle conversation selection
  const handleConversationSelect = async (conversation: any) => {
    setSelectedConversation(conversation);
    setSelectedChat({
      type: "doctor",
      data: {
        id: conversation.otherUser.id,
        userId: conversation.otherUser.id,
        specialty: "Patient",
        clinicLocation: "",
        user: {
          name: conversation.otherUser.name,
          profilePicture: conversation.otherUser.profilePicture,
        },
      },
    });
    setMessages([]);

    // Join the room and load history
    const roomId = generateRoomId(user?.id || "", conversation.otherUser.id);
    joinRoom(roomId);
    await loadConversationHistory(conversation.otherUser.id);
  };

  // Function to load chat history for a conversation
  const loadConversationHistory = async (patientId: string) => {
    try {
      const response = await loadOneOnOneChatHistory(patientId);
      if (response.success) {
        const formattedMessages = response.data.messages.map((msg: any) => ({
          roomId: generateRoomId(user?.id || "", patientId),
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          username: msg.sender.name,
          text: msg.message,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          messageType: msg.messageType,
          imageUrl: msg.imageUrl,
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading conversation history:", error);
    }
  };

  // Load chat history and join room when selected chat changes
  useEffect(() => {
    const loadChatHistory = async () => {
      console.log("ChatPage - User:", user);
      console.log("ChatPage - Selected Chat:", selectedChat);

      if (
        user &&
        typeof selectedChat === "object" &&
        selectedChat.type === "doctor"
      ) {
        const roomId = generateRoomId(user.id, selectedChat.data.userId);
        joinRoom(roomId);

        try {
          // Load 1-on-1 chat history
          console.log(
            "Loading chat history for doctor:",
            selectedChat.data.userId
          );
          const historyResponse = await loadOneOnOneChatHistory(
            selectedChat.data.userId
          );
          console.log("Chat history response:", historyResponse);
          if (historyResponse.success) {
            const formattedMessages = historyResponse.data.messages.map(
              (msg: any) => ({
                roomId: roomId,
                senderId: msg.senderId,
                receiverId: msg.receiverId,
                username: msg.sender.name,
                text: msg.message,
                time: new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                messageType: msg.messageType,
                imageUrl: msg.imageUrl,
              })
            );
            setMessages(formattedMessages);
          }
        } catch (error) {
          console.error("Error loading doctor chat history:", error);
          setMessages([]);
        }
      } else if (
        typeof selectedChat === "object" &&
        selectedChat.type === "room"
      ) {
        joinRoom(selectedChat.id);

        try {
          // Load city room chat history
          const historyResponse = await loadCityChatHistory(selectedChat.name);
          if (historyResponse.success) {
            const formattedMessages = historyResponse.data.messages.map(
              (msg: any) => ({
                roomId: selectedChat.id,
                senderId: msg.senderId,
                receiverId: null,
                username: msg.sender.name,
                text: msg.message,
                time: new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                messageType: msg.messageType,
                imageUrl: msg.imageUrl,
              })
            );
            setMessages(formattedMessages);
          }
        } catch (error) {
          console.error("Error loading city chat history:", error);
          setMessages([]);
        }
      } else if (selectedChat === "ai") {
        // Clear messages for AI chat to display mock data
        setMessages([]);
      }
    };

    loadChatHistory();
  }, [selectedChat, user]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat || !user) return;

    if (typeof selectedChat === "object" && selectedChat.type === "doctor") {
      const roomId = generateRoomId(user.id, selectedChat.data.userId);

      const payload = {
        roomId,
        senderId: user.id,
        receiverId: selectedChat.data.userId,
        username: user.name,
        text: message.trim(),
        messageType: "TEXT",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      sendMessage(payload);
      // Optimistically add the sent message to the UI
      setMessages((prev) => [...prev, { ...payload, type: "user" }]);
      setMessage("");
    } else if (selectedChat === "ai") {
      // Handle AI message sending
      await sendAiMessage(message.trim());
    } else if (
      typeof selectedChat === "object" &&
      selectedChat.type === "room"
    ) {
      // Handle community room message sending
      const payload = {
        roomId: selectedChat.id, // Use the specific room ID
        senderId: user.id,
        username: user.name,
        text: message.trim(),
        messageType: "TEXT",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      SendMessageToRoom(payload);
      setMessages((prev) => [...prev, { ...payload, type: "user" }]);
      setMessage("");
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    const handleIncomingMessage = (msg: FormattedMessage) => {
      if (msg.senderId === user?.id) return;
      if (
        typeof selectedChat === "object" &&
        selectedChat.type === "doctor" &&
        generateRoomId(user?.id || "", selectedChat.data.userId) === msg.roomId
      ) {
        setMessages((prev) => [...prev, msg]);
      } else if (
        typeof selectedChat === "object" &&
        selectedChat.type === "room" &&
        selectedChat.id === msg.roomId
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    onMessage(handleIncomingMessage);

    return () => {
      offMessage();
    };
  }, [selectedChat, user]);

  return (
    <div className="h-screen lg:overflow-y-hidden bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 pt-10 pb-12 flex-1 flex flex-col mt-12">
        <div className="grid lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
          {/* Chat Sidebar */}
          <div className="lg:col-span-1 flex flex-col">
            <Tabs defaultValue="ai" className="space-y-4 flex flex-col flex-1">
              <TabsList
                className={`grid w-full ${
                  user?.role === "DOCTOR" ? "grid-cols-4" : "grid-cols-3"
                }`}
              >
                <TabsTrigger value="ai" className="text-xs">
                  AI
                </TabsTrigger>
                <TabsTrigger value="doctors" className="text-xs">
                  Doctors
                </TabsTrigger>
                {user?.role === "DOCTOR" && (
                  <TabsTrigger value="patients" className="text-xs">
                    Patients
                  </TabsTrigger>
                )}
                <TabsTrigger value="community" className="text-xs">
                  Community
                </TabsTrigger>
              </TabsList>

              {/* AI Tab */}
              <TabsContent value="ai" className="flex-1 overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bot className="h-5 w-5 text-purple-600" />
                      CareXpert AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === "ai"
                          ? "bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setSelectedChat("ai")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            AI Assistant
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Always available
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Doctors Tab */}
              <TabsContent value="doctors" className="flex-1 overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      Doctor Chats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 flex-1 overflow-y-auto">
                    {doctors.length > 0 ? (
                      doctors.map((chat) => (
                        <div
                          key={chat.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            typeof selectedChat === "object" &&
                            selectedChat.type === "doctor" &&
                            selectedChat.data.id === chat.id
                              ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() =>
                            setSelectedChat({ type: "doctor", data: chat })
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={
                                    chat.user.profilePicture ||
                                    "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback>
                                  {chat.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                {chat.user.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {chat.specialty}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        No doctors found.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patients Tab - Only for Doctors */}
              {user?.role === "DOCTOR" && (
                <TabsContent
                  value="patients"
                  className="flex-1 overflow-hidden"
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5 text-green-600" />
                        Patient Messages
                      </CardTitle>
                      <CardDescription>Chat with your patients</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[500px]">
                        {dmConversations.length > 0 ? (
                          dmConversations.map((conversation) => (
                            <div
                              key={conversation.otherUser.id}
                              className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                                selectedConversation?.otherUser.id ===
                                conversation.otherUser.id
                                  ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500"
                                  : ""
                              }`}
                              onClick={() =>
                                handleConversationSelect(conversation)
                              }
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={
                                      conversation.otherUser.profilePicture ||
                                      "/placeholder.svg"
                                    }
                                  />
                                  <AvatarFallback>
                                    {conversation.otherUser.name
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                    {conversation.otherUser.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {conversation.lastMessage.message}
                                  </p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {new Date(
                                      conversation.lastMessage.timestamp
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                {conversation.unreadCount > 0 && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No conversations yet</p>
                            <p className="text-sm">
                              Patients will appear here when they message you
                            </p>
                          </div>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Community Tab */}
              <TabsContent value="community" className="flex-1 overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        City Rooms
                      </div>
                      <div>
                        <Plus className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 w-8 p-1" />
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 flex-1 overflow-y-auto">
                    {cityRoom.length > 0 ? (
                      cityRoom.map((room) => (
                        <div
                          key={room.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            typeof selectedChat === "object" &&
                            selectedChat.type === "room" &&
                            selectedChat.name === room.name
                              ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() =>
                            setSelectedChat({ type: "room", ...room })
                          }
                        >
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {room.name}
                            </h4>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {room.name}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {room.members.length} members
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Loading city rooms...</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="h-[80vh] flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                {selectedChat === "ai" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          CareXpert AI Assistant
                        </CardTitle>
                        <CardDescription>
                          Your personal health companion
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Language:
                      </span>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {languageOptions.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {typeof selectedChat === "object" &&
                  selectedChat.type === "doctor" && (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedChat.data.user.profilePicture}
                        />
                        <AvatarFallback>
                          {selectedChat.data.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {selectedChat.data.user.name}
                        </CardTitle>
                        <CardDescription>
                          {selectedChat.data.specialty} • Online
                        </CardDescription>
                      </div>
                    </div>
                  )}
                {typeof selectedChat === "object" &&
                  selectedChat.type === "room" && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {selectedChat.name}
                        </CardTitle>
                        <CardDescription>
                          {selectedChat.members.length} members •{" "}
                          {selectedChat.name}
                        </CardDescription>
                      </div>
                    </div>
                  )}
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-4 overflow-y-auto ">
                <ScrollArea className="h-full ">
                  {selectedChat === "ai" && (
                    <>
                      {aiMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex mb-4 ${
                            msg.type === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.type === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            }`}
                          >
                            {msg.type === "ai" ? (
                              <div className="text-sm">
                                {msg.aiData && (
                                  <div className="mb-3">
                                    <Badge
                                      variant={
                                        normalizeSeverity(
                                          msg.aiData.severity
                                        ) === "severe"
                                          ? "destructive"
                                          : normalizeSeverity(
                                              msg.aiData.severity
                                            ) === "moderate"
                                          ? "default"
                                          : "secondary"
                                      }
                                      className="mb-2"
                                    >
                                      {msg.aiData.severity
                                        .charAt(0)
                                        .toUpperCase() +
                                        msg.aiData.severity.slice(1)}{" "}
                                      Severity
                                    </Badge>
                                  </div>
                                )}
                                {msg.message
                                  .split("\n")
                                  .map((line: string, index: number) => {
                                    if (
                                      line.startsWith("**") &&
                                      line.endsWith("**")
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="font-semibold text-purple-600 dark:text-purple-400 mb-2"
                                        >
                                          {line.replace(/\*\*/g, "")}
                                        </div>
                                      );
                                    } else if (line.startsWith("•")) {
                                      return (
                                        <div key={index} className="ml-4 mb-1">
                                          {line}
                                        </div>
                                      );
                                    } else if (line.trim() === "") {
                                      return <br key={index} />;
                                    } else {
                                      return (
                                        <div key={index} className="mb-2">
                                          {line}
                                        </div>
                                      );
                                    }
                                  })}
                              </div>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">
                                {msg.message}
                              </p>
                            )}
                            <p
                              className={`text-xs mt-1 ${
                                msg.type === "user"
                                  ? "text-blue-100"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isAiLoading && (
                        <div className="flex justify-start mb-4">
                          <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg max-w-[80%]">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                              <span className="text-sm">
                                AI is analyzing your symptoms...
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {/* doctor and community chats */}
                  {typeof selectedChat === "object" &&
                    (selectedChat.type === "doctor" ||
                      selectedChat.type === "room") &&
                    (messages.length > 0 ? (
                      messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex mb-2 ${
                            msg.senderId === user?.id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] py-2 px-[10px] rounded-lg ${
                              msg.senderId === user?.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            }`}
                          >
                            {msg.messageType === "IMAGE" && msg.imageUrl ? (
                              <img
                                src={msg.imageUrl}
                                alt="sent-img"
                                className="rounded mb-1 max-w-full h-auto"
                              />
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">
                                {msg.text}
                              </p>
                            )}
                            <p className="text-xs mt-1 text-right text-gray-400">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          {selectedChat.type === "doctor"
                            ? "Start a conversation with your doctor"
                            : "Join the community discussion"}
                        </p>
                      </div>
                    ))}
                  <div ref={messagesEndRef} />{" "}
                  {/* Element to scroll into view */}
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMessage(e.target.value)
                    }
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="px-6">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
