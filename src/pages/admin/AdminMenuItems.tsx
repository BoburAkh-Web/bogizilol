import React, { useState } from "react";
import { MenuItem } from "@/data/menuData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFoods, getCategories, createFood, updateFood, deleteFood, FoodInput } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Bo'sh taom shabloni (yangi qo'shishda)
const emptyItem = (): MenuItem => ({
  id: `new-${Date.now()}`,
  category: "mains",      // eski maydon — tip talab qiladi, endi ishlatilmaydi
  categoryId: "",
  name: { en: "", uz: "", ru: "" },
  description: { en: "", uz: "", ru: "" },
  ingredients: { en: "", uz: "", ru: "" },
  allergens: { en: "", uz: "", ru: "" },
  price: 0,
  image: "",
});

const AdminMenuItems: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // --- Backenddan o'qish (GET) ---
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  // categoryId -> kategoriya nomi (jadvalda ko'rsatish uchun)
  const categoryName = (id?: string) =>
    categories.find((c) => c._id === id)?.name ?? "—";

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      item.name.en.toLowerCase().includes(q) || item.name.uz.toLowerCase().includes(q);
    const matchCat = filterCat === "all" || item.categoryId === filterCat;
    return matchSearch && matchCat;
  });

  // --- Yangi taom qo'shish (POST) ---
  const createMutation = useMutation({
    mutationFn: createFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      toast({ title: "Qo'shildi", description: "Yangi taom qo'shildi." });
      setEditItem(null);
      setIsNew(false);
    },
    onError: (err: Error) => {
      toast({ title: "Xato", description: err.message, variant: "destructive" });
    },
  });

  // --- Taomni tahrirlash (PATCH) ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FoodInput> }) =>
      updateFood(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      toast({ title: "Saqlandi", description: "O'zgarishlar saqlandi." });
      setEditItem(null);
      setIsNew(false);
    },
    onError: (err: Error) => {
      toast({ title: "Xato", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
  mutationFn: deleteFood,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["foods"] });
    toast({ title: "O'chirildi", description: "Taom o'chirildi." });
  },
  onError: (err: Error) => {
    toast({ title: "Xato", description: err.message, variant: "destructive" });
  },
});

  const handleSave = () => {
    if (!editItem) return;

    if (!editItem.categoryId) {
      toast({ title: "Kategoriya kerak", description: "Iltimos kategoriya tanlang.", variant: "destructive" });
      return;
    }
    if (!editItem.name.uz.trim()) {
      toast({ title: "Nom kerak", description: "Iltimos taom nomini kiriting.", variant: "destructive" });
      return;
    }

    // Frontend MenuItem -> backend FoodInput shakliga o'giramiz
    const payload: FoodInput = {
      category_id: editItem.categoryId,
      name: editItem.name.uz,
      description: editItem.description.uz,
      price: editItem.price,
      is_available: true,
      image: editItem.image || "https://via.placeholder.com/300",
    };

    if (isNew) {
      createMutation.mutate(payload);
    } else {
      updateMutation.mutate({ id: editItem.id, data: payload });
    }
  };

const handleDelete = (id: string) => {
  if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
    deleteMutation.mutate(id);
  }
};
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("uz-UZ").format(price) + " сўм";

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return <p className="text-muted-foreground p-6">Yuklanmoqda...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center flex-1 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="all">Barcha kategoriyalar</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <Button onClick={() => { setEditItem(emptyItem()); setIsNew(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Taom qo'shish
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomi</TableHead>
                <TableHead>Kategoriya</TableHead>
                <TableHead>Narx</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name.uz}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{categoryName(item.categoryId)}</Badge>
                  </TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditItem({ ...item }); setIsNew(false); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
  <Trash2 className="h-4 w-4 text-destructive" />
</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Taom topilmadi.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Add Dialog */}
      <Dialog open={!!editItem} onOpenChange={(open) => { if (!open) { setEditItem(null); setIsNew(false); } }}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Taom qo'shish" : "Taomni tahrirlash"}</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Nomi</label>
                <Input
                  value={editItem.name.uz}
                  onChange={(e) => setEditItem({
                    ...editItem,
                    name: { en: e.target.value, uz: e.target.value, ru: e.target.value },
                  })}
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Tavsif</label>
                <Input
                  value={editItem.description.uz}
                  onChange={(e) => setEditItem({
                    ...editItem,
                    description: { en: e.target.value, uz: e.target.value, ru: e.target.value },
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Kategoriya</label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={editItem.categoryId ?? ""}
                    onChange={(e) => setEditItem({ ...editItem, categoryId: e.target.value })}
                  >
                    <option value="">Kategoriya tanlang</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Narx (сўм)</label>
                  <Input
                    type="number"
                    value={editItem.price}
                    onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Rasm URL</label>
                <Input
                  value={editItem.image}
                  placeholder="https://..."
                  onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditItem(null); setIsNew(false); }} disabled={isSaving}>
              Bekor qilish
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saqlanmoqda..." : isNew ? "Qo'shish" : "Saqlash"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMenuItems;
