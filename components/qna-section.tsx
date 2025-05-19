"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Search, ThumbsDown, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Sample data for demonstration
const sampleQuestions = [
  {
    id: 1,
    question: "Apakah excavator ini memiliki fitur auto-leveling?",
    answer:
      "Ya, excavator ini dilengkapi dengan fitur auto-leveling yang memudahkan operator untuk menjaga posisi bucket tetap rata saat menggali.",
    category: "Spesifikasi",
    timestamp: "2 hari yang lalu",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    user: "Ahmad S.",
    isVerified: true,
    likes: 12,
    dislikes: 2,
  },
  {
    id: 2,
    question: "Bagaimana perbandingan konsumsi bahan bakar dengan model sebelumnya?",
    answer:
      "Model terbaru ini mengkonsumsi bahan bakar 15% lebih efisien dibandingkan model sebelumnya berkat sistem injeksi bahan bakar yang telah diperbarui.",
    category: "Perbandingan",
    timestamp: "5 hari yang lalu",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    user: "Budi W.",
    isVerified: true,
    likes: 8,
    dislikes: 0,
  },
  {
    id: 3,
    question: "Apakah tersedia di kota Surabaya?",
    answer: null,
    category: "Ketersediaan",
    timestamp: "1 hari yang lalu",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    user: "Dewi R.",
    isVerified: false,
    likes: 0,
    dislikes: 0,
  },
  {
    id: 4,
    question: "Berapa harga untuk pembelian dalam jumlah besar (>5 unit)?",
    answer:
      "Untuk pembelian lebih dari 5 unit, kami menyediakan diskon khusus. Silakan hubungi sales representative kami di nomor 021-5555-7777 untuk penawaran terbaik.",
    category: "Harga",
    timestamp: "1 minggu yang lalu",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    user: "PT. Konstruksi Maju",
    isVerified: true,
    likes: 15,
    dislikes: 1,
  },
]

export default function QnASection() {
  const { toast } = useToast()
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("")
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([1, 2, 4])
  const [votes, setVotes] = useState<Record<string, { likes: number; dislikes: number }>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("Terbaru")
  const [filteredQuestions, setFilteredQuestions] = useState(sampleQuestions)

  useEffect(() => {
    let result = [...sampleQuestions]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply sorting
    switch (sortOption) {
      case "Terbaru":
        result.sort((a, b) => b.date.getTime() - a.date.getTime())
        break
      case "Terpopuler":
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0))
        break
      case "Belum Terjawab":
        result.sort((a, b) => {
          if (a.answer === null && b.answer !== null) return -1
          if (a.answer !== null && b.answer === null) return 1
          return b.date.getTime() - a.date.getTime()
        })
        break
    }

    setFilteredQuestions(result)
  }, [searchQuery, sortOption])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle question submission logic here
    toast({
      title: "Pertanyaan Anda telah dikirim.",
      description: "Kami akan menjawab pertanyaan Anda segera.",
    })
    setQuestion("")
    setCategory("")
  }

  const toggleExpand = (id: number) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  const handleVote = (id: number, type: "like" | "dislike") => {
    const key = `${id}`
    const currentVotes = votes[key] || {
      likes: sampleQuestions.find((q) => q.id === id)?.likes || 0,
      dislikes: sampleQuestions.find((q) => q.id === id)?.dislikes || 0,
    }

    setVotes({
      ...votes,
      [key]: {
        ...currentVotes,
        [type === "like" ? "likes" : "dislikes"]: currentVotes[type === "like" ? "likes" : "dislikes"] + 1,
      },
    })
  }

  const getVoteCount = (id: number, type: "like" | "dislike") => {
    const key = `${id}`
    if (votes[key]) {
      return votes[key][type === "like" ? "likes" : "dislikes"]
    }
    const question = sampleQuestions.find((q) => q.id === id)
    return type === "like" ? question?.likes || 0 : question?.dislikes || 0
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Tanya Jawab Produk</h2>

      {/* Question submission form */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-medium">Ajukan Pertanyaan</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  <SelectItem value="Perbandingan">Perbandingan</SelectItem>
                  <SelectItem value="Harga">Harga</SelectItem>
                  <SelectItem value="Ketersediaan">Ketersediaan</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full sm:w-auto">
                Kirim Pertanyaan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Urutkan berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Terbaru">Terbaru</SelectItem>
            <SelectItem value="Terpopuler">Terpopuler</SelectItem>
            <SelectItem value="Belum Terjawab">Belum Terjawab</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader
                className={cn(
                  "pb-3 cursor-pointer flex flex-row items-start",
                  expandedQuestions.includes(item.id) ? "border-b" : "",
                )}
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{item.question}</p>
                      <p className="text-xs text-muted-foreground">{item.user}</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  {expandedQuestions.includes(item.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>

              {expandedQuestions.includes(item.id) && (
                <>
                  <CardContent className="pt-4">
                    {item.answer ? (
                      <div className="pl-9">
                        <div className="flex items-start gap-2 mb-1">
                          <p className="text-sm font-medium">Jawaban:</p>
                          {item.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Jawaban Terverifikasi
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{item.answer}</p>
                      </div>
                    ) : (
                      <div className="pl-9">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Menunggu Jawaban
                        </Badge>
                      </div>
                    )}
                  </CardContent>

                  {item.answer && (
                    <CardFooter className="pt-0 pl-9">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 h-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVote(item.id, "like")
                          }}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{getVoteCount(item.id, "like")}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 h-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVote(item.id, "dislike")
                          }}
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>{getVoteCount(item.id, "dislike")}</span>
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </>
              )}
            </Card>
          ))
        ) : (
          <Card className="p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Belum Ada Pertanyaan</h3>
              <p className="text-muted-foreground">Jadilah yang pertama mengajukan pertanyaan tentang produk ini.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
