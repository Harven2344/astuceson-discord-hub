import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "definitions", title: "2. Définitions" },
  { id: "acces", title: "3. Accès au Service" },
  { id: "inscription", title: "4. Inscription" },
  { id: "utilisation", title: "5. Utilisation du Service" },
  { id: "contenu", title: "6. Contenu Utilisateur" },
  { id: "propriete", title: "7. Propriété Intellectuelle" },
  { id: "responsabilite", title: "8. Limitation de Responsabilité" },
  { id: "moderation", title: "9. Modération" },
  { id: "sanctions", title: "10. Sanctions" },
  { id: "modification", title: "11. Modification des CGU" },
  { id: "droit", title: "12. Droit Applicable" },
  { id: "contact", title: "13. Contact" },
];

export default function Terms() {
  const [active, setActive] = useState("introduction");

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Conditions d'<span className="text-gradient">Utilisation</span>
          </motion.h1>

          <div className="flex gap-10">
            {/* Sidebar TOC — desktop only */}
            <aside className="hidden lg:block w-64 shrink-0">
              <nav className="sticky top-24 space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActive(s.id)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      active === s.id ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0 prose-sm">
              <p className="text-muted-foreground text-sm mb-8">Dernière mise à jour : 13 mars 2026</p>

              <section id="introduction" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation du serveur Discord Astuceson (ci-après « le Service »), exploité par Astuceson (ci-après « l'Éditeur »). En accédant au Service ou en l'utilisant de quelque manière que ce soit, vous acceptez d'être lié par les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Service.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service est accessible à toute personne physique ayant pris connaissance des présentes CGU et les ayant acceptées. L'utilisation du Service est subordonnée à l'acceptation pleine et entière des présentes CGU qui constituent un contrat entre l'Éditeur et l'Utilisateur.</p>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entreront en vigueur dès leur publication sur le site web d'Astuceson. L'utilisation continue du Service après la publication des modifications constitue une acceptation de ces modifications.</p>
              </section>

              <section id="definitions" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">2. Définitions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Dans le cadre des présentes CGU, les termes suivants ont la signification qui leur est donnée ci-dessous :</p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                  <li><strong className="text-foreground">« Service »</strong> : désigne le serveur Discord Astuceson, incluant l'ensemble des salons textuels, salons vocaux, bots, et fonctionnalités mis à disposition des Utilisateurs par l'Éditeur.</li>
                  <li><strong className="text-foreground">« Utilisateur »</strong> : désigne toute personne physique ou morale accédant au Service et utilisant ses fonctionnalités, qu'elle soit inscrite ou non.</li>
                  <li><strong className="text-foreground">« Contenu »</strong> : désigne tout texte, image, vidéo, lien, fichier ou tout autre élément partagé par un Utilisateur via le Service.</li>
                  <li><strong className="text-foreground">« Éditeur »</strong> : désigne Astuceson, créateur et administrateur du Service.</li>
                  <li><strong className="text-foreground">« Modérateur »</strong> : désigne un Utilisateur investi de pouvoirs de modération par l'Éditeur pour maintenir l'ordre et le respect des présentes CGU au sein du Service.</li>
                </ul>
              </section>

              <section id="acces" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">3. Accès au Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service est accessible gratuitement à tout Utilisateur disposant d'un compte Discord valide et actif. L'Éditeur met en œuvre les moyens raisonnables à sa disposition pour assurer un accès continu au Service, sans toutefois garantir une disponibilité permanente.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'accès au Service peut être temporairement suspendu en raison de maintenance, de mises à jour, de problèmes techniques liés à la plateforme Discord elle-même, ou de tout autre événement indépendant de la volonté de l'Éditeur. L'Éditeur ne pourra être tenu responsable des interruptions du Service, quelle qu'en soit la cause.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur se réserve le droit de restreindre l'accès au Service, en totalité ou en partie, à certaines catégories d'Utilisateurs, notamment en fonction de leur âge, de leur localisation géographique, ou de leur comportement passé au sein du Service.</p>
                <p className="text-muted-foreground leading-relaxed">Certaines fonctionnalités du Service peuvent nécessiter des permissions spécifiques ou des rôles particuliers attribués par l'Éditeur ou les Modérateurs. L'accès à ces fonctionnalités restreintes est conditionné à l'obtention desdits rôles conformément aux procédures établies par l'Éditeur.</p>
              </section>

              <section id="inscription" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">4. Inscription</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour accéder au Service, l'Utilisateur doit rejoindre le serveur Discord Astuceson en utilisant un lien d'invitation valide. En rejoignant le serveur, l'Utilisateur s'engage à respecter les présentes CGU ainsi que les Conditions d'Utilisation de Discord (https://discord.com/terms).</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur garantit que les informations fournies lors de son inscription sur Discord sont exactes et à jour. L'utilisation de faux comptes, de comptes multiples dans un but abusif, ou de toute autre forme d'identité fictive est strictement interdite et peut entraîner l'exclusion immédiate du Service.</p>
                <p className="text-muted-foreground leading-relaxed">L'Utilisateur est seul responsable de la sécurité de son compte Discord. En cas de compromission de son compte, l'Utilisateur doit en informer immédiatement l'Éditeur via les canaux de communication prévus à cet effet.</p>
              </section>

              <section id="utilisation" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">5. Utilisation du Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur s'engage à utiliser le Service de manière loyale, dans le respect des lois et réglementations en vigueur, des droits des tiers, et des présentes CGU. À ce titre, sont notamment interdits :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Le harcèlement, l'intimidation, les menaces ou tout comportement abusif envers d'autres Utilisateurs.</li>
                  <li>La publication de contenu à caractère diffamatoire, injurieux, obscène, pornographique, violent ou incitant à la haine.</li>
                  <li>Le spam, la publicité non autorisée, la promotion de services concurrents ou toute forme de sollicitation commerciale.</li>
                  <li>La diffusion de logiciels malveillants, virus, ou tout autre code informatique nuisible.</li>
                  <li>L'usurpation d'identité ou la tentative de se faire passer pour l'Éditeur, un Modérateur ou un autre Utilisateur.</li>
                  <li>La collecte, le stockage ou la diffusion de données personnelles d'autres Utilisateurs sans leur consentement explicite.</li>
                  <li>Toute tentative de contourner les mesures de sécurité, de modération ou les restrictions d'accès mises en place par l'Éditeur.</li>
                  <li>L'utilisation de bots, scripts ou outils automatisés non autorisés par l'Éditeur.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur se réserve le droit de déterminer, à sa seule discrétion, ce qui constitue une violation des présentes CGU et de prendre les mesures appropriées en conséquence.</p>
              </section>

              <section id="contenu" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">6. Contenu Utilisateur</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur est seul responsable du Contenu qu'il publie, partage ou transmet via le Service. En publiant du Contenu sur le Service, l'Utilisateur accorde à l'Éditeur une licence non exclusive, mondiale, gratuite et transférable pour utiliser, reproduire, modifier, adapter et afficher ledit Contenu dans le cadre du fonctionnement et de la promotion du Service.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Utilisateur garantit qu'il dispose de tous les droits nécessaires sur le Contenu qu'il publie et que celui-ci ne porte pas atteinte aux droits de propriété intellectuelle, au droit à l'image, au droit à la vie privée ou à tout autre droit de tiers.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur se réserve le droit de supprimer, sans préavis, tout Contenu qu'il estime contraire aux présentes CGU, aux lois en vigueur ou aux bonnes mœurs. L'Éditeur n'est pas tenu de justifier sa décision de suppression auprès de l'Utilisateur concerné.</p>
                <p className="text-muted-foreground leading-relaxed">Les Contenus partagés sur le Service sont hébergés par Discord conformément à sa propre politique de confidentialité et ses conditions d'utilisation. L'Éditeur ne peut être tenu responsable de la politique de gestion des données de Discord.</p>
              </section>

              <section id="propriete" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">7. Propriété Intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">L'ensemble des éléments constitutifs du Service, incluant mais sans s'y limiter les textes, graphiques, images, logos, icônes, sons, logiciels, structure, mise en page, bots personnalisés, et tout autre contenu créé par l'Éditeur, sont protégés par les lois relatives à la propriété intellectuelle et demeurent la propriété exclusive de l'Éditeur.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Service, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de l'Éditeur.</p>
                <p className="text-muted-foreground leading-relaxed">Le nom « Astuceson », le logo et tous les signes distinctifs associés sont des marques de l'Éditeur. Toute utilisation non autorisée de ces éléments constitue une contrefaçon sanctionnée par la loi.</p>
              </section>

              <section id="responsabilite" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">8. Limitation de Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service est fourni « en l'état » et « tel que disponible ». L'Éditeur ne donne aucune garantie, expresse ou implicite, quant à la fiabilité, la disponibilité, l'exhaustivité ou l'exactitude du Service ou de son contenu.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le Service, incluant mais sans s'y limiter la perte de données, de profits, d'opportunités commerciales ou de tout autre préjudice.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur décline toute responsabilité quant aux Contenus publiés par les Utilisateurs. Les opinions exprimées par les Utilisateurs sur le Service ne reflètent pas nécessairement celles de l'Éditeur.</p>
                <p className="text-muted-foreground leading-relaxed">L'Éditeur ne peut être tenu responsable des liens hypertextes présents sur le Service renvoyant vers des sites tiers. L'Utilisateur accède à ces sites sous sa propre responsabilité.</p>
              </section>

              <section id="moderation" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">9. Modération</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur et les Modérateurs désignés assurent la modération du Service afin de garantir le respect des présentes CGU et de maintenir un environnement sain et agréable pour l'ensemble des Utilisateurs.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">La modération s'effectue a posteriori, c'est-à-dire après la publication du Contenu par l'Utilisateur. L'Éditeur n'exerce aucun contrôle préalable sur les Contenus publiés par les Utilisateurs.</p>
                <p className="text-muted-foreground leading-relaxed">Tout Utilisateur peut signaler un Contenu ou un comportement qu'il estime contraire aux présentes CGU en utilisant les outils de signalement mis à disposition par Discord ou en contactant directement un Modérateur. L'Éditeur s'engage à examiner les signalements dans les meilleurs délais.</p>
              </section>

              <section id="sanctions" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">10. Sanctions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">En cas de violation des présentes CGU, l'Éditeur se réserve le droit de prendre les mesures suivantes, sans ordre hiérarchique et sans préavis obligatoire :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Avertissement verbal ou écrit adressé à l'Utilisateur fautif.</li>
                  <li>Suppression du Contenu litigieux.</li>
                  <li>Mise en sourdine (mute) temporaire ou permanente de l'Utilisateur.</li>
                  <li>Exclusion temporaire (kick) du Service.</li>
                  <li>Bannissement définitif (ban) du Service.</li>
                  <li>Signalement aux autorités compétentes en cas d'infraction pénale.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">La gravité de la sanction est appréciée par l'Éditeur en fonction de la nature de la violation, de sa récurrence et de ses conséquences. Les décisions de modération sont définitives et ne sont pas susceptibles de recours, sauf à la discrétion de l'Éditeur.</p>
              </section>

              <section id="modification" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">11. Modification des CGU</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment et sans préavis. Les CGU modifiées entrent en vigueur dès leur publication sur le site web d'Astuceson ou leur diffusion sur le Service.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Il est recommandé aux Utilisateurs de consulter régulièrement les présentes CGU afin de prendre connaissance de toute modification. L'utilisation continue du Service après la publication de modifications constitue une acceptation tacite desdites modifications.</p>
                <p className="text-muted-foreground leading-relaxed">En cas de désaccord avec les CGU modifiées, l'Utilisateur dispose de la possibilité de cesser d'utiliser le Service et de quitter le serveur Discord Astuceson.</p>
              </section>

              <section id="droit" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">12. Droit Applicable</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Les présentes CGU sont régies par le droit français. Tout litige relatif à l'interprétation, l'exécution ou la résiliation des présentes CGU sera soumis à la compétence exclusive des tribunaux français compétents.</p>
                <p className="text-muted-foreground leading-relaxed">Si l'une quelconque des dispositions des présentes CGU était déclarée nulle ou inapplicable par une juridiction compétente, les autres dispositions conserveraient leur pleine force et leur plein effet.</p>
              </section>

              <section id="contact" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">13. Contact</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour toute question relative aux présentes CGU, vous pouvez contacter l'Éditeur via :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Le salon #support du serveur Discord Astuceson</li>
                  <li>La page de contact du site web Astuceson</li>
                  <li>Les réseaux sociaux officiels d'Astuceson</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
