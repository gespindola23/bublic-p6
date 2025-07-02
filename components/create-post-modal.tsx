"use client"

import { useCreatePostModal } from "@/hooks/use-create-post-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreatePostForm } from "@/components/create-post-form"

export function CreatePostModal() {
  const { isOpen, close } = useCreatePostModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="bg-white/80 backdrop-blur-2xl border-black/10 shadow-2xl rounded-2xl sm:max-w-3xl p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">Create a new post</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <CreatePostForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
