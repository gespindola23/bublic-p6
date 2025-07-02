"use client"

import { useEffect } from "react"
import { useCreatePostModal } from "@/hooks/use-create-post-modal"

export function CommandKHandler() {
  const { open } = useCreatePostModal()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        open()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open])

  return null
}
