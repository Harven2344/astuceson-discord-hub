import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettings";

export default function Socials() {
  const { settings } = useSiteSettings();

  const socials = [
    { name: "TikTok", emoji: "🎵", color: "border-neon-pink/40 hover:border-neon-pink", bg: "from-neon-pink/15 to-neon-pink/5", url: settings.tiktokLink, desc: "Mes vidéos quotidiennes", followers: "10K+" },
    { name: "Instagram", emoji: "📸", color: "border-neon-purple/40 hover:border-neon-purple", bg: "from-neon-purple/15 to-neon-purple/5", url: settings.instagramLink, desc: "Behind the scenes", followers: "5K+" },
    { name: "YouTube", emoji: "🎬", color: "border-destructive/40 hover:border-destructive", bg: "from-destructive/15 to-destructive/5", url: settings.youtubeLink, desc: "Vidéos longues et vlogs", followers: "2K+" },
    { name: "Twitter / X", emoji: "🐦", color: "border-primary/40 hover:border-primary", bg: "from-primary/15 to-primary/5", url: settings.twitterLink, desc: "Réactions en direct", followers: "3K+" },
    { name: "Discord", emoji: "🎮", color: "border-discord/40 hover:border-discord", bg: "from-discord/15 to-discord/5", url: settings.discordLink, desc: "La communauté", followers: "10K+" },
    { name: "Snapchat", emoji: "👻", color: "border-neon-yellow/40 hover:border-neon-yellow", bg: "from-neon-yellow/15 to-neon-yellow/5", url: settings.snapchatLink, desc: "Snaps exclusifs", followers: "—" },
  ];

  return (
    <Layout>
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-[100px] animate-blob" />
        <div className="container mx-auto px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-8xl font-black mb-4 leading-[0.9]"
          >
            Mes <span className="text-gradient">Réseaux</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Retrouve-moi partout et ne rate rien !
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {socials.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring" }}
                whileHover={{ scale: 1.04, y: -6 }}
                className={`group rounded-3xl border-2 ${s.color} bg-gradient-to-br ${s.bg} p-7 transition-all relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-4xl block mb-3 group-hover:scale-125 transition-transform duration-300 inline-block">{s.emoji}</span>
                    <h3 className="font-display font-bold text-xl mb-1">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                    <p className="text-xs font-bold text-gradient mt-2">{s.followers} followers</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
