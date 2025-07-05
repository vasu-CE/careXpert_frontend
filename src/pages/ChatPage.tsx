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
import { MessageCircle, Bot, Users, Send, MapPin } from "lucide-react";
import { Navbar } from "../components/navbar";
import axios from "axios";
import { toast } from "sonner";
import {
  FormattedMessage,
  joinRoom,
  offMessage,
  onMessage,
  sendMessage,
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
  | { type: "room"; id: string; clinicLocation: string; count: number }; // Added type for community room

type CityRoomData = {
  id: string;
  clinicLocation: string;
  count: number;
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
      try {
        const res = await axios.get<CityRoomApiResponse>(
          `${url}/doctor/city-rooms`,
          { withCredentials: true }
        );

        if (res.data.success) {
          const data = res.data.data;
          setCityRoom(Array.isArray(data) ? data : [data])
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
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChat]); // Scroll when messages or selectedChat changes

  const aiMessages = [
    {
      id: 1,
      type: "ai",
      message:
        "Hello! I'm CareXpert AI, your health assistant. How can I help you today?",
      time: "Just now",
    },
    {
      id: 2,
      type: "user",
      message: "I've been having headaches lately. What could be causing them?",
      time: "Just now",
    },
    {
      id: 3,
      type: "ai",
      message:
        "Headaches can have various causes including stress, dehydration, lack of sleep, or eye strain. Here are some common factors to consider:\n\n• Stress and tension\n• Dehydration\n• Poor sleep patterns\n• Eye strain from screens\n• Certain foods or drinks\n\nIf headaches persist or worsen, I recommend consulting with a healthcare professional for proper evaluation.",
      time: "Just now",
    },
  ];

  function generateRoomId(id1: string, id2: string) {
    return [id1, id2].sort().join("_");
  } 

  // Join room when selected chat is a doctor chat
  useEffect(() => {
    if (
      user &&
      typeof selectedChat === "object" &&
      selectedChat.type === "doctor"
    ) {
      const roomId = generateRoomId(user.id, selectedChat.data.userId);
      joinRoom(roomId);
      setMessages([]);
    } else if (
      typeof selectedChat === "object" &&
      selectedChat.type === "room"
    ) {
      // Handle joining community rooms if needed, and clear messages
      setMessages([]);
    } else if (selectedChat === "ai") {
      // Clear messages for AI chat to display mock data
      setMessages([]);
    }
  }, [selectedChat, user]);

  const handleSendMessage = () => {
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
      // Handle AI message sending (this part would usually involve an API call to your AI backend)
      const userMessage = {
        id: Date.now(), // Unique ID for mock message
        type: "user",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, userMessage as any]); // Cast to any to fit mock data type
      setMessage("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "ai",
            message:
              "Thank you for your message. I'm still learning and will get back to you shortly.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          } as any,
        ]);
      }, 1000);
    }
    // } else if (typeof selectedChat === "object" && selectedChat.type === "room") {
    //     // Handle community room message sending
    //     const payload = {
    //         roomId: `room-${selectedChat.id}`, // Use the specific room ID
    //         senderId: user.id,
    //         username: user.name,
    //         text: message.trim(),
    //         messageType: "TEXT",
    //         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //     };
    //     sendMessage(payload);
    //     setMessages((prev) => [...prev, { ...payload, type: 'user' }]);
    //     setMessage("");
    // }
  };

  // Listen for incoming messages
  useEffect(() => {
    const handleIncomingMessage = (msg: FormattedMessage) => {
      if (
        typeof selectedChat === "object" &&
        selectedChat.type === "doctor" &&
        generateRoomId(user?.id || "", selectedChat.data.userId) === msg.roomId
      ) {
        if (msg.senderId === user?.id) return;
        setMessages((prev) => [...prev, msg]);
      } else if (
        typeof selectedChat === "object" &&
        selectedChat.type === "room" &&
        `room-${selectedChat.id}` === msg.roomId
      ) {
        if (msg.senderId === user?.id) return;
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ai" className="text-xs">
                  AI
                </TabsTrigger>
                <TabsTrigger value="doctors" className="text-xs">
                  Doctors
                </TabsTrigger>
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

              {/* Community Tab */}
              <TabsContent value="community" className="flex-1 overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-green-600" />
                      City Rooms
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
                            selectedChat.clinicLocation === room.clinicLocation
                              ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() =>
                            setSelectedChat({ type: "room", ...room })
                          }
                        >
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {room.clinicLocation}
                            </h4>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {room.clinicLocation}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {room.count} members
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
                          {selectedChat.clinicLocation}
                        </CardTitle>
                        <CardDescription>
                          {selectedChat.count} members •{" "}
                          {selectedChat.clinicLocation}
                        </CardDescription>
                      </div>
                    </div>
                  )}
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-4 overflow-y-auto ">
                <ScrollArea className="h-full ">
                  {selectedChat === "ai" &&
                    aiMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.type === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">
                            {msg.message}
                          </p>
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
