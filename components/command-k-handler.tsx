"use client"

import { useEffect } from "react"
import { useCommandPalette } from "@/hooks/use-command-palette"

export function CommandKHandler() {
  const { open } = useCommandPalette()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault()
        open()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open])

  return null
}
