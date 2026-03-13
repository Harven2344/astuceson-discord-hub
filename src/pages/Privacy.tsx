import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "collecte", title: "2. Données Collectées" },
  { id: "utilisation", title: "3. Utilisation des Données" },
  { id: "partage", title: "4. Partage des Données" },
  { id: "cookies", title: "5. Cookies" },
  { id: "conservation", title: "6. Conservation" },
  { id: "securite", title: "7. Sécurité" },
  { id: "droits", title: "8. Vos Droits" },
  { id: "mineurs", title: "9. Mineurs" },
  { id: "modifications", title: "10. Modifications" },
  { id: "contact", title: "11. Contact" },
];

export default function Privacy() {
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
            Politique de <span className="text-gradient">Confidentialité</span>
          </motion.h1>

          <div className="flex gap-10">
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

            <div className="flex-1 max-w-2xl mx-auto lg:mx-0 prose-sm">
              <p className="text-muted-foreground text-sm mb-8">Dernière mise à jour : 13 mars 2026</p>

              <section id="introduction" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">La présente Politique de Confidentialité décrit la manière dont Astuceson (ci-après « nous », « notre » ou « l'Éditeur ») collecte, utilise, stocke et protège les données personnelles des utilisateurs (ci-après « vous » ou « l'Utilisateur ») du serveur Discord Astuceson et du site web associé (ci-après « le Service »).</p>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous attachons une grande importance à la protection de votre vie privée et nous nous engageons à traiter vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés.</p>
                <p className="text-muted-foreground leading-relaxed">En utilisant notre Service, vous acceptez les pratiques décrites dans la présente Politique de Confidentialité. Si vous n'êtes pas d'accord avec ces pratiques, nous vous invitons à ne pas utiliser le Service.</p>
              </section>

              <section id="collecte" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">2. Données Collectées</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Dans le cadre de l'utilisation du Service, nous sommes susceptibles de collecter les catégories de données personnelles suivantes :</p>
                <h3 className="font-display font-semibold text-lg mt-6 mb-3">2.1 Données fournies directement par l'Utilisateur</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Nom d'utilisateur Discord et identifiant unique (Discord ID)</li>
                  <li>Avatar et informations de profil Discord rendues publiques</li>
                  <li>Messages, contenus et fichiers partagés sur le serveur Discord</li>
                  <li>Informations communiquées via le formulaire de contact du site web (nom, adresse e-mail, message)</li>
                  <li>Toute autre information que l'Utilisateur choisit volontairement de partager</li>
                </ul>
                <h3 className="font-display font-semibold text-lg mt-6 mb-3">2.2 Données collectées automatiquement</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Données de connexion : date et heure d'accès au Service, durée de la session</li>
                  <li>Données techniques : adresse IP, type de navigateur, système d'exploitation, résolution d'écran</li>
                  <li>Données de navigation sur le site web : pages consultées, temps passé, parcours de navigation</li>
                  <li>Données d'activité sur le serveur Discord : salons fréquentés, réactions, interactions avec les bots</li>
                </ul>
                <h3 className="font-display font-semibold text-lg mt-6 mb-3">2.3 Données provenant de tiers</h3>
                <p className="text-muted-foreground leading-relaxed">Nous pouvons recevoir des informations vous concernant de la part de Discord, conformément à leur propre politique de confidentialité et aux autorisations que vous leur avez accordées. Nous pouvons également recevoir des informations de la part de partenaires ou de services tiers intégrés au Service.</p>
              </section>

              <section id="utilisation" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">3. Utilisation des Données</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous utilisons les données personnelles collectées aux fins suivantes :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Fournir, maintenir et améliorer le Service</li>
                  <li>Personnaliser l'expérience utilisateur et adapter le contenu proposé</li>
                  <li>Assurer la modération du serveur Discord et le respect des Conditions d'Utilisation</li>
                  <li>Communiquer avec les Utilisateurs concernant le Service (annonces, mises à jour, événements)</li>
                  <li>Gérer les demandes de contact et de partenariat</li>
                  <li>Analyser l'utilisation du Service à des fins statistiques et d'amélioration continue</li>
                  <li>Détecter, prévenir et résoudre les problèmes techniques et les abus</li>
                  <li>Respecter les obligations légales et réglementaires applicables</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">Nous ne traitons vos données personnelles que dans la mesure où cela est nécessaire aux finalités décrites ci-dessus, et ce conformément aux bases légales applicables (exécution d'un contrat, intérêt légitime, consentement, obligation légale).</p>
              </section>

              <section id="partage" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">4. Partage des Données</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous ne vendons, ne louons et ne commercialisons pas vos données personnelles à des tiers. Cependant, nous pouvons partager vos données dans les circonstances suivantes :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li><strong className="text-foreground">Prestataires de services</strong> : nous pouvons partager vos données avec des prestataires techniques qui nous aident à fournir et améliorer le Service (hébergement, analyse, sécurité). Ces prestataires sont contractuellement tenus de protéger vos données et de ne les utiliser que conformément à nos instructions.</li>
                  <li><strong className="text-foreground">Plateforme Discord</strong> : les données que vous partagez sur le serveur Discord sont soumises aux conditions et à la politique de confidentialité de Discord Inc. Nous n'avons aucun contrôle sur la manière dont Discord traite ces données.</li>
                  <li><strong className="text-foreground">Obligations légales</strong> : nous pouvons divulguer vos données si la loi l'exige, dans le cadre d'une procédure judiciaire, ou à la demande d'une autorité publique compétente.</li>
                  <li><strong className="text-foreground">Protection des droits</strong> : nous pouvons divulguer vos données lorsque nous estimons de bonne foi que cela est nécessaire pour protéger nos droits, votre sécurité ou celle d'autrui, enquêter sur une fraude ou répondre à une demande gouvernementale.</li>
                </ul>
              </section>

              <section id="cookies" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">5. Cookies et Technologies Similaires</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Notre site web utilise des cookies et technologies similaires pour améliorer votre expérience de navigation, analyser l'utilisation du site et personnaliser le contenu. Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web.</p>
                <h3 className="font-display font-semibold text-lg mt-6 mb-3">5.1 Types de cookies utilisés</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li><strong className="text-foreground">Cookies essentiels</strong> : nécessaires au fonctionnement du site web. Ils ne peuvent pas être désactivés.</li>
                  <li><strong className="text-foreground">Cookies analytiques</strong> : nous permettent de comprendre comment les visiteurs interagissent avec le site web, en collectant des informations de manière anonyme.</li>
                  <li><strong className="text-foreground">Cookies de préférences</strong> : permettent au site web de mémoriser vos choix (langue, thème) pour vous offrir une expérience personnalisée.</li>
                </ul>
                <h3 className="font-display font-semibold text-lg mt-6 mb-3">5.2 Gestion des cookies</h3>
                <p className="text-muted-foreground leading-relaxed">Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. La plupart des navigateurs acceptent les cookies par défaut. Le refus de certains cookies peut affecter votre expérience de navigation sur le site web.</p>
              </section>

              <section id="conservation" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">6. Conservation des Données</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous conservons vos données personnelles pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, dans le respect des obligations légales applicables :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Les données de compte et d'activité sur le serveur Discord sont conservées tant que vous êtes membre du serveur, et pendant une période de 12 mois suivant votre départ.</li>
                  <li>Les données de contact sont conservées pendant une durée de 3 ans à compter du dernier contact.</li>
                  <li>Les données de navigation et les logs techniques sont conservés pendant une durée de 13 mois.</li>
                  <li>Les données nécessaires au respect d'obligations légales peuvent être conservées pour la durée requise par la loi.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">À l'expiration de ces délais, vos données personnelles sont supprimées ou anonymisées de manière irréversible.</p>
              </section>

              <section id="securite" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">7. Sécurité des Données</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Ces mesures comprennent notamment :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Le chiffrement des données en transit (HTTPS/SSL) et au repos</li>
                  <li>La limitation de l'accès aux données personnelles aux seules personnes habilitées</li>
                  <li>La mise en place de procédures de sauvegarde régulières</li>
                  <li>La formation et la sensibilisation de l'équipe de modération à la protection des données</li>
                  <li>La surveillance continue des systèmes pour détecter les failles de sécurité</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">Malgré nos efforts, aucune méthode de transmission ou de stockage électronique n'est totalement sûre. Nous ne pouvons garantir la sécurité absolue de vos données personnelles.</p>
              </section>

              <section id="droits" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">8. Vos Droits</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos données personnelles :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li><strong className="text-foreground">Droit d'accès</strong> : vous pouvez demander à accéder aux données personnelles que nous détenons vous concernant.</li>
                  <li><strong className="text-foreground">Droit de rectification</strong> : vous pouvez demander la correction de données inexactes ou incomplètes.</li>
                  <li><strong className="text-foreground">Droit à l'effacement</strong> : vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.</li>
                  <li><strong className="text-foreground">Droit à la limitation du traitement</strong> : vous pouvez demander la limitation du traitement de vos données dans certains cas.</li>
                  <li><strong className="text-foreground">Droit à la portabilité</strong> : vous pouvez demander à recevoir vos données personnelles dans un format structuré et lisible par machine.</li>
                  <li><strong className="text-foreground">Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données personnelles dans certaines circonstances.</li>
                  <li><strong className="text-foreground">Droit de retirer votre consentement</strong> : lorsque le traitement est fondé sur votre consentement, vous pouvez le retirer à tout moment.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour exercer ces droits, veuillez nous contacter via les moyens indiqués à la section 11 ci-dessous. Nous nous efforcerons de répondre à votre demande dans un délai d'un mois. Ce délai peut être prolongé de deux mois en cas de complexité ou de nombre élevé de demandes.</p>
                <p className="text-muted-foreground leading-relaxed">Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD.</p>
              </section>

              <section id="mineurs" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">9. Protection des Mineurs</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Le Service est accessible aux mineurs de 13 ans et plus, conformément aux conditions d'utilisation de Discord. Pour les mineurs de moins de 16 ans résidant dans l'Union européenne, le consentement du titulaire de l'autorité parentale est requis pour le traitement de leurs données personnelles.</p>
                <p className="text-muted-foreground leading-relaxed">Si nous apprenons que nous avons collecté des données personnelles d'un enfant de moins de 13 ans sans le consentement parental approprié, nous prendrons les mesures nécessaires pour supprimer ces informations dans les plus brefs délais.</p>
              </section>

              <section id="modifications" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">10. Modifications de la Politique</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Nous nous réservons le droit de modifier la présente Politique de Confidentialité à tout moment. Les modifications seront publiées sur cette page avec une indication de la date de dernière mise à jour.</p>
                <p className="text-muted-foreground leading-relaxed mb-4">En cas de modification substantielle, nous vous en informerons par le biais d'une notification sur le serveur Discord ou par tout autre moyen approprié. Nous vous encourageons à consulter régulièrement la présente Politique de Confidentialité.</p>
                <p className="text-muted-foreground leading-relaxed">Votre utilisation continue du Service après la publication de modifications constitue votre acceptation de la Politique de Confidentialité modifiée.</p>
              </section>

              <section id="contact" className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4">11. Contact</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Pour toute question relative à la présente Politique de Confidentialité ou pour exercer vos droits, vous pouvez nous contacter via :</p>
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
