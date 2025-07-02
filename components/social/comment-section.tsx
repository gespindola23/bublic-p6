"use client"

import { useState } from "react"
import { MessageCircle, Send, MoreHorizontal, Heart, Reply } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: number
  initialComments: Comment[]
  commentCount: number
}

export function CommentSection({ postId, initialComments, commentCount }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isCommenting, setIsCommenting] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsCommenting(true)

    const comment: Comment = {
      id: Date.now(),
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        verified: true,
      },
      content: newComment,
      timestamp: "now",
      likes: 0,
      isLiked: false,
    }

    // Simulate API call
    setTimeout(() => {
      setComments([comment, ...comments])
      setNewComment("")
      setIsCommenting(false)
      console.log("Added comment to post", postId)
    }, 500)
  }

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    )
  }

  const handleReply = async (parentId: number) => {
    if (!replyText.trim()) return

    const reply: Comment = {
      id: Date.now(),
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        verified: true,
      },
      content: replyText,
      timestamp: "now",
      likes: 0,
      isLiked: false,
    }

    setComments(
      comments.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), reply],
            }
          : comment,
      ),
    )

    setReplyText("")
    setReplyingTo(null)
  }

  return (
    <div className="space-y-4">
      {/* Comment Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowComments(!showComments)}
        className="text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        {commentCount + comments.length}
      </Button>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4 pt-4 border-t border-black/5">
          {/* Add Comment */}
          <div className="flex space-x-3">
            <Avatar className="w-8 h-8 ring-1 ring-black/5">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[80px] bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 resize-none rounded-xl transition-all duration-200"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isCommenting}
                  size="sm"
                  className="bg-black hover:bg-black/90 text-white rounded-lg"
                >
                  <Send className="w-3 h-3 mr-2" />
                  {isCommenting ? "Posting..." : "Comment"}
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-gray-50/80 backdrop-blur-xl border-black/5 rounded-xl">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <Avatar className="w-8 h-8 ring-1 ring-black/5">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">
                        {comment.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm text-gray-900">{comment.author.name}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-white/80 rounded">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-xl border-black/10">
                            <DropdownMenuItem>Report</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-gray-800 text-sm mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeComment(comment.id)}
                          className={`text-xs h-6 px-2 rounded ${
                            comment.isLiked ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          className="text-xs h-6 px-2 text-gray-500 hover:text-blue-500 rounded"
                        >
                          <Reply className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      </div>

                      {/* Reply Input */}
                      {replyingTo === comment.id && (
                        <div className="mt-3 flex space-x-2">
                          <Avatar className="w-6 h-6 ring-1 ring-black/5">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              className="min-h-[60px] bg-white/80 border-black/10 text-sm rounded-lg resize-none"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setReplyingTo(null)}
                                className="text-xs h-6 px-2"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleReply(comment.id)}
                                disabled={!replyText.trim()}
                                size="sm"
                                className="bg-black hover:bg-black/90 text-white text-xs h-6 px-3 rounded"
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-200">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-2">
                              <Avatar className="w-6 h-6 ring-1 ring-black/5">
                                <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                                  {reply.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-xs text-gray-900">{reply.author.name}</span>
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-gray-800 text-xs">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
