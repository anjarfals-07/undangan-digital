// app/test-ui/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Heart, Calendar, MapPin, Music } from "lucide-react";

export default function TestUIPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">UI Kit Test</h1>
        <p className="text-muted-foreground">
          Halaman untuk test komponen shadcn/ui (Base UI)
        </p>
      </div>

      <Separator />

      {/* ==================== BUTTONS ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <Separator />

      {/* ==================== FORM ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form</h2>
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Mempelai</Label>
            <Input id="name" placeholder="Masukkan nama..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Tanggal</Label>
            <Input id="date" type="date" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="mode" />
            <Label htmlFor="mode">Aktifkan musik</Label>
          </div>
        </div>
      </section>

      <Separator />

      {/* ==================== SELECT ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Select</h2>
        <div className="max-w-md">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih template adat..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jawa">Jawa Klasik</SelectItem>
              <SelectItem value="sunda">Sunda Mega Mendung</SelectItem>
              <SelectItem value="betawi">Betawi Ondel-ondel</SelectItem>
              <SelectItem value="batak">Batak Ulos</SelectItem>
              <SelectItem value="minang">Minang Songket</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Separator />

      {/* ==================== CARD ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Jawa</CardTitle>
              <CardDescription>Klasik Sogan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge>Wedding</Badge>
                <Badge variant="secondary">Adat</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Pilih Template</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Sunda</CardTitle>
              <CardDescription>Mega Mendung</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge>Wedding</Badge>
                <Badge variant="secondary">Adat</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Pilih Template</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Betawi</CardTitle>
              <CardDescription>Ondel-ondel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge>Wedding</Badge>
                <Badge variant="secondary">Adat</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Pilih Template</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ==================== TABS ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tabs</h2>
        <Tabs defaultValue="jawa" className="max-w-md">
          <TabsList>
            <TabsTrigger value="jawa">Jawa</TabsTrigger>
            <TabsTrigger value="sunda">Sunda</TabsTrigger>
            <TabsTrigger value="betawi">Betawi</TabsTrigger>
          </TabsList>
          <TabsContent value="jawa" className="p-4 border rounded-lg">
            <p>Template Jawa: Parang, Kawung, Gunungan, Wayang</p>
          </TabsContent>
          <TabsContent value="sunda" className="p-4 border rounded-lg">
            <p>Template Sunda: Mega Mendung, Kujang</p>
          </TabsContent>
          <TabsContent value="betawi" className="p-4 border rounded-lg">
            <p>Template Betawi: Ondel-ondel, Batik Betawi</p>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* ==================== AVATAR ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatar</h2>
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <Separator />

      {/* ==================== TOOLTIP ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tooltip</h2>
        <div className="flex gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Favoritkan template</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atur tanggal acara</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <MapPin className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atur lokasi</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Music className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pilih musik latar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <Separator />

      {/* ==================== DIALOG ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dialog</h2>
        <Dialog>
          <DialogTrigger>
            <Button>Buka Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Hapus</DialogTitle>
              <DialogDescription>
                Apakah kamu yakin ingin menghapus undangan ini? Tindakan ini
                tidak bisa dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline">Batal</Button>
              <Button variant="destructive">Hapus</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <Separator />

      {/* ==================== SKELETON ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Skeleton (Loading)</h2>
        <div className="space-y-2 max-w-md">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ==================== TOAST ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Toast</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast.success("Berhasil!", {
                description: "Undangan berhasil disimpan",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast.error("Gagal!", {
                description: "Terjadi kesalahan saat menyimpan",
              })
            }
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.info("Info", {
                description: "Ini notifikasi informasi",
              })
            }
          >
            Info
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.warning("Peringatan", {
                description: "Data belum lengkap",
              })
            }
          >
            Warning
          </Button>
        </div>
      </section>

      <Separator />

      {/* ==================== ICONS ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Lucide Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Heart className="h-6 w-6 text-red-500" />
          <Calendar className="h-6 w-6 text-blue-500" />
          <MapPin className="h-6 w-6 text-green-500" />
          <Music className="h-6 w-6 text-purple-500" />
        </div>
      </section>

      <Separator />

      {/* ==================== BADGES ==================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </div>
  );
}
