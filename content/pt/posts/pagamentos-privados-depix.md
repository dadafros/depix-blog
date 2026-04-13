---
title: "Pagamentos privados e instantâneos com DePix"
description: "Envie pagamentos instantâneos, privados e sem intermediários usando DePix na Liquid Network. Sem banco, sem permissão."
date: 2026-03-30
tags: ["pagamentos", "privacidade", "depix", "liquid network", "permissionless"]
author: "DePix"
slug: "pagamentos-privados-depix"
translationKey: "private-payments"
image: "/images/posts/private-payments/private-payments-16x9.png"
images:
  - "/images/posts/private-payments/private-payments-1x1.png"
  - "/images/posts/private-payments/private-payments-4x3.png"
  - "/images/posts/private-payments/private-payments-16x9.png"
draft: false
---

Imagine entregar dinheiro em espécie para alguém: rápido, direto, sem ninguém no meio. Agora imagine fazer isso digitalmente, para qualquer pessoa no mundo, em menos de dois minutos. Sem banco, sem aprovação, sem ninguém monitorando o valor. Isso é exatamente o que o DePix na Liquid Network permite: pagamentos privados, instantâneos e sem intermediários.

Neste artigo, você vai entender como funcionam os pagamentos com DePix, o que torna essas transações privadas por padrão, por que ninguém pode bloquear ou censurar seus envios e como começar a usar esse sistema hoje.

## Como funciona um pagamento com DePix

O processo é simples e direto. Tanto quem envia quanto quem recebe precisa de duas coisas: uma conta no DePix App e uma carteira Liquid, como a SideSwap.

Quando você quer enviar DePix para alguém, o fluxo é o seguinte:

1. Abra a SideSwap no seu celular.
2. Toque em "Pay" (Pagar).
3. Cole o endereço Liquid do destinatário.
4. Digite o valor em DePix que deseja enviar.
5. Confirme a transação.

Em aproximadamente dois minutos, o DePix chega na carteira do destinatário. Sem formulários, sem aprovações pendentes, sem horário comercial. A transação acontece diretamente entre você e o destinatário, passando apenas pela Liquid Network — uma rede descentralizada que não pertence a nenhum banco ou empresa.

E o custo? A taxa da rede Liquid é praticamente zero — frações de centavo¹. O DePix App não cobra absolutamente nada por transferências entre carteiras³. Comparado com taxas de TED, DOC ou até mesmo de algumas transferências Pix empresariais, o custo é incomparavelmente menor.

## O que torna os pagamentos privados

Aqui está a diferença fundamental entre o DePix e praticamente qualquer outro meio de pagamento digital que você conhece.

A Liquid Network utiliza uma tecnologia chamada **Confidential Transactions** (Transações Confidenciais)¹. Isso significa que, por padrão, toda transação na rede esconde o valor transferido. Observadores externos — qualquer pessoa que analise a blockchain — podem ver que uma transação aconteceu, mas não conseguem ver quanto foi enviado. Apenas o remetente e o destinatário conhecem o valor.

{{< diagram alt="Pagamento privado com DePix na Liquid Network: remetente envia DePix, valor fica oculto na rede, destinatário recebe, observador externo não consegue ver o valor" caption="Transações confidenciais: o valor transferido é visível apenas para remetente e destinatário." >}}
<div class="d-flow-row">
  <div class="d-step dark">Remetente</div>
  <div class="d-arrow">Envia DePix</div>
  <div class="d-step accent">Liquid Network</div>
  <div class="d-arrow">Valor oculto · ~2 min</div>
  <div class="d-step dark">Destinatário</div>
</div>
<div class="d-flow-row" style="margin-top:0.75rem">
  <div class="d-step danger">Observador externo</div>
  <div class="d-arrow">Não vê o valor</div>
  <div class="d-step accent">Liquid Network</div>
</div>
{{< /diagram >}}

Compare isso com os sistemas que você usa hoje:

- **Pix**: o banco vê tudo². Valor, data, hora, remetente, destinatário. Essas informações ficam disponíveis para a instituição financeira e, por extensão, para qualquer autoridade que as solicite.
- **Bitcoin**: a blockchain é pública. Qualquer pessoa pode ver o valor de qualquer transação, bastando consultar um explorador de blocos.
- **DePix na Liquid Network**: o valor é oculto por padrão¹. A transação é visível, mas o montante é criptograficamente protegido.

Isso não é um recurso opcional que você precisa ativar. Confidential Transactions são o comportamento padrão da Liquid Network. Toda transação com DePix já nasce privada.

Para quem valoriza a [privacidade financeira](/posts/privacidade-financeira-depix/), essa característica muda completamente o jogo. Suas transações deixam de ser um livro aberto para bancos, empresas de análise de dados e qualquer outro intermediário curioso.

## O que torna os pagamentos permissionless

A palavra "permissionless" — sem permissão — é central para entender o poder do DePix. Em termos práticos, isso significa que ninguém precisa autorizar suas transações.

Pense em como funciona uma transferência bancária tradicional. O banco analisa a operação, pode aplicar limites diários, pode reter valores por "análise de segurança" e, em casos extremos, pode bloquear sua conta inteira. Você depende da permissão de um intermediário para movimentar o seu próprio dinheiro.

Com o DePix na Liquid Network, essa dinâmica não existe:

- **Sem aprovação bancária**: não há banco envolvido na transação. Ninguém precisa dizer "sim" para o seu pagamento acontecer.
- **Sem limites impostos por terceiros**: a Liquid Network não impõe limites de valor. Você decide quanto enviar.
- **Sem bloqueio de conta**: ninguém pode congelar seus DePix na sua carteira. Você tem a custódia total dos seus fundos.
- **Disponível 24 horas por dia, 7 dias por semana, 365 dias por ano**: não existe "horário bancário" na Liquid Network. Finais de semana, feriados, madrugada — a rede está sempre operando.
- **Sem reversão**: uma vez confirmada, a transação é final. Ninguém pode reverter, cancelar ou estornar o pagamento sem o consentimento do destinatário.

Essa é a essência de ser um [indivíduo soberano](/posts/individuo-soberano-dinheiro-permissionless/) sobre o próprio dinheiro. Você não pede permissão para gastar, enviar ou receber. Você simplesmente faz.

## Para que servem pagamentos privados e sem intermediários

A privacidade financeira não é um luxo — é uma necessidade prática em diversas situações do dia a dia. Veja alguns exemplos de como pagamentos com DePix podem ser úteis:

- **Dividir uma conta entre amigos**: envie a sua parte sem que um banco registre cada detalhe da transação.
- **Pagar um freelancer ou prestador de serviço**: sem burocracia bancária, sem necessidade de ambos terem conta no mesmo banco, sem comprovantes que exponham valores a terceiros.
- **Fazer doações para causas que você apoia**: contribua de forma privada, sem que sua doação fique vinculada ao seu nome em bancos de dados.
- **Pagamentos entre empresas**: empresas que aceitam DePix podem receber e enviar pagamentos com rapidez e privacidade, sem depender de processadores de pagamento.
- **Pagamentos internacionais**: qualquer pessoa no mundo com uma carteira Liquid pode receber DePix. Não importa o país, o fuso horário ou o sistema bancário local.

Em todos esses casos, o denominador comum é o mesmo: você transfere valor diretamente para outra pessoa, sem intermediários que monitoram, atrasam ou bloqueiam a operação.

## Passo a passo completo: como enviar DePix para alguém

Se você nunca fez um pagamento com DePix antes, siga este guia completo:

**1. Crie sua conta no DePix App**
Acesse [depixapp.com](https://depixapp.com/) e cadastre-se. O processo é rápido e direto.

**2. Configure sua carteira Liquid**
Baixe a SideSwap no seu celular e configure sua carteira. Essa será a carteira onde seus DePix ficam armazenados — sob seu controle total.

**3. Deposite reais via Pix**
No DePix App, faça um depósito usando Pix. Os reais são convertidos em DePix na proporção de 1:1 e enviados para a sua carteira Liquid.

**4. Peça o endereço Liquid do destinatário**
O destinatário abre a SideSwap e toca em "Receive" (Receber) para gerar um endereço Liquid. Ele compartilha esse endereço com você — pode ser por mensagem, QR code ou qualquer outro meio.

**5. Envie o pagamento**
Abra a SideSwap, toque em "Pay" (Pagar), cole o endereço Liquid, digite o valor e confirme. A transação é enviada imediatamente para a rede.

**6. Aguarde a confirmação**
Em aproximadamente dois minutos, o DePix aparece na carteira do destinatário. Transação concluída.

**7. O destinatário decide o que fazer**
Quem recebeu pode manter o DePix na carteira, trocar por Bitcoin ou USDt dentro da própria SideSwap, ou sacar para uma conta bancária via Pix pelo DePix App.

É isso. Seis passos para enviar dinheiro com privacidade, sem banco e sem pedir permissão a ninguém.

## O contraste com o sistema tradicional

Vale colocar os dois mundos lado a lado para entender o que realmente muda.

Em uma transferência bancária tradicional, ambas as partes precisam ter conta em banco. A instituição financeira monitora a transação, registra os valores e pode impor limites ou bloqueios. Os dados da operação ficam disponíveis para o banco, para órgãos reguladores e, potencialmente, para terceiros que acessem esses bancos de dados. Se o banco decidir que a transação é "suspeita", ele pode reter seus fundos por tempo indeterminado.

Em uma transferência com DePix, ambas as partes precisam apenas de uma carteira Liquid e uma conexão à internet. Não há banco no meio. O valor é oculto para observadores externos. Ninguém pode bloquear a operação. A transação é confirmada em minutos, independentemente do horário, do dia ou do valor.

Pix trouxe praticidade para os [pagamentos no Brasil](/posts/pagamentos-pix-sem-conta-bancaria/). DePix traz algo que o Pix jamais poderá oferecer: privacidade e autonomia real sobre o seu dinheiro.

Isso é dinheiro digital com as propriedades do dinheiro físico. O equivalente moderno de entregar uma nota na mão de alguém — mas mais rápido, sem limite geográfico e com a segurança criptográfica de uma rede descentralizada.

## Referências

1. [Blockstream Liquid Network — Confidential Transactions e taxas](https://docs.blockstream.com/liquid/)
2. [Banco Central do Brasil — Regulamento do Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix)
3. [DePix App — Transferências e taxas](https://depixapp.com/)

## Sua privacidade financeira começa aqui

Pix tem praticidade — DePix tem privacidade. Pare de expor cada transação ao sistema bancário e comece a usar dinheiro digital que só você controla. Envie pagamentos sem intermediários, sem limites e sem vigilância. Acesse [depixapp.com](https://depixapp.com/).
