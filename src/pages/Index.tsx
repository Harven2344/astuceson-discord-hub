import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Users, Calendar, TrendingUp, MessageCircle, Star, ArrowRight, Sparkles, Play, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { Link } from "react-router-dom";
import { useRef } from "react";

const features = [
  { icon: Zap, title: "Contenu Exclusif", desc: "Des vidéos TikTok que tu ne trouveras nulle part ailleurs.", color: "from-neon-cyan/20 to-neon-cyan/5", iconColor: "text-neon-cyan", glow: "glow-cyan" },
  { icon: Users, title: "Communauté Active", desc: "Échange avec des milliers de membres passionnés.", color: "from-neon-pink/20 to-neon-pink/5", iconColor: "text-neon-pink", glow: "glow-pink" },
  { icon: Calendar, title: "Événements Réguliers", desc: "Giveaways, quiz et events chaque semaine.", color: "from-neon-green/20 to-neon-green/5", iconColor: "text-neon-green", glow: "" },
  { icon: MessageCircle, title: "Échange Direct", desc: "Pose tes questions et échange directement.", color: "from-neon-purple/20 to-neon-purple/5", iconColor: "text-neon-purple", glow: "glow-purple" },
  { icon: Star, title: "Avant-Première", desc: "Accède au contenu réservé aux membres.", color: "from-neon-orange/20 to-neon-orange/5", iconColor: "text-neon-orange", glow: "glow-orange" },
  { icon: TrendingUp, title: "Toujours à Jour", desc: "Les dernières tendances dès leur sortie.", color: "from-neon-yellow/20 to-neon-yellow/5", iconColor: "text-neon-yellow", glow: "" },
];

const marqueeWords = ["TIKTOK", "•", "DISCORD", "•", "COMMUNAUTÉ", "•", "CRÉATIVITÉ", "•", "CONTENU", "•", "VIRAL", "•", "GAMING", "•", "FUN", "•"];

export default function Index() {
  const { settings } = useSiteSettings();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);

  const stats = [
    { label: "Membres", value: settings.statsMembers, icon: Users, color: "text-neon-cyan", border: "border-neon-cyan/30", bg: "from-neon-cyan/10 to-transparent" },
    { label: "Vidéos TikTok", value: settings.statsVideos, icon: TrendingUp, color: "text-neon-pink", border: "border-neon-pink/30", bg: "from-neon-pink/10 to-transparent" },
    { label: "Contenus", value: settings.statsAstuces, icon: Zap, color: "text-neon-orange", border: "border-neon-orange/30", bg: "from-neon-orange/10 to-transparent" },
  ];

  return (
    <Layout>
      {/* HERO — Full viewport immersive */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-neon-cyan/8 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-neon-pink/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "3s" }} />
          <div className="absolute top-[40%] left-[50%] w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px] animate-blob" style={{ animationDelay: "5s" }} />
        </div>

        {/* Orbiting elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          {["🎬", "🎵", "🎮", "⚡", "🔥", "✨"].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 text-2xl md:text-3xl"
              style={{ originX: 0, originY: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15 + i * 3, repeat: Infinity, ease: "linear" }}
            >
              <motion.span
                className="block"
                style={{ transform: `translateX(${100 + i * 30}px) translateY(-50%)` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15 + i * 3, repeat: Infinity, ease: "linear" }}
              >
                {emoji}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-5 py-2.5 text-sm text-neon-cyan mb-8"
          >
            <Sparkles className="h-4 w-4 animate-pulse-glow" /> Créateur TikTok
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-6xl sm:text-7xl md:text-9xl font-black mb-6 leading-[0.9] tracking-tight"
          >
            {settings.heroTitle.includes(settings.siteName) ? (
              <>
                {settings.heroTitle.split(settings.siteName)[0]}
                <br className="hidden md:block" />
                <span className="text-rainbow">{settings.siteName}</span>
                {settings.heroTitle.split(settings.siteName)[1]}
              </>
            ) : (
              <span className="text-rainbow">{settings.heroTitle}</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord text-lg px-10 py-7 font-display font-bold hover:scale-110 transition-all duration-300 gap-2 rounded-2xl">
                🎮 Rejoindre le Discord <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <Link to="/galerie">
              <Button size="lg" variant="outline" className="text-lg px-8 py-7 font-display border-neon-pink/30 hover:bg-neon-pink/10 hover:border-neon-pink/60 gap-2 rounded-2xl hover:scale-105 transition-all duration-300">
                <Play className="h-5 w-5 text-neon-pink" /> Voir mes vidéos
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {settings.showMarquee && (
      <section className="py-6 border-y border-border/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="marquee">
          <div className="marquee-track">
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="mx-6 font-display text-2xl md:text-4xl font-black text-muted-foreground/20 whitespace-nowrap select-none">
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>
      )}

      {settings.showHeroStats && (
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className={`relative rounded-3xl border ${s.border} bg-gradient-to-b ${s.bg} backdrop-blur p-8 md:p-10 text-center group overflow-hidden cursor-default`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${s.bg}`} />
                <s.icon className={`mx-auto mb-4 h-10 w-10 ${s.color} relative z-10 group-hover:scale-125 transition-transform duration-300`} />
                <div className="font-display text-5xl md:text-6xl font-black text-gradient relative z-10">{s.value}</div>
                <div className="text-muted-foreground mt-2 font-medium relative z-10">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      )}

      {/* FEATURES — Staggered asymmetric layout */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl md:text-7xl font-black leading-tight">
              Pourquoi<br />
              <span className="text-gradient">rejoindre</span> ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05, y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`rounded-3xl border border-border/50 bg-card/80 backdrop-blur p-7 hover:border-accent/50 transition-all group cursor-default ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""} ${i === 3 ? "md:row-span-1" : ""}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <f.icon className={`h-8 w-8 ${f.iconColor}`} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS — Diagonal section */}
      <section className="py-28 relative">
        <div className="absolute inset-0 skew-section bg-gradient-to-br from-neon-cyan/5 via-neon-purple/5 to-neon-pink/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-black mb-10"
          >
            Explorer <span className="text-gradient-purple">→</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Événements", emoji: "📅", desc: "Ne manque aucun event", to: "/evenements", gradient: "from-neon-green/15 to-neon-cyan/15", border: "border-neon-green/20 hover:border-neon-green/60" },
              { title: "Galerie", emoji: "🎬", desc: "Mes meilleurs contenus", to: "/galerie", gradient: "from-neon-pink/15 to-neon-purple/15", border: "border-neon-pink/20 hover:border-neon-pink/60" },
              { title: "Partenariats", emoji: "🤝", desc: "Nos collaborations", to: "/partenariats", gradient: "from-neon-orange/15 to-neon-yellow/15", border: "border-neon-orange/20 hover:border-neon-orange/60" },
            ].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring" }}
                whileHover={{ scale: 1.04, y: -6 }}
              >
                <Link to={item.to} className={`block rounded-3xl border bg-gradient-to-br ${item.gradient} ${item.border} p-10 transition-all group`}>
                  <span className="text-5xl block mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">{item.emoji}</span>
                  <h3 className="font-display text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  <ArrowRight className="h-5 w-5 mt-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-2 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Big dramatic section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] bg-gradient-to-br from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 border border-neon-cyan/20 p-10 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-neon-pink/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-neon-cyan/10 rounded-full blur-[100px]" />
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-7xl mb-6"
            >
              🚀
            </motion.div>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-5 relative">
              Prêt à rejoindre<br />l'aventure ?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto relative text-lg">
              Des milliers de personnes font déjà partie de la communauté {settings.siteName}. N'attends plus !
            </p>
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer" className="relative">
              <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord font-display font-bold hover:scale-110 transition-all duration-300 text-lg px-12 py-7 gap-2 rounded-2xl">
                🚀 Rejoindre maintenant <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
