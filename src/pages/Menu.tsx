import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Flame, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import PageSEO from "@/components/seo/PageSEO";
import { MenuCategory, MenuItem } from "@/data/menuData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getFoods } from "@/lib/api";

const categories: { key: MenuCategory; label: { en: string; uz: string; ru: string } }[] = [
  { key: "appetizers", label: { en: "Appetizers", uz: "Salatlar", ru: "Закуски" } },
  { key: "mains", label: { en: "Main Courses", uz: "Asosiy taomlar", ru: "Основные блюда" } },
  { key: "grill", label: { en: "From the Grill", uz: "Kaboblar", ru: "С мангала" } },
  { key: "tea", label: { en: "Tea & Sweets", uz: "Choy va shirinliklar", ru: "Чай и сладости" } },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ").format(price) + " сўм";
};

export default function Menu() {
  const { language } = useLanguage();
  const { data: menuItems = [], isLoading, isError } = useQuery({
  queryKey: ["foods"],
  queryFn: getFoods,
});
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("appetizers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return menuItems.filter(
        (item) =>
          item.name[language].toLowerCase().includes(q) ||
          item.description[language].toLowerCase().includes(q)
      );
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, searchQuery, language]);

  const searchLabel = { en: "Search dishes…", uz: "Taom qidirish…", ru: "Поиск блюд…" };
  const ingredientsLabel = { en: "Ingredients", uz: "Tarkibi", ru: "Ингредиенты" };
  const allergensLabel = { en: "Allergens", uz: "Allergenlar", ru: "Аллергены" };
  const specialLabel = { en: "Chef's Special", uz: "Oshpaz tanlovi", ru: "Выбор шефа" };
  if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground font-body">Yuklanmoqda...</p>
    </div>
  );
}

if (isError) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-destructive font-body">Xatolik yuz berdi. Qayta urinib ko'ring.</p>
    </div>
  );
}
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <PageSEO
        title="Menu"
        description="Explore the Bogi Zilol menu — authentic Uzbek appetizers, grilled meats, plov, and traditional tea ceremonies in Tashkent."
        path="/menu"
      />
      {/* Hero Banner */}
      <section className="relative bg-primary/5 py-16 mb-8">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent font-body text-sm tracking-[0.2em] uppercase mb-3"
          >
            {{ en: "Our Menu", uz: "Bizning menyu", ru: "Наше меню" }[language]}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-foreground mb-6"
          >
            {{ en: "Culinary Masterpieces", uz: "Oshpazlik durdonalari", ru: "Кулинарные шедевры" }[language]}
          </motion.h1>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchLabel[language]}
              className="pl-10 pr-10 bg-background/80 backdrop-blur border-border/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4">
        {/* Category Tabs */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-300
                  ${
                    activeCategory === cat.key
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50"
                  }
                `}
              >
                {cat.label[language]}
              </button>
            ))}
          </motion.div>
        )}

        {/* Search results label */}
        {searchQuery && (
          <p className="text-center text-muted-foreground mb-8 font-body">
            {filteredItems.length}{" "}
            {{ en: "results found", uz: "natija topildi", ru: "результатов" }[language]}
          </p>
        )}

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery || activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="group relative flex gap-4 p-4 rounded-xl bg-card border border-border/40 cursor-pointer
                           hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.isSpecial && (
                    <div className="absolute top-1.5 left-1.5">
                      <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 gap-1">
                        <Flame className="h-3 w-3" />
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
                      {item.name[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 font-body">
                      {item.description[language]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-heading text-lg text-accent font-semibold">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-body">
                      {{ en: "View details →", uz: "Batafsil →", ru: "Подробнее →" }[language]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-body">
            {{ en: "No dishes found", uz: "Taom topilmadi", ru: "Блюда не найдены" }[language]}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-background border-border">
          {selectedItem && (
            <>
              {/* Image */}
              <div className="relative w-full h-56 bg-secondary">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name[language]}
                  className="w-full h-full object-cover"
                />
                {selectedItem.isSpecial && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground gap-1.5">
                    <Flame className="h-3.5 w-3.5" />
                    {specialLabel[language]}
                  </Badge>
                )}
              </div>

              <div className="p-6 space-y-4">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-foreground">
                    {selectedItem.name[language]}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground font-body text-base mt-2">
                    {selectedItem.description[language]}
                  </DialogDescription>
                </DialogHeader>

                {/* Ingredients */}
                <div>
                  <h4 className="text-sm font-body font-semibold text-foreground mb-1">
                    {ingredientsLabel[language]}
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    {selectedItem.ingredients[language]}
                  </p>
                </div>

                {/* Allergens */}
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-body font-semibold text-foreground mb-0.5">
                      {allergensLabel[language]}
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">
                      {selectedItem.allergens[language]}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-2 border-t border-border">
                  <span className="font-heading text-2xl text-accent font-semibold">
                    {formatPrice(selectedItem.price)}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
