"use client"

import { useState, useEffect } from "react"
import {
  ImageIcon,
  FileText,
  Briefcase,
  Lock,
  DollarSign,
  X,
  Users,
  Music,
  TrendingUp,
  UploadCloud,
  Mic,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/rich-text-editor"
import { CommandMenu } from "@/components/post-editor/command-menu"
import { MentionMenu } from "@/components/post-editor/mention-menu"
import { JobFields } from "@/components/post-editor/job-fields"
import { MilestoneFields } from "@/components/post-editor/milestone-fields"
import { AudioRecorder } from "@/components/post-editor/audio-recorder"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type PostType = "article" | "job" | "milestone"

interface Collaborator {
  id: string
  name: string
  avatar: string
}

export function CreatePostForm() {
  const [postType, setPostType] = useState<PostType>("article")
  const [content, setContent] = useState("")
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const [showMentionMenu, setShowMentionMenu] = useState(false)

  const [isPremium, setIsPremium] = useState(false)
  const [price, setPrice] = useState("")

  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [showAudioRecorder, setShowAudioRecorder] = useState(false)

  const [jobDetails, setJobDetails] = useState({ title: "", location: "", salary: "" })
  const [milestoneDetails, setMilestoneDetails] = useState({ metric: "", value: "", change: "" })

  const [isPosting, setIsPosting] = useState(false)
  const [attachments, setAttachments] = useState<string[]>([])

  useEffect(() => {
    const lastChar = content.slice(-1)
    const lastWord = content.split(" ").pop()

    setShowCommandMenu(lastChar === "/")
    setShowMentionMenu(lastWord?.startsWith("@") ?? false)
  }, [content])

  const handleCommandSelect = (type: PostType) => {
    setPostType(type)
    setContent(content.slice(0, -1)) // Remove the '/'
    setShowCommandMenu(false)
  }

  const handleMentionSelect = (mention: string) => {
    const words = content.split(" ")
    words.pop() // remove the partial @mention
    setContent(words.join(" ") + ` ${mention} `)
    setShowMentionMenu(false)
  }

  const handlePost = async () => {
    if (!content.trim()) return

    setIsPosting(true)

    // Simulate API call
    const postData = {
      postType,
      content,
      isPremium,
      price: isPremium ? price : null,
      collaborators,
      audioUrl,
      jobDetails: postType === "job" ? jobDetails : null,
      milestoneDetails: postType === "milestone" ? milestoneDetails : null,
      attachments,
    }
    console.log("New post:", postData)

    setTimeout(() => {
      // Reset form
      setContent("")
      setPostType("article")
      setShowCommandMenu(false)
      setIsPremium(false)
      setPrice("")
      setCollaborators([])
      setAudioUrl(null)
      setJobDetails({ title: "", location: "", salary: "" })
      setMilestoneDetails({ metric: "", value: "", change: "" })
      setAttachments([])
      setIsPosting(false)
    }, 1500)
  }

  const addAttachment = (type: string) => {
    setAttachments([...attachments, `${type}-attachment-${Date.now()}`])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const getPostTypeInfo = () => {
    switch (postType) {
      case "job":
        return { icon: Briefcase, label: "Job Posting", color: "blue" }
      case "milestone":
        return { icon: TrendingUp, label: "Milestone", color: "green" }
      default:
        return { icon: FileText, label: "Article", color: "gray" }
    }
  }
  const PostTypeIcon = getPostTypeInfo().icon

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex space-x-4">
          <Avatar className="ring-2 ring-black/5 mt-1">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="relative">
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Share your startup journey, milestones, or insights..."
              />
              {showCommandMenu && (
                <CommandMenu onSelect={handleCommandSelect} onClose={() => setShowCommandMenu(false)} />
              )}
              {showMentionMenu && <MentionMenu onSelect={handleMentionSelect} />}
            </div>

            {/* Dynamic Fields */}
            {postType === "job" && <JobFields details={jobDetails} setDetails={setJobDetails} />}
            {postType === "milestone" && (
              <MilestoneFields details={milestoneDetails} setDetails={setMilestoneDetails} />
            )}

            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50/80 backdrop-blur-xl rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{attachment}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAttachment(index)}
                      className="hover:bg-red-50 hover:text-red-600 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Collaborators */}
            {collaborators.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 bg-gray-50/80 rounded-xl border border-gray-100">
                {collaborators.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 bg-white/80 rounded-full px-2 py-1 border">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={c.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{c.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{c.name}</span>
                    <button
                      onClick={() => setCollaborators(collaborators.filter((co) => co.id !== c.id))}
                      className="p-0.5 rounded-full hover:bg-red-100"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Audio Player */}
            {showAudioRecorder && (
              <AudioRecorder
                onAudioReady={(url) => {
                  setAudioUrl(url)
                  setShowAudioRecorder(false)
                }}
                onClose={() => setShowAudioRecorder(false)}
              />
            )}

            {audioUrl && !showAudioRecorder && (
              <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-100 flex items-center justify-between">
                <audio src={audioUrl} controls className="h-8 flex-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAudioUrl(null)}
                  className="hover:bg-red-50 hover:text-red-600 rounded-lg w-8 h-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Premium Content Toggle */}
            <div className="flex items-center justify-between p-4 bg-yellow-50/80 backdrop-blur-xl rounded-xl border border-yellow-100">
              <div className="flex items-center space-x-3">
                <Lock className="w-4 h-4 text-yellow-600" />
                <div>
                  <Label htmlFor="premium-toggle" className="text-sm font-medium text-yellow-800">
                    Premium Content
                  </Label>
                  <p className="text-xs text-yellow-700">Monetize your insights</p>
                </div>
              </div>
              <Switch
                id="premium-toggle"
                checked={isPremium}
                onCheckedChange={(checked) => {
                  setIsPremium(checked)
                }}
              />
            </div>

            {/* Premium Pricing Input */}
            {isPremium && (
              <div className="flex items-center space-x-3 p-3 bg-yellow-50/80 rounded-xl border border-yellow-100">
                <DollarSign className="w-4 h-4 text-yellow-600" />
                <Input
                  type="number"
                  placeholder="Price (USD)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-32 bg-white/80 border-yellow-200 rounded-lg"
                />
                <span className="text-sm text-yellow-700">Set a one-time price for this post</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-black/5">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-50 rounded-lg">
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-50 rounded-lg">
                      <Music className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-xl border-black/10">
                    <DropdownMenuItem onClick={() => setShowAudioRecorder(true)}>
                      <Mic className="w-4 h-4 mr-2" />
                      Record Audio
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UploadCloud className="w-4 h-4 mr-2" />
                      Upload File
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <PostTypeIcon className="w-4 h-4" />
                  <span>{getPostTypeInfo().label}</span>
                </div>
                <Button
                  onClick={handlePost}
                  disabled={!content.trim() || isPosting}
                  className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg px-6"
                >
                  {isPosting ? "Posting..." : "Share"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Back-compat alias (so old imports won't break)
export { CreatePostForm as CreatePost }
