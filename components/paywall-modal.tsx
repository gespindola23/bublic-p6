"use client"

import { useState } from "react"
import { Lock, CreditCard, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    title: string
    author: {
      name: string
      avatar: string
    }
    price: number
  }
}

export function PaywallModal({ isOpen, onClose, post }: PaywallModalProps) {
  const [paymentData, setPaymentData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handlePayment = async () => {
    // Here you would integrate with Stripe
    console.log("Processing payment:", paymentData)
    // Simulate payment processing
    setTimeout(() => {
      alert("Payment successful! You now have access to this content.")
      onClose()
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-2xl border-black/10 shadow-2xl rounded-2xl">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 hover:bg-black/5 rounded-lg"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-2xl mx-auto mb-3 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">Premium Content</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Post Preview */}
          <div className="p-4 bg-gray-50/80 backdrop-blur-xl rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-600">Premium Content</p>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">${post.price}</span>
              <span className="text-sm text-gray-600">One-time access</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={paymentData.email}
                onChange={(e) => setPaymentData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                className="bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  className="bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  className="bg-white/60 backdrop-blur-xl border-black/10 focus:bg-white/80 focus:border-black/20 rounded-lg"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            className="w-full bg-bublic-primary text-bublic-primary-foreground hover:bg-bublic-primary/90 rounded-lg py-3 font-medium"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Pay ${post.price} - Get Access
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by Stripe. Your card information is encrypted and secure.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
