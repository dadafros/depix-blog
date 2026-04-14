---
title: "How the DePix App Protects You Against Scams"
description: "Learn about common Pix payment scams in Brazil and how the DePix App's security measures protect users with a 24-hour safety window."
date: 2026-03-30
lastmod: 2026-03-30
tags: ["security", "scams", "pix", "depix"]
author: "DePix"
slug: "how-depix-protects-against-scams"
translationKey: "protect-against-scams"
image: "/images/posts/protect-against-scams/protect-against-scams-16x9.png"
images:
  - "/images/posts/protect-against-scams/protect-against-scams-1x1.png"
  - "/images/posts/protect-against-scams/protect-against-scams-4x3.png"
  - "/images/posts/protect-against-scams/protect-against-scams-16x9.png"
draft: false
---

Brazil's instant payment system, Pix, moves money in seconds. That speed is great for legitimate transactions — but it also creates opportunities for scammers. In the first half of 2025 alone, Brazil recorded over 2 million scam cases, and the numbers keep climbing.

If you use any Pix-based service, understanding how scams work and how to protect yourself is essential. In this post, we explain the most common fraud patterns, how the [DePix App](/en/posts/what-is-depix/) handles them, and what you can do to stay safe.

## The scam epidemic hitting Brazil

Fraud in Brazil's digital payments space has exploded. The standout category is fake sales, which accounted for roughly 174,000 cases in the first half of 2025 — a staggering 314% increase compared to previous periods. The pattern is disturbingly simple and effective.

Here is how it typically works: a scammer lists a product on Instagram, WhatsApp, or a marketplace at an attractive price. They chat with the victim, build just enough trust, and then share a Pix QR code for payment. The victim scans, confirms, and the money leaves their account instantly. The product, of course, never arrives.

It is important to understand that this type of scam is not specific to any one platform or payment processor. The scammer could use any service that accepts Pix — a bank account, a fintech app, a crypto on-ramp, or a simple merchant QR code. The fraud happens at the social engineering level, not at the payment rail level.

Victims sometimes see a company name on their bank statement and assume that company is responsible for the scam. But that is like blaming Visa because a fraudulent online store charged your credit card. The payment processor is infrastructure — the scam originates with the person who tricked you into paying.

That said, responsible payment processors can and should build safeguards. And that is exactly what DePix does.

## The 24-hour security window

One of the most important security features of the DePix App is its processing delay. When someone deposits Brazilian reais via Pix, the corresponding DePix tokens are **not** sent immediately.

{{< diagram alt="DePix App 24-hour security window timeline: Pix received, anti-fraud verification period, decision to block via MED or release tokens" caption="Security window: how the 24-hour verification period protects against fraud." >}}
<div class="d-flow-row">
  <div class="d-step dark">Pix received</div>
  <div class="d-arrow">0–24h</div>
  <div class="d-step warn">Anti-fraud verification</div>
  <div class="d-arrow"></div>
  <div class="d-step muted">Fraud detected?</div>
</div>
<div class="d-compare" style="margin-top:1rem">
  <div class="d-compare-card negative">
    <div class="d-compare-title">Yes</div>
    <div class="d-compare-item"><span class="icon">✗</span> Blocked — MED activated</div>
  </div>
  <div class="d-compare-card positive">
    <div class="d-compare-title">No</div>
    <div class="d-compare-item"><span class="icon">✓</span> DePix released to wallet</div>
  </div>
</div>
{{< /diagram >}}

There is a processing period of up to 24 hours (known as D+1 settlement).¹ During this window, the DePix system checks for fraud reports associated with the incoming payment. If the Pix transfer gets flagged — for example, through Brazil's official fraud reversal mechanism — DePix can block the transaction and return the funds to the victim's bank.

Why does this matter? Because cryptocurrency transactions are irreversible. Once tokens are sent to a blockchain wallet, there is no "undo" button. Without this safety buffer, a scammer could receive Pix funds, instantly convert them to crypto, and disappear with no possibility of recovery.

The 24-hour window protects everyone involved:

- **Scam victims** get a chance to report the fraud and recover their money before it becomes irreversible.
- **Honest users** benefit from a platform that takes compliance seriously and is not associated with facilitating fraud.
- **The DePix ecosystem** maintains its integrity and trustworthiness.

Is 24 hours a long time to wait? For legitimate users, it is a minor inconvenience. For fraud prevention, it is the difference between recoverable and gone forever.

## MED: Brazil's Special Return Mechanism

Brazil's central bank created a specific tool to deal with Pix fraud: the MED, or Mecanismo Especial de Devolucao (Special Return Mechanism).² Here is how it works.

When a victim realizes they have been scammed, they contact their bank and report the fraudulent Pix transaction. The victim's bank then notifies the receiving institution — whichever bank or payment processor received the funds. Once notified, the receiving institution blocks the funds for analysis. This review period can last up to 7 business days, during which both sides present their case.

If the fraud is confirmed, the funds are returned to the victim. If the claim is unfounded, the funds are released normally.

Starting in February 2026, an upgraded version called **MED 2.0** became mandatory for all Pix participants.³ The key improvement is traceability: MED 2.0 can now trace and block funds across up to 5 successive transfers. This means that even if a scammer quickly moves money through multiple accounts to try to hide the trail, the system can follow the chain and freeze the funds at their final destination.

This is a significant step forward. Previously, scammers could defeat MED simply by transferring the money to another account before the block arrived. MED 2.0 closes that loophole.

DePix's 24-hour processing window works hand in hand with MED. Because funds are held before tokens are issued, there is ample time for the MED process to flag a suspicious transaction. If a fraud report comes in during that window, DePix cooperates fully with the reversal process.

## How to protect yourself

No security system is perfect, and the best defense against scams starts with your own awareness. Here are practical steps to keep yourself safe:

**Before you pay:**

- **Never pay unknown sellers on social media via Pix.** If someone you have never met is selling something on Instagram or WhatsApp and asks for Pix payment, treat it as high risk. Use platforms with buyer protection instead.
- **Verify the seller's identity.** Check reviews, ask for references, look for a real business registration. A legitimate seller will not mind providing proof of identity.
- **If it seems too good to be true, it probably is.** A brand-new iPhone for half price, concert tickets at 70% off, a rental apartment way below market rate — these are classic bait.
- **Be skeptical of urgency.** Scammers pressure you to pay quickly before you have time to think. A real seller will give you time.

**If you have already been scammed:**

- **Report to your bank immediately.** The faster you act, the higher the chance of recovery through MED. Every hour counts.
- **Request a MED reversal.** Explicitly tell your bank you want to trigger the Special Return Mechanism for the fraudulent Pix transaction.
- **File a police report.** This creates an official record and can help with the investigation.
- **Do not try to "negotiate" with the scammer.** Once they have your money, engaging further only wastes your time or exposes you to more manipulation.

Understanding how [financial privacy](/en/posts/financial-privacy-depix/) tools work is also part of protecting yourself. When you know what happens to your money at each step, you are better equipped to spot when something is wrong.

## Transparency builds trust

DePix exists to give people [financial privacy](/en/posts/financial-privacy-depix/) — the ability to transact without exposing every detail of their financial life to the banking system. But privacy does not mean lawlessness.

The 24-hour security window, full cooperation with MED, and clear communication about how the system works are all part of building a service that honest users can trust. Scammers exploit every payment system — from cash to credit cards to Pix to crypto. The question is not whether fraud attempts will happen, but how a platform responds when they do.

DePix responds with transparency, compliance, and a deliberate security buffer that prioritizes protecting victims over processing speed.

## References

1. [DePix App — security features and D+1 processing](https://depixapp.com/)
2. [Banco Central do Brasil — MED (Mecanismo Especial de Devolucao)](https://www.bcb.gov.br/estabilidadefinanceira/pix)
3. [Banco Central do Brasil — Resolucao BCB n. 403/2024 (MED 2.0)](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=403)

## Your financial privacy starts here

Pix has convenience — DePix has privacy. Stop exposing every transaction to the banking system and start using digital money that only you control. Visit [depixapp.com](https://depixapp.com/).
