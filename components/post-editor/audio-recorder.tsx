"use client"

import { useState, useRef } from "react"
import { Mic, StopCircle, Play, Trash2, UploadCloud, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioRecorderProps {
  onAudioReady: (url: string) => void
  onClose: () => void
}

export function AudioRecorder({ onAudioReady, onClose }: AudioRecorderProps) {
  const [recordingStatus, setRecordingStatus] = useState<"idle" | "recording" | "stopped">("idle")
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [timer, setTimer] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        setRecordingStatus("stopped")
        stream.getTracks().forEach((track) => track.stop()) // Stop the mic access
      }

      mediaRecorderRef.current.start()
      setRecordingStatus("recording")
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      alert("Could not access microphone. Please check your browser permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === "recording") {
      mediaRecorderRef.current.stop()
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    }
  }

  const reset = () => {
    setRecordingStatus("idle")
    setAudioUrl(null)
    setTimer(0)
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
  }

  const handleConfirm = () => {
    if (audioUrl) {
      onAudioReady(audioUrl)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-4 bg-purple-50/80 rounded-xl border border-purple-100 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-purple-800">Record Audio</p>
        <Button variant="ghost" size="icon" onClick={onClose} className="w-7 h-7 hover:bg-black/5 rounded-lg">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {recordingStatus === "idle" && (
        <div className="flex gap-4">
          <Button onClick={startRecording} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg">
            <Mic className="w-4 h-4 mr-2" />
            Start Recording
          </Button>
          <Button variant="outline" className="w-full bg-white/80 rounded-lg">
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>
      )}

      {recordingStatus === "recording" && (
        <div className="flex items-center justify-center gap-4">
          <p className="text-2xl font-mono font-semibold text-red-600">{formatTime(timer)}</p>
          <Button onClick={stopRecording} size="icon" className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full">
            <StopCircle className="w-6 h-6 text-white" />
          </Button>
        </div>
      )}

      {recordingStatus === "stopped" && audioUrl && (
        <div className="space-y-3">
          <audio src={audioUrl} controls className="w-full h-10" />
          <div className="flex gap-2">
            <Button onClick={reset} variant="ghost" size="sm" className="w-full">
              <Trash2 className="w-4 h-4 mr-2" />
              Discard
            </Button>
            <Button onClick={handleConfirm} size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Use this audio
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
