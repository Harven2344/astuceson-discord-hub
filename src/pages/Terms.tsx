import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen, Users, Shield, AlertTriangle, Scale, Gavel,
  FileText, Lock, Eye, MessageCircle, Ban, RefreshCw,
  Globe, Mail, Smartphone, Video, Heart, Sparkles
} from "lucide-react";

const sections = [
  { id: "introduction", title: "1. Introduction", icon: BookOpen, color: "text-neon-cyan" },
  { id: "definitions", title: "2. Définitions", icon: FileText, color: "text-neon-pink" },
  { id: "acces", title: "3. Accès au Service", icon: Globe, color: "text-neon-cyan" },
  { id: "inscription", title: "4. Inscription", icon: Users, color: "text-neon-pink" },
  { id: "age", title: "5. Conditions d'Âge", icon: Shield, color: "text-neon-cyan" },
  { id: "utilisation", title: "6. Utilisation du Service", icon: Smartphone, color: "text-neon-pink" },
  { id: "contenu", title: "7. Contenu Utilisateur", icon: Video, color: "text-neon-cyan" },
  { id: "reseaux", title: "8. Réseaux Sociaux", icon: Heart, color: "text-neon-pink" },
  { id: "propriete", title: "9. Propriété Intellectuelle", icon: Lock, color: "text-neon-cyan" },
  { id: "responsabilite", title: "10. Limitation de Responsabilité", icon: AlertTriangle, color: "text-neon-pink" },
  { id: "moderation", title: "11. Modération", icon: Eye, color: "text-neon-cyan" },
  { id: "sanctions", title: "12. Sanctions", icon: Ban, color: "text-neon-pink" },
  { id: "partenariats", title: "13. Partenariats & Sponsors", icon: Sparkles, color: "text-neon-cyan" },
  { id: "liens", title: "14. Liens Externes", icon: Globe, color: "text-neon-pink" },
  { id: "modification", title: "15. Modification des CGU", icon: RefreshCw, color: "text-neon-cyan" },
  { id: "droit", title: "16. Droit Applicable", icon: Scale, color: "text-neon-pink" },
  { id: "contact", title: "17. Contact", icon: Mail, color: "text-neon-cyan" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SectionTitle({ icon: Icon, color, children }: { icon: React.ElementType; color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={cn("p-2 rounded-lg bg-card border border-border/50", color)}>
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="font-display text-2xl font-bold">{children}</h2>
    </div>
  );
}

export default function Terms() {
  const [active, setActive] = useState("introduction");

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Gavel className="h-4 w-4" />
              Document légal
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-4">
              Conditions d'<span className="text-gradient">Utilisation</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              En utilisant nos services et en faisant partie de la communauté Astuceson, tu acceptes les conditions suivantes.
            </p>
          </motion.div>

          <div className="flex gap-10">
            {/* Sidebar TOC */}
            <aside className="hidden lg:block w-72 shrink-0">
              <nav className="sticky top-24 space-y-0.5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">Sommaire</p>
                {sections.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => setActive(s.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                        active === s.id
                          ? "text-accent bg-accent/10 border-l-2 border-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className={cn("h-3.5 w-3.5 shrink-0", active === s.id ? "text-accent" : "text-muted-foreground")} />
                      <span className="truncate">{s.title}</span>
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0 space-y-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-xs text-muted-foreground mb-8">
                <RefreshCw className="h-3 w-3" />
                Dernière mise à jour : 15 mars 2026
              </div>

              <motion.section id="introduction" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={BookOpen} color="text-neon-cyan">1. Introduction</SectionTitle>
                <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ⚡ <strong className="text-foreground">En bref :</strong> Ces conditions s'appliquent à tous les services Astuceson — serveur Discord, site web, et présence sur les réseaux sociaux (TikTok, Instagram, YouTube, etc.).
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation de l'ensemble des services proposés par Astuceson (ci-après « le Service »), incluant le serveur Discord, le site web, les comptes de réseaux sociaux et tout contenu associé, exploités par Astuceson (ci-après « l'Éditeur »).</p>
                <p className="text-muted-foreground leading-relaxed mb-4">En accédant au Service ou en l'utilisant de quelque manière que ce soit — que ce soit en suivant nos comptes TikTok, Instagram, YouTube, Snapchat, en rejoignant notre serveur Discord, ou en visitant notre site web — vous acceptez d'être lié par les présentes CGU.</p>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entreront en vigueur dès leur publication. L'utilisation continue du Service après la publication des modifications constitue une acceptation de ces modifications.</p>
              </motion.section>

              <motion.section id="definitions" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={FileText} color="text-neon-pink">2. Définitions</SectionTitle>
                <div className="space-y-3">
                  {[
                    { term: "« Service »", def: "Désigne l'ensemble des plateformes et canaux Astuceson : serveur Discord, site web, comptes TikTok, Instagram, YouTube, Snapchat, Twitter/X, et tout contenu publié sur ces plateformes." },
                    { term: "« Utilisateur »", def: "Toute personne accédant au Service, qu'elle soit abonnée, membre du Discord, ou simple visiteur du site web." },
                    { term: "« Contenu »", def: "Tout texte, image, vidéo, son, lien, commentaire, message ou tout autre élément partagé via le Service." },
                    { term: "« Éditeur »", def: "Astuceson, créateur de contenu et administrateur du Service." },
                    { term: "« Communauté »", def: "L'ensemble des Utilisateurs interagissant via le Service, notamment sur Discord et les réseaux sociaux." },
                    { term: "« Modérateur »", def: "Un Utilisateur investi de pouvoirs de modération par l'Éditeur pour maintenir l'ordre au sein du Service." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-border/50 bg-card/50 p-4">
                      <div className="h-2 w-2 rounded-full bg-neon-pink mt-2 shrink-0" />
                      <div>
                        <strong className="text-foreground">{item.term}</strong>
                        <p className="text-sm text-muted-foreground mt-1">{item.def}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section id="acces" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Globe} color="text-neon-cyan">3. Accès au Service</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service est accessible gratuitement. L'Éditeur met en œuvre les moyens raisonnables pour assurer un accès continu, sans garantir une disponibilité permanente.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'accès au Service peut être temporairement suspendu en raison de maintenance, de mises à jour, de problèmes techniques liés aux plateformes tierces (Discord, TikTok, Instagram, etc.), ou de tout autre événement indépendant de la volonté de l'Éditeur.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur se réserve le droit de restreindre l'accès au Service, en totalité ou en partie, à certaines catégories d'Utilisateurs, notamment en fonction de leur âge, de leur localisation géographique, ou de leur comportement passé.</p>
                <p className="text-muted-foreground leading-relaxed">Certaines fonctionnalités du Service (salons privés Discord, contenu exclusif, etc.) peuvent nécessiter des permissions spécifiques ou des rôles particuliers attribués par l'Éditeur ou les Modérateurs.</p>
              </motion.section>

              <motion.section id="inscription" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Users} color="text-neon-pink">4. Inscription</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour accéder à certaines fonctionnalités du Service (notamment le serveur Discord), l'Utilisateur doit disposer d'un compte sur la plateforme concernée. En s'inscrivant, l'Utilisateur s'engage à respecter les présentes CGU ainsi que les conditions d'utilisation de la plateforme concernée.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur garantit que les informations de son profil sont exactes. L'utilisation de faux comptes, de comptes multiples dans un but abusif, ou de toute autre forme d'identité fictive est strictement interdite et peut entraîner l'exclusion immédiate du Service.</p>
                <p className="text-muted-foreground leading-relaxed">L'Utilisateur est seul responsable de la sécurité de ses comptes sur les différentes plateformes.</p>
              </motion.section>

              <motion.section id="age" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Shield} color="text-neon-cyan">5. Conditions d'Âge</SectionTitle>
                <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    🛡️ <strong className="text-foreground">Important :</strong> Le Service respecte les conditions d'âge minimum des plateformes utilisées (13 ans pour TikTok et Discord, etc.).
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur déclare avoir l'âge minimum requis par les plateformes tierces pour accéder au Service. Pour les mineurs, l'utilisation du Service est soumise à l'autorisation de leurs représentants légaux.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Le contenu publié par l'Éditeur vise un public général et ne contient pas de contenu à caractère adulte. Toutefois, les interactions avec d'autres Utilisateurs (notamment sur Discord) ne sont pas contrôlées de manière exhaustive par l'Éditeur.</p>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur se réserve le droit de demander une vérification d'âge à tout Utilisateur et de restreindre l'accès en cas de doute.</p>
              </motion.section>

              <motion.section id="utilisation" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Smartphone} color="text-neon-pink">6. Utilisation du Service</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur s'engage à utiliser le Service de manière loyale, dans le respect des lois et réglementations en vigueur, des droits des tiers, et des présentes CGU. À ce titre, sont notamment interdits :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    "Harcèlement, intimidation, menaces",
                    "Contenu diffamatoire, injurieux ou haineux",
                    "Spam et publicité non autorisée",
                    "Diffusion de logiciels malveillants",
                    "Usurpation d'identité",
                    "Collecte de données personnelles",
                    "Contournement des mesures de sécurité",
                    "Bots et scripts non autorisés",
                    "Contenu sexuel ou pornographique",
                    "Incitation à la violence ou au suicide",
                    "Promotion de drogues ou activités illégales",
                    "Doxxing (divulgation d'infos privées)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                      <Ban className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur se réserve le droit de déterminer, à sa seule discrétion, ce qui constitue une violation des présentes CGU et de prendre les mesures appropriées en conséquence.</p>
              </motion.section>

              <motion.section id="contenu" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Video} color="text-neon-cyan">7. Contenu Utilisateur</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur est seul responsable du Contenu qu'il publie, partage ou transmet via le Service. En publiant du Contenu sur le Service, l'Utilisateur accorde à l'Éditeur une licence non exclusive, mondiale, gratuite et transférable pour utiliser, reproduire, modifier, adapter et afficher ledit Contenu dans le cadre du fonctionnement et de la promotion du Service.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur garantit qu'il dispose de tous les droits nécessaires sur le Contenu qu'il publie et que celui-ci ne porte pas atteinte aux droits de propriété intellectuelle, au droit à l'image, au droit à la vie privée ou à tout autre droit de tiers.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur se réserve le droit de supprimer, sans préavis, tout Contenu qu'il estime contraire aux présentes CGU, aux lois en vigueur ou aux bonnes mœurs.</p>
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    📹 <strong className="text-foreground">Concernant les vidéos TikTok :</strong> Les commentaires, duos, et interactions sur les vidéos publiées par l'Éditeur sont soumis aux mêmes règles. Tout commentaire inapproprié pourra être supprimé et l'Utilisateur bloqué.
                  </p>
                </div>
              </motion.section>

              <motion.section id="reseaux" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Heart} color="text-neon-pink">8. Réseaux Sociaux</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur est présent sur plusieurs plateformes de réseaux sociaux (TikTok, Instagram, YouTube, Snapchat, Twitter/X). L'utilisation de ces plateformes est également régie par leurs propres conditions d'utilisation.</p>
                <div className="space-y-3 mb-4">
                  {[
                    { platform: "TikTok", rule: "Les commentaires et les duos doivent respecter les règles de la communauté TikTok et les présentes CGU." },
                    { platform: "Instagram", rule: "Les messages privés, commentaires et stories interactives sont soumis aux mêmes règles de respect et de bienveillance." },
                    { platform: "YouTube", rule: "Les commentaires sous les vidéos et les interactions en live doivent être respectueux." },
                    { platform: "Discord", rule: "Le serveur Discord est soumis à des règles spécifiques détaillées dans les salons dédiés, en plus des présentes CGU." },
                    { platform: "Snapchat", rule: "Les interactions via Snapchat doivent respecter les mêmes règles de courtoisie." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-border/50 bg-card/50 p-4">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-pink/20 to-neon-cyan/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold">{item.platform[0]}</span>
                      </div>
                      <div>
                        <strong className="text-foreground text-sm">{item.platform}</strong>
                        <p className="text-xs text-muted-foreground mt-1">{item.rule}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur n'est pas responsable des actions de plateformes tierces concernant votre compte ou vos données.</p>
              </motion.section>

              <motion.section id="propriete" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Lock} color="text-neon-cyan">9. Propriété Intellectuelle</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">L'ensemble des éléments constitutifs du Service — incluant vidéos, textes, graphiques, images, logos, sons, musiques, montages, effets visuels, bots personnalisés — sont protégés par les lois relatives à la propriété intellectuelle et demeurent la propriété exclusive de l'Éditeur.</p>
                <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    🔒 <strong className="text-foreground">Important :</strong> Vous ne pouvez pas télécharger, re-poster ou réutiliser les vidéos, images ou tout autre contenu d'Astuceson sans autorisation écrite préalable. Les réactions, duos et stitchs sur TikTok sont autorisés dans le cadre normal de la plateforme.
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Service, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de l'Éditeur.</p>
                <p className="text-muted-foreground leading-relaxed">Le nom « Astuceson », le logo et tous les signes distinctifs associés sont des marques de l'Éditeur. Toute utilisation non autorisée constitue une contrefaçon sanctionnée par la loi.</p>
              </motion.section>

              <motion.section id="responsabilite" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={AlertTriangle} color="text-neon-pink">10. Limitation de Responsabilité</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service est fourni « en l'état » et « tel que disponible ». L'Éditeur ne donne aucune garantie quant à la fiabilité, la disponibilité ou l'exactitude du Service.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le Service.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur décline toute responsabilité quant aux Contenus publiés par les Utilisateurs. Les opinions exprimées ne reflètent pas nécessairement celles de l'Éditeur.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur ne peut être tenu responsable des informations ou conseils partagés dans ses vidéos ou sur le serveur Discord. Le contenu est fourni à titre divertissant et informatif. L'Utilisateur est seul responsable de l'utilisation qu'il fait de ces informations.</p>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur ne peut être tenu responsable des liens hypertextes renvoyant vers des sites tiers.</p>
              </motion.section>

              <motion.section id="moderation" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Eye} color="text-neon-cyan">11. Modération</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur et les Modérateurs désignés assurent la modération du Service afin de garantir le respect des présentes CGU et de maintenir un environnement sain.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">La modération s'effectue a posteriori, c'est-à-dire après la publication du Contenu. L'Éditeur n'exerce aucun contrôle préalable.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Tout Utilisateur peut signaler un Contenu ou un comportement contraire aux CGU en utilisant les outils de signalement de la plateforme concernée ou en contactant directement un Modérateur.</p>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur s'engage à examiner les signalements dans les meilleurs délais.</p>
              </motion.section>

              <motion.section id="sanctions" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Ban} color="text-neon-pink">12. Sanctions</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">En cas de violation des CGU, l'Éditeur se réserve le droit de prendre les mesures suivantes :</p>
                <div className="space-y-2 mb-4">
                  {[
                    { level: "1", label: "Avertissement", desc: "Rappel verbal ou écrit des règles", color: "border-yellow-500/30 bg-yellow-500/5" },
                    { level: "2", label: "Suppression", desc: "Suppression du contenu litigieux", color: "border-orange-500/30 bg-orange-500/5" },
                    { level: "3", label: "Mute", desc: "Mise en sourdine temporaire ou permanente", color: "border-orange-600/30 bg-orange-600/5" },
                    { level: "4", label: "Kick", desc: "Exclusion temporaire du serveur", color: "border-red-500/30 bg-red-500/5" },
                    { level: "5", label: "Ban", desc: "Bannissement définitif de tous les services", color: "border-red-700/30 bg-red-700/5" },
                    { level: "6", label: "Signalement", desc: "Signalement aux autorités compétentes si nécessaire", color: "border-red-900/30 bg-red-900/5" },
                  ].map((item) => (
                    <div key={item.level} className={cn("flex items-center gap-4 rounded-lg border p-3", item.color)}>
                      <div className="h-8 w-8 rounded-full bg-card border border-border/50 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold font-display">{item.level}</span>
                      </div>
                      <div>
                        <strong className="text-foreground text-sm">{item.label}</strong>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">Les décisions de modération sont définitives et ne sont pas susceptibles de recours, sauf à la discrétion de l'Éditeur.</p>
              </motion.section>

              <motion.section id="partenariats" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Sparkles} color="text-neon-cyan">13. Partenariats & Sponsors</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur peut conclure des partenariats commerciaux avec des marques ou entreprises. Le contenu sponsorisé sera toujours clairement identifié conformément à la réglementation en vigueur.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Les partenariats et collaborations proposés par les Utilisateurs doivent être soumis via les canaux officiels (formulaire de contact, email). Toute sollicitation non autorisée dans les commentaires ou messages sera considérée comme du spam.</p>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur se réserve le droit d'accepter ou de refuser tout partenariat à sa seule discrétion et ne garantit aucune réponse aux propositions reçues.</p>
              </motion.section>

              <motion.section id="liens" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Globe} color="text-neon-pink">14. Liens Externes</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service peut contenir des liens vers des sites web ou services tiers (boutiques, partenaires, etc.). L'Éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur disponibilité.</p>
                <p className="text-muted-foreground leading-relaxed">L'Utilisateur accède à ces sites sous sa propre responsabilité et est invité à consulter leurs conditions d'utilisation et politiques de confidentialité respectives.</p>
              </motion.section>

              <motion.section id="modification" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={RefreshCw} color="text-neon-cyan">15. Modification des CGU</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les CGU modifiées entrent en vigueur dès leur publication sur le site web ou leur diffusion sur le Service.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">En cas de modification substantielle, une annonce sera faite sur le serveur Discord et/ou les réseaux sociaux.</p>
                <p className="text-muted-foreground leading-relaxed">En cas de désaccord, l'Utilisateur peut cesser d'utiliser le Service.</p>
              </motion.section>

              <motion.section id="droit" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Scale} color="text-neon-pink">16. Droit Applicable</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Les présentes CGU sont régies par le droit français. Tout litige sera soumis à la compétence exclusive des tribunaux français compétents.</p>
                <p className="text-muted-foreground leading-relaxed">Si l'une quelconque des dispositions était déclarée nulle, les autres dispositions conserveraient leur pleine force et leur plein effet.</p>
              </motion.section>

              <motion.section id="contact" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Mail} color="text-neon-cyan">17. Contact</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour toute question relative aux présentes CGU :</p>
                <div className="space-y-3">
                  {[
                    { icon: MessageCircle, label: "Discord", desc: "Le salon #support du serveur" },
                    { icon: Mail, label: "Email", desc: "contact.astuceson@gmail.com" },
                    { icon: Globe, label: "Site web", desc: "Page de contact" },
                    { icon: Heart, label: "Réseaux sociaux", desc: "Via DM sur nos comptes officiels" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-4 hover:border-accent/30 transition-colors">
                      <item.icon className="h-5 w-5 text-accent shrink-0" />
                      <div>
                        <strong className="text-foreground text-sm">{item.label}</strong>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
