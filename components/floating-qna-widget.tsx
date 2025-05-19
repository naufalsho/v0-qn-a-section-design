"use client"

import type React from "react"

import { useState } from "react"
import { HelpCircle, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// Sample popular questions
const popularQuestions = [
  {
    id: 1,
    question: "Apa perbedaan utama antara Komatsu PC200 dan CAT 320D?",
    answer:
      "Komatsu PC200 memiliki konsumsi bahan bakar yang lebih efisien, sementara CAT 320D menawarkan daya angkat yang lebih besar dan sistem hidrolik yang lebih responsif.",
  },
  {
    id: 2,
    question: "Berapa lama masa garansi untuk excavator baru?",
    answer:
      "Excavator baru umumnya memiliki garansi selama 1 tahun atau 2.000 jam operasional, mana yang tercapai lebih dahulu.",
  },
  {
    id: 3,
    question: "Apakah tersedia suku cadang untuk model lama?",
    answer:
      "Ya, kami menyediakan suku cadang untuk model hingga 10 tahun ke belakang. Untuk model yang lebih lama, kami dapat membantu mencari suku cadang alternatif atau rekondisi.",
  },
]

// Sample product list
const products = [
  { id: 1, name: "Komatsu PC200" },
  { id: 2, name: "CAT 320D" },
  { id: 3, name: "Hitachi ZX200" },
  { id: 4, name: "Kobelco SK200" },
  { id: 5, name: "Volvo EC200D" },
]

export default function FloatingQnAWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const { toast } = useToast()
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) {
      toast({
        title: "Pertanyaan tidak boleh kosong",
        description: "Silakan tulis pertanyaan Anda",
        variant: "destructive",
      })
      return
    }

    // Show success message
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setQuestion("")
      setSelectedProduct("")
    }, 3000)
  }

  const toggleQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 p-0",
          "transition-all duration-300 hover:scale-110",
          isDarkMode ? "bg-primary hover:bg-primary/90" : "bg-primary hover:bg-primary/90",
        )}
        aria-label="Bantuan"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {/* QnA Drawer */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 w-full sm:w-96 sm:bottom-6 sm:right-6 transition-all duration-300 ease-in-out",
          "rounded-t-lg sm:rounded-lg shadow-lg overflow-hidden",
          "bg-background border",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-lg">Ada pertanyaan?</h3>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8" aria-label="Tutup">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-2">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-medium">Terima kasih!</h4>
              <p className="text-muted-foreground">Pertanyaan Anda telah dikirim dan sedang ditinjau.</p>
            </div>
          ) : (
            <>
              {/* Popular Questions */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Pertanyaan Populer</h4>
                <div className="space-y-2">
                  {popularQuestions.map((q) => (
                    <div key={q.id} className="rounded-md border bg-card text-card-foreground shadow-sm">
                      <div
                        className="p-3 cursor-pointer flex justify-between items-start"
                        onClick={() => toggleQuestion(q.id)}
                      >
                        <p className="text-sm font-medium">{q.question}</p>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform",
                            expandedQuestion === q.id && "rotate-90",
                          )}
                        />
                      </div>
                      {expandedQuestion === q.id && (
                        <div className="px-3 pb-3 pt-0">
                          <p className="text-sm text-muted-foreground">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="question" className="text-sm font-medium text-muted-foreground">
                    Tulis pertanyaan Anda
                  </label>
                  <Textarea
                    id="question"
                    placeholder="Tulis pertanyaan Anda..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="product" className="text-sm font-medium text-muted-foreground">
                    Pilih produk terkait (jika ada)
                  </label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Pilih produk terkait (opsional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Kirim Pertanyaan
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 sm:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
