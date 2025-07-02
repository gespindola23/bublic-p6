import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image src="/logo.png" alt="BUBLIC Logo" width={120} height={40} />
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" className="hover:bg-black/5 rounded-lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button
            asChild
            className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg"
          >
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center">
        <div className="container mx-auto px-4 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[length:32px_32px] opacity-50"></div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-grotesk text-5xl md:text-7xl font-normal text-black leading-tight">
              The Social Network for Founders.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Share your journey, track your metrics, and connect with a community of builders who are shipping in
              public.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg px-8 py-6 text-lg"
              >
                <Link href="/auth/register">Sign Up and Start Building</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BUBLIC. All rights reserved.
      </footer>
    </div>
  )
}
