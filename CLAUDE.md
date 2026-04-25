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

**Étapes :**
1. Lire `.test-counter` pour obtenir le numéro N du dernier test
2. Calculer le prochain : N+1
3. Naviguer sur https://semaine-money-smart.moneducationfinanciere.com avec Playwright
4. Remplir le formulaire :
   - Prénom : `TestPrenom`
   - Email : `stevensevane+testN+1@gmail.com`
5. Cliquer sur le bouton de soumission
6. Vérifier que la page redirige vers `/merci`
7. Incrémenter `.test-counter` (écrire N+1)

**Vérification manuelle après le test :**
- Ouvrir Systeme.io et vérifier que le contact `stevensevane+testN+1@gmail.com` existe
- Vérifier que le prénom "TestPrenom" est bien enregistré
- Vérifier que les tags "La semaine Money Smart" (id: 1791410) et "Newsletter" (id: 1397916) sont appliqués

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
