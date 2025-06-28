import { useState } from "react";
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

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState("ai");

  // Mock data
  const cityRooms = [
    { id: 1, name: "New York Health Hub", members: 1247, city: "New York, NY" },
    {
      id: 2,
      name: "LA Wellness Community",
      members: 892,
      city: "Los Angeles, CA",
    },
    { id: 3, name: "Chicago Care Circle", members: 634, city: "Chicago, IL" },
    { id: 4, name: "Miami Health Network", members: 445, city: "Miami, FL" },
  ];

  const doctorChats = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      lastMessage: "Your test results look good. Let's schedule a follow-up.",
      time: "2 min ago",
      online: true,
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      lastMessage: "The medication should help with the symptoms.",
      time: "1 hour ago",
      online: false,
      avatar: "/placeholder.svg",
    },
  ];

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

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-10 pb-12 mt-12">
        {/* Header */}
        

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="ai" className="space-y-4">
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
              <TabsContent value="ai">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bot className="h-5 w-5 text-purple-600" />
                      CareXpert AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
              <TabsContent value="doctors">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      Doctor Chats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {doctorChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === `doctor-${chat.id}`
                            ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSelectedChat(`doctor-${chat.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={chat.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {chat.doctor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {chat.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {chat.doctor}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {chat.specialty}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                              {chat.lastMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-green-600" />
                      City Rooms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {cityRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === `room-${room.id}`
                            ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSelectedChat(`room-${room.id}`)}
                      >
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {room.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {room.city}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {room.members} members
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
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
                {selectedChat.startsWith("doctor-") && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        Dr. Sarah Johnson
                      </CardTitle>
                      <CardDescription>Cardiology • Online</CardDescription>
                    </div>
                  </div>
                )}
                {selectedChat.startsWith("room-") && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        New York Health Hub
                      </CardTitle>
                      <CardDescription>
                        1,247 members • New York, NY
                      </CardDescription>
                    </div>
                  </div>
                )}
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {selectedChat === "ai" &&
                      aiMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
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

                    {selectedChat.startsWith("doctor-") && (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          Start a conversation with your doctor
                        </p>
                      </div>
                    )}

                    {selectedChat.startsWith("room-") && (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          Join the community discussion
                        </p>
                      </div>
                    )}
                  </div>
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
