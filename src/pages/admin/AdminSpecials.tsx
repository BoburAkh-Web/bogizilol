import React, { useState } from "react";
import { menuItems } from "@/data/menuData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSpecials: React.FC = () => {
  const [specials, setSpecials] = useState<Record<string, boolean>>(
    Object.fromEntries(menuItems.map((i) => [i.id, !!i.isSpecial]))
  );
  const { toast } = useToast();

  const toggleSpecial = (id: string) => {
    const willBeSpecial = !specials[id];
    setSpecials((prev) => ({ ...prev, [id]: !prev[id] }));
    const item = menuItems.find((i) => i.id === id);
    toast({
      title: willBeSpecial ? "Marked as Special" : "Removed from Specials",
      description: item?.name.en,
    });
  };

  const activeSpecials = menuItems.filter((i) => specials[i.id]);
  const formatPrice = (p: number) => new Intl.NumberFormat("uz-UZ").format(p) + " сўм";

  return (
    <div className="space-y-8">
      {/* Active specials */}
      <div>
        <h2 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-accent" /> Active Specials ({activeSpecials.length})
        </h2>
        {activeSpecials.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No active specials. Toggle items below.</CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSpecials.map((item) => (
              <Card key={item.id} className="border-accent/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {item.name.en}
                    <Badge className="bg-accent text-accent-foreground text-xs">Special</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description.en}</p>
                  <p className="text-sm font-semibold mt-2">{formatPrice(item.price)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* All items toggle list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manage Specials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {menuItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name.en}</p>
                <p className="text-xs text-muted-foreground capitalize">{item.category} · {formatPrice(item.price)}</p>
              </div>
              <Switch checked={!!specials[item.id]} onCheckedChange={() => toggleSpecial(item.id)} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSpecials;
