"use client"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Briefcase, TrendingUp, Home, User, Building2, BarChart3, Search, Plus } from "lucide-react"
import { useCommandPalette } from "@/hooks/use-command-palette"
import { useCreatePostModal } from "@/hooks/use-create-post-modal"

export function CommandPalette() {
  const router = useRouter()
  const { isOpen, close } = useCommandPalette()
  const createPostModal = useCreatePostModal()

  const runCommand = (command: () => void) => {
    close()
    command()
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={close}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Create">
          <CommandItem onSelect={() => runCommand(() => createPostModal.open())}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Content</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>N
            </kbd>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                createPostModal.open()
                // Set to job type - we'll need to pass this somehow
              })
            }
          >
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Post Job</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                createPostModal.open()
                // Set to milestone type
              })
            }
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Share Milestone</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => runCommand(() => router.push("/newsfeed"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>H
            </kbd>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/profile"))}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>P
            </kbd>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/company"))}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>Company</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>C
            </kbd>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>A
            </kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Search">
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Search Posts</span>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Find People</span>
          </CommandItem>
          <CommandItem>
            <Building2 className="mr-2 h-4 w-4" />
            <span>Discover Companies</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
