# Semaine Money Smart — Notes pour Claude

## Projet
Landing page d'inscription à la Semaine Money Smart, hébergée sur Cloudflare Pages, déployée via GitHub (stevensevane/semaine-money-smart).

URL production : https://semaine-money-smart.moneducationfinanciere.com

## Stack
- HTML/CSS/JS statique
- Cloudflare Pages + Pages Functions (`functions/api/submit.js`)
- Systeme.io CRM via REST API
- Variable d'environnement `SYSTEME_API_KEY` dans Cloudflare Pages Settings

## Procédure de test du formulaire

Le test utilise Playwright pour simuler une vraie inscription dans le navigateur.

**Le test comporte DEUX cas à chaque fois.**

Emails de test fixes :
- Email existant : `steven.sevane+999@gmail.com` / prénom `Steven` — ne jamais supprimer du CRM
- Nouvel email : `stevensevane+testN@gmail.com` / prénom `Steven` — incrémenté via `.test-counter`

### Étape 0 — Avant de commencer
Demander à Sarah de supprimer uniquement le tag "La semaine Money Smart" du contact `steven.sevane+999@gmail.com` dans Systeme.io (le tag "Newsletter" peut rester), et attendre sa confirmation avant de continuer.

### Cas 1 — Email existant en base (a déjà le tag Newsletter)
1. Naviguer sur https://semaine-money-smart.moneducationfinanciere.com avec Playwright
2. Remplir : email `steven.sevane+999@gmail.com`, prénom `Steven`, WhatsApp laisser vide
3. Vérifier que la page redirige vers `/merci`

### Cas 2 — Nouvel email
1. Lire `.test-counter` pour obtenir le numéro N
2. Naviguer à nouveau sur la page d'accueil
3. Remplir : email `stevensevane+testN+1@gmail.com`, prénom `Steven`, WhatsApp `+33600000001`
4. Vérifier que la page redirige vers `/merci`
5. Incrémenter `.test-counter` (écrire N+1)

**Vérification manuelle après le test (par Sarah) :**
- `steven.sevane+999@gmail.com` a bien le tag "La semaine Money Smart" (Newsletter était déjà présent)
- `stevensevane+testN+1@gmail.com` existe avec prénom `Steven` + les 2 tags + numéro WhatsApp `+33600000001`

**Ne pas tester à chaque micro-changement** — uniquement quand Sarah le demande explicitement.

## Tags Systeme.io
- La semaine Money Smart : `1791410`
- Newsletter : `1397916`

## Règles de style (brand book)
- Police : Instrument Sans uniquement
- Couleurs : `--navy #1E3170`, `--accent #03FDA9`, `--bg #F2F2F0`, `--white #FFFFFF`
- Border-radius : cards 14px, boutons 30px, badges 999px
- CTAs : `background: var(--accent); color: var(--dark); border-radius: 30px`
- Pas de tirets cadratins dans les contenus
- Référence design system : `/Users/adrienriot/Documents/Claude/Projects/mon-design-system/design/design-system.html`
