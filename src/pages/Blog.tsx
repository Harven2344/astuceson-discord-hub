import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const articles = [
  {
    title: "🎉 Lancement du serveur Discord Astuceson !",
    date: "12 Mars 2026",
    excerpt: "Après des mois de préparation, le serveur Discord Astuceson est enfin en ligne ! Rejoins des milliers de membres passionnés...",
  },
  {
    title: "🔥 Top 10 des astuces les plus populaires de février",
    date: "1 Mars 2026",
    excerpt: "Découvre les astuces qui ont fait le buzz ce mois-ci sur TikTok. Du gain de temps au quotidien à des hacks tech incroyables...",
  },
  {
    title: "🤝 Nouveau partenariat avec TechDeal",
    date: "20 Février 2026",
    excerpt: "Astuceson s'associe avec TechDeal pour vous proposer des réductions exclusives sur les meilleurs produits tech...",
  },
  {
    title: "📱 Comment j'ai atteint 100K sur TikTok",
    date: "5 Février 2026",
    excerpt: "Mon parcours de 0 à 100K abonnés : les stratégies, les erreurs et les leçons apprises en cours de route...",
  },
  {
    title: "🎁 Grand Giveaway de Noël — Les résultats !",
    date: "26 Décembre 2025",
    excerpt: "Merci à tous les participants du giveaway ! Découvrez les heureux gagnants et les lots distribués...",
  },
];

export default function Blog() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Blog & <span className="text-gradient">Actualités</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-12"
          >
            Les dernières nouvelles de la communauté Astuceson.
          </motion.p>

          <div className="flex flex-col gap-6">
            {articles.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded-xl border border-border/50 bg-card p-6 hover:border-accent/50 transition-colors cursor-pointer"
              >
                <span className="text-xs text-muted-foreground">{a.date}</span>
                <h2 className="font-display text-xl font-semibold mt-1 mb-2">{a.title}</h2>
                <p className="text-sm text-muted-foreground">{a.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
