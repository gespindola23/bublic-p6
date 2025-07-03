"use client"

import { useState, useEffect } from "react"
import { Bell, Heart, MessageCircle, UserPlus, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number
  type: "like" | "comment" | "follow" | "mention" | "milestone" | "job"
  user: {
    name: string
    avatar: string
  }
  content?: string
  postTitle?: string
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    },
    postTitle: "How we reached $50K MRR in 8 months",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
    content: "Great insights! How did you handle the initial customer acquisition?",
    postTitle: "Building a remote-first culture",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    },
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "milestone",
    user: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    content: "Just hit $100K ARR! 🎉",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "job",
    user: {
      name: "TechFlow",
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop&crop=center",
    },
    content: "New job posting: Senior Frontend Developer",
    timestamp: "5 hours ago",
    read: false,
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length
    setUnreadCount(count)
  }, [notifications])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500 fill-current" />
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case "follow":
        return <UserPlus className="w-4 h-4 text-green-500" />
      case "mention":
        return <MessageCircle className="w-4 h-4 text-purple-500" />
      case "milestone":
        return <span className="text-yellow-500">🎉</span>
      case "job":
        return <span className="text-blue-500">💼</span>
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "like":
        return `liked your post "${notification.postTitle}"`
      case "comment":
        return `commented on your post "${notification.postTitle}"`
      case "follow":
        return "started following you"
      case "mention":
        return "mentioned you in a comment"
      case "milestone":
        return notification.content
      case "job":
        return notification.content
      default:
        return "sent you a notification"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 bg-white border shadow-lg rounded-xl p-0" sideOffset={8}>
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-3 px-4 pt-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs hover:bg-gray-100 rounded-lg h-7"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer group ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10 ring-1 ring-gray-200">
                            <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">
                              {notification.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-200">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{notification.user.name}</span>{" "}
                            {getNotificationText(notification)}
                          </p>
                          {notification.content && notification.type === "comment" && (
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">"{notification.content}"</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                        </div>
                        <div className="flex items-start space-x-1">
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="w-6 h-6 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 rounded transition-all"
                          >
                            <X className="w-3 h-3" />
                          </Button>
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
  )
}
