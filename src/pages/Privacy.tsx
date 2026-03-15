import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ShieldCheck, Database, Eye, Share2, Cookie, Clock,
  Lock, UserCheck, Baby, RefreshCw, Mail, Globe,
  MessageCircle, Heart, FileText, Server, Fingerprint
} from "lucide-react";

const sections = [
  { id: "introduction", title: "1. Introduction", icon: ShieldCheck, color: "text-neon-cyan" },
  { id: "responsable", title: "2. Responsable du Traitement", icon: UserCheck, color: "text-neon-pink" },
  { id: "collecte", title: "3. Données Collectées", icon: Database, color: "text-neon-cyan" },
  { id: "utilisation", title: "4. Utilisation des Données", icon: Eye, color: "text-neon-pink" },
  { id: "base-legale", title: "5. Base Légale", icon: FileText, color: "text-neon-cyan" },
  { id: "partage", title: "6. Partage des Données", icon: Share2, color: "text-neon-pink" },
  { id: "transfert", title: "7. Transferts Internationaux", icon: Globe, color: "text-neon-cyan" },
  { id: "cookies", title: "8. Cookies", icon: Cookie, color: "text-neon-pink" },
  { id: "conservation", title: "9. Conservation", icon: Clock, color: "text-neon-cyan" },
  { id: "securite", title: "10. Sécurité", icon: Lock, color: "text-neon-pink" },
  { id: "droits", title: "11. Vos Droits", icon: Fingerprint, color: "text-neon-cyan" },
  { id: "mineurs", title: "12. Mineurs", icon: Baby, color: "text-neon-pink" },
  { id: "plateformes", title: "13. Plateformes Tierces", icon: Server, color: "text-neon-cyan" },
  { id: "modifications", title: "14. Modifications", icon: RefreshCw, color: "text-neon-pink" },
  { id: "contact", title: "15. Contact", icon: Mail, color: "text-neon-cyan" },
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

export default function Privacy() {
  const [active, setActive] = useState("introduction");

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon-pink/30 bg-neon-pink/5 px-4 py-1.5 text-sm text-neon-pink mb-6">
              <ShieldCheck className="h-4 w-4" />
              Protection des données
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-4">
              Politique de <span className="text-gradient">Confidentialité</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ta vie privée compte. Voici comment Astuceson collecte, utilise et protège tes données personnelles.
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
                <SectionTitle icon={ShieldCheck} color="text-neon-cyan">1. Introduction</SectionTitle>
                <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    🛡️ <strong className="text-foreground">En bref :</strong> On respecte ta vie privée. On collecte le strict minimum et on ne vend jamais tes données. Cette politique couvre l'ensemble de nos services : Discord, site web, et réseaux sociaux.
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">La présente Politique de Confidentialité décrit la manière dont Astuceson (ci-après « nous », « notre » ou « l'Éditeur ») collecte, utilise, stocke et protège les données personnelles des utilisateurs (ci-après « vous » ou « l'Utilisateur ») de l'ensemble des services Astuceson, incluant le serveur Discord, le site web, les comptes de réseaux sociaux (TikTok, Instagram, YouTube, Snapchat, Twitter/X) et tout contenu associé.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous attachons une grande importance à la protection de votre vie privée et nous nous engageons à traiter vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés.</p>
                <p className="text-muted-foreground leading-relaxed">En utilisant notre Service, vous acceptez les pratiques décrites dans la présente Politique de Confidentialité.</p>
              </motion.section>

              <motion.section id="responsable" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={UserCheck} color="text-neon-pink">2. Responsable du Traitement</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Le responsable du traitement des données personnelles collectées via le Service est Astuceson, joignable à l'adresse contact.astuceson@gmail.com.</p>
                <p className="text-muted-foreground leading-relaxed">Le responsable du traitement détermine les finalités et les moyens du traitement des données personnelles dans le respect de la réglementation applicable.</p>
              </motion.section>

              <motion.section id="collecte" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Database} color="text-neon-cyan">3. Données Collectées</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Dans le cadre de l'utilisation du Service, nous sommes susceptibles de collecter les catégories de données suivantes :</p>
                
                <div className="rounded-xl border border-border/50 bg-card/50 p-5 mb-4">
                  <h3 className="font-display font-semibold text-sm text-neon-cyan mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                    3.1 Données fournies directement
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-neon-cyan">•</span> Nom d'utilisateur et identifiant unique des plateformes (Discord ID, TikTok, etc.)</li>
                    <li className="flex items-start gap-2"><span className="text-neon-cyan">•</span> Avatar et informations de profil rendues publiques</li>
                    <li className="flex items-start gap-2"><span className="text-neon-cyan">•</span> Messages, contenus et fichiers partagés sur le serveur Discord</li>
                    <li className="flex items-start gap-2"><span className="text-neon-cyan">•</span> Commentaires et interactions sur nos réseaux sociaux</li>
                    <li className="flex items-start gap-2"><span className="text-neon-cyan">•</span> Informations via le formulaire de contact (nom, email, message)</li>
                    <li className="flex items-start gap-2"><span className="text-neon-cyan">•</span> Toute information partagée volontairement</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border/50 bg-card/50 p-5 mb-4">
                  <h3 className="font-display font-semibold text-sm text-neon-pink mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-neon-pink" />
                    3.2 Données collectées automatiquement
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-neon-pink">•</span> Données de connexion : date, heure, durée de session</li>
                    <li className="flex items-start gap-2"><span className="text-neon-pink">•</span> Données techniques : adresse IP, type de navigateur, système d'exploitation</li>
                    <li className="flex items-start gap-2"><span className="text-neon-pink">•</span> Données de navigation : pages consultées, temps passé</li>
                    <li className="flex items-start gap-2"><span className="text-neon-pink">•</span> Données d'activité Discord : salons fréquentés, réactions</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border/50 bg-card/50 p-5">
                  <h3 className="font-display font-semibold text-sm text-accent mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    3.3 Données provenant de tiers
                  </h3>
                  <p className="text-sm text-muted-foreground">Nous pouvons recevoir des informations de Discord, TikTok, Instagram, YouTube et autres plateformes, conformément à leurs politiques de confidentialité respectives.</p>
                </div>
              </motion.section>

              <motion.section id="utilisation" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Eye} color="text-neon-pink">4. Utilisation des Données</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous utilisons les données collectées aux fins suivantes :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: "🔧", text: "Fournir et améliorer le Service" },
                    { icon: "🎯", text: "Personnaliser votre expérience" },
                    { icon: "🛡️", text: "Modérer le serveur Discord" },
                    { icon: "📢", text: "Communiquer sur les mises à jour" },
                    { icon: "🤝", text: "Gérer les demandes de contact" },
                    { icon: "📊", text: "Analyser l'utilisation du Service" },
                    { icon: "🔍", text: "Détecter et prévenir les abus" },
                    { icon: "⚖️", text: "Respecter les obligations légales" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section id="base-legale" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={FileText} color="text-neon-cyan">5. Base Légale du Traitement</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Conformément au RGPD, chaque traitement de données repose sur une base légale appropriée :</p>
                <div className="space-y-3">
                  {[
                    { base: "Exécution du contrat", desc: "Traitement nécessaire à la fourniture du Service que vous avez accepté d'utiliser." },
                    { base: "Intérêt légitime", desc: "Amélioration du Service, sécurité, modération et prévention des abus." },
                    { base: "Consentement", desc: "Communications marketing, cookies non essentiels, newsletter." },
                    { base: "Obligation légale", desc: "Conservation des données pour satisfaire aux obligations légales." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-border/50 bg-card/50 p-4">
                      <div className="h-2 w-2 rounded-full bg-neon-cyan mt-2 shrink-0" />
                      <div>
                        <strong className="text-foreground text-sm">{item.base}</strong>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section id="partage" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Share2} color="text-neon-pink">6. Partage des Données</SectionTitle>
                <div className="rounded-xl border border-neon-pink/20 bg-neon-pink/5 p-5 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ❌ <strong className="text-foreground">On ne vend JAMAIS tes données.</strong> Ni à des annonceurs, ni à des tiers, ni à personne. Point.
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous pouvons cependant partager vos données dans les cas suivants :</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3 items-start"><Share2 className="h-4 w-4 text-neon-pink shrink-0 mt-1" /><span><strong className="text-foreground">Prestataires techniques :</strong> hébergement, analyse, sécurité — contractuellement tenus de protéger vos données.</span></li>
                  <li className="flex gap-3 items-start"><Share2 className="h-4 w-4 text-neon-pink shrink-0 mt-1" /><span><strong className="text-foreground">Plateformes :</strong> Discord, TikTok, Instagram, YouTube — soumises à leurs propres politiques.</span></li>
                  <li className="flex gap-3 items-start"><Share2 className="h-4 w-4 text-neon-pink shrink-0 mt-1" /><span><strong className="text-foreground">Obligations légales :</strong> si la loi l'exige ou dans le cadre d'une procédure judiciaire.</span></li>
                  <li className="flex gap-3 items-start"><Share2 className="h-4 w-4 text-neon-pink shrink-0 mt-1" /><span><strong className="text-foreground">Protection des droits :</strong> pour protéger nos droits, votre sécurité ou celle d'autrui.</span></li>
                </ul>
              </motion.section>

              <motion.section id="transfert" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Globe} color="text-neon-cyan">7. Transferts Internationaux</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Certaines des plateformes que nous utilisons (Discord, TikTok, etc.) sont basées aux États-Unis ou dans d'autres pays hors de l'Union européenne. Ces transferts sont encadrés par des garanties appropriées conformément au RGPD (clauses contractuelles types, décisions d'adéquation).</p>
                <p className="text-muted-foreground leading-relaxed">Nous nous assurons que tout transfert de données hors de l'UE respecte un niveau de protection équivalent à celui garanti par le RGPD.</p>
              </motion.section>

              <motion.section id="cookies" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Cookie} color="text-neon-pink">8. Cookies et Technologies Similaires</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Notre site web utilise des cookies pour améliorer votre expérience de navigation.</p>
                <div className="space-y-3 mb-4">
                  {[
                    { type: "Essentiels", desc: "Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.", color: "bg-green-500" },
                    { type: "Analytiques", desc: "Comprendre l'utilisation du site de manière anonyme.", color: "bg-blue-500" },
                    { type: "Préférences", desc: "Mémoriser vos choix (thème, langue, etc.).", color: "bg-purple-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
                      <div className={cn("h-3 w-3 rounded-full shrink-0", item.color)} />
                      <div>
                        <strong className="text-foreground text-sm">{item.type}</strong>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. Le refus de certains cookies peut affecter votre expérience.</p>
              </motion.section>

              <motion.section id="conservation" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Clock} color="text-neon-cyan">9. Conservation des Données</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous conservons vos données uniquement le temps nécessaire :</p>
                <div className="space-y-2">
                  {[
                    { duration: "Durée d'adhésion + 12 mois", data: "Données de compte Discord" },
                    { duration: "3 ans", data: "Données de contact (formulaire)" },
                    { duration: "13 mois", data: "Données de navigation / logs" },
                    { duration: "Variable", data: "Obligations légales spécifiques" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4">
                      <span className="text-sm text-muted-foreground">{item.data}</span>
                      <span className="text-xs font-display font-semibold text-accent bg-accent/10 rounded-full px-3 py-1">{item.duration}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4">À l'expiration de ces délais, vos données sont supprimées ou anonymisées de manière irréversible.</p>
              </motion.section>

              <motion.section id="securite" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Lock} color="text-neon-pink">10. Sécurité des Données</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: "🔐", text: "Chiffrement HTTPS/SSL" },
                    { icon: "👤", text: "Accès restreint aux données" },
                    { icon: "💾", text: "Sauvegardes régulières" },
                    { icon: "📚", text: "Formation de l'équipe" },
                    { icon: "🔍", text: "Surveillance des systèmes" },
                    { icon: "🧪", text: "Tests de sécurité périodiques" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">Aucune méthode de transmission ou de stockage n'est totalement sûre. Nous ne pouvons garantir la sécurité absolue de vos données.</p>
              </motion.section>

              <motion.section id="droits" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Fingerprint} color="text-neon-cyan">11. Vos Droits</SectionTitle>
                <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ✨ <strong className="text-foreground">Tu as le contrôle.</strong> Le RGPD te garantit des droits sur tes données. N'hésite pas à les exercer !
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { right: "Droit d'accès", desc: "Demander quelles données nous détenons sur toi" },
                    { right: "Droit de rectification", desc: "Corriger des données inexactes ou incomplètes" },
                    { right: "Droit à l'effacement", desc: "Demander la suppression de tes données" },
                    { right: "Droit à la limitation", desc: "Limiter le traitement dans certains cas" },
                    { right: "Droit à la portabilité", desc: "Recevoir tes données dans un format lisible" },
                    { right: "Droit d'opposition", desc: "T'opposer au traitement de tes données" },
                    { right: "Retrait du consentement", desc: "Retirer ton consentement à tout moment" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3 hover:border-neon-cyan/30 transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center shrink-0">
                        <Fingerprint className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <strong className="text-foreground text-sm">{item.right}</strong>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour exercer ces droits, contactez-nous à contact.astuceson@gmail.com. Nous répondrons dans un délai d'un mois (prolongeable de deux mois si nécessaire).</p>
                <p className="text-muted-foreground leading-relaxed">Vous pouvez également déposer une réclamation auprès de la <strong className="text-foreground">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés).</p>
              </motion.section>

              <motion.section id="mineurs" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Baby} color="text-neon-pink">12. Protection des Mineurs</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service est accessible aux mineurs de 13 ans et plus, conformément aux conditions d'utilisation de TikTok, Discord et des autres plateformes. Pour les mineurs de moins de 16 ans dans l'UE, le consentement parental est requis.</p>
                <p className="text-muted-foreground leading-relaxed">Si nous apprenons que nous avons collecté des données d'un enfant de moins de 13 ans sans consentement parental, nous les supprimerons dans les plus brefs délais.</p>
              </motion.section>

              <motion.section id="plateformes" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Server} color="text-neon-cyan">13. Plateformes Tierces</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service utilise plusieurs plateformes tierces, chacune ayant sa propre politique de confidentialité :</p>
                <div className="space-y-2">
                  {[
                    { name: "Discord", url: "discord.com/privacy" },
                    { name: "TikTok", url: "tiktok.com/legal/privacy-policy" },
                    { name: "Instagram (Meta)", url: "privacycenter.instagram.com" },
                    { name: "YouTube (Google)", url: "policies.google.com/privacy" },
                    { name: "Snapchat", url: "snap.com/privacy" },
                    { name: "Twitter/X", url: "twitter.com/privacy" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-3">
                      <span className="text-sm font-display font-semibold">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.url}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mt-4">Nous vous encourageons à consulter les politiques de confidentialité de chaque plateforme que vous utilisez.</p>
              </motion.section>

              <motion.section id="modifications" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={RefreshCw} color="text-neon-pink">14. Modifications de la Politique</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous nous réservons le droit de modifier cette Politique à tout moment. Les modifications seront publiées sur cette page avec la date de mise à jour.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">En cas de modification substantielle, une notification sera diffusée sur le serveur Discord et/ou les réseaux sociaux.</p>
                <p className="text-muted-foreground leading-relaxed">Votre utilisation continue du Service constitue votre acceptation de la Politique modifiée.</p>
              </motion.section>

              <motion.section id="contact" className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionTitle icon={Mail} color="text-neon-cyan">15. Contact</SectionTitle>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour toute question relative à cette Politique ou pour exercer vos droits :</p>
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
