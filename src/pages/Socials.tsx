import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { ExternalLink } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettings";

export default function Socials() {
  const { settings } = useSiteSettings();

  const socials = [
    { name: "TikTok", emoji: "🎵", color: "from-neon-pink/20 to-neon-cyan/20", url: settings.tiktokLink, desc: "Mes vidéos d'astuces quotidiennes" },
    { name: "Instagram", emoji: "📸", color: "from-neon-pink/20 to-neon-pink/5", url: settings.instagramLink, desc: "Behind the scenes et stories" },
    { name: "YouTube", emoji: "🎬", color: "from-destructive/20 to-destructive/5", url: settings.youtubeLink, desc: "Vidéos longues et tutoriels détaillés" },
    { name: "Twitter / X", emoji: "🐦", color: "from-primary/20 to-primary/5", url: settings.twitterLink, desc: "Actualités et réactions en direct" },
    { name: "Discord", emoji: "🎮", color: "from-discord/20 to-discord/5", url: settings.discordLink, desc: "La communauté Astuceson" },
    { name: "Snapchat", emoji: "👻", color: "from-accent/20 to-accent/5", url: settings.snapchatLink, desc: "Contenu exclusif et snaps quotidiens" },
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
            Mes <span className="text-gradient">Réseaux</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            Retrouve-moi sur toutes les plateformes et ne rate aucune astuce !
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socials.map((s, i) => (
              <motion.a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="group rounded-xl border border-border/50 bg-card p-6 hover:border-accent/50 transition-all hover:scale-[1.02]">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4`}>{s.emoji}</div>
                <h3 className="font-display font-semibold text-lg mb-1 flex items-center gap-2">
                  {s.name}
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
