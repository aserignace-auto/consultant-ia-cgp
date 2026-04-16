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
          <a href="#probleme" className="hover:text-navy transition-colors">Le probleme</a>
          <a href="#solution" className="hover:text-navy transition-colors">La solution</a>
          <a href="#resultats" className="hover:text-navy transition-colors">Resultats</a>
          <a href="#methode" className="hover:text-navy transition-colors">Methode</a>
        </div>
        <a
          href="#contact"
          className="bg-navy text-white text-sm px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
        >
          Echanger 20 min
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
            Specialiste CGP exclusivement
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-navy mb-6">
            Vous passez trop de temps a{" "}
            <span className="text-gold">administrer</span> et pas assez a{" "}
            <span className="text-gold">conseiller.</span>
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-10 max-w-2xl">
            J&apos;automatise les operations des Conseillers en Gestion de Patrimoine pour que
            chaque heure que vous recuperez soit une heure dediee a vos clients.
            Pas des outils. Des resultats mesurables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-navy text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-navy-light transition-colors"
            >
              Reservez un echange de 20 minutes
            </a>
            <a
              href="#resultats"
              className="inline-flex items-center justify-center border-2 border-navy/15 text-navy px-8 py-4 rounded-lg text-base font-medium hover:border-navy/30 transition-colors"
            >
              Voir les resultats
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
    { number: "24%", label: "seulement font de la prospection active", source: "Etude sectorielle" },
    { number: "6-8h", label: "pour un bilan patrimonial fait manuellement", source: "Moyenne constatee" },
  ];

  const pains = [
    {
      title: "L'administratif vous etouffe",
      desc: "Rapports d'adequation, KYC, conformite AMF, lettres de mission, relances... Vous passez 40 a 50% de votre temps sur des taches qui ne rapportent rien a vos clients.",
    },
    {
      title: "Votre prospection est au point mort",
      desc: "Vous dependez du bouche a oreille. Pas de systeme pour generer des rendez-vous qualifies regulierement. Et quand un mois creux arrive, c'est la panique.",
    },
    {
      title: "Les outils se multiplient sans resultat",
      desc: "Un CRM ici, un tableur la, un logiciel de conformite ailleurs. Rien ne communique, tout est en double, et vous perdez du temps au lieu d'en gagner.",
    },
    {
      title: "La reglementation s'alourdit",
      desc: "DDA, MiFID II, LCB-FT, RGPD, ACPR... Les obligations se multiplient. Chaque nouvelle regle ajoute du travail administratif sans ajouter de valeur client.",
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
            Les CGP independants perdent des milliers d&apos;heures chaque annee sur des taches
            qui pourraient etre automatisees.
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
      title: "Audit operationnel",
      desc: "Je cartographie vos processus actuels, identifie les goulots d'etranglement et quantifie le temps perdu. Pas de theorie : des chiffres precis sur votre situation.",
    },
    {
      icon: "02",
      title: "Automatisation sur mesure",
      desc: "Je construis des systemes qui font le travail a votre place : generation de rapports, KYC automatise, prospection qualifiee, relances clients, suivi reglementaire.",
    },
    {
      icon: "03",
      title: "Mesure et optimisation",
      desc: "Chaque automatisation est mesuree : heures economisees, rendez-vous generes, CA additionnel. Si un systeme ne produit pas de resultats, je le change.",
    },
  ];

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            Je ne deploie pas des outils.
            <br />
            <span className="text-gold">Je construis le systeme qui fait tourner votre cabinet.</span>
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Mon approche est simple : je pars de votre realite business, pas de la technologie.
            Chaque heure d&apos;administratif que vous recuperez est une heure de plus
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
          <p className="font-serif text-2xl md:text-3xl text-white mb-4">
            &laquo; Ce qu&apos;un client achete, ce n&apos;est pas des automatisations.
            <br />
            <span className="text-gold">C&apos;est des resultats mesurables. &raquo;</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const metrics = [
    { value: "3 000+", label: "Prospects generes" },
    { value: "40+", label: "Processus automatises" },
    { value: "5 000 €/mois", label: "Contrat garanti + 1% CA" },
    { value: "0", label: "Intervention manuelle au quotidien" },
  ];

  return (
    <section id="resultats" className="py-20 bg-gray-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            Ce que j&apos;ai construit pour Leads Machine
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Avant de vous parler de ce que je peux faire pour votre cabinet,
            voici ce que j&apos;ai deja prouve.
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

        <div className="bg-white rounded-2xl border border-gray-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
              <span className="text-gold font-serif font-bold text-xl">MR</span>
            </div>
            <div>
              <p className="text-charcoal/80 text-lg leading-relaxed italic mb-6">
                &laquo; Ignace a construit l&apos;integralite de notre systeme : site web, CRM,
                40+ automatisations, agent vocal IA, scraping de leads, setter IA Instagram.
                Resultat : plus de 3 000 prospects generes, je ne fais plus qu&apos;a closer.
                Il comprend le business avant la technique, et il mesure tout. &raquo;
              </p>
              <div>
                <p className="font-semibold text-navy">Maxime Rumpler</p>
                <p className="text-charcoal/50 text-sm">Fondateur, Leads Machine — Immobilier</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-border p-8">
            <h3 className="font-semibold text-navy mb-4">Ce que j&apos;ai automatise</h3>
            <ul className="space-y-3 text-charcoal/60">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Generation de leads qualifies via scraping intelligent
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Agent vocal IA pour la qualification telephonique
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Setter IA Instagram pour l&apos;engagement automatique
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                CRM complet avec 40+ workflows automatises
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Campagnes email avec nurturing automatise
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-border p-8">
            <h3 className="font-semibold text-navy mb-4">Ce que ca change pour un CGP</h3>
            <ul className="space-y-3 text-charcoal/60">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                15 a 20 heures d&apos;administratif recuperees par semaine
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Rendez-vous qualifies generes automatiquement chaque mois
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Conformite AMF, ACPR, RGPD geree sans effort
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Suivi client et relances en pilote automatique
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </span>
                Un systeme qui tourne pendant que vous conseillez
              </li>
            </ul>
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
      title: "Echange de 20 minutes",
      desc: "On fait connaissance. Vous m'expliquez votre situation, vos douleurs, vos objectifs. Je vous dis honnêtement si je peux vous aider et comment.",
      time: "Gratuit, sans engagement",
    },
    {
      step: "02",
      title: "Audit operationnel",
      desc: "Je cartographie vos processus, identifie ce qui peut etre automatise, et chiffre le temps que vous allez recuperer. Vous recevez un rapport clair avec des priorites.",
      time: "1 a 2 semaines",
    },
    {
      step: "03",
      title: "Construction du systeme",
      desc: "Je construis vos automatisations une par une, en commencant par celles qui ont le plus d'impact. Vous validez chaque etape. Pas de boite noire.",
      time: "2 a 6 semaines selon la complexite",
    },
    {
      step: "04",
      title: "Mesure et ajustement",
      desc: "On mesure ensemble les resultats : heures economisees, prospects generes, CA additionnel. Ce qui ne produit pas de resultats est ajuste ou remplace.",
      time: "Suivi continu",
    },
  ];

  return (
    <section id="methode" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            Comment ca se passe concretement
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            Pas de jargon technique, pas de process complique.
            Quatre etapes claires pour transformer vos operations.
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
              Pourquoi je me suis specialise sur les CGP
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Je suis Aser-Joseph Ignace. J&apos;ai construit le systeme complet de Leads Machine
                de zero : site web, CRM, 40+ automatisations, agent vocal IA, setter Instagram.
                Resultat : plus de 3 000 prospects generes et un contrat a 5 000 euros par mois
                plus 1% du chiffre d&apos;affaires.
              </p>
              <p>
                J&apos;ai choisi de me specialiser sur les CGP parce que c&apos;est un metier ou
                l&apos;IA et l&apos;automatisation peuvent changer la donne completement.
                Vous etes des experts en patrimoine, pas en technologie.
                Et vous ne devriez pas avoir a l&apos;etre.
              </p>
              <p>
                Ma difference : je pars toujours du business case avant de toucher a la
                technique. Je construis moins et je mesure plus. Si une automatisation ne
                produit pas de resultat mesurable, je la change.
              </p>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-gold font-serif text-xl mb-6">Ce que je connais de votre metier</h3>
            <div className="space-y-4">
              {[
                "Conformite AMF, ACPR, MiFID II, DDA",
                "Parcours KYC et rapports d'adequation",
                "Lettres de mission et bilans patrimoniaux",
                "Obligations LCB-FT et RGPD",
                "Gestion des DER et suivi reglementaire",
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
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-navy mb-6">
          Echangeons 20 minutes.
          <br />
          <span className="text-gold">Sans engagement, sans jargon.</span>
        </h2>
        <p className="text-charcoal/60 text-lg mb-10 max-w-xl mx-auto">
          Vous m&apos;expliquez votre situation, je vous dis honnêtement si je peux vous aider
          et comment. Si ce n&apos;est pas le bon moment, pas de probleme.
        </p>
        <a
          href="mailto:aserignace@gmail.com?subject=Echange%2020%20minutes%20-%20CGP&body=Bonjour%20Aser-Joseph%2C%0A%0AJe%20suis%20CGP%20et%20j%27aimerais%20echanger%20avec%20vous%20sur%20l%27automatisation%20de%20mes%20operations.%0A%0AMes%20principales%20problematiques%20sont%20%3A%0A-%20%0A%0ACordialement"
          className="inline-flex items-center justify-center bg-gold text-navy px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light transition-colors"
        >
          Reservez votre echange gratuit
        </a>
        <p className="text-charcoal/40 text-sm mt-6">
          Ou ecrivez-moi directement : aserignace@gmail.com
        </p>
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
          <span>Ignace Consulting — Consultant IA pour CGP</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Conforme RGPD</span>
          <span>|</span>
          <span>Vienne, France</span>
          <span>|</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
}
