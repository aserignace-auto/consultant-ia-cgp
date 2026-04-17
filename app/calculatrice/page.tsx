"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Step = "questions" | "email" | "sending" | "done";

interface Answers {
  nbClients: number;
  caAnnuel: number;
  nbConseillers: number;
  heuresConformite: number;
  heuresProspection: number;
  heuresSuivi: number;
  heuresParClient: number;
  utiliseCrm: boolean;
}

function calcResults(a: Answers) {
  const heuresAdminSemaine = a.heuresConformite + a.heuresSuivi;
  const heuresPerduesAn = heuresAdminSemaine * 46;

  const heuresTravailAn = 46 * 40;
  const heuresFacturablesAn = heuresTravailAn - heuresPerduesAn;
  const coutOpportuniteHeure =
    heuresFacturablesAn > 0 ? a.caAnnuel / heuresFacturablesAn : 0;
  const coutPerduAn = Math.round(heuresPerduesAn * coutOpportuniteHeure);

  const tauxAutomatisation = a.utiliseCrm ? 0.30 : 0.45;
  const heuresLibereesSemaine = Math.round(heuresAdminSemaine * tauxAutomatisation);
  const heuresLibereesMois = heuresLibereesSemaine * 4;

  const tempsParClientMois = a.heuresParClient > 0 ? a.heuresParClient : 2;
  const clientsSupp = Math.round(heuresLibereesMois / tempsParClientMois);

  const panierMoyen =
    a.nbClients > 0 ? Math.round(a.caAnnuel / a.nbClients) : 0;
  const revenuPotentiel = clientsSupp * panierMoyen;

  const gainAutomatisation = Math.round(
    heuresLibereesSemaine * 46 * coutOpportuniteHeure
  );

  return {
    heuresAdminSemaine,
    heuresPerduesAn,
    coutOpportuniteHeure: Math.round(coutOpportuniteHeure),
    coutPerduAn,
    tauxAutomatisation: Math.round(tauxAutomatisation * 100),
    heuresLibereesSemaine,
    clientsSupp,
    panierMoyen,
    revenuPotentiel,
    gainAutomatisation,
    prospectionFaible: a.heuresProspection < 5,
    pasCrm: !a.utiliseCrm,
    ratioAdmin: Math.round((heuresAdminSemaine / 40) * 100),
  };
}

export default function Calculatrice() {
  const [step, setStep] = useState<Step>("questions");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    nbClients: 30,
    caAnnuel: 150000,
    nbConseillers: 1,
    heuresConformite: 8,
    heuresProspection: 3,
    heuresSuivi: 6,
    heuresParClient: 2,
    utiliseCrm: false,
  });
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const questions = [
    {
      key: "nbClients" as const,
      label: "Combien de clients actifs gérez-vous ?",
      subtitle: "Clients avec un mandat en cours ou un suivi régulier",
      min: 5,
      max: 500,
      step: 5,
      unit: "clients",
      format: (v: number) => `${v}`,
    },
    {
      key: "caAnnuel" as const,
      label: "Quel est le chiffre d'affaires annuel de votre cabinet ?",
      subtitle: "Honoraires, commissions, rétrocessions — total brut annuel",
      min: 30000,
      max: 1000000,
      step: 10000,
      unit: "EUR/an",
      format: (v: number) => v.toLocaleString("fr-FR"),
    },
    {
      key: "nbConseillers" as const,
      label: "Combien de conseillers dans votre cabinet ?",
      subtitle: "Vous compris. 1 si vous etes independant",
      min: 1,
      max: 10,
      step: 1,
      unit: "conseillers",
      format: (v: number) => `${v}`,
    },
    {
      key: "heuresConformite" as const,
      label: "Combien d'heures par semaine passez-vous en conformité ?",
      subtitle: "KYC, rapports d'adéquation, DER, lettres de mission, LCB-FT",
      min: 0,
      max: 30,
      step: 1,
      unit: "heures/semaine",
      format: (v: number) => `${v}`,
    },
    {
      key: "heuresProspection" as const,
      label: "Combien d'heures par semaine consacrez-vous à la prospection ?",
      subtitle: "Recherche de nouveaux clients, networking, relances prospects",
      min: 0,
      max: 20,
      step: 1,
      unit: "heures/semaine",
      format: (v: number) => `${v}`,
    },
    {
      key: "heuresSuivi" as const,
      label: "Combien d'heures par semaine pour le suivi client ?",
      subtitle: "Relances, mises à jour dossiers, reporting, préparation de rendez-vous",
      min: 0,
      max: 25,
      step: 1,
      unit: "heures/semaine",
      format: (v: number) => `${v}`,
    },
    {
      key: "heuresParClient" as const,
      label: "Combien d'heures par mois consacrez-vous en moyenne par client ?",
      subtitle: "Tout compris : rendez-vous, suivi, bilans, rebalancing, reporting, appels",
      min: 1,
      max: 10,
      step: 0.5,
      unit: "heures/mois/client",
      format: (v: number) => `${v}`,
    },
  ];

  const totalQuestions = questions.length + 1;

  const handleSlider = (key: keyof Answers, value: number) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCrmQuestion = () => {
    setStep("email");
  };

  const handleSubmitEmail = async () => {
    if (!email || !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }
    setError("");
    setStep("sending");

    const results = calcResults(answers);

    try {
      await supabase.from("cgp_leads").insert({
        email,
        nb_clients: answers.nbClients,
        heures_conformite: answers.heuresConformite,
        heures_prospection: answers.heuresProspection,
        heures_suivi: answers.heuresSuivi,
        taux_horaire: results.coutOpportuniteHeure,
        utilise_crm: answers.utiliseCrm,
        heures_perdues_an: results.heuresPerduesAn,
        cout_perdu_an: results.coutPerduAn,
        clients_supplementaires: results.clientsSupp,
      });

      try {
        await fetch("/api/send-results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, answers, results }),
        });
      } catch {
        // Email send may fail (SMTP quota), results shown on page regardless
      }

      setStep("done");
    } catch {
      setStep("done");
    }
  };

  const results = calcResults(answers);
  const progress =
    step === "questions"
      ? ((questionIdx + 1) / totalQuestions) * 100
      : step === "email"
        ? 95
        : 100;

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-[#E8E6E1]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#1B2A4A] flex items-center justify-center">
              <span className="text-[#C9A84C] font-serif font-bold text-sm">IC</span>
            </div>
            <span className="font-semibold text-[#1B2A4A] text-sm">Ignace Consulting</span>
          </a>
          <a href="/" className="text-sm text-[#2D2D2D]/50 hover:text-[#1B2A4A]">
            Retour au site
          </a>
        </div>
      </nav>

      <div className="pt-28 pb-20 max-w-2xl mx-auto px-6">
        <div className="w-full bg-[#E8E6E1] rounded-full h-1.5 mb-12">
          <div
            className="bg-[#C9A84C] h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {step === "questions" && questionIdx < questions.length && (
          <div className="animate-in">
            <p className="text-[#C9A84C] text-sm font-medium mb-4">
              Question {questionIdx + 1} sur {totalQuestions}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1B2A4A] mb-3">
              {questions[questionIdx].label}
            </h2>
            <p className="text-[#2D2D2D]/50 mb-10">{questions[questionIdx].subtitle}</p>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <span className="text-5xl font-serif font-bold text-[#1B2A4A]">
                  {questions[questionIdx].format(answers[questions[questionIdx].key] as number)}
                </span>
                <span className="text-[#2D2D2D]/40 text-sm">{questions[questionIdx].unit}</span>
              </div>
              <input
                type="range"
                min={questions[questionIdx].min}
                max={questions[questionIdx].max}
                step={questions[questionIdx].step}
                value={answers[questions[questionIdx].key] as number}
                onChange={(e) =>
                  handleSlider(questions[questionIdx].key, Number(e.target.value))
                }
                className="w-full h-2 bg-[#E8E6E1] rounded-lg appearance-none cursor-pointer accent-[#1B2A4A]"
              />
              <div className="flex justify-between text-xs text-[#2D2D2D]/30 mt-2">
                <span>{questions[questionIdx].format(questions[questionIdx].min)}</span>
                <span>{questions[questionIdx].format(questions[questionIdx].max)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              {questionIdx > 0 && (
                <button
                  onClick={() => setQuestionIdx((i) => i - 1)}
                  className="px-6 py-3 rounded-lg border-2 border-[#1B2A4A]/15 text-[#1B2A4A] font-medium hover:border-[#1B2A4A]/30 transition-colors"
                >
                  Précédent
                </button>
              )}
              <button
                onClick={() => {
                  if (questionIdx < questions.length - 1) {
                    setQuestionIdx((i) => i + 1);
                  } else {
                    setQuestionIdx(questions.length);
                  }
                }}
                className="flex-1 px-6 py-3 rounded-lg bg-[#1B2A4A] text-white font-medium hover:bg-[#243556] transition-colors"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === "questions" && questionIdx >= questions.length && (
          <div>
            <p className="text-[#C9A84C] text-sm font-medium mb-4">
              Question {totalQuestions} sur {totalQuestions}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1B2A4A] mb-3">
              Utilisez-vous un CRM pour gérer vos clients ?
            </h2>
            <p className="text-[#2D2D2D]/50 mb-10">
              Un logiciel dédié (Harvest, O2S, Salesforce...) ou des tableurs Excel / Google Sheets
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => {
                  setAnswers((p) => ({ ...p, utiliseCrm: true }));
                  handleCrmQuestion();
                }}
                className={`p-6 rounded-xl border-2 text-center transition-all ${
                  answers.utiliseCrm
                    ? "border-[#1B2A4A] bg-[#1B2A4A]/5"
                    : "border-[#E8E6E1] hover:border-[#1B2A4A]/30"
                }`}
              >
                <div className="text-2xl mb-2">✓</div>
                <span className="font-medium text-[#1B2A4A]">Oui, un CRM</span>
              </button>
              <button
                onClick={() => {
                  setAnswers((p) => ({ ...p, utiliseCrm: false }));
                  handleCrmQuestion();
                }}
                className={`p-6 rounded-xl border-2 text-center transition-all ${
                  !answers.utiliseCrm
                    ? "border-[#1B2A4A] bg-[#1B2A4A]/5"
                    : "border-[#E8E6E1] hover:border-[#1B2A4A]/30"
                }`}
              >
                <div className="text-2xl mb-2">✗</div>
                <span className="font-medium text-[#1B2A4A]">Non, tableurs / papier</span>
              </button>
            </div>

            <button
              onClick={() => setQuestionIdx((i) => i - 1)}
              className="px-6 py-3 rounded-lg border-2 border-[#1B2A4A]/15 text-[#1B2A4A] font-medium hover:border-[#1B2A4A]/30 transition-colors"
            >
              Précédent
            </button>
          </div>
        )}

        {step === "email" && (
          <div>
            <div className="bg-[#F8F7F4] rounded-2xl p-8 border border-[#E8E6E1] mb-10">
              <p className="text-[#C9A84C] text-sm font-medium mb-4">Aperçu de vos résultats</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-serif font-bold text-[#1B2A4A]">
                    {results.heuresPerduesAn.toLocaleString("fr-FR")}h
                  </p>
                  <p className="text-[#2D2D2D]/50 text-sm">perdues par an en admin</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-[#C9A84C]">
                    {results.coutPerduAn.toLocaleString("fr-FR")} €
                  </p>
                  <p className="text-[#2D2D2D]/50 text-sm">de manque à gagner annuel</p>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-[#1B2A4A] mb-3">
              Recevez votre diagnostic complet par email
            </h2>
            <p className="text-[#2D2D2D]/50 mb-8">
              Analyse détaillée de votre situation, recommandations personnalisées,
              et plan d&apos;action concret pour récupérer ces heures.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitEmail()}
                className="flex-1 px-5 py-4 rounded-lg border-2 border-[#E8E6E1] focus:border-[#1B2A4A] outline-none text-[#1B2A4A] placeholder:text-[#2D2D2D]/30"
              />
              <button
                onClick={handleSubmitEmail}
                className="px-8 py-4 rounded-lg bg-[#C9A84C] text-[#1B2A4A] font-semibold hover:bg-[#D4B86A] transition-colors whitespace-nowrap"
              >
                Recevoir mon diagnostic
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <p className="text-[#2D2D2D]/30 text-xs mt-4">
              Vos données sont confidentielles et ne seront jamais partagées. Conforme RGPD.
            </p>
          </div>
        )}

        {step === "sending" && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#E8E6E1] border-t-[#1B2A4A] rounded-full animate-spin mx-auto mb-6" />
            <p className="text-[#1B2A4A] font-serif text-xl">Préparation de votre diagnostic...</p>
          </div>
        )}

        {step === "done" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-[#C9A84C] text-3xl">✓</span>
            </div>
            <h2 className="font-serif text-3xl text-[#1B2A4A] mb-4">
              Votre diagnostic complet
            </h2>
            <p className="text-[#2D2D2D]/60 mb-8 max-w-md mx-auto">
              Voici l&apos;analyse détaillée de votre situation basée sur vos chiffres réels.
            </p>

            <div className="bg-[#F8F7F4] rounded-2xl p-8 border border-[#E8E6E1] mb-6 text-left max-w-lg mx-auto">
              <h3 className="font-semibold text-[#1B2A4A] mb-1">Votre situation actuelle</h3>
              <p className="text-[#2D2D2D]/40 text-xs mb-4">Basé sur un CA de {answers.caAnnuel.toLocaleString("fr-FR")} EUR et {answers.nbClients} clients</p>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#2D2D2D]/60">Heures admin / semaine</span>
                  <span className="font-semibold text-[#1B2A4A]">{results.heuresAdminSemaine}h <span className="text-[#2D2D2D]/40 font-normal text-xs">({results.ratioAdmin}% de votre temps)</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2D2D2D]/60">Heures perdues / an</span>
                  <span className="font-semibold text-[#1B2A4A]">{results.heuresPerduesAn.toLocaleString("fr-FR")}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2D2D2D]/60">Coût d&apos;opportunite / heure</span>
                  <span className="font-semibold text-[#1B2A4A]">{results.coutOpportuniteHeure} EUR/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2D2D2D]/60">Manque à gagner annuel</span>
                  <span className="font-semibold text-[#C9A84C] text-lg">{results.coutPerduAn.toLocaleString("fr-FR")} €</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F0F7F0] rounded-2xl p-8 border border-green-200 mb-6 text-left max-w-lg mx-auto">
              <h3 className="font-semibold text-[#1B2A4A] mb-1">Ce que vous pouvez récupérer</h3>
              <p className="text-[#2D2D2D]/40 text-xs mb-4">Taux d&apos;automatisation estime : {results.tauxAutomatisation}% {answers.utiliseCrm ? '(avec CRM existant)' : '(sans CRM en place)'}</p>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#2D2D2D]/60">Heures libérées / semaine</span>
                  <span className="font-semibold text-green-600">{results.heuresLibereesSemaine}h</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[#2D2D2D]/60">Clients supplémentaires possibles</span>
                  <div className="text-right">
                    <span className="font-semibold text-green-600">+{results.clientsSupp}</span>
                    <p className="text-[#2D2D2D]/40 text-xs">a {answers.heuresParClient}h/mois par client</p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[#2D2D2D]/60">Revenu potentiel supplémentaire</span>
                  <div className="text-right">
                    <span className="font-semibold text-green-600 text-lg">+{results.revenuPotentiel.toLocaleString("fr-FR")} €/an</span>
                    <p className="text-[#2D2D2D]/40 text-xs">panier moyen {results.panierMoyen.toLocaleString("fr-FR")} EUR/client</p>
                  </div>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between">
                  <span className="text-[#2D2D2D]/60">Valeur de l&apos;automatisation</span>
                  <span className="font-semibold text-green-700 text-lg">{results.gainAutomatisation.toLocaleString("fr-FR")} €/an</span>
                </div>
              </div>
            </div>

            {(results.prospectionFaible || results.pasCrm) && (
              <div className="bg-[#FFF8F0] rounded-2xl p-8 border border-orange-200 mb-6 text-left max-w-lg mx-auto">
                <h3 className="font-semibold text-[#1B2A4A] mb-4">Points d&apos;attention</h3>
                <div className="space-y-3 text-sm">
                  {results.prospectionFaible && (
                    <p className="text-[#2D2D2D]/70">
                      <strong className="text-orange-600">Prospection insuffisante :</strong> Vous consacrez moins de 5h/semaine a la prospection. 76% des CGP sont dans cette situation. L&apos;automatisation de la prospection est souvent le levier le plus rentable.
                    </p>
                  )}
                  {results.pasCrm && (
                    <p className="text-[#2D2D2D]/70">
                      <strong className="text-orange-600">Pas de CRM :</strong> Sans CRM, vous perdez en moyenne 3 a 5 heures supplémentaires par semaine en recherche d&apos;information et double saisie. C&apos;est souvent la première automatisation à mettre en place.
                    </p>
                  )}
                </div>
              </div>
            )}

            <a
              href="/#contact"
              className="inline-flex items-center justify-center bg-[#1B2A4A] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#243556] transition-colors"
            >
              Échanger sur vos résultats — 30 min gratuites
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
