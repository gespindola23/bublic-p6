"use client"

import { useState, useEffect } from "react"
import {
  ImageIcon,
  FileText,
  Briefcase,
  DollarSign,
  X,
  Users,
  Music,
  TrendingUp,
  UploadCloud,
  Mic,
  Trash2,
  Shield,
  Mail,
  UserPlus,
  CreditCard,
  Minus,
  Type,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/rich-text-editor"
import { CommandMenu } from "@/components/post-editor/command-menu"
import { MentionMenu } from "@/components/post-editor/mention-menu"
import { JobFields } from "@/components/post-editor/job-fields"
import { MilestoneFields } from "@/components/post-editor/milestone-fields"
import { AudioRecorder } from "@/components/post-editor/audio-recorder"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type PostType = "article" | "job" | "milestone"
export type PaywallType = "email" | "follow" | "subscription" | "payment"
export type ContentType = "post" | "article"

interface Collaborator {
  id: string
  name: string
  avatar: string
}

interface PaywallSettings {
  type: PaywallType | null
  price?: number
  subscriptionTier?: string
}

export function CreatePostForm() {
  const [contentType, setContentType] = useState<ContentType>("post")
  const [postType, setPostType] = useState<PostType>("article")
  const [content, setContent] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const [showMentionMenu, setShowMentionMenu] = useState(false)
  const [showPaywallModal, setShowPaywallModal] = useState(false)

  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [showAudioRecorder, setShowAudioRecorder] = useState(false)

  const [jobDetails, setJobDetails] = useState({ title: "", location: "", salary: "" })
  const [milestoneDetails, setMilestoneDetails] = useState({ metric: "", value: "", change: "" })

  const [isPosting, setIsPosting] = useState(false)
  const [attachments, setAttachments] = useState<string[]>([])
  const [paywall, setPaywall] = useState<PaywallSettings>({ type: null })

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

  const handlePaywallSelect = (type: PaywallType, price?: number) => {
    setPaywall({ type, price })
    setShowPaywallModal(false)
  }

  const insertDivider = () => {
    setContent(content + "\n\n---\n\n")
  }

  const handlePost = async () => {
    if (contentType === "article" && !articleTitle.trim()) return
    if (!content.trim()) return

    setIsPosting(true)

    // Simulate API call
    const postData = {
      contentType,
      postType,
      title: contentType === "article" ? articleTitle : null,
      content,
      paywall,
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
      setArticleTitle("")
      setContentType("post")
      setPostType("article")
      setShowCommandMenu(false)
      setCollaborators([])
      setAudioUrl(null)
      setJobDetails({ title: "", location: "", salary: "" })
      setMilestoneDetails({ metric: "", value: "", change: "" })
      setAttachments([])
      setPaywall({ type: null })
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

  const getPaywallInfo = () => {
    switch (paywall.type) {
      case "email":
        return { icon: Mail, label: "Email Required", color: "blue" }
      case "follow":
        return { icon: UserPlus, label: "Follow Required", color: "green" }
      case "subscription":
        return { icon: CreditCard, label: "Subscription Only", color: "purple" }
      case "payment":
        return { icon: DollarSign, label: `$${paywall.price} Payment`, color: "yellow" }
      default:
        return null
    }
  }

  const PostTypeIcon = getPostTypeInfo().icon
  const paywallInfo = getPaywallInfo()

  return (
    <>
      <Card className="bg-transparent border-0 shadow-none">
        <CardContent className="p-0">
          <div className="flex space-x-4">
            <Avatar className="ring-2 ring-black/5 mt-1">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              {/* Content Type Toggle */}
              <Tabs value={contentType} onValueChange={(value) => setContentType(value as ContentType)}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 backdrop-blur-xl">
                  <TabsTrigger value="post" className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Post
                  </TabsTrigger>
                  <TabsTrigger value="article" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Article
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Article Title (only for articles) */}
              {contentType === "article" && (
                <Input
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Article title..."
                  className="text-xl font-semibold bg-white/60 backdrop-blur-xl border border-black/10 focus:bg-white/80 focus:border-black/20 rounded-xl px-4 py-3"
                />
              )}

              <div className="relative">
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder={
                    contentType === "article"
                      ? "Write your article content..."
                      : "Share your startup journey, milestones, or insights..."
                  }
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

              {/* Paywall Display */}
              {paywallInfo && (
                <div className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-xl rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <paywallInfo.icon className="w-4 h-4 text-gray-600" />
                    <div>
                      <Label className="text-sm font-medium text-gray-800">{paywallInfo.label}</Label>
                      <p className="text-xs text-gray-600">Content will be gated</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPaywall({ type: null })}
                    className="hover:bg-red-50 hover:text-red-600 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </Button>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPaywallModal(true)}
                    className="text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Shield className="w-5 h-5" />
                  </Button>
                  {/* Divider button (only for articles) */}
                  {contentType === "article" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={insertDivider}
                      className="text-gray-600 hover:bg-gray-50 rounded-lg"
                      title="Insert divider"
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <PostTypeIcon className="w-4 h-4" />
                    <span>{contentType === "article" ? "Article" : getPostTypeInfo().label}</span>
                  </div>
                  <Button
                    onClick={handlePost}
                    disabled={(contentType === "article" && !articleTitle.trim()) || !content.trim() || isPosting}
                    className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg px-6"
                  >
                    {isPosting ? "Publishing..." : contentType === "article" ? "Publish" : "Share"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Paywall Selection Modal */}
      <Dialog open={showPaywallModal} onOpenChange={setShowPaywallModal}>
        <DialogContent className="bg-white/95 backdrop-blur-2xl border-black/10 shadow-2xl rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Add Paywall
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-blue-50/80 hover:bg-blue-100/80 border-blue-200"
              onClick={() => handlePaywallSelect("email")}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-blue-900">Name & Email</div>
                  <div className="text-sm text-blue-700">Require contact info to view</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-green-50/80 hover:bg-green-100/80 border-green-200"
              onClick={() => handlePaywallSelect("follow")}
            >
              <div className="flex items-center space-x-3">
                <UserPlus className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-green-900">Follow Required</div>
                  <div className="text-sm text-green-700">Must follow to access content</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-purple-50/80 hover:bg-purple-100/80 border-purple-200"
              onClick={() => handlePaywallSelect("subscription")}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium text-purple-900">Monthly Subscription</div>
                  <div className="text-sm text-purple-700">Subscribers only content</div>
                </div>
              </div>
            </Button>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-yellow-50/80 hover:bg-yellow-100/80 border-yellow-200"
                onClick={() => {
                  const price = prompt("Enter price (USD):")
                  if (price && !isNaN(Number(price))) {
                    handlePaywallSelect("payment", Number(price))
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                  <div className="text-left">
                    <div className="font-medium text-yellow-900">Individual Payment</div>
                    <div className="text-sm text-yellow-700">Set custom price for this post</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Back-compat alias (so old imports won't break)
export { CreatePostForm as CreatePost }
