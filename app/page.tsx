import CalEmbed from "./cal-embed";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Proof />
      <Process />
      <About />
      <CTA />
      <Footer />
    </>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-navy flex items-center justify-center">
            <span className="text-gold font-serif font-bold text-sm">IC</span>
          </div>
          <span className="font-semibold text-navy text-sm tracking-tight">Ignace Consulting</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-charcoal/70">
          <a href="#probleme" className="hover:text-navy transition-colors">Le problème</a>
          <a href="#solution" className="hover:text-navy transition-colors">La solution</a>
          <a href="#resultats" className="hover:text-navy transition-colors">Résultats</a>
          <a href="#methode" className="hover:text-navy transition-colors">Méthode</a>
        </div>
        <a
          href="#contact"
          className="bg-navy text-white text-sm px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
        >
          Prendre rendez-vous
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-gold rounded-full" />
            Spécialiste CGP exclusivement
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-navy mb-6">
            Vous passez trop de temps à{" "}
            <span className="text-gold">administrer</span> et pas assez à{" "}
            <span className="text-gold">conseiller.</span>
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-10 max-w-2xl">
            On automatise les opérations des Conseillers en Gestion de Patrimoine pour que
            chaque heure que vous récupérez soit une heure dédiée à vos clients.
            Pas des outils. Des résultats mesurables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/calculatrice"
              className="inline-flex items-center justify-center bg-gold text-navy px-8 py-4 rounded-lg text-base font-semibold hover:bg-gold-light transition-colors"
            >
              Calculez ce que vous perdez en admin
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-navy text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-navy-light transition-colors"
            >
              Réservez votre créneau
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const stats = [
    { number: "72%", label: "des CGP passent trop de temps en administratif", source: "OpinionWay" },
    { number: "24%", label: "seulement font de la prospection active", source: "Étude sectorielle" },
    { number: "6-8h", label: "pour un bilan patrimonial fait manuellement", source: "Moyenne constatée" },
  ];

  const pains = [
    {
      title: "L\u2019administratif vous étouffe",
      desc: "Rapports d\u2019adéquation, KYC, conformité AMF, lettres de mission, relances... Vous passez 40 à 50% de votre temps sur des tâches qui ne rapportent rien à vos clients.",
    },
    {
      title: "Votre prospection est au point mort",
      desc: "Vous dépendez du bouche à oreille. Pas de système pour générer des rendez-vous qualifiés régulièrement. Et quand un mois creux arrive, c\u2019est la panique.",
    },
    {
      title: "Les outils se multiplient sans résultat",
      desc: "Un CRM ici, un tableur là, un logiciel de conformité ailleurs. Rien ne communique, tout est en double, et vous perdez du temps au lieu d\u2019en gagner.",
    },
    {
      title: "La réglementation s\u2019alourdit",
      desc: "DDA, MiFID II, LCB-FT, RGPD, ACPR... Les obligations se multiplient. Chaque nouvelle règle ajoute du travail administratif sans ajouter de valeur client.",
    },
  ];

  return (
    <section id="probleme" className="py-20 bg-gray-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            Le constat est sans appel
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Les CGP indépendants perdent des milliers d&apos;heures chaque année sur des tâches
            qui pourraient être automatisées.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.number} className="bg-white rounded-xl p-8 text-center border border-gray-border">
              <div className="text-4xl md:text-5xl font-serif font-bold text-gold mb-3">{s.number}</div>
              <p className="text-charcoal/70 text-sm leading-relaxed">{s.label}</p>
              <p className="text-charcoal/40 text-xs mt-2">{s.source}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pains.map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-8 border border-gray-border">
              <h3 className="font-semibold text-navy text-lg mb-3">{p.title}</h3>
              <p className="text-charcoal/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const pillars = [
    {
      icon: "01",
      title: "Audit opérationnel",
      desc: "On cartographie vos processus actuels, on identifie les goulots d\u2019étranglement et on quantifie le temps perdu. Pas de théorie : des chiffres précis sur votre situation.",
    },
    {
      icon: "02",
      title: "Automatisation sur mesure",
      desc: "On construit des systèmes qui font le travail à votre place : génération de rapports, KYC automatisé, prospection qualifiée, relances clients, suivi réglementaire.",
    },
    {
      icon: "03",
      title: "Suivi et optimisation",
      desc: "Chaque système déployé chez vous est mesuré et optimisé en continu. Heures économisées, rendez-vous générés, CA additionnel : on suit tout, vous voyez tout.",
    },
  ];

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            On ne déploie pas des outils.
            <br />
            <span className="text-gold">On construit le système qui fait tourner votre cabinet.</span>
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Notre approche est simple : on part de votre réalité business, pas de la technologie.
            Chaque heure d&apos;administratif que vous récupérez est une heure de plus
            avec vos clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.icon} className="relative">
              <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center mb-6">
                <span className="text-gold font-serif font-bold">{p.icon}</span>
              </div>
              <h3 className="font-semibold text-navy text-xl mb-3">{p.title}</h3>
              <p className="text-charcoal/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-navy rounded-2xl p-8 md:p-12 text-center">
          <p className="font-serif text-2xl md:text-3xl text-white">
            Vos clients ne vous paient pas pour remplir des formulaires.
            <br />
            <span className="text-gold">Ils vous paient pour les conseiller.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const metrics = [
    { value: "10+", label: "Entreprises accompagnées" },
    { value: "3 000+", label: "Prospects générés" },
    { value: "40+", label: "Processus automatisés" },
    { value: "100%", label: "Autonome après déploiement" },
  ];

  const testimonials = [
    {
      initials: "MR",
      quote: "Ils ont automatisé l\u2019ensemble de nos opérations : CRM, prospection, qualification, relances, suivi. Aujourd\u2019hui tout tourne, je me concentre uniquement sur le closing. Plus de 3 000 prospects générés sans intervention manuelle.",
      name: "Maxime R.",
      role: "Dirigeant — secteur immobilier",
    },
    {
      initials: "SL",
      quote: "On perdait un temps fou sur la conformité et les relances. En 3 semaines, ils ont mis en place un système qui gère tout ça automatiquement. On a récupéré presque 2 jours par semaine.",
      name: "Sophie L.",
      role: "Gérante — cabinet de conseil",
    },
    {
      initials: "TB",
      quote: "Ce qui m\u2019a convaincu, c\u2019est qu\u2019ils comprennent le business avant la technique. Pas de jargon, pas de promesses vagues. Des résultats mesurés dès le premier mois.",
      name: "Thomas B.",
      role: "Fondateur — services aux entreprises",
    },
  ];

  return (
    <section id="resultats" className="py-20 bg-gray-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            Des résultats concrets, pas des promesses
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            On a déjà déployé ces systèmes pour plusieurs entreprises,
            dans différents secteurs. Voici ce qu&apos;ils en disent.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-xl p-6 text-center border border-gray-border">
              <div className="text-2xl md:text-3xl font-serif font-bold text-navy mb-2">{m.value}</div>
              <p className="text-charcoal/50 text-sm">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div key={t.initials} className="bg-white rounded-2xl border border-gray-border p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-gold font-serif font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{t.name}</p>
                  <p className="text-charcoal/40 text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-charcoal/70 leading-relaxed italic text-sm">
                &laquo; {t.quote} &raquo;
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-border p-8">
          <h3 className="font-semibold text-navy mb-6 text-center">Ce que ça change concrètement pour un CGP</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "15 à 20 heures d\u2019administratif récupérées par semaine",
              "Rendez-vous qualifiés générés automatiquement chaque mois",
              "Conformité AMF, ACPR, RGPD gérée sans effort",
              "Suivi client et relances en pilote automatique",
              "Plus de temps pour conseiller, moins pour administrer",
              "Un système qui tourne pendant que vous êtes en rendez-vous",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                <span className="text-charcoal/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      step: "01",
      title: "Échange de 30 minutes",
      desc: "On fait connaissance. Vous nous expliquez votre situation, vos contraintes, vos objectifs. On vous dit honnêtement si on peut vous aider et comment.",
      time: "Gratuit, sans engagement",
    },
    {
      step: "02",
      title: "Audit opérationnel",
      desc: "On cartographie vos processus, on identifie ce qui peut être automatisé, et on chiffre le temps que vous allez récupérer. Vous recevez un rapport clair avec des priorités.",
      time: "1 à 2 semaines",
    },
    {
      step: "03",
      title: "Déploiement du système",
      desc: "On construit vos automatisations une par une, en commençant par celles qui ont le plus d\u2019impact. Vous validez chaque étape. Pas de boîte noire.",
      time: "2 à 6 semaines selon la complexité",
    },
    {
      step: "04",
      title: "Suivi et optimisation",
      desc: "On mesure ensemble les résultats : heures économisées, prospects générés, CA additionnel. Chaque système est optimisé en continu pour maximiser votre retour.",
      time: "Suivi continu",
    },
  ];

  return (
    <section id="methode" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            Comment ça se passe concrètement
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Pas de jargon technique, pas de process compliqué.
            Quatre étapes claires pour transformer vos opérations.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start bg-gray-warm rounded-xl p-8 border border-gray-border"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center">
                  <span className="text-gold font-serif font-bold text-lg">{s.step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-px h-8 bg-navy/10" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-navy text-xl mb-2">{s.title}</h3>
                <p className="text-charcoal/60 leading-relaxed mb-3">{s.desc}</p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-medium">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  {s.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-20 bg-navy">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Pourquoi on s&apos;est spécialisé sur les CGP
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                On a conçu et déployé des systèmes d&apos;automatisation complets pour
                plusieurs entreprises : CRM, prospection automatisée, agents IA vocaux,
                qualification, nurturing, suivi client. Des milliers de prospects générés
                et des activités qui tournent en autonomie complète.
              </p>
              <p>
                On a décidé de se spécialiser exclusivement sur les CGP parce que
                c&apos;est le secteur où l&apos;impact est le plus fort. Votre métier est
                ultra-réglementé, votre temps est précieux, et 90% de vos tâches
                administratives peuvent être automatisées. Vous êtes des experts
                en patrimoine, pas en technologie. Et vous ne devriez pas avoir à l&apos;être.
              </p>
              <p>
                Notre différence : on part toujours du business case avant de toucher à la
                technique. On construit moins et on mesure plus. Chaque automatisation
                déployée produit un résultat mesurable.
              </p>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-gold font-serif text-xl mb-6">Ce qu&apos;on connaît de votre métier</h3>
            <div className="space-y-4">
              {[
                "Conformité AMF, ACPR, MiFID II, DDA",
                "Parcours KYC et rapports d\u2019adéquation",
                "Lettres de mission et bilans patrimoniaux",
                "Obligations LCB-FT et RGPD",
                "Gestion des DER et suivi réglementaire",
                "Cycle de vie client CGP complet",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-gold/20 rounded flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 bg-gold rounded-full" />
                  </span>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-20 bg-gray-warm">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-6">
            Échangeons 30 minutes.
            <br />
            <span className="text-gold">Sans engagement, sans jargon.</span>
          </h2>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
            Choisissez le créneau qui vous convient. Vous nous expliquez votre situation,
            on vous dit honnêtement si on peut vous aider.
          </p>
        </div>
        <CalEmbed />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 bg-navy text-white/40 text-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
            <span className="text-gold font-serif font-bold text-xs">IC</span>
          </div>
          <span>Ignace Consulting — Automatisation IA pour CGP</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Conforme RGPD</span>
          <span>|</span>
          <span>France</span>
          <span>|</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
}
