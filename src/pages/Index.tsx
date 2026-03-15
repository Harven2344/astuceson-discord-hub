import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Users, Calendar, TrendingUp, MessageCircle, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { useSiteSettings } from "@/contexts/SiteSettings";

const features = [
  { icon: Zap, title: "Contenu Exclusif", desc: "Des vidéos TikTok que tu ne trouveras nulle part ailleurs, du contenu original et authentique." },
  { icon: Users, title: "Communauté Active", desc: "Échange avec des milliers de membres passionnés sur Discord et les réseaux." },
  { icon: Calendar, title: "Événements Réguliers", desc: "Giveaways, quiz, et événements communautaires chaque semaine." },
  { icon: MessageCircle, title: "Échange Direct", desc: "Pose tes questions et échange directement avec la communauté et moi." },
  { icon: Star, title: "Contenu Avant-Première", desc: "Accède à du contenu exclusif réservé aux membres de la communauté." },
  { icon: TrendingUp, title: "Toujours à Jour", desc: "Les dernières tendances et nouveautés dès leur sortie." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  const { settings } = useSiteSettings();

  const stats = [
    { label: "Membres", value: settings.statsMembers, icon: Users },
    { label: "Vidéos TikTok", value: settings.statsVideos, icon: TrendingUp },
    { label: "Contenus partagés", value: settings.statsAstuces, icon: Zap },
  ];

  return (
    <Layout>
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-neon-pink/5" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-black mb-6"
          >
            {settings.heroTitle.includes(settings.siteName) ? (
              <>
                {settings.heroTitle.split(settings.siteName)[0]}
                <span className="text-gradient">{settings.siteName}</span>
                {settings.heroTitle.split(settings.siteName)[1]}
              </>
            ) : (
              <span className="text-gradient">{settings.heroTitle}</span>
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
          >
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord text-lg px-10 py-6 font-display font-bold hover:scale-105 transition-transform">
                🎮 Rejoindre le Discord
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <s.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                <div className="font-display text-4xl font-bold text-foreground">{s.value}</div>
                <div className="text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-14">
            Pourquoi rejoindre <span className="text-gradient">{settings.siteName}</span> ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-xl border border-border/50 bg-card p-6 hover:border-accent/50 transition-colors">
                <f.icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 border border-border/50 p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Prêt à rejoindre l'aventure ?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Des milliers de personnes font déjà partie de la communauté {settings.siteName}. N'attends plus !
            </p>
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord font-display font-bold hover:scale-105 transition-transform">
                🚀 Rejoindre maintenant
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
