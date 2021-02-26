# PS5 Scrapper

*Si tu en as marre de pas pouvoir acheter une console à 500.- pour pouvoir jouer au nouveau Fifa qui est identique aux cinq derniers tu es au bon endroit !*

**Application qui tourne en arrière-plan et qui fait toutes les cinq minutes une requête pour voir la disponniblitée de la PS5 et si elle est disponnible sur l'un des sites la page du produit est ouvert et une notification est envoyé.** (Le temps et les sites web sont paramétrable, voir la section [configuration](#configuration))

## Installation
Clone ce repo soit en téléchargeant les sources en ZIP soit avec la commande suivante depuis le dossier ou tu souhaites télécharger cette application : `git clone https://github.com/alanpenacanosa/ps5-scrapper.git` (pour cette dernière il faut que tu aies git d'installer bien sûr).

Ensuite il faut télécharger les modules qui sont nécessaire au bien fonctionnement de l'application. Pour faire ça il faut avoir installé le package manager `npm` sur sa machine. Si c'est pas le cas c'est que tu n'as pas `NodeJS` d'installer sur ta machine car en installant `NodeJS` ça installe `npm` et il te le faudra pour lancer l'application alors installe le via ce lien : https://nodejs.org/en/.

Bon maintenant tu devrais avoir accès aux commande `node` et `npm`. Pour s'en assurer : `node --version` ou `node -v` et `npm --version` ou `npm -v`. Si une des deux marches pas c'est que tu n'as pas fait les choses correctement.

Pour fini d'installer l'application il faut faire la commande `npm install` à la racine de l'application (là où il y a le fichier package.json). Et si tu n’as pas d'erreur t'es bon pour la suite.

## Lancement de l'application

Il y a plein de manière pour lancer l'application mais voici deux solutions :
1. Avec PM2
2. Avec NodeJS

### Avec PM2 *(la solution la plus "optimal" selon moi)*
`pm2` est un outil utilisé pour lancer des processus en arrière-plan et pouvoir les monitorer. C'est un peu comme la commande `screen` sur une machine Linux mais en différent. Pour l'installer il faut faire la commande suivante depuis n'importe où dans ton shell : `npm install pm2 -g` cette commande va installer l'outil `pm2` de manière global sur ton système pour pouvoir lancer et accéder à `pm2` depuis n'importe où.

Ensuite va à la racine de l'application et fais la commande suivante : `pm2 start ps5.js`

Maintenant elle devrait être en train de tourner en arrière-plan. Pour voir les applications qui tourne en fond tu peux utiliser la commande `pm2 ls` et tu verras que l'application est bien en cours d'execution. Pour arrêter l'application `pm2 stop ps5`, si tu veux voir les logs et pouvoir monitorer l'application c'est la commande `pm2 monit ps5`.

Si tu veux supprimer l'application de la liste quand tu fais `pm2 ls` il faut faire la commande `pm2 delete ps5`.

Avec `pm2` si l'application crash pour x raison elle va automatiquement redémarrer. C'est pas beau la vie ?

### Avec NodeJS
Rends-toi à la racine de l'application et tu as deux commandes de disponible pour démarrer l'application : `node ps5` ou `npm start` (cette dernière étant un raccourci de la première, comme configurer dans le fichier package.json).

Pour stopper l'application il faut faire un `ctrl-c` dans le terminal.

L'inconvénient de passé avec `NodeJS` c'est que l'application n'est pas vraiment en arrière-plan. Et si elle crash il faudra la relancer manuellement.

## Configuration

Il y a deux fichier pour la configuration `config.json` et `websites.json`.

Dans `config.json` il y a des variables à paramétrer comme bon te sembles et dans `websites.json` les sites web que l'application doit scrap, ajoutes-en autant que tu veux, il faut juster faire attention avec le selector.

Si tu sais ce que tu fais tu peux modifier tout le reste si ça te chante.
