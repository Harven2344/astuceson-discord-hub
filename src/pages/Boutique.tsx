import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Crown, ArrowRight, Sparkles, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/contexts/SiteSettings";

interface BoutiqueItem {
  id: string;
  name: string;
  description: string;
  price: string;
  emoji: string;
  image_url: string;
  category: string;
  status: string;
  link_url: string;
  featured: boolean;
  sort_order: number;
}

const defaultItems: BoutiqueItem[] = [
  { id: "1", name: "T-Shirt Astuceson", description: "Le tee officiel de la communauté", price: "29,99€", emoji: "👕", image_url: "", category: "merch", status: "coming_soon", link_url: "", featured: true, sort_order: 0 },
  { id: "2", name: "Hoodie Premium", description: "Ultra confortable et stylé", price: "49,99€", emoji: "🧥", image_url: "", category: "merch", status: "coming_soon", link_url: "", featured: true, sort_order: 1 },
  { id: "3", name: "Casquette Snapback", description: "Pour les vrais", price: "24,99€", emoji: "🧢", image_url: "", category: "accessoire", status: "coming_soon", link_url: "", featured: false, sort_order: 2 },
  { id: "4", name: "Stickers Pack", description: "20 stickers collector", price: "9,99€", emoji: "✨", image_url: "", category: "accessoire", status: "coming_soon", link_url: "", featured: false, sort_order: 3 },
  { id: "5", name: "Mug Collector", description: "Édition limitée", price: "14,99€", emoji: "☕", image_url: "", category: "collector", status: "coming_soon", link_url: "", featured: false, sort_order: 4 },
  { id: "6", name: "Phone Case", description: "Protection + style", price: "19,99€", emoji: "📱", image_url: "", category: "accessoire", status: "coming_soon", link_url: "", featured: false, sort_order: 5 },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  available: { label: "En vente 🔥", class: "bg-neon-green/10 text-neon-green border-neon-green/30" },
  coming_soon: { label: "Bientôt", class: "bg-neon-orange/10 text-neon-orange border-neon-orange/30" },
  sold_out: { label: "Épuisé", class: "bg-destructive/10 text-destructive border-destructive/30" },
};

const categoryColors: Record<string, string> = {
  merch: "border-neon-pink/30 hover:border-neon-pink/60",
  accessoire: "border-neon-cyan/30 hover:border-neon-cyan/60",
  digital: "border-neon-purple/30 hover:border-neon-purple/60",
  collector: "border-neon-yellow/30 hover:border-neon-yellow/60",
};

export default function Boutique() {
  const [items, setItems] = useState<BoutiqueItem[]>(defaultItems);
  const { settings } = useSiteSettings();

  useEffect(() => {
    supabase.from("boutique_items").select("*").eq("active", true).order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setItems(data as BoutiqueItem[]);
    });
  }, []);

  const featured = items.filter(i => i.featured);
  const rest = items.filter(i => !i.featured);

  return (
    <Layout>
      {/* Hero with marquee */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-orange/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-orange/30 bg-neon-orange/10 px-5 py-2.5 text-sm text-neon-orange mb-8"
          >
            <ShoppingBag className="h-4 w-4" /> Boutique officielle
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-black mb-6 leading-[0.9]"
          >
            Le <span className="text-gradient-fire">Merch</span>
            <br />
            <span className="text-muted-foreground/30 text-4xl md:text-5xl">Astuceson</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md mx-auto"
          >
            Représente la communauté avec style !
          </motion.p>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-4 border-y border-border/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="marquee">
          <div className="marquee-track">
            {[...Array(3)].flatMap(() => ["MERCH", "•", "EXCLUSIF", "•", "COLLECTOR", "•", "STYLE", "•"]).map((w, i) => (
              <span key={i} className="mx-4 font-display text-xl font-black text-muted-foreground/15 whitespace-nowrap select-none">{w}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold mb-8 flex items-center gap-3"
            >
              <Sparkles className="h-7 w-7 text-neon-yellow" /> À la une
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((item, i) => {
                const s = statusConfig[item.status] || statusConfig.coming_soon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className={`rounded-3xl border-2 ${categoryColors[item.category] || "border-border/50"} bg-card p-8 transition-all group relative overflow-hidden`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-purple" />
                    <div className="flex items-start gap-6">
                      <div className="text-6xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{item.emoji}</div>
                      <div className="flex-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border inline-block mb-2 ${s.class}`}>{s.label}</span>
                        <h3 className="font-display text-2xl font-bold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <p className="text-3xl font-display font-black text-gradient">{item.price}</p>
                      </div>
                    </div>
                    {item.link_url && item.status === "available" && (
                      <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="mt-4 block">
                        <Button className="w-full bg-neon-orange hover:bg-neon-orange/80 gap-2">Acheter <ArrowRight className="h-4 w-4" /></Button>
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All products */}
      <section className="py-16 pb-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-bold mb-8 flex items-center gap-3"
          >
            <Tag className="h-6 w-6 text-neon-cyan" /> Tous les produits
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((item, i) => {
              const s = statusConfig[item.status] || statusConfig.coming_soon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.04, y: -5, rotate: i % 2 === 0 ? 1 : -1 }}
                  className={`group rounded-2xl border ${categoryColors[item.category] || "border-border/50"} bg-card p-6 transition-all`}
                >
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{item.emoji}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border inline-block mb-2 ${s.class}`}>{s.label}</span>
                  <h3 className="font-display text-lg font-bold mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                  <p className="text-2xl font-display font-black text-gradient">{item.price}</p>
                  {item.link_url && item.status === "available" && (
                    <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="mt-3 block">
                      <Button size="sm" className="w-full bg-neon-orange hover:bg-neon-orange/80 gap-1 text-xs">Acheter <ArrowRight className="h-3 w-3" /></Button>
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-gradient-to-r from-neon-orange/10 via-neon-pink/10 to-neon-purple/10 border border-neon-orange/20 p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-purple" />
            <Crown className="h-14 w-14 text-neon-orange mx-auto mb-5 animate-float" />
            <h2 className="font-display text-3xl md:text-5xl font-black mb-4">
              Bientôt en <span className="text-gradient-fire">vente</span> !
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Rejoins le Discord pour être notifié dès l'ouverture et profiter de réductions exclusives !
            </p>
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord font-display font-bold gap-2 hover:scale-110 transition-all duration-300 rounded-2xl px-10 py-7">
                🎮 Rejoindre le Discord <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
