"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Send, Search, MoreVertical, Phone, Video, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  user: {
    name: string
    avatar: string
    online: boolean
  }
  lastMessage: string
  timestamp: string
  unread: number
}

interface ChatMessage {
  id: number
  sender: "me" | "other"
  content: string
  timestamp: string
}

const mockMessages: Message[] = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      online: true,
    },
    lastMessage: "Thanks for the feedback on our MVP!",
    timestamp: "2m",
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      online: true,
    },
    lastMessage: "Would love to collaborate on this project",
    timestamp: "1h",
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      online: false,
    },
    lastMessage: "Let's schedule a call next week",
    timestamp: "3h",
    unread: 1,
  },
]

const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "other",
    content: "Hey! Saw your post about reaching $10K MRR. Congrats!",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "me",
    content: "Thank you! It's been quite a journey. What about your startup?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    sender: "other",
    content: "We're still in the early stages, but your post gave me some great insights.",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    sender: "other",
    content: "Thanks for the feedback on our MVP!",
    timestamp: "10:37 AM",
  },
]

export function MessageCenter() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [unreadCount, setUnreadCount] = useState(0)
  const [selectedChat, setSelectedChat] = useState<Message | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const count = messages.reduce((acc, message) => acc + message.unread, 0)
    setUnreadCount(count)
  }, [messages])

  const openChat = (message: Message) => {
    setSelectedChat(message)
    // Mark as read
    setMessages(messages.map((m) => (m.id === message.id ? { ...m, unread: 0 } : m)))
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "me",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-blue-500 text-white text-xs rounded-full">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 bg-white border shadow-lg rounded-xl p-0" sideOffset={8}>
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 px-4 pt-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Messages</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-4 pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search messages..." className="pl-10 h-8 bg-gray-50 border-gray-200" />
                </div>
              </div>
              <ScrollArea className="h-80">
                {messages.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No messages yet</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => openChat(message)}
                      >
                        <div className="flex space-x-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">
                                {message.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {message.user.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{message.user.name}</p>
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-500">{message.timestamp}</span>
                                {message.unread > 0 && (
                                  <Badge className="w-5 h-5 p-0 text-xs bg-blue-500 text-white rounded-full">
                                    {message.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-1">{message.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Chat Modal */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-96 h-[500px] bg-white shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3 px-4 pt-4 border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={selectedChat.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                    {selectedChat.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedChat.user.name}</p>
                  <p className="text-xs text-gray-500">{selectedChat.user.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedChat(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[400px]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
