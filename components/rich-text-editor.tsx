"use client"
import { Bold, Italic, Link, List, ListOrdered, Quote, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const insertText = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  return (
    <div className="space-y-1">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[150px] bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 resize-none rounded-xl transition-all duration-200 text-base"
      />
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-1">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => insertText("**", "**")}
                  className="w-7 h-7 hover:bg-white/80 rounded-lg"
                >
                  <Bold className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bold</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => insertText("*", "*")}
                  className="w-7 h-7 hover:bg-white/80 rounded-lg"
                >
                  <Italic className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Italic</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => insertText("[", "](url)")}
                  className="w-7 h-7 hover:bg-white/80 rounded-lg"
                >
                  <Link className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Link</p>
              </TooltipContent>
            </Tooltip>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => insertText("\n- ", "")}
                  className="w-7 h-7 hover:bg-white/80 rounded-lg"
                >
                  <List className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bulleted List</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => insertText("\n1. ", "")}
                  className="w-7 h-7 hover:bg-white/80 rounded-lg"
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Numbered List</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => insertText("\n> ", "")}
                  className="w-7 h-7 hover:bg-white/80 rounded-lg"
                >
                  <Quote className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quote</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="text-gray-400 hover:text-gray-600 cursor-help">
              <HelpCircle className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Use / for post types and @ to mention.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
