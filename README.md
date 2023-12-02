# Projet Back-end Node.js avec Express

Ce projet constitue le back-end pour une application qui recueille et stocke les informations de l'utilisateur telles que l'adresse IP, le système d'exploitation et le navigateur internet. Il gère également une base de données contenant ces informations et offre une API pour recevoir les données des utilisateurs.

L'application sera buildée, et son image Docker sera envoyée vers un registry AWS pour faciliter un déploiement scalable avec autoscaling group.

## Prérequis

- Docker
- Jenkins
- Deux noeuds EC2 Amazon Linux AWS
- Un registry AWS (ECR)
- Node.js et Express
- Une base de données

## Installation et Configuration

1. **Cloner le dépôt :**

 - https://github.com/Jean-Quenault/back-node

2. **Base de donnée**
 
 - La base de donnée peut être de n'importe quel type mais doit être via RDS AWS.
 - Créez une table contenants les columns id, ip, os, et navigateur : 

 <code>CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(255),
    navigateur VARCHAR(255),
    os VARCHAR(255)
);</code>


3. **Définition des variables d'environnement**

 - Créez en fonction du besoin un fichier .env.development ou .env.production
 - Définissez vos variables

4. **Configurer Jenkins :**
- Assurez-vous que Jenkins est installé et configuré sur votre serveur.
- Créer et configurer votre noeud.
- Modifier le Jenkinsfile avec votre registry AWS.
- Utilisez le `Jenkinsfile` fourni dans le dépôt pour configurer votre pipeline.
- Lancer le pipeline. L'image de l'application web est désormais sur le registry.

5. **Déploiement avec Docker :**
- Sur votre noeud EC2, exécutez les commandes suivantes pour s'authentifier auprès du registry, pour push l'image, la construire et lancer le conteneur Docker :
  ```
  aws ecr get-login-password --region votre_region | docker login --username AWS --password-stdin votre_id_aws.dkr.ecr.votre_region.amazonaws.com
  docker pull votre_id_aws.dkr.ecr.votre_region.amazonaws.com/nom_repo_ecr:tag
  docker run -p port_local:port_container votre_id_aws.dkr.ecr.votre_region.amazonaws.com/nom_repo_ecr:tag

  ```

## Utilisation

- L'API du back-end peut être accédée via http://[adresse_IP_du_noeud_EC2]:[port].
- Consultez la documentation de l'API pour plus de détails sur les endpoints disponibles.


## Contribution

Si vous souhaitez contribuer à ce projet, veuillez contacter Jean.

## Licence

Ce projet est privé.

## Contact

Pour toute question ou aide, veuillez contacter Jean.

## Remerciements

Merci à Armen Avdoyan.
