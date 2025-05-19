"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample data for demonstration
const sampleQuestions = [
  {
    id: 1,
    question: "Apakah excavator Komatsu PC200-8 ini memiliki fitur auto-leveling?",
    answer:
      "Ya, excavator Komatsu PC200-8 dilengkapi dengan fitur auto-leveling yang memudahkan operator untuk menjaga posisi bucket tetap rata saat menggali.",
    category: "Spesifikasi",
    timestamp: "2 hari yang lalu",
    isVerified: true,
  },
  {
    id: 2,
    question: "Berapa harga sewa per hari untuk excavator ini?",
    answer:
      "Harga sewa excavator Komatsu PC200-8 adalah Rp 3.500.000 per hari dengan minimal sewa 3 hari. Untuk sewa bulanan, kami menawarkan harga khusus Rp 85.000.000 per bulan.",
    category: "Harga",
    timestamp: "5 hari yang lalu",
    isVerified: true,
  },
  {
    id: 3,
    question: "Apakah excavator ini tersedia untuk pengiriman ke Kalimantan Timur?",
    answer: null,
    category: "Ketersediaan",
    timestamp: "1 hari yang lalu",
    isVerified: false,
  },
  {
    id: 4,
    question: "Berapa konsumsi bahan bakar rata-rata per jam operasional?",
    answer:
      "Konsumsi bahan bakar Komatsu PC200-8 rata-rata adalah 14-18 liter per jam, tergantung pada kondisi operasional dan beban kerja.",
    category: "Spesifikasi",
    timestamp: "1 minggu yang lalu",
    isVerified: true,
  },
]

export default function ProductQnASection() {
  const { toast } = useToast()
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("")
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([1, 2])
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) {
      toast({
        title: "Pertanyaan tidak boleh kosong",
        description: "Silakan masukkan pertanyaan Anda",
        variant: "destructive",
      })
      return
    }

    if (!category) {
      toast({
        title: "Kategori belum dipilih",
        description: "Silakan pilih kategori pertanyaan",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pertanyaan Anda telah dikirim.",
        description: "Kami akan menjawab pertanyaan Anda segera.",
      })
      setQuestion("")
      setCategory("")
      setSubmitting(false)
    }, 1000)
  }

  const toggleExpand = (id: number) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-xl">Tanya Jawab Produk</CardTitle>
        </CardHeader>

        {/* Questions list */}
        <CardContent className="p-0">
          <div className="divide-y">
            {sampleQuestions.map((item) => (
              <div key={item.id} className="py-4 px-6">
                <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleExpand(item.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{item.category}</Badge>
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                    </div>
                    <p className="font-medium">{item.question}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-2 mt-1">
                    {expandedQuestions.includes(item.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {expandedQuestions.includes(item.id) && (
                  <div className="mt-3 pl-0 sm:pl-6">
                    {item.answer ? (
                      <div className="bg-muted/20 p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">Jawaban:</p>
                          {item.isVerified && (
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <Check className="h-3 w-3" /> Jawaban Terverifikasi
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{item.answer}</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Menunggu Jawaban
                        </Badge>
                        <p className="text-sm text-yellow-700 mt-1">
                          Pertanyaan Anda sedang ditinjau dan akan dijawab segera oleh tim kami.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        {/* Question submission form */}
        <CardFooter className="flex flex-col p-6 border-t bg-muted/10">
          <h3 className="text-base font-medium mb-3 w-full">Ajukan Pertanyaan</h3>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              placeholder="Tanyakan sesuatu tentang produk ini..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spesifikasi">Spesifikasi</SelectItem>
                  <SelectItem value="Harga">Harga</SelectItem>
                  <SelectItem value="Ketersediaan">Ketersediaan</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
                {submitting ? "Mengirim..." : "Kirim Pertanyaan"}
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
