import React, { useState } from "react";
import { menuItems as initialItems, MenuItem, MenuCategory } from "@/data/menuData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories: { value: MenuCategory; label: string }[] = [
  { value: "appetizers", label: "Appetizers" },
  { value: "mains", label: "Mains" },
  { value: "grill", label: "Grill" },
  { value: "tea", label: "Tea Ceremony" },
];

const emptyItem = (): MenuItem => ({
  id: `new-${Date.now()}`,
  category: "appetizers",
  name: { en: "", uz: "", ru: "" },
  description: { en: "", uz: "", ru: "" },
  ingredients: { en: "", uz: "", ru: "" },
  allergens: { en: "", uz: "", ru: "" },
  price: 0,
  image: "/placeholder.svg",
});

const AdminMenuItems: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<MenuCategory | "all">("all");
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const filtered = items.filter((item) => {
    const matchSearch = item.name.en.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || item.category === filterCat;
    return matchSearch && matchCat;
  });

  const handleSave = () => {
    if (!editItem) return;
    if (!editItem.name.en.trim()) {
      toast({ title: "Name required", description: "Please enter a name in English.", variant: "destructive" });
      return;
    }
    if (isNew) {
      setItems((prev) => [...prev, editItem]);
      toast({ title: "Item added", description: `${editItem.name.en} has been added.` });
    } else {
      setItems((prev) => prev.map((i) => (i.id === editItem.id ? editItem : i)));
      toast({ title: "Item updated", description: `${editItem.name.en} has been updated.` });
    }
    setEditItem(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Item deleted", description: `${item?.name.en} has been removed.` });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("uz-UZ").format(price) + " сўм";

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center flex-1 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as MenuCategory | "all")}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <Button onClick={() => { setEditItem(emptyItem()); setIsNew(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Item
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Special</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name.en}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize text-xs">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.isSpecial && <Badge className="bg-accent text-accent-foreground text-xs">Special</Badge>}
                  </TableCell>
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
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No items found.</TableCell>
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
            <DialogTitle>{isNew ? "Add Menu Item" : "Edit Menu Item"}</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground">Name (EN)</label>
                  <Input value={editItem.name.en} onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name, en: e.target.value } })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Name (UZ)</label>
                  <Input value={editItem.name.uz} onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name, uz: e.target.value } })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Name (RU)</label>
                  <Input value={editItem.name.ru} onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name, ru: e.target.value } })} />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Description (EN)</label>
                <Input value={editItem.description.en} onChange={(e) => setEditItem({ ...editItem, description: { ...editItem.description, en: e.target.value } })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Category</label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={editItem.category}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value as MenuCategory })}
                  >
                    {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Price (сўм)</label>
                  <Input type="number" value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Ingredients (EN)</label>
                <Input value={editItem.ingredients.en} onChange={(e) => setEditItem({ ...editItem, ingredients: { ...editItem.ingredients, en: e.target.value } })} />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Allergens (EN)</label>
                <Input value={editItem.allergens.en} onChange={(e) => setEditItem({ ...editItem, allergens: { ...editItem.allergens, en: e.target.value } })} />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!editItem.isSpecial}
                  onChange={(e) => setEditItem({ ...editItem, isSpecial: e.target.checked })}
                  className="rounded border-input"
                />
                <label className="text-sm">Chef's Special</label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditItem(null); setIsNew(false); }}>Cancel</Button>
            <Button onClick={handleSave}>{isNew ? "Add Item" : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMenuItems;
