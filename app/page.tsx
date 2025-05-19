import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Perbandingan Alat Berat</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Excavator 20 Ton</CardTitle>
            <CardDescription>Perbandingan spesifikasi excavator kelas 20 ton dari berbagai merek</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Spesifikasi</TableHead>
                  <TableHead>Komatsu PC200</TableHead>
                  <TableHead>CAT 320D</TableHead>
                  <TableHead>Hitachi ZX200</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Berat Operasional</TableCell>
                  <TableCell>20.000 kg</TableCell>
                  <TableCell>21.100 kg</TableCell>
                  <TableCell>20.500 kg</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tenaga Mesin</TableCell>
                  <TableCell>155 HP</TableCell>
                  <TableCell>148 HP</TableCell>
                  <TableCell>150 HP</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kapasitas Bucket</TableCell>
                  <TableCell>0,8 m³</TableCell>
                  <TableCell>1,0 m³</TableCell>
                  <TableCell>0,9 m³</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kedalaman Galian Maks</TableCell>
                  <TableCell>6.620 mm</TableCell>
                  <TableCell>6.720 mm</TableCell>
                  <TableCell>6.670 mm</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Konsumsi BBM</TableCell>
                  <TableCell>14-18 L/jam</TableCell>
                  <TableCell>15-20 L/jam</TableCell>
                  <TableCell>14-19 L/jam</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Komatsu PC200</CardTitle>
              <CardDescription>Excavator 20 Ton</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                <p className="text-muted-foreground">Gambar Produk</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Excavator andal dengan efisiensi bahan bakar tinggi dan biaya perawatan rendah.
              </p>
              <Button className="w-full">Lihat Detail</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CAT 320D</CardTitle>
              <CardDescription>Excavator 20 Ton</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                <p className="text-muted-foreground">Gambar Produk</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Performa tinggi dengan sistem hidrolik responsif dan daya angkat superior.
              </p>
              <Button className="w-full">Lihat Detail</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hitachi ZX200</CardTitle>
              <CardDescription>Excavator 20 Ton</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                <p className="text-muted-foreground">Gambar Produk</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Keandalan tinggi dengan teknologi canggih dan kenyamanan operator.
              </p>
              <Button className="w-full">Lihat Detail</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
