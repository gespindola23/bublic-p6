"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", formData)
      setIsLoading(false)
      router.push("/newsfeed")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-30"></div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-2xl border-black/5 shadow-xl rounded-2xl relative">
        <CardHeader className="text-center pb-6">
          <Link href="/" className="inline-flex items-center justify-center mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Image src="/logo.png" alt="BUBLIC Logo" width={120} height={40} />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome back</CardTitle>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                className="bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 rounded-xl transition-all duration-200"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 rounded-xl transition-all duration-200 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: !!checked }))}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-gray-900 hover:text-black font-medium">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-xl py-3 font-medium transition-all duration-200"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-gray-900 hover:text-black font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
