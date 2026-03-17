import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Play, Star, Film, ExternalLink } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  platform: string;
  featured: boolean;
  created_at: string;
}

const defaultItems: PortfolioItem[] = [
  { id: "1", title: "Vidéo virale — 2M vues", description: "Ma vidéo la plus populaire qui a explosé en 24h", video_url: "#", thumbnail_url: "", platform: "tiktok", featured: true, created_at: "2026-03-01" },
  { id: "2", title: "Collab avec @TechGuru", description: "Une collaboration épique sur les tendances tech", video_url: "#", thumbnail_url: "", platform: "tiktok", featured: true, created_at: "2026-02-15" },
  { id: "3", title: "Live 10K spectateurs", description: "Mon premier live à dépasser les 10K viewers", video_url: "#", thumbnail_url: "", platform: "tiktok", featured: false, created_at: "2026-02-01" },
  { id: "4", title: "Série TikTok du mois", description: "La série complète de vidéos qui a cartonné", video_url: "#", thumbnail_url: "", platform: "tiktok", featured: false, created_at: "2026-01-20" },
  { id: "5", title: "Behind the scenes", description: "Comment je crée mes vidéos au quotidien", video_url: "#", thumbnail_url: "", platform: "youtube", featured: false, created_at: "2026-01-10" },
  { id: "6", title: "Best Of 2025", description: "Compilation des meilleurs moments de l'année", video_url: "#", thumbnail_url: "", platform: "youtube", featured: true, created_at: "2025-12-31" },
];

const platformColors: Record<string, string> = {
  tiktok: "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
  youtube: "bg-destructive/20 text-destructive border-destructive/30",
  instagram: "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
};

export default function Gallery() {
  const [items, setItems] = useState<PortfolioItem[]>(defaultItems);

  useEffect(() => {
    supabase.from("portfolio_items").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setItems(data);
    });
  }, []);

  const featured = items.filter(i => i.featured);
  const rest = items.filter(i => !i.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="absolute top-10 right-20 w-80 h-80 bg-neon-pink/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-neon-purple/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "4s" }} />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-pink/30 bg-neon-pink/10 px-5 py-2.5 text-sm text-neon-pink mb-8"
          >
            <Film className="h-4 w-4" /> Portfolio
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-6xl md:text-8xl font-black mb-4 leading-[0.9]"
          >
            Ma <span className="text-gradient-purple">Galerie</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Mes meilleurs contenus, collaborations et moments marquants.
          </motion.p>
        </div>
      </section>

      {/* Featured — Big cards */}
      {featured.length > 0 && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
              <Star className="h-6 w-6 text-neon-yellow" /> À la une
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.video_url !== "#" ? item.video_url : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.04, y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="group rounded-3xl border-2 border-neon-pink/30 bg-card overflow-hidden cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center relative">
                    {item.thumbnail_url ? (
                      <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <Play className="h-14 w-14 text-neon-pink opacity-30 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded-full border ${platformColors[item.platform] || "bg-muted text-muted-foreground"}`}>
                        {item.platform}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <ExternalLink className="absolute bottom-3 right-3 h-5 w-5 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All content */}
      <section className="py-10 pb-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
            <Play className="h-6 w-6 text-neon-cyan" /> Tous les contenus
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.video_url !== "#" ? item.video_url : undefined}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group rounded-2xl border border-border/50 bg-card p-5 hover:border-neon-cyan/40 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border mb-1 inline-block ${platformColors[item.platform] || "bg-muted text-muted-foreground"}`}>
                      {item.platform}
                    </span>
                    <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
