import { create } from "zustand"

interface CreatePostModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useCreatePostModal = create<CreatePostModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
