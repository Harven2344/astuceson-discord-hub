import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Comment rejoindre le serveur Discord ?", a: "C'est très simple ! Clique sur le bouton « Rejoindre le Discord » présent sur le site. Tu seras redirigé vers Discord où tu pourras accepter l'invitation. Assure-toi d'avoir un compte Discord actif." },
  { q: "Le serveur est-il gratuit ?", a: "Oui, le serveur Discord Astuceson est 100% gratuit ! Tu peux accéder à toutes les astuces, participer aux discussions et aux événements sans rien payer." },
  { q: "Quelles sont les règles du serveur ?", a: "Les règles principales sont : respect mutuel, pas de spam, pas de contenu inapproprié, pas de pub sans autorisation, et être bienveillant envers tous les membres. Les règles complètes sont affichées dans le salon #règles du serveur." },
  { q: "Comment obtenir des rôles spéciaux ?", a: "Les rôles sont attribués en fonction de ton activité sur le serveur. Plus tu participes aux discussions et événements, plus tu débloques de rôles. Certains rôles spéciaux sont disponibles lors d'événements exclusifs." },
  { q: "À quelle fréquence publies-tu sur TikTok ?", a: "Je publie en moyenne 1 à 3 vidéos par jour sur TikTok. Les horaires varient mais je suis le plus actif entre 18h et 22h. Active les notifications pour ne rien rater !" },
  { q: "Comment proposer une astuce ?", a: "Tu peux proposer tes astuces dans le salon #suggestions du serveur Discord. Si ton astuce est sélectionnée, elle pourra être présentée dans une de mes vidéos TikTok et tu seras crédité !" },
  { q: "Comment devenir modérateur ?", a: "Les modérateurs sont sélectionnés parmi les membres les plus actifs et les plus bienveillants. Il n'y a pas de candidature formelle : sois simplement toi-même, aide les autres et on te remarquera !" },
  { q: "Y a-t-il des événements réguliers ?", a: "Oui ! Nous organisons des giveaways chaque semaine, des quiz mensuels, des sessions de partage d'astuces en live, et des événements spéciaux lors des fêtes et occasions." },
];

export default function FAQ() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            <span className="text-gradient">FAQ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-12"
          >
            Questions fréquemment posées sur le serveur et la communauté.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border/50 bg-card px-6 data-[state=open]:border-accent/50">
                  <AccordionTrigger className="font-display font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
