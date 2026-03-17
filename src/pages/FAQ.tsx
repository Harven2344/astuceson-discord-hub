import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  { id: "1", question: "Comment rejoindre le serveur Discord ?", answer: "Clique sur le bouton « Rejoindre le Discord » et accepte l'invitation. Tu auras besoin d'un compte Discord." },
  { id: "2", question: "Le serveur est-il gratuit ?", answer: "Oui, 100% gratuit ! Accède aux discussions, événements et contenu sans rien payer." },
  { id: "3", question: "Quelles sont les règles ?", answer: "Respect, pas de spam, pas de contenu inapproprié. Les règles complètes sont dans le salon #règles." },
  { id: "4", question: "Comment obtenir des rôles spéciaux ?", answer: "Les rôles sont attribués selon ton activité. Plus tu participes, plus tu débloques de rôles." },
  { id: "5", question: "À quelle fréquence publies-tu ?", answer: "1 à 3 vidéos par jour sur TikTok, surtout entre 18h et 22h." },
  { id: "6", question: "Y a-t-il des événements réguliers ?", answer: "Oui ! Giveaways chaque semaine, quiz mensuels et sessions live." },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);

  useEffect(() => {
    supabase.from("faq_items").select("id, question, answer").eq("active", true).order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setFaqs(data);
    });
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-neon-cyan/10 rounded-full blur-[100px] animate-blob" />
        <div className="container mx-auto px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-8xl font-black mb-4 leading-[0.9]"
          >
            <span className="text-gradient">FAQ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Questions fréquemment posées.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <AccordionItem value={`item-${f.id}`} className="rounded-2xl border border-border/50 bg-card px-6 data-[state=open]:border-accent/50 transition-all">
                  <AccordionTrigger className="font-display font-semibold hover:no-underline text-left">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
