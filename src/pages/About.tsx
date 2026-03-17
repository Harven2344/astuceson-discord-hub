import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Heart, Target, Sparkles, Flame, Trophy, Users } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettings";

const milestones = [
  { year: "2024", title: "Début sur TikTok", desc: "Première vidéo postée. Le début d'une aventure.", emoji: "🎬" },
  { year: "2024", title: "10K abonnés", desc: "Un cap symbolique franchi en quelques mois.", emoji: "🎉" },
  { year: "2025", title: "100K abonnés", desc: "La communauté explose. Les collabs arrivent.", emoji: "🚀" },
  { year: "2025", title: "Lancement Discord", desc: "Un espace pour la communauté. Plusieurs milliers de membres.", emoji: "🎮" },
  { year: "2026", title: "Et maintenant...", desc: "L'aventure continue. Toujours plus grand, toujours plus fort.", emoji: "⚡" },
];

export default function About() {
  const { settings } = useSiteSettings();

  return (
    <Layout>
      {/* Hero — Big typography */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-neon-cyan/8 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-neon-pink/8 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "4s" }} />
        <div className="container mx-auto px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl md:text-9xl font-black leading-[0.85] mb-8"
          >
            C'est qui<br />
            <span className="text-rainbow">{settings.siteName}</span>
            <span className="text-muted-foreground/30"> ?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg"
          >
            Créateur de contenu sur TikTok. Passionné par le partage,
            la créativité et la communauté.
          </motion.p>
        </div>
      </section>

      {/* Identity cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Heart, title: "Passion", text: "Chaque vidéo est créée avec amour et recherche.", color: "text-neon-pink", bg: "from-neon-pink/15 to-neon-pink/5", border: "border-neon-pink/30" },
              { icon: Target, title: "Mission", text: "Divertir, inspirer et rassembler ma communauté.", color: "text-neon-cyan", bg: "from-neon-cyan/15 to-neon-cyan/5", border: "border-neon-cyan/30" },
              { icon: Sparkles, title: "Communauté", text: "Un espace bienveillant où chacun est le bienvenu.", color: "text-neon-yellow", bg: "from-neon-yellow/15 to-neon-yellow/5", border: "border-neon-yellow/30" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring" }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`rounded-3xl border ${item.border} bg-gradient-to-b ${item.bg} p-8 text-center group cursor-default`}
              >
                <item.icon className={`mx-auto mb-4 h-10 w-10 ${item.color} group-hover:scale-125 transition-transform duration-300`} />
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-black mb-14"
          >
            Le <span className="text-gradient">parcours</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-2 w-5 h-5 rounded-full bg-card border-2 border-neon-cyan flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  </div>
                  <span className="text-xs text-neon-cyan font-bold">{m.year}</span>
                  <h3 className="font-display text-xl font-bold mt-1 flex items-center gap-2">
                    <span>{m.emoji}</span> {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, value: "10K+", label: "Membres", color: "text-neon-cyan" },
              { icon: Flame, value: "500+", label: "Vidéos", color: "text-neon-pink" },
              { icon: Trophy, value: "50+", label: "Collabs", color: "text-neon-yellow" },
              { icon: Heart, value: "∞", label: "Passion", color: "text-neon-green" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="rounded-2xl border border-border/50 bg-card p-6 text-center cursor-default"
              >
                <s.icon className={`mx-auto mb-2 h-7 w-7 ${s.color}`} />
                <div className="font-display text-3xl font-black text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
