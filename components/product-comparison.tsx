"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircleQuestion, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Sample product data
const products = [
  {
    id: 1,
    name: "Komatsu PC200",
    image: "/placeholder.svg?height=150&width=200",
    specs: {
      engine: "Komatsu SAA6D107E-1",
      power: "155 HP",
      operatingWeight: "20.000 kg",
      bucketCapacity: "0,8 m³",
      maxDiggingDepth: "6.620 mm",
      fuelConsumption: "14-18 L/jam",
    },
    questionCount: 8,
  },
  {
    id: 2,
    name: "CAT 320D",
    image: "/placeholder.svg?height=150&width=200",
    specs: {
      engine: "CAT C6.6 ACERT",
      power: "148 HP",
      operatingWeight: "21.100 kg",
      bucketCapacity: "1,0 m³",
      maxDiggingDepth: "6.720 mm",
      fuelConsumption: "15-20 L/jam",
    },
    questionCount: 5,
  },
]

// Sample QnA data for each product
const productQnA = {
  1: [
    {
      id: 1,
      question: "Apakah Komatsu PC200 memiliki fitur auto-idle?",
      answer:
        "Ya, Komatsu PC200 dilengkapi dengan fitur auto-idle yang dapat mengurangi konsumsi bahan bakar hingga 10% saat excavator tidak digunakan secara aktif.",
      date: "2 hari yang lalu",
      user: "Ahmad S.",
    },
    {
      id: 2,
      question: "Berapa lama masa garansi untuk Komatsu PC200?",
      answer:
        "Komatsu PC200 memiliki garansi standar selama 1 tahun atau 2.000 jam operasional, mana yang tercapai lebih dahulu. Tersedia juga paket perpanjangan garansi.",
      date: "1 minggu yang lalu",
      user: "PT. Konstruksi Maju",
    },
    {
      id: 3,
      question: "Apakah tersedia suku cadang Komatsu PC200 di kota-kota kecil?",
      answer:
        "Komatsu memiliki jaringan distribusi suku cadang yang luas di Indonesia. Untuk kota-kota kecil, pengiriman biasanya membutuhkan waktu 2-3 hari kerja.",
      date: "2 minggu yang lalu",
      user: "Budi W.",
    },
  ],
  2: [
    {
      id: 1,
      question: "Bagaimana sistem pendinginan pada CAT 320D?",
      answer:
        "CAT 320D menggunakan sistem pendinginan advanced dengan kipas yang dikendalikan secara elektronik untuk efisiensi bahan bakar yang lebih baik dan pengurangan kebisingan.",
      date: "3 hari yang lalu",
      user: "Dewi R.",
    },
    {
      id: 2,
      question: "Apakah CAT 320D kompatibel dengan attachment dari merek lain?",
      answer:
        "CAT 320D dapat menggunakan attachment dari merek lain dengan adaptor yang sesuai, namun untuk performa optimal disarankan menggunakan attachment asli CAT.",
      date: "5 hari yang lalu",
      user: "PT. Mitra Alat Berat",
    },
  ],
}

// Sample comparison questions
const comparisonQuestions = [
  {
    id: 1,
    question: "Mana yang lebih hemat bahan bakar antara Komatsu PC200 dan CAT 320D untuk pekerjaan penggalian dalam?",
    answer:
      "Untuk pekerjaan penggalian dalam, Komatsu PC200 cenderung lebih hemat bahan bakar dengan konsumsi 14-18 L/jam dibandingkan CAT 320D yang mengkonsumsi 15-20 L/jam. Namun, CAT 320D memiliki keunggulan pada efisiensi kerja yang dapat menyelesaikan pekerjaan lebih cepat pada kondisi tertentu.",
    date: "1 minggu yang lalu",
    user: "PT. Konstruksi Maju",
  },
  {
    id: 2,
    question: "Bagaimana perbandingan biaya perawatan antara Komatsu PC200 dan CAT 320D dalam jangka panjang?",
    answer:
      "Dalam jangka panjang (5 tahun), biaya perawatan Komatsu PC200 cenderung 5-10% lebih rendah dibandingkan CAT 320D. Namun, CAT 320D memiliki ketersediaan suku cadang yang lebih luas di daerah terpencil.",
    date: "2 minggu yang lalu",
    user: "Ahmad S.",
  },
  {
    id: 3,
    question: "Apakah Komatsu PC200 atau CAT 320D yang lebih cocok untuk proyek konstruksi di daerah berawa?",
    answer:
      "Untuk daerah berawa, CAT 320D memiliki keunggulan dengan track yang lebih lebar dan tekanan tanah yang lebih rendah. Namun, Komatsu PC200 menawarkan stabilitas yang lebih baik pada permukaan yang tidak rata.",
    date: "3 minggu yang lalu",
    user: "PT. Mitra Alat Berat",
  },
]

export default function ProductComparison() {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([1])
  const [newQuestion, setNewQuestion] = useState("")

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Pertanyaan perbandingan telah dikirim: ${newQuestion}`)
    setNewQuestion("")
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Perbandingan Produk Excavator</h2>

      {/* Product Comparison Table */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Spesifikasi</TableHead>
                {products.map((product) => (
                  <TableHead key={product.id} className="text-center">
                    <div className="flex flex-col items-center gap-2 py-4">
                      <img src={product.image || "/placeholder.svg"} alt={product.name} className="rounded-md mb-2" />
                      <h3 className="font-bold text-lg">{product.name}</h3>

                      {/* QnA Summary */}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircleQuestion className="h-4 w-4" />
                        <span>{product.questionCount} Pertanyaan</span>
                      </div>

                      {/* QnA Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="mt-2">
                            Lihat QnA
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Tanya Jawab: {product.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            {productQnA[product.id as 1 | 2].map((item) => (
                              <Card key={item.id}>
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium">{item.question}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Ditanyakan oleh {item.user} • {item.date}
                                      </p>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm">{item.answer}</p>
                                </CardContent>
                              </Card>
                            ))}

                            {/* Form to ask new question about this product */}
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Ajukan Pertanyaan Baru</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <form className="space-y-4">
                                  <Textarea
                                    placeholder={`Tanyakan sesuatu tentang ${product.name}...`}
                                    className="min-h-[100px]"
                                  />
                                  <Button type="submit">Kirim Pertanyaan</Button>
                                </form>
                              </CardContent>
                            </Card>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(products[0].specs).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {product.specs[key as keyof typeof product.specs]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Comparison Questions Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Pertanyaan Terkait Perbandingan Produk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comparisonQuestions.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader
                className={cn(
                  "pb-3 cursor-pointer flex flex-row items-start",
                  expandedQuestions.includes(item.id) ? "border-b" : "",
                )}
                onClick={() => toggleQuestion(item.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">Perbandingan</Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.question}</p>
                    <p className="text-xs text-muted-foreground">Ditanyakan oleh {item.user}</p>
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
                <CardContent className="pt-4">
                  <p className="text-sm">{item.answer}</p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Lihat Jawaban Lengkap
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Ask New Comparison Question Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Ajukan Pertanyaan Perbandingan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <Textarea
              placeholder="Tanyakan sesuatu tentang perbandingan produk ini..."
              className="min-h-[100px]"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <Button type="submit">Kirim Pertanyaan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
