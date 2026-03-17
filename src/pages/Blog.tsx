import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  emoji: string;
  created_at: string;
}

const defaultArticles: BlogPost[] = [
  { id: "1", title: "Lancement du serveur Discord Astuceson !", excerpt: "Après des mois de préparation, le serveur Discord est enfin en ligne !", emoji: "🎉", created_at: "2026-03-12" },
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

  const firstPost = articles[0];
  const restPosts = articles.slice(1);

  return (
    <Layout>
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-neon-pink/10 rounded-full blur-[100px] animate-blob" />
        <div className="container mx-auto px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-8xl font-black mb-4 leading-[0.9]"
          >
            Blog & <span className="text-gradient">Actu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Les dernières nouvelles de la communauté.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Featured first post */}
          {firstPost && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl border-2 border-neon-pink/30 bg-gradient-to-br from-neon-pink/10 to-neon-purple/10 p-8 md:p-10 mb-8 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
              <span className="text-xs text-muted-foreground">{formatDate(firstPost.created_at)}</span>
              <div className="flex items-start gap-4 mt-2">
                <span className="text-5xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">{firstPost.emoji}</span>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-black mb-2">{firstPost.title}</h2>
                  <p className="text-muted-foreground">{firstPost.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-neon-pink mt-3 group-hover:gap-3 transition-all">
                    Lire la suite <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          )}

          {/* Other posts */}
          <div className="flex flex-col gap-4">
            {restPosts.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.01, x: 8 }}
                className="rounded-2xl border border-border/50 bg-card p-6 hover:border-neon-pink/40 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-cyan to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{a.emoji}</span>
                  <div>
                    <span className="text-xs text-muted-foreground">{formatDate(a.created_at)}</span>
                    <h2 className="font-display text-xl font-bold mt-1 mb-1">{a.title}</h2>
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
