"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  type: "user" | "ai"
  message: string
  time: string
}

export function AIChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      message:
        "Hello! I'm CareXpert AI. I can help you with health questions, symptoms, or guide you to the right doctor. What would you like to know?",
      time: "Just now",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      time: "Just now",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        message: getAIResponse(inputMessage),
        time: "Just now",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("headache") || input.includes("head")) {
      return "Headaches can have various causes including stress, dehydration, lack of sleep, or eye strain. If headaches persist or are severe, I recommend consulting with a neurologist or your primary care physician."
    }

    if (input.includes("fever") || input.includes("temperature")) {
      return "A fever is usually a sign that your body is fighting an infection. Stay hydrated, rest, and monitor your temperature. If fever exceeds 103°F (39.4°C) or persists for more than 3 days, please consult a doctor immediately."
    }

    if (input.includes("cough") || input.includes("cold")) {
      return "For a cough or cold, try staying hydrated, getting plenty of rest, and using a humidifier. If symptoms worsen or persist for more than 10 days, consider seeing a general practitioner."
    }

    if (input.includes("doctor") || input.includes("appointment")) {
      return "I can help you find the right doctor! Based on your symptoms, I can recommend specialists. Would you like me to help you book an appointment with one of our certified doctors?"
    }

    return "Thank you for your question. For personalized medical advice, I recommend consulting with one of our certified doctors. Would you like me to help you find a specialist or book an appointment?"
  }

  return (
    <div className="h-96 flex flex-col">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 border rounded-lg mb-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback
                    className={msg.type === "user" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"}
                  >
                    {msg.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`p-3 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%]">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          placeholder="Ask about symptoms, health concerns..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="px-4 bg-purple-600 hover:bg-purple-700">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
