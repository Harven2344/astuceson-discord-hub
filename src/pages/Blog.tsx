import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  emoji: string;
  created_at: string;
}

const defaultArticles: BlogPost[] = [
  { id: "1", title: "Lancement du serveur Discord Astuceson !", excerpt: "Après des mois de préparation, le serveur Discord Astuceson est enfin en ligne !", emoji: "🎉", created_at: "2026-03-12" },
  { id: "2", title: "Top 10 des vidéos les plus populaires de février", excerpt: "Découvre les vidéos qui ont fait le buzz ce mois-ci sur TikTok.", emoji: "🔥", created_at: "2026-03-01" },
  { id: "3", title: "Nouveau partenariat avec TechDeal", excerpt: "Astuceson s'associe avec TechDeal pour des réductions exclusives.", emoji: "🤝", created_at: "2026-02-20" },
  { id: "4", title: "Comment j'ai atteint 100K sur TikTok", excerpt: "Mon parcours de 0 à 100K abonnés : stratégies et leçons.", emoji: "📱", created_at: "2026-02-05" },
  { id: "5", title: "Grand Giveaway de Noël — Les résultats !", excerpt: "Merci à tous les participants ! Découvrez les gagnants.", emoji: "🎁", created_at: "2025-12-26" },
];

export default function Blog() {
  const [articles, setArticles] = useState<BlogPost[]>(defaultArticles);

  useEffect(() => {
    supabase.from("blog_posts").select("id, title, excerpt, emoji, created_at").eq("published", true).order("created_at", { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setArticles(data);
    });
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Layout>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-neon-pink/10 rounded-full blur-3xl animate-blob" />
        <div className="container mx-auto px-4 max-w-3xl relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-pink/30 bg-neon-pink/10 px-4 py-2 text-sm text-neon-pink mb-6"
          >
            📰 Blog
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-black mb-4"
          >
            Blog & <span className="text-gradient">Actualités</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-12 text-lg"
          >
            Les dernières nouvelles de la communauté Astuceson.
          </motion.p>

          <div className="flex flex-col gap-5">
            {articles.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="rounded-2xl border border-border/50 bg-card p-6 hover:border-neon-pink/40 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-cyan to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{a.emoji}</span>
                  <div>
                    <span className="text-xs text-muted-foreground">{formatDate(a.created_at)}</span>
                    <h2 className="font-display text-xl font-bold mt-1 mb-2">{a.title}</h2>
                    <p className="text-sm text-muted-foreground">{a.excerpt}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
