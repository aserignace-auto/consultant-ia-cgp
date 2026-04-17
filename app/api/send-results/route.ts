import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email, answers, results } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F8F7F4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F4;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;">

<!-- Header -->
<tr><td style="background:#1B2A4A;padding:32px 40px;">
  <h1 style="margin:0;color:#C9A84C;font-size:22px;">Votre diagnostic operationnel CGP</h1>
  <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:14px;">Resultats personnalises — Ignace Consulting</p>
</td></tr>

<!-- Alert box -->
<tr><td style="padding:32px 40px 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8E7;border-left:4px solid #C9A84C;border-radius:8px;padding:20px 24px;">
  <tr><td>
    <p style="margin:0;font-size:28px;font-weight:bold;color:#1B2A4A;">${results.heuresPerduesAn.toLocaleString("fr-FR")} heures</p>
    <p style="margin:4px 0 0;color:#666;font-size:14px;">perdues chaque annee en taches administratives</p>
    <p style="margin:12px 0 0;font-size:28px;font-weight:bold;color:#C9A84C;">${results.coutPerduAn.toLocaleString("fr-FR")} EUR</p>
    <p style="margin:4px 0 0;color:#666;font-size:14px;">de manque a gagner annuel</p>
  </td></tr>
  </table>
</td></tr>

<!-- Details -->
<tr><td style="padding:32px 40px;">
  <h2 style="margin:0 0 20px;color:#1B2A4A;font-size:18px;">Votre situation actuelle</h2>
  <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;">
    <tr style="border-bottom:1px solid #E8E6E1;">
      <td style="color:#666;">Clients actifs</td>
      <td align="right" style="font-weight:bold;color:#1B2A4A;">${answers.nbClients}</td>
    </tr>
    <tr style="border-bottom:1px solid #E8E6E1;">
      <td style="color:#666;">Heures conformite / semaine</td>
      <td align="right" style="font-weight:bold;color:#1B2A4A;">${answers.heuresConformite}h</td>
    </tr>
    <tr style="border-bottom:1px solid #E8E6E1;">
      <td style="color:#666;">Heures prospection / semaine</td>
      <td align="right" style="font-weight:bold;color:#1B2A4A;">${answers.heuresProspection}h</td>
    </tr>
    <tr style="border-bottom:1px solid #E8E6E1;">
      <td style="color:#666;">Heures suivi client / semaine</td>
      <td align="right" style="font-weight:bold;color:#1B2A4A;">${answers.heuresSuivi}h</td>
    </tr>
    <tr style="border-bottom:1px solid #E8E6E1;">
      <td style="color:#666;">Taux horaire effectif</td>
      <td align="right" style="font-weight:bold;color:#1B2A4A;">${answers.tauxHoraire} EUR/h</td>
    </tr>
    <tr>
      <td style="color:#666;">CRM en place</td>
      <td align="right" style="font-weight:bold;color:#1B2A4A;">${answers.utiliseCrm ? "Oui" : "Non"}</td>
    </tr>
  </table>
</td></tr>

<!-- Potential -->
<tr><td style="padding:0 40px 32px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F7F0;border-left:4px solid #28A745;border-radius:8px;padding:20px 24px;">
  <tr><td>
    <h3 style="margin:0 0 12px;color:#1B2A4A;font-size:16px;">Ce que vous pouvez recuperer</h3>
    <p style="margin:0;font-size:14px;color:#333;">
      <strong style="color:#28A745;">${results.heuresLiberees}h liberees par semaine</strong> grace a l'automatisation des taches repetitives<br><br>
      <strong style="color:#28A745;">+${results.clientsSupp} clients supplementaires</strong> que vous pourriez gerer avec ce temps recupere<br><br>
      <strong style="color:#28A745;">+${results.revenuPotentiel.toLocaleString("fr-FR")} EUR de revenu potentiel</strong> par an
    </p>
  </td></tr>
  </table>
</td></tr>

${results.prospectionFaible ? `
<!-- Prospection alert -->
<tr><td style="padding:0 40px 24px;">
  <p style="margin:0;padding:16px 20px;background:#FFF0F0;border-radius:8px;font-size:14px;color:#666;">
    <strong style="color:#DC3545;">Point d'attention :</strong> Vous consacrez moins de 5h par semaine a la prospection.
    76% des CGP sont dans cette situation. L'automatisation de la prospection est souvent le levier le plus rentable.
  </p>
</td></tr>
` : ""}

${results.pasCrm ? `
<!-- CRM alert -->
<tr><td style="padding:0 40px 24px;">
  <p style="margin:0;padding:16px 20px;background:#FFF0F0;border-radius:8px;font-size:14px;color:#666;">
    <strong style="color:#DC3545;">Point d'attention :</strong> Sans CRM, vous perdez en moyenne 3 a 5 heures supplementaires par semaine
    en recherche d'information et en double saisie. C'est souvent la premiere automatisation a mettre en place.
  </p>
</td></tr>
` : ""}

<!-- CTA -->
<tr><td style="padding:0 40px 40px;" align="center">
  <p style="color:#666;font-size:14px;margin:0 0 20px;">
    Vous voulez savoir comment recuperer ces ${results.heuresLiberees} heures par semaine concretement ?
  </p>
  <a href="https://consultant-ia-cgp.vercel.app/#contact"
     style="display:inline-block;background:#1B2A4A;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
    Echanger 30 minutes — gratuit
  </a>
  <p style="color:#999;font-size:12px;margin:16px 0 0;">Sans engagement. On regarde ensemble vos priorites.</p>
</td></tr>

<!-- Footer -->
<tr><td style="background:#1B2A4A;padding:24px 40px;">
  <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">
    Aser-Joseph Ignace — Ignace Consulting<br>
    Consultant IA specialise CGP<br>
    Conforme RGPD — Vos donnees ne sont jamais partagees
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: '"Ignace Consulting" <' + process.env.SMTP_USER + ">",
      to: email,
      subject: `Votre diagnostic CGP : ${results.heuresPerduesAn.toLocaleString("fr-FR")}h et ${results.coutPerduAn.toLocaleString("fr-FR")} EUR perdus par an`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ ok: false, error: "Email failed" }, { status: 500 });
  }
}
