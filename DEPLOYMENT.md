# Déploiement du site Pyxis sur OVH

Procédure pour mettre en ligne le site Pyxis sur l'hébergement web OVH, sur **deux domaines** :

- `https://www.pyxisit.net`
- `https://www.pyxis.com.tn`

Chaque domaine affiche le même site, et le visiteur reste sur le domaine qu'il a tapé.

---

## Sommaire

1. [Comment le site est construit](#1-comment-le-site-est-construit)
2. [Prérequis](#2-prérequis)
3. [Générer le site](#3-générer-le-site)
4. [Récupérer les accès OVH](#4-récupérer-les-accès-ovh)
5. [Sauvegarder le site actuel](#5-sauvegarder-le-site-actuel)
6. [Déposer le nouveau site](#6-déposer-le-nouveau-site)
7. [Déclarer les deux domaines (Multisite)](#7-déclarer-les-deux-domaines-multisite)
8. [DNS de pyxis.com.tn](#8-dns-de-pyxiscomtn)
9. [Activer le HTTPS](#9-activer-le-https)
10. [Vérifications après mise en ligne](#10-vérifications-après-mise-en-ligne)
11. [Référencement](#11-référencement)
12. [Mettre à jour le site](#12-mettre-à-jour-le-site)
13. [Revenir en arrière](#13-revenir-en-arrière)
14. [Dépannage](#14-dépannage)
15. [Points connus avant l'annonce officielle](#15-points-connus-avant-lannonce-officielle)

---

## 1. Comment le site est construit

- Le site est développé avec **Next.js**, mais il est publié en **site statique** : la commande de build génère des fichiers HTML, CSS, JS et images dans le dossier `out/`.
- **Aucun serveur Node.js n'est nécessaire.** N'importe quelle offre d'hébergement web OVH (Perso, Pro, Performance) suffit, car elle fonctionne avec Apache.
- Le fichier **`.htaccess`** (source : `public/.htaccess`, copié automatiquement dans `out/`) remplace ce qu'un serveur ferait :
  - passage en HTTPS et ajout du `www`, en restant sur le même domaine ;
  - redirection des anciennes adresses `/use-cases/...` vers les nouvelles pages (301) ;
  - adresses propres : `/platform` affiche `platform.html` ;
  - fichiers de navigation interne de Next.js (`__next.*.__PAGE__.txt`) ;
  - page 404, cache des fichiers et en-têtes de sécurité.

> ⚠️ **Sans le fichier `.htaccess`, le site ne fonctionne pas correctement** : les pages internes renvoient une erreur 404 et les clics dans le menu ne font rien.

---

## 2. Prérequis

| Élément | Détail |
|---|---|
| Node.js | Version **20 LTS ou plus récente** (`node -v` pour vérifier) |
| Code source | Dépôt Git du projet, branche à jour |
| Client FTP/SFTP | [FileZilla](https://filezilla-project.org/) (ou WinSCP) |
| Accès OVH | Compte avec accès à l'hébergement web (espace client) |
| Accès au registrar de `pyxis.com.tn` | Pour modifier ses DNS (registrar tunisien) |

---

## 3. Générer le site

Dans le dossier du projet :

```bash
npm ci
npm run build
```

- `npm ci` installe les dépendances exactes du `package-lock.json`.
- `npm run build` génère le site complet dans **`out/`** (environ 6 Mo).

Contrôle rapide : à la racine de `out/`, on doit trouver notamment :

```
out/
├── .htaccess        ← fichier caché, indispensable
├── index.html
├── platform.html
├── solutions.html
├── company.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── _next/
└── images/
```

> Le build doit se terminer sans erreur. En cas d'erreur, ne rien déployer et prévenir l'équipe de développement.

---

## 4. Récupérer les accès OVH

Dans l'**espace client OVH → Web Cloud → Hébergements → *votre hébergement* → onglet FTP-SSH**, noter :

- **Serveur** : `ftp.clusterXXX.hosting.ovh.net`
- **Identifiant** : le login FTP principal
- **Mot de passe** : s'il est inconnu, le réinitialiser depuis cet onglet (*Modifier le mot de passe*)
- **Protocole et port** :
  - offre **Perso** : FTP, port **21** ;
  - offres **Pro / Performance** : SFTP, port **22** (recommandé).

Dans l'onglet **Informations générales**, noter aussi l'**adresse IPv4** (et IPv6) de l'hébergement. Elle servira pour les DNS de `pyxis.com.tn` (étape 8).

---

## 5. Sauvegarder le site actuel

Avant toute modification :

1. Se connecter à l'hébergement avec FileZilla.
2. Aller dans le dossier **`www/`**.
3. **Télécharger tout son contenu** dans un dossier local daté, par exemple `backup-www-2026-09-30/`.

Cette sauvegarde permet de revenir en arrière (voir [section 13](#13-revenir-en-arrière)).

---

## 6. Déposer le nouveau site

1. Dans FileZilla, afficher les fichiers cachés : **Serveur → Forcer l'affichage des fichiers cachés**. Sinon le `.htaccess` n'apparaît pas.
2. Dans `www/`, **supprimer l'ancien contenu**, une fois la sauvegarde de l'étape 5 faite.
3. Déposer **le contenu** du dossier `out/` dans `www/`, et **non le dossier `out` lui-même**.

Résultat attendu sur le serveur :

```
www/
├── .htaccess
├── index.html
├── _next/
├── images/
└── …
```

> ❌ Erreur fréquente : `www/out/index.html`. Les fichiers doivent être **directement** dans `www/`.

---

## 7. Déclarer les deux domaines (Multisite)

**Espace client → Hébergements → *votre hébergement* → onglet Multisite → Ajouter un domaine.**

Ajouter les **4 entrées** suivantes, chacune avec :
- **Dossier racine** : `www`
- **SSL** : coché

| Domaine | Remarque |
|---|---|
| `pyxisit.net` | Si le domaine est chez OVH, la configuration DNS peut être automatique |
| `www.pyxisit.net` | Idem |
| `pyxis.com.tn` | Domaine **externe** à OVH : voir ci-dessous |
| `www.pyxis.com.tn` | Idem |

**Domaine externe (`pyxis.com.tn`) :** OVH demande une preuve de propriété. Il affiche un enregistrement **TXT** à créer chez le registrar, sous la forme :

```
Nom   : ovhcontrol.pyxis.com.tn
Type  : TXT
Valeur: (valeur fournie par OVH)
```

Créer cet enregistrement chez le registrar tunisien (étape 8), attendre sa propagation, puis valider l'ajout dans OVH.

---

## 8. DNS de pyxis.com.tn

Chez le **registrar de `pyxis.com.tn`** :

| Nom | Type | Valeur |
|---|---|---|
| `ovhcontrol` | TXT | valeur fournie par OVH (étape 7) |
| `@` (`pyxis.com.tn`) | A | IPv4 de l'hébergement OVH (étape 4) |
| `www` | A | IPv4 de l'hébergement OVH |
| `@` et `www` | AAAA | IPv6 de l'hébergement OVH, si fournie |

> ⚠️ **Ne pas modifier ni supprimer les enregistrements MX** de `pyxis.com.tn`. Ils font fonctionner les adresses e-mail `@pyxis.com.tn`. Ne toucher qu'aux enregistrements listés ci-dessus.
>
> ⚠️ Avant toute modification, **faire une capture d'écran de la zone DNS actuelle**.

La propagation DNS prend de **quelques minutes à 24 h**.

Pour `pyxisit.net` : s'il est géré chez OVH, vérifier dans **Noms de domaine → pyxisit.net → Zone DNS** que les enregistrements A de `@` et de `www` pointent vers l'IP de l'hébergement.

---

## 9. Activer le HTTPS

Une fois que les DNS pointent vers OVH :

1. **Hébergements → *votre hébergement* → Informations générales → Certificat SSL.**
2. Activer, ou **régénérer**, le certificat **Let's Encrypt** (gratuit), pour qu'il couvre les 4 noms de domaine.
3. Dans **Multisite**, vérifier que la colonne SSL est **active** pour les 4 entrées.

> Tant que le certificat n'est pas actif sur un domaine, le navigateur affiche une alerte de sécurité sur celui-ci. C'est normal pendant la propagation.

---

## 10. Vérifications après mise en ligne

À faire sur **les deux domaines**, sur ordinateur **et** sur mobile.

**Adresses**
- [ ] `https://www.pyxisit.net` s'affiche.
- [ ] `https://www.pyxis.com.tn` s'affiche.
- [ ] `http://pyxisit.net` redirige vers `https://www.pyxisit.net`.
- [ ] `http://pyxis.com.tn` redirige vers `https://www.pyxis.com.tn`, et reste sur `.com.tn`.
- [ ] Cadenas HTTPS valide sur les 4 variantes.

**Pages et navigation**
- [ ] `/platform`, `/solutions`, `/solutions/service-providers`, `/solutions/governments-regulators`, `/company`, `/privacy`, `/legal` s'affichent.
- [ ] Le menu desktop (sous-menus Platform, Solutions, Company) mène aux bonnes pages.
- [ ] Le menu mobile s'ouvre, mène aux bonnes pages et se referme.
- [ ] Les liens du pied de page fonctionnent.
- [ ] `/platform/` (avec une barre finale) redirige vers `/platform`.

**Redirections et erreurs**
- [ ] `/use-cases/customer-experience` redirige vers `/solutions/service-providers`.
- [ ] `/use-cases/compliance-investigation` redirige vers `/solutions/governments-regulators`.
- [ ] Une adresse inventée (`/test-404`) affiche la page 404 du site.

**Technique**
- [ ] `/sitemap.xml` et `/robots.txt` s'affichent.
- [ ] Les images et les animations se chargent.
- [ ] Le formulaire de contact ouvre la messagerie vers `contact@pyxisit.net`.
- [ ] Aucune erreur dans la console du navigateur (F12 → Console).

---

## 11. Référencement

1. Ajouter la propriété `https://www.pyxisit.net` dans [Google Search Console](https://search.google.com/search-console).
2. Soumettre le sitemap : `https://www.pyxisit.net/sitemap.xml`.
3. Tester la version mobile avec [PageSpeed Insights](https://pagespeed.web.dev/). L'objectif est un score ≥ 90.

> Les balises canoniques du site désignent `www.pyxisit.net` comme adresse de référence. Google indexe donc une seule version du site, même s'il est accessible sur les deux domaines. C'est voulu : il n'y a pas de pénalité pour contenu en double.

---

## 12. Mettre à jour le site

1. Récupérer la dernière version du code (`git pull`).
2. Relancer le build :
   ```bash
   npm ci
   npm run build
   ```
3. Déposer le contenu de `out/` dans `www/` :
   - **supprimer puis remplacer entièrement le dossier `_next/`**, sans le fusionner avec l'ancien ;
   - remplacer les fichiers `.html`, `.txt`, `.xml` et le `.htaccess`.
4. Refaire les vérifications principales de la [section 10](#10-vérifications-après-mise-en-ligne).

> Les pages HTML ne sont pas mises en cache, donc les mises à jour sont visibles immédiatement. Si un navigateur affiche encore l'ancienne version, faire **Ctrl + F5**.

---

## 13. Revenir en arrière

En cas de problème bloquant après une mise en ligne :

1. Vider `www/`.
2. Y redéposer le contenu de la sauvegarde de l'[étape 5](#5-sauvegarder-le-site-actuel), ou celui du dernier `out/` qui fonctionnait.
3. Vérifier la page d'accueil et le menu.

---

## 14. Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| `npm ci` : *« package.json and package-lock.json … are in sync »* | Le `package-lock.json` n'est plus aligné avec `package.json` | Lancer `npm install`, puis committer le `package-lock.json` mis à jour, puis relancer `npm ci` |
| `npm ci` : erreur de permission (EPERM / « try running as Administrator ») | Un processus utilise encore `node_modules` (`npm run dev` lancé, éditeur…) | Arrêter `npm run dev` et les autres terminaux Node, puis relancer `npm ci` |
| PowerShell affiche `NativeCommandError` en rouge avec *« npm warn deprecated »* | PowerShell présente les avertissements de npm comme des erreurs | Sans conséquence si la commande se termine par *« added … packages »* |
| Les pages internes (`/platform`…) renvoient une 404 | `.htaccess` absent ou mal placé | Vérifier que `www/.htaccess` existe, avec les fichiers cachés affichés |
| Un clic dans le menu ne fait rien | Même cause | Idem |
| **Erreur 500** sur tout le site | Une directive du `.htaccess` n'est pas acceptée par l'hébergement | Mettre en commentaire (avec `#`) la ligne `DirectorySlash Off`, puis le bloc `<If …>`, et tester après chaque changement |
| **Boucle de redirections** (« trop de redirections ») | La détection du HTTPS ne fonctionne pas sur l'hébergement | Remplacer les 3 lignes « Force HTTPS » du `.htaccess` par le bloc ci-dessous |
| Alerte « connexion non sécurisée » | Certificat SSL pas encore généré pour ce domaine | Attendre la propagation DNS, puis régénérer le certificat (étape 9) |
| `pyxis.com.tn` affiche une page OVH par défaut | Domaine absent du Multisite, ou mauvais dossier racine | Vérifier l'étape 7 (dossier racine `www`) |
| `pyxis.com.tn` ne répond pas | DNS pas encore propagés ou mal configurés | Vérifier les enregistrements A sur [dnschecker.org](https://dnschecker.org) |
| Les e-mails `@pyxis.com.tn` ne fonctionnent plus | Enregistrements MX modifiés | Restaurer les MX d'origine (capture d'écran de l'étape 8) |
| Ancienne version affichée | Cache du navigateur | Ctrl + F5, ou navigation privée |

**Bloc de remplacement en cas de boucle de redirections :**

```apache
# Force HTTPS (alternative OVH)
RewriteCond %{SERVER_PORT} 80
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

> Toute modification du `.htaccess` faite directement sur le serveur doit aussi être reportée dans `public/.htaccess` du dépôt. Sinon, elle sera écrasée au prochain déploiement.

---

## 15. Points connus avant l'annonce officielle

Le site peut être mis en ligne, mais ces points restent ouverts :

- **Formulaire de contact** : il ouvre la messagerie du visiteur (mailto). C'est un choix temporaire, car aucun serveur d'envoi n'est configuré.
- **Pages Privacy et Legal** : elles affichent un texte provisoire, en attendant le contenu fourni par Pyxis. Elles sont exclues de Google tant que le texte n'est pas publié.
- **Images** : ce sont des photos provisoires, hébergées sur le site, en attendant les visuels définitifs de Pyxis. Pour les remplacer, voir `src/lib/assets.ts`.
- **Validations Pyxis en attente** : la liste des pays de la carte, la raison sociale exacte du copyright.

---

*Détails techniques complémentaires : voir `README.md`, section « Deployment ».*
