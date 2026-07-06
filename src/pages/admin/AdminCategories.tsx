import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, createCategory, updateCategory, deleteCategory, ApiCategory, CategoryInput } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Tahrirlash/qo'shish formasi holati
interface EditState {
  id: string | null;   // null bo'lsa — yangi kategoriya
  name: string;
  is_active: boolean;
}

const AdminCategories: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // --- Backenddan o'qish (GET) ---
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [edit, setEdit] = useState<EditState | null>(null);

  // --- Yangi kategoriya (POST) ---
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Qo'shildi", description: "Yangi kategoriya qo'shildi." });
      setEdit(null);
    },
    onError: (err: Error) => {
      toast({ title: "Xato", description: err.message, variant: "destructive" });
    },
  });

  // --- Tahrirlash (PATCH) ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryInput> }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Saqlandi", description: "O'zgarishlar saqlandi." });
      setEdit(null);
    },
    onError: (err: Error) => {
      toast({ title: "Xato", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
  mutationFn: deleteCategory,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    toast({ title: "O'chirildi", description: "Kategoriya o'chirildi." });
  },
  onError: (err: Error) => {
    toast({ title: "Xato", description: err.message, variant: "destructive" });
  },
});

  const openNew = () => setEdit({ id: null, name: "", is_active: true });
  const openEdit = (c: ApiCategory) => setEdit({ id: c._id, name: c.name, is_active: c.is_active });

  const handleSave = () => {
    if (!edit) return;
    if (!edit.name.trim()) {
      toast({ title: "Nom kerak", description: "Iltimos kategoriya nomini kiriting.", variant: "destructive" });
      return;
    }

    const payload: CategoryInput = { name: edit.name.trim(), is_active: edit.is_active };

    if (edit.id === null) {
      createMutation.mutate(payload);
    } else {
      updateMutation.mutate({ id: edit.id, data: payload });
    }
  };

  const handleDelete = (id: string) => {
  if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
    deleteMutation.mutate(id);
  }
};
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isNew = edit?.id === null;

  if (isLoading) {
    return <p className="text-muted-foreground p-6">Yuklanmoqda...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Jami: {categories.length} ta kategoriya</p>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" /> Kategoriya qo'shish
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomi</TableHead>
                <TableHead>Holati</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((c) => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant={c.is_active ? "default" : "secondary"} className="text-xs">
                      {c.is_active ? "Faol" : "Nofaol"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(c._id)}>
  <Trash2 className="h-4 w-4 text-destructive" />
</Button>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    Kategoriya yo'q. Yangisini qo'shing.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Add Dialog */}
      <Dialog open={!!edit} onOpenChange={(open) => { if (!open) setEdit(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isNew ? "Kategoriya qo'shish" : "Kategoriyani tahrirlash"}</DialogTitle>
          </DialogHeader>
          {edit && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Nomi</label>
                <Input
                  value={edit.name}
                  placeholder="Masalan: Salatlar"
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={edit.is_active}
                  onChange={(e) => setEdit({ ...edit, is_active: e.target.checked })}
                />
                Faol (saytda ko'rinsin)
              </label>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEdit(null)} disabled={isSaving}>
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

export default AdminCategories;
