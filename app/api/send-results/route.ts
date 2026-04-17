import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });
}

function headerHtml() {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:24px 32px;">
<tr><td>
  <table cellpadding="0" cellspacing="0"><tr>
    <td style="background:#000;border:1px solid #333;border-radius:6px;width:32px;height:32px;text-align:center;vertical-align:middle;">
      <span style="color:#C9A84C;font-family:Georgia,serif;font-weight:bold;font-size:13px;">IC</span>
    </td>
    <td style="padding-left:10px;">
      <span style="color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:600;">Ignace Consulting</span>
    </td>
  </tr></table>
</td></tr>
</table>`;
}

function footerHtml() {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:24px 32px;">
<tr><td>
  <p style="margin:0;color:rgba(255,255,255,0.4);font-family:Arial,sans-serif;font-size:12px;line-height:1.6;">
    Aser-Joseph Ignace — Ignace Consulting<br>
    Automatisation IA pour Conseillers en Gestion de Patrimoine<br>
    Conforme RGPD — Vos données ne sont jamais partagées
  </p>
</td></tr>
</table>`;
}

function wrapEmail(body: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F8F7F4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F4;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
${headerHtml()}
<tr><td style="padding:36px 32px;">${body}</td></tr>
${footerHtml()}
</table>
</td></tr>
</table>
</body></html>`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildDiagnosticHtml(answers: any, results: any) {
  const topReco: string[] = [];
  if (results.pasCrm) topReco.push("Mise en place d'un CRM connecté à vos outils — vous récupérez 3 à 5h/semaine en double saisie et recherche d'information");
  if (answers.heuresConformite >= 8) topReco.push("Automatisation de la conformité (KYC, rapports d'adéquation, DER) — les tâches les plus chronophages de votre semaine");
  if (answers.heuresSuivi >= 5) topReco.push("Relances et suivi client en pilote automatique — vos clients sont suivis sans que vous y pensiez");
  if (results.prospectionFaible) topReco.push("Système de prospection automatisé — génération de rendez-vous qualifiés sans effort manuel");
  if (answers.nbClients >= 40) topReco.push("Reporting automatisé pour vos " + answers.nbClients + " clients — fini les heures de mise en forme");

  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#2D2D2D;line-height:1.7;">
  Bonjour,</p>

<p style="margin:0 0 20px;font-size:15px;color:#2D2D2D;line-height:1.7;">
  Voici votre diagnostic opérationnel complet, basé sur les chiffres de votre cabinet.</p>

<!-- Chiffres clés -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8E7;border-left:4px solid #C9A84C;border-radius:8px;padding:20px 24px;margin:0 0 24px;">
<tr><td>
  <p style="margin:0;font-size:28px;font-weight:bold;color:#000;">${results.heuresPerduesAn?.toLocaleString("fr-FR") ?? "0"} heures</p>
  <p style="margin:4px 0 0;color:#666;font-size:14px;">perdues chaque année en tâches administratives</p>
  <p style="margin:12px 0 0;font-size:28px;font-weight:bold;color:#C9A84C;">${results.coutPerduAn?.toLocaleString("fr-FR") ?? "0"} €</p>
  <p style="margin:4px 0 0;color:#666;font-size:14px;">de manque à gagner annuel</p>
</td></tr>
</table>

<!-- Détail situation -->
<h2 style="margin:0 0 16px;color:#000;font-size:17px;">Votre situation actuelle</h2>
<p style="margin:0 0 16px;color:#999;font-size:13px;">Basé sur un CA de ${answers.caAnnuel?.toLocaleString("fr-FR") ?? "-"} € et ${answers.nbClients} clients</p>

<table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;margin:0 0 24px;">
  <tr style="border-bottom:1px solid #E8E6E1;">
    <td style="color:#666;">Heures admin / semaine</td>
    <td align="right" style="font-weight:bold;color:#000;">${results.heuresAdminSemaine}h <span style="color:#999;font-weight:normal;font-size:12px;">(${results.ratioAdmin}% de votre temps)</span></td>
  </tr>
  <tr style="border-bottom:1px solid #E8E6E1;">
    <td style="color:#666;">Coût d'opportunité / heure</td>
    <td align="right" style="font-weight:bold;color:#000;">${results.coutOpportuniteHeure} €/h</td>
  </tr>
  <tr style="border-bottom:1px solid #E8E6E1;">
    <td style="color:#666;">Panier moyen / client</td>
    <td align="right" style="font-weight:bold;color:#000;">${results.panierMoyen?.toLocaleString("fr-FR") ?? "-"} €</td>
  </tr>
  <tr style="border-bottom:1px solid #E8E6E1;">
    <td style="color:#666;">Prospection / semaine</td>
    <td align="right" style="font-weight:bold;color:#000;">${answers.heuresProspection}h</td>
  </tr>
  <tr>
    <td style="color:#666;">CRM en place</td>
    <td align="right" style="font-weight:bold;color:#000;">${answers.utiliseCrm ? "Oui" : "Non"}</td>
  </tr>
</table>

<!-- Ce que vous pouvez récupérer -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F7F0;border-left:4px solid #28A745;border-radius:8px;padding:20px 24px;margin:0 0 24px;">
<tr><td>
  <h3 style="margin:0 0 12px;color:#000;font-size:16px;">Ce que vous pouvez récupérer</h3>
  <p style="margin:0 0 4px;color:#999;font-size:12px;">Taux d'automatisation estimé : ${results.tauxAutomatisation}% ${answers.utiliseCrm ? "(avec CRM existant)" : "(sans CRM en place)"}</p>
  <p style="margin:12px 0 0;font-size:14px;color:#333;line-height:1.8;">
    <strong style="color:#28A745;">${results.heuresLibereesSemaine}h libérées par semaine</strong><br>
    <strong style="color:#28A745;">+${results.clientsSupp} clients supplémentaires</strong> (à ${answers.heuresParClient}h/mois par client)<br>
    <strong style="color:#28A745;">+${results.revenuPotentiel?.toLocaleString("fr-FR") ?? "0"} € de revenu potentiel / an</strong><br>
    <strong style="color:#28A745;">${results.gainAutomatisation?.toLocaleString("fr-FR") ?? "0"} €</strong> de valeur d'automatisation annuelle
  </p>
</td></tr>
</table>

${results.prospectionFaible || results.pasCrm ? `
<!-- Points d'attention -->
<h2 style="margin:0 0 16px;color:#000;font-size:17px;">Points d'attention</h2>
${results.prospectionFaible ? `<p style="margin:0 0 12px;padding:16px 20px;background:#FFF0F0;border-radius:8px;font-size:14px;color:#666;">
  <strong style="color:#DC3545;">Prospection insuffisante :</strong> Vous consacrez moins de 5h/semaine à la prospection. 76% des CGP sont dans cette situation. L'automatisation de la prospection est souvent le levier le plus rentable.
</p>` : ""}
${results.pasCrm ? `<p style="margin:0 0 24px;padding:16px 20px;background:#FFF0F0;border-radius:8px;font-size:14px;color:#666;">
  <strong style="color:#DC3545;">Pas de CRM :</strong> Sans CRM, vous perdez en moyenne 3 à 5 heures supplémentaires par semaine en recherche d'information et double saisie. C'est souvent la première automatisation à mettre en place.
</p>` : ""}
` : ""}

<!-- Recommandations personnalisées (EN PLUS par rapport à la page) -->
<h2 style="margin:0 0 16px;color:#000;font-size:17px;">Nos recommandations pour votre cabinet</h2>
<p style="margin:0 0 16px;font-size:14px;color:#666;line-height:1.6;">
  En fonction de vos réponses, voici les leviers d'automatisation les plus rentables pour vous, par ordre de priorité :</p>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
${topReco.map((r, i) => `<tr><td style="padding:10px 0;font-size:14px;color:#333;line-height:1.6;border-bottom:1px solid #E8E6E1;">
  <span style="color:#C9A84C;font-weight:bold;">${i + 1}.</span>&nbsp; ${r}
</td></tr>`).join("")}
</table>

<p style="margin:0 0 8px;font-size:14px;color:#666;line-height:1.6;">
  Ces recommandations sont basées sur les données de votre cabinet. Un échange de 30 minutes suffit pour définir un plan d'action concret.</p>
`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFollowupHtml(answers: any, results: any) {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#2D2D2D;line-height:1.7;">
  Bonjour,</p>

<p style="margin:0 0 20px;font-size:15px;color:#2D2D2D;line-height:1.7;">
  Suite à votre diagnostic de tout à l'heure.</p>

<p style="margin:0 0 20px;font-size:15px;color:#2D2D2D;line-height:1.7;">
  Votre cabinet perd <strong>${results.heuresPerduesAn?.toLocaleString("fr-FR") ?? "0"} heures par an</strong> en tâches administratives,
  soit un manque à gagner de <strong>${results.coutPerduAn?.toLocaleString("fr-FR") ?? "0"} €</strong>.
  ${results.heuresLibereesSemaine ? `On estime que <strong>${results.heuresLibereesSemaine}h par semaine</strong> peuvent être récupérées.` : ""}</p>

<p style="margin:0 0 20px;font-size:15px;color:#2D2D2D;line-height:1.7;">
  On accompagne des cabinets CGP exactement dans cette situation.
  En 30 minutes, on peut regarder ensemble :</p>

<table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
  <tr><td style="padding:6px 0;font-size:14px;color:#555;line-height:1.6;">
    <span style="color:#C9A84C;font-weight:bold;">→</span>&nbsp; Quelles tâches automatiser en priorité dans votre cas
  </td></tr>
  <tr><td style="padding:6px 0;font-size:14px;color:#555;line-height:1.6;">
    <span style="color:#C9A84C;font-weight:bold;">→</span>&nbsp; Le temps que vous récupérez concrètement dès le premier mois
  </td></tr>
  <tr><td style="padding:6px 0;font-size:14px;color:#555;line-height:1.6;">
    <span style="color:#C9A84C;font-weight:bold;">→</span>&nbsp; Si notre approche correspond à vos besoins
  </td></tr>
</table>

<p style="margin:0 0 24px;font-size:15px;color:#2D2D2D;line-height:1.7;">
  Sans engagement, sans jargon technique.</p>

<table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
<tr><td align="center">
  <a href="https://consultant-ia-cgp.vercel.app/#contact"
     style="display:inline-block;background:#C9A84C;color:#000;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
    Choisir un créneau de 30 minutes
  </a>
</td></tr>
</table>

<p style="margin:0;font-size:15px;color:#2D2D2D;line-height:1.7;">
  Bonne journée,<br>
  <strong>Aser-Joseph Ignace</strong></p>
`);
}

export async function POST(req: NextRequest) {
  const { email, answers, results } = await req.json();

  const transporter = getTransporter();

  try {
    // Email 1: Diagnostic complet (immédiat)
    await transporter.sendMail({
      from: '"Ignace Consulting" <aserignace@gmail.com>',
      to: email,
      subject: `Votre diagnostic CGP : ${results.heuresPerduesAn?.toLocaleString("fr-FR") ?? "0"}h et ${results.coutPerduAn?.toLocaleString("fr-FR") ?? "0"} € perdus par an`,
      html: buildDiagnosticHtml(answers, results),
    });

    // Schedule Email 2: Follow-up 3h après via Supabase
    const sendAt = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString();
    await supabase.from("cgp_followup_queue").insert({
      email,
      answers_json: JSON.stringify(answers),
      results_json: JSON.stringify(results),
      send_at: sendAt,
      sent: false,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Email send error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
