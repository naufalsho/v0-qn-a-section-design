"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import FaqAccordion from "@/components/faq-accordion"

// Sample FAQ data
const faqData = {
  pengiriman: [
    {
      question: "Berapa lama waktu pengiriman untuk alat berat?",
      answer:
        "Waktu pengiriman alat berat bervariasi tergantung lokasi dan ketersediaan. Untuk pengiriman dalam kota biasanya membutuhkan waktu 2-3 hari kerja. Untuk pengiriman antar pulau, estimasi waktu adalah 1-3 minggu tergantung pada lokasi tujuan dan kondisi cuaca.",
    },
    {
      question: "Apakah ada biaya tambahan untuk pengiriman ke luar Jawa?",
      answer:
        "Ya, untuk pengiriman ke luar Pulau Jawa akan dikenakan biaya tambahan sesuai dengan berat alat, jarak pengiriman, dan aksesibilitas lokasi. Biaya ini akan ditampilkan secara transparan pada saat checkout atau dapat dikonsultasikan dengan tim layanan pelanggan kami.",
    },
    {
      question: "Bagaimana cara melacak status pengiriman alat berat saya?",
      answer:
        "Anda dapat melacak status pengiriman melalui halaman 'Pesanan Saya' di akun Anda. Selain itu, kami juga akan mengirimkan update status pengiriman melalui email dan SMS. Untuk informasi lebih detail, Anda dapat menghubungi tim layanan pelanggan kami di nomor 021-5555-7777.",
    },
    {
      question: "Apakah saya perlu menyediakan alat berat untuk bongkar muat?",
      answer:
        "Tidak, layanan pengiriman kami sudah termasuk proses bongkar muat di lokasi yang ditentukan. Tim kami akan membawa peralatan yang diperlukan untuk proses tersebut. Namun, pastikan lokasi bongkar muat memiliki akses yang memadai untuk truk pengangkut dan peralatan bongkar muat.",
    },
  ],
  garansi: [
    {
      question: "Berapa lama masa garansi untuk alat berat baru?",
      answer:
        "Alat berat baru memiliki garansi standar selama 1 tahun atau 2.000 jam operasional (mana yang tercapai lebih dahulu). Garansi ini mencakup kerusakan pada komponen utama akibat cacat produksi. Kami juga menawarkan paket perpanjangan garansi hingga 3 tahun atau 5.000 jam operasional.",
    },
    {
      question: "Apa saja yang tidak termasuk dalam garansi?",
      answer:
        "Garansi tidak mencakup kerusakan akibat penggunaan yang tidak sesuai dengan petunjuk operasional, kecelakaan, bencana alam, modifikasi tidak resmi, atau keausan normal pada komponen habis pakai seperti filter, oli, dan ban. Kerusakan akibat perawatan yang tidak dilakukan sesuai jadwal juga tidak termasuk dalam garansi.",
    },
    {
      question: "Bagaimana cara mengklaim garansi?",
      answer:
        "Untuk mengklaim garansi, Anda dapat menghubungi dealer resmi tempat Anda membeli alat atau menghubungi pusat layanan pelanggan kami. Tim teknisi kami akan melakukan inspeksi untuk menentukan apakah kerusakan termasuk dalam cakupan garansi. Pastikan Anda menyimpan bukti pembelian dan dokumen garansi.",
    },
    {
      question: "Apakah garansi masih berlaku jika saya menjual alat berat saya?",
      answer:
        "Ya, garansi tetap berlaku dan dapat dialihkan ke pemilik baru selama masa garansi belum berakhir. Untuk proses pengalihan garansi, pemilik baru perlu menghubungi dealer resmi dengan membawa dokumen pembelian dan surat pengalihan kepemilikan yang sah.",
    },
  ],
  servis: [
    {
      question: "Berapa biaya servis berkala untuk excavator?",
      answer:
        "Biaya servis berkala untuk excavator bervariasi tergantung pada model dan jenis servis. Servis ringan (setiap 250 jam) berkisar antara Rp 2-5 juta, sedangkan servis besar (setiap 1.000 jam) berkisar antara Rp 8-15 juta. Kami menawarkan paket servis berkala dengan harga khusus yang dapat menghemat biaya hingga 20%.",
    },
    {
      question: "Bagaimana cara memesan suku cadang original?",
      answer:
        "Anda dapat memesan suku cadang original melalui website kami di bagian 'Suku Cadang', menghubungi dealer resmi terdekat, atau melalui aplikasi mobile kami. Pastikan Anda menyebutkan nomor seri alat dan kode suku cadang yang dibutuhkan untuk memastikan kompatibilitas. Pengiriman dapat dilakukan ke lokasi Anda.",
    },
    {
      question: "Apakah tersedia layanan servis di lokasi (on-site)?",
      answer:
        "Ya, kami menyediakan layanan servis di lokasi untuk meminimalkan downtime alat Anda. Tim teknisi kami akan datang ke lokasi dengan peralatan yang diperlukan. Layanan ini tersedia untuk perbaikan darurat maupun servis berkala. Biaya tambahan mungkin berlaku tergantung jarak dan aksesibilitas lokasi.",
    },
    {
      question: "Berapa lama waktu tunggu untuk penggantian suku cadang impor?",
      answer:
        "Untuk suku cadang impor yang tidak tersedia di stok lokal, waktu tunggu berkisar antara 2-4 minggu. Namun, untuk komponen kritikal, kami memiliki program 'Fast Track' yang dapat mempercepat proses pengadaan menjadi 7-10 hari kerja dengan biaya tambahan. Kami selalu berusaha menjaga ketersediaan suku cadang yang sering dibutuhkan.",
    },
    {
      question: "Apakah ada program pelatihan untuk operator dan teknisi?",
      answer:
        "Ya, kami menyediakan program pelatihan untuk operator dan teknisi. Program ini mencakup pengoperasian yang aman dan efisien, perawatan dasar, dan troubleshooting sederhana. Pelatihan dapat dilakukan di pusat pelatihan kami atau di lokasi Anda dengan minimal 5 peserta. Hubungi tim kami untuk informasi jadwal dan biaya.",
    },
  ],
}

export default function HelpCenter() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")
  const [question, setQuestion] = useState("")
  const [email, setEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter FAQs based on search query
  const filteredFaqs = {
    pengiriman: faqData.pengiriman.filter(
      (faq) =>
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    garansi: faqData.garansi.filter(
      (faq) =>
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    servis: faqData.servis.filter(
      (faq) =>
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }

  // Check if any FAQs match the search query
  const hasResults =
    filteredFaqs.pengiriman.length > 0 || filteredFaqs.garansi.length > 0 || filteredFaqs.servis.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!category) {
      toast({
        title: "Kategori belum dipilih",
        description: "Silakan pilih kategori pertanyaan",
        variant: "destructive",
      })
      return
    }

    if (!question.trim()) {
      toast({
        title: "Pertanyaan tidak boleh kosong",
        description: "Silakan masukkan pertanyaan Anda",
        variant: "destructive",
      })
      return
    }

    if (!email.trim()) {
      toast({
        title: "Email tidak boleh kosong",
        description: "Silakan masukkan email Anda",
        variant: "destructive",
      })
      return
    }

    // Simulate form submission
    toast({
      title: "Pertanyaan Anda telah dikirim",
      description: "Kami akan menghubungi Anda melalui email yang telah diberikan.",
    })

    // Reset form and close dialog
    setCategory("")
    setQuestion("")
    setEmail("")
    setIsDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Pusat Bantuan & FAQ</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Temukan jawaban untuk pertanyaan umum tentang produk dan layanan kami. Jika Anda tidak menemukan jawaban yang
          Anda cari, silakan ajukan pertanyaan baru.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-10">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Cari pertanyaan umum..."
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FAQ Sections */}
      {hasResults ? (
        <div className="space-y-8">
          {/* Pengiriman Section */}
          {filteredFaqs.pengiriman.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Pengiriman</h2>
              <FaqAccordion items={filteredFaqs.pengiriman} />
            </div>
          )}

          {/* Garansi Section */}
          {filteredFaqs.garansi.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Garansi</h2>
              <FaqAccordion items={filteredFaqs.garansi} />
            </div>
          )}

          {/* Servis & Suku Cadang Section */}
          {filteredFaqs.servis.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Servis & Suku Cadang</h2>
              <FaqAccordion items={filteredFaqs.servis} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Tidak ada hasil yang ditemukan</h3>
          <p className="text-muted-foreground mb-4">
            Maaf, kami tidak dapat menemukan jawaban untuk pencarian Anda. Silakan coba kata kunci lain atau ajukan
            pertanyaan baru.
          </p>
        </div>
      )}

      {/* Ask New Question Button */}
      <div className="mt-12 text-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8">
              Ajukan Pertanyaan Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajukan Pertanyaan Baru</DialogTitle>
              <DialogDescription>
                Silakan isi formulir di bawah ini. Tim kami akan menjawab pertanyaan Anda melalui email.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pengiriman">Pengiriman</SelectItem>
                      <SelectItem value="garansi">Garansi</SelectItem>
                      <SelectItem value="servis">Servis & Suku Cadang</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="question">Pertanyaan</Label>
                  <Textarea
                    id="question"
                    placeholder="Tulis pertanyaan Anda di sini..."
                    className="min-h-[100px]"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@anda.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Kirim Pertanyaan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contact Information */}
      <div className="mt-16 bg-muted/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Butuh Bantuan Lebih Lanjut?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div className="p-4">
            <h3 className="font-medium mb-2">Hubungi Kami</h3>
            <p className="text-muted-foreground mb-2">Senin - Jumat: 08.00 - 17.00 WIB</p>
            <p className="font-medium">021-5555-7777</p>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-2">Email</h3>
            <p className="text-muted-foreground mb-2">Respon dalam 1-2 hari kerja</p>
            <p className="font-medium">bantuan@alatberat.co.id</p>
          </div>
        </div>
      </div>
    </div>
  )
}
