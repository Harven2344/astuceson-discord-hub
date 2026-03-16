import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Users, Calendar, TrendingUp, MessageCircle, Star, ArrowRight, Sparkles, Play } from "lucide-react";
import Layout from "@/components/Layout";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { Link } from "react-router-dom";

const features = [
  { icon: Zap, title: "Contenu Exclusif", desc: "Des vidéos TikTok que tu ne trouveras nulle part ailleurs.", color: "from-neon-cyan/20 to-neon-cyan/5", iconColor: "text-neon-cyan" },
  { icon: Users, title: "Communauté Active", desc: "Échange avec des milliers de membres passionnés.", color: "from-neon-pink/20 to-neon-pink/5", iconColor: "text-neon-pink" },
  { icon: Calendar, title: "Événements Réguliers", desc: "Giveaways, quiz et events chaque semaine.", color: "from-neon-green/20 to-neon-green/5", iconColor: "text-neon-green" },
  { icon: MessageCircle, title: "Échange Direct", desc: "Pose tes questions et échange directement.", color: "from-neon-purple/20 to-neon-purple/5", iconColor: "text-neon-purple" },
  { icon: Star, title: "Avant-Première", desc: "Accède au contenu réservé aux membres.", color: "from-neon-orange/20 to-neon-orange/5", iconColor: "text-neon-orange" },
  { icon: TrendingUp, title: "Toujours à Jour", desc: "Les dernières tendances dès leur sortie.", color: "from-neon-yellow/20 to-neon-yellow/5", iconColor: "text-neon-yellow" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  const { settings } = useSiteSettings();

  const stats = [
    { label: "Membres", value: settings.statsMembers, icon: Users, color: "text-neon-cyan" },
    { label: "Vidéos TikTok", value: settings.statsVideos, icon: TrendingUp, color: "text-neon-pink" },
    { label: "Contenus", value: settings.statsAstuces, icon: Zap, color: "text-neon-orange" },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-neon-cyan/8 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-neon-pink/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-sm text-neon-cyan mb-6"
          >
            <Sparkles className="h-4 w-4 animate-pulse-glow" /> Créateur TikTok
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-8xl font-black mb-6 leading-tight"
          >
            {settings.heroTitle.includes(settings.siteName) ? (
              <>
                {settings.heroTitle.split(settings.siteName)[0]}
                <span className="text-rainbow">{settings.siteName}</span>
                {settings.heroTitle.split(settings.siteName)[1]}
              </>
            ) : (
              <span className="text-rainbow">{settings.heroTitle}</span>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {settings.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord text-lg px-10 py-6 font-display font-bold hover:scale-105 transition-transform gap-2">
                🎮 Rejoindre le Discord <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <Link to="/galerie">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-display border-neon-pink/30 hover:bg-neon-pink/10 hover:border-neon-pink/60 gap-2">
                <Play className="h-5 w-5 text-neon-pink" /> Voir mes vidéos
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-neon-pink/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-8 hover:border-accent/30 transition-all"
              >
                <s.icon className={`mx-auto mb-3 h-8 w-8 ${s.color}`} />
                <div className="font-display text-5xl font-black text-gradient">{s.value}</div>
                <div className="text-muted-foreground mt-1 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-black text-center mb-14"
          >
            Pourquoi rejoindre <span className="text-gradient">{settings.siteName}</span> ?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="rounded-2xl border border-border/50 bg-card p-6 hover:border-accent/50 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`h-7 w-7 ${f.iconColor}`} />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "🛍 Boutique", desc: "Découvre le merch officiel", to: "/boutique", gradient: "from-neon-orange/10 to-neon-yellow/10", border: "border-neon-orange/20 hover:border-neon-orange/50" },
              { title: "📅 Événements", desc: "Ne manque aucun event", to: "/evenements", gradient: "from-neon-green/10 to-neon-cyan/10", border: "border-neon-green/20 hover:border-neon-green/50" },
              { title: "🎬 Galerie", desc: "Mes meilleurs contenus", to: "/galerie", gradient: "from-neon-pink/10 to-neon-purple/10", border: "border-neon-pink/20 hover:border-neon-pink/50" },
            ].map((item, i) => (
              <motion.div key={item.to} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={item.to} className={`block rounded-2xl border bg-gradient-to-br ${item.gradient} ${item.border} p-8 text-center transition-all hover:scale-[1.02]`}>
                  <h3 className="font-display text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 border border-neon-cyan/20 p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-neon-pink/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-cyan/10 rounded-full blur-3xl" />
            <h2 className="font-display text-3xl md:text-5xl font-black mb-4 relative">Prêt à rejoindre l'aventure ?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto relative">
              Des milliers de personnes font déjà partie de la communauté {settings.siteName}. N'attends plus !
            </p>
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer" className="relative">
              <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord font-display font-bold hover:scale-105 transition-transform text-lg px-10 py-6 gap-2">
                🚀 Rejoindre maintenant <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
