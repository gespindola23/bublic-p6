import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { BackgroundPostsEffect } from "@/components/background-posts-effect"
import { redirect } from "next/navigation"

export default function LandingPage() {
  // Redirect to newsfeed for now
  redirect("/newsfeed")

  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-hidden">
      <BackgroundPostsEffect />
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center z-10">
        <Image src="/logo.png" alt="BUBLIC Logo" width={120} height={40} />
        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" className="rounded-lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
            <Link href="/newsfeed">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center z-10">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-grotesk text-5xl md:text-7xl font-normal text-foreground leading-tight">
              The Social Network for Startups, Founders and Creators.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A place for real people and real companies.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg px-8 py-6 text-lg"
              >
                <Link href="/newsfeed">Enter the Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm z-10">
        &copy; {new Date().getFullYear()} BUBLIC. All rights reserved.
      </footer>
    </div>
  )
}
