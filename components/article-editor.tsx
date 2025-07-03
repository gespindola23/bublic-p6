"use client"

import type React from "react"

import { useState } from "react"
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  ImageIcon,
  Plus,
  Grip,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bulletList"
  | "numberedList"
  | "quote"
  | "code"
  | "image"

interface Block {
  id: string
  type: BlockType
  content: string
  placeholder?: string
}

interface ArticleEditorProps {
  title: string
  onTitleChange: (title: string) => void
  blocks: Block[]
  onBlocksChange: (blocks: Block[]) => void
}

export function ArticleEditor({ title, onTitleChange, blocks, onBlocksChange }: ArticleEditorProps) {
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null)
  const [showBlockMenu, setShowBlockMenu] = useState<string | null>(null)

  const addBlock = (afterId?: string, type: BlockType = "paragraph") => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: "",
      placeholder: getPlaceholder(type),
    }

    if (afterId) {
      const index = blocks.findIndex((b) => b.id === afterId)
      const newBlocks = [...blocks]
      newBlocks.splice(index + 1, 0, newBlock)
      onBlocksChange(newBlocks)
    } else {
      onBlocksChange([...blocks, newBlock])
    }

    // Focus the new block
    setTimeout(() => {
      const element = document.getElementById(`block-${newBlock.id}`)
      element?.focus()
    }, 0)
  }

  const updateBlock = (id: string, content: string) => {
    const newBlocks = blocks.map((block) => (block.id === id ? { ...block, content } : block))
    onBlocksChange(newBlocks)
  }

  const deleteBlock = (id: string) => {
    if (blocks.length === 1) return // Don't delete the last block
    const newBlocks = blocks.filter((block) => block.id !== id)
    onBlocksChange(newBlocks)
  }

  const changeBlockType = (id: string, type: BlockType) => {
    const newBlocks = blocks.map((block) =>
      block.id === id ? { ...block, type, placeholder: getPlaceholder(type) } : block,
    )
    onBlocksChange(newBlocks)
    setShowBlockMenu(null)
  }

  const getPlaceholder = (type: BlockType): string => {
    switch (type) {
      case "heading1":
        return "Heading 1"
      case "heading2":
        return "Heading 2"
      case "heading3":
        return "Heading 3"
      case "bulletList":
        return "• List item"
      case "numberedList":
        return "1. List item"
      case "quote":
        return "Quote"
      case "code":
        return "Code"
      case "image":
        return "Add image URL..."
      default:
        return "Type '/' for commands"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, blockId: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const block = blocks.find((b) => b.id === blockId)
      if (block && block.content.trim() === "") {
        // Convert empty block to paragraph
        changeBlockType(blockId, "paragraph")
      } else {
        // Add new block
        addBlock(blockId)
      }
    } else if (e.key === "Backspace") {
      const block = blocks.find((b) => b.id === blockId)
      if (block && block.content === "" && blocks.length > 1) {
        e.preventDefault()
        deleteBlock(blockId)
      }
    } else if (e.key === "/" && blocks.find((b) => b.id === blockId)?.content === "") {
      e.preventDefault()
      setShowBlockMenu(blockId)
    }
  }

  const renderBlock = (block: Block) => {
    const commonProps = {
      id: `block-${block.id}`,
      value: block.content,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateBlock(block.id, e.target.value),
      onFocus: () => setFocusedBlockId(block.id),
      onBlur: () => setFocusedBlockId(null),
      onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, block.id),
      placeholder: block.placeholder,
      className: "w-full border-none outline-none resize-none bg-transparent",
    }

    switch (block.type) {
      case "heading1":
        return <Input {...commonProps} className="text-3xl font-bold py-2 px-0 h-auto" />
      case "heading2":
        return <Input {...commonProps} className="text-2xl font-semibold py-2 px-0 h-auto" />
      case "heading3":
        return <Input {...commonProps} className="text-xl font-medium py-2 px-0 h-auto" />
      case "bulletList":
        return (
          <div className="flex items-start space-x-2">
            <span className="text-gray-400 mt-1">•</span>
            <Input {...commonProps} className="flex-1 py-1 px-0 h-auto" />
          </div>
        )
      case "numberedList":
        return (
          <div className="flex items-start space-x-2">
            <span className="text-gray-400 mt-1">1.</span>
            <Input {...commonProps} className="flex-1 py-1 px-0 h-auto" />
          </div>
        )
      case "quote":
        return (
          <div className="border-l-4 border-gray-300 pl-4">
            <Input {...commonProps} className="italic text-gray-700 py-1 px-0 h-auto" />
          </div>
        )
      case "code":
        return (
          <Textarea
            {...commonProps}
            className="font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg p-3 min-h-[100px]"
          />
        )
      case "image":
        return (
          <div className="space-y-2">
            <Input {...commonProps} placeholder="Paste image URL..." className="py-1 px-0 h-auto" />
            {block.content && (
              <img
                src={block.content || "/placeholder.svg"}
                alt="Article image"
                className="max-w-full h-auto rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            )}
          </div>
        )
      default:
        return (
          <Textarea
            {...commonProps}
            className="min-h-[40px] py-1 px-0 leading-relaxed"
            rows={1}
            style={{ height: "auto" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto"
              target.style.height = target.scrollHeight + "px"
            }}
          />
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-8 pb-4 border-b border-gray-100">
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled Article"
          className="text-4xl font-bold border-none outline-none p-0 h-auto bg-transparent placeholder:text-gray-300"
        />
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
          <span>Draft</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Auto-saved</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-4">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="group relative"
            onMouseEnter={() => setFocusedBlockId(block.id)}
            onMouseLeave={() => setFocusedBlockId(null)}
          >
            {/* Block Controls */}
            {focusedBlockId === block.id && (
              <div className="absolute -left-12 top-1 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-gray-400 hover:text-gray-600"
                  onClick={() => addBlock(block.id)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <DropdownMenu
                  open={showBlockMenu === block.id}
                  onOpenChange={(open) => setShowBlockMenu(open ? block.id : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-600">
                      <Grip className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "paragraph")}>
                      <Type className="w-4 h-4 mr-2" />
                      Text
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "heading1")}>
                      <Heading1 className="w-4 h-4 mr-2" />
                      Heading 1
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "heading2")}>
                      <Heading2 className="w-4 h-4 mr-2" />
                      Heading 2
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "heading3")}>
                      <Heading3 className="w-4 h-4 mr-2" />
                      Heading 3
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "bulletList")}>
                      <List className="w-4 h-4 mr-2" />
                      Bullet List
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "numberedList")}>
                      <ListOrdered className="w-4 h-4 mr-2" />
                      Numbered List
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "quote")}>
                      <Quote className="w-4 h-4 mr-2" />
                      Quote
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "code")}>
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeBlockType(block.id, "image")}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={() => deleteBlock(block.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Block Content */}
            <div className="min-h-[40px]">{renderBlock(block)}</div>
          </div>
        ))}

        {/* Add Block Button */}
        <Button
          variant="ghost"
          onClick={() => addBlock()}
          className="w-full justify-start text-gray-400 hover:text-gray-600 py-8 border-2 border-dashed border-gray-200 hover:border-gray-300 rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add a block
        </Button>
      </div>
    </div>
  )
}
