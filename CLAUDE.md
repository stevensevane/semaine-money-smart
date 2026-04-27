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

Avant de tester, demander à Sarah : "Quel email de test tu veux utiliser ?"
Extraire le prénom depuis l'email (ex: `steven.sevane+999@gmail.com` → prénom `Steven`).

### Cas 1 — Email existant en base (le cas le plus fréquent en prod)
1. Naviguer sur https://semaine-money-smart.moneducationfinanciere.com avec Playwright
2. Remplir le formulaire avec l'email fourni par Sarah + prénom extrait de l'email
3. Vérifier que la page redirige vers `/merci`

### Cas 2 — Nouvel email
1. Lire `.test-counter` pour obtenir le numéro N
2. Naviguer à nouveau sur la page d'accueil
3. Remplir le formulaire :
   - Email : version +testN+1 de l'email fourni (ex: `steven.sevane+test6@gmail.com`)
   - Prénom : extrait de l'email (ex: `Steven`)
4. Vérifier que la page redirige vers `/merci`
5. Incrémenter `.test-counter` (écrire N+1)

**Vérification manuelle après le test :**
- Ouvrir Systeme.io et vérifier le nouvel email : prénom correct + tags "La semaine Money Smart" (1791410) et "Newsletter" (1397916)
- Vérifier que l'email existant a bien reçu les 2 tags

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
