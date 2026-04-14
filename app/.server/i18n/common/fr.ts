import type { Translations } from "./en.ts";

export const fr = {
  "auth.greeting": "Bonjour, {name}",
  "auth.required": "⚠️ Authentification requise",
  "error.oops": "Oups!",
  "error.unexpected": "Une erreur inattendue s'est produite.",
  "error.notFound": "La page demandée est introuvable.",
  "error.reloadApp": "Recharger l'app",
  "action.done": "Terminé",
  "action.generate": "Générer",
  "promptBox.prompt.placeholder":
    "Décrivez l'image que vous souhaitez créer...",
  "promptBox.variations.label": "Variations",
  "promptBox.variations.option.1": "1 Variation",
  "promptBox.variations.option.3": "3 Variations",
  "promptBox.aspectRatio.label": "Format",
  "promptBox.aspectRatio.square": "Carré",
  "promptBox.aspectRatio.landscape": "Paysage",
  "promptBox.aspectRatio.portrait": "Portrait",
  "promptBox.referenceImages.button": "Images de référence",
  "promptBox.referenceImages.panelTitle": "Images de référence",
  "promptBox.referenceImages.dropzone":
    "Déposez une image ou cliquez pour télécharger",
  "promptBox.referenceImages.remove": "Supprimer l'image de référence {index}",
  "promptBox.style.label": "Style",
  "stylePanel.all": "Tous",
  "stylePanel.label": "Appliquer le style visuel",
  "stylePanel.noMatch": "Aucun style correspondant",
  "stylePanel.noStyle": "Sans style",
  "stylePanel.showAll": "Afficher tous les styles",
  "promptBox.error.categories": "Catégories",
  "promptBox.error.detected": "Détecté",
  "promptBox.error.suggested": "Prompt suggéré",
  "nav.brand": "Newvato",
  "nav.showMenu": "Afficher le menu",
  "nav.newBadge": "Nouveau",
  "nav.genAI": "IA Générative",
  "nav.genAI.imageGen": "ImageGen",
  "nav.genAI.imageEdit": "ImageEdit",
  "nav.genAI.videoGen": "VideoGen",
  "nav.genAI.musicGen": "MusicGen",
  "nav.genAI.voiceGen": "VoiceGen",
  "nav.genAI.soundGen": "SoundGen",
  "nav.genAI.graphicsGen": "GraphicsGen",
  "nav.genAI.mockupGen": "MockupGen",
  "nav.stock": "Bibliothèque",
  "nav.stock.photos": "Photos",
  "nav.stock.stock-video": "Vidéos",
  "nav.stock.graphics": "Graphiques",
  "nav.stock.fonts": "Polices",
  "nav.stock.graphicTemplates": "Modèles graphiques",
  "nav.stock.3d": "3D",
  "nav.stock.music": "Musique",
  "nav.stock.soundEffects": "Effets Sonores",
  "nav.stock.videoTemplates": "Modèles Vidéo",
  "nav.stock.web": "Web",
  "nav.stock.web.cmsTemplates": "Modèles CMS",
  "nav.stock.web.webTemplates": "Modèles Web",
  "nav.stock.web.wordpress": "WordPress",
  "nav.stock.addOns": "Extensions",
  "nav.stock.presentationTemplates": "Modèles de Présentation",
  "nav.auth": "Authentification",
  "item.addToWorkspace": "Ajouter au Workspace",
  "item.removeFromWorkspace": "Retirer du Workspace",
  "item.details": "Détails",
  "item.includes": "Inclut",
  "item.fontsRequired": "Polices requises : {fonts}",
  "video-templates.howThisTemplateWorks.link": "Comment fonctionne ce modèle",
  "video-templates.howThisTemplateWorks.modal.title":
    "Comment fonctionne ce modèle",
  "video-templates.howThisTemplateWorks.modal.textLayers": "Calques de texte",
  "video-templates.howThisTemplateWorks.modal.media": "Médias",
  "video-templates.howThisTemplateWorks.modal.logoPlaceholder": "Logo",
  "video-templates.howThisTemplateWorks.modal.controls": "Contrôles",
  "video-templates.howThisTemplateWorks.modal.done": "Terminé",
  "item.download": "Télécharger",
  "item.downloadFormat": "Télécharger {format}",
  "item.downloading": "Téléchargement...",
  "item.editWithAi": "Modifier avec l'IA",
  "item.convertToVideo": "Convertir en vidéo",
  "item.description": "Description",
  "item.featuredSong": "Chanson en vedette",
  "item.featuredSongs": "Chansons en vedette",
  "item.featuredSongAuthor": "par {authorUsername}",
  "item.save": "Enregistrer",
  "item.saveToWorkspaceTooltip": "Enregistrer dans Workspace",
  "item.author": "par {authorUsername}",
  "item.livePreview": "Aperçu en direct",
  "item.error.invalidId": "Lien d'article invalide",
  "item.error.notFound": "Article introuvable",
  "item.error.loadFailed": "Échec du chargement des détails de l'article",
  "item.licenses": "Licences",
  "item.license": "Licence Commerciale à Vie",
  "item.licenseInformation": "Plus d'informations",
  "item.copyLink": "Copier le lien",
  "item.copiedToClipboard": "Lien copié",
  "item.showAllTags": "Afficher toutes les étiquettes",
  "item.genAiImage.alt": "Image générée",
  "genai-image.details.prompt": "Prompt",
  "genai-image.details.licenseTerms":
    "Cette image générée par IA peut être utilisée à des fins personnelles et commerciales, sous réserve des Conditions du Produit.",
  "workspace.createWorkspace": "Créer un Workspace",
  "workspace.create": "Créer",
  "workspace.create.error":
    "Échec de la création du workspace. Veuillez réessayer.",
  "workspace.namePlaceholder": "Nom du Workspace",
  "workspace.workspaceIsFull":
    "Limite de Workspace atteinte. Enregistrez dans un autre Workspace.",
  "workspace.limitReached": "Limite de Workspace atteinte",
  "workspace.searchPlaceholder": "Rechercher des workspaces...",
  "workspace.noMatchingWorkspaces": "Aucun workspace correspondant",
  // Workspace bulk actions
  "workspace.bulkActions.download": "Télécharger",
  "workspace.bulkActions.download.tooltip": "Télécharger",
  "workspace.bulkActions.move": "Déplacer",
  "workspace.bulkActions.copy": "Copier",
  "workspace.bulkActions.license": "Licence",
  "workspace.bulkActions.license.tooltip": "Télécharger la licence",
  "workspace.bulkActions.license.tooltip.generative_only":
    "Les téléchargements de licence ne sont pas disponibles pour le contenu généré par l'IA",
  "workspace.bulkActions.delete": "Supprimer",
  "workspace.bulkActions.itemCount.singular": "{count} élément",
  "workspace.bulkActions.itemCount.plural": "{count} éléments",
  "workspace.bulkActions.clearSelection": "Effacer la sélection",
  "workspace.bulkActions.selectItem": "Sélectionner l'article",
  "workspace.bulkActions.move.success": "{count} éléments déplacés",
  "workspace.bulkActions.move.success.singular.prefix":
    "{count} élément déplacé vers",
  "workspace.bulkActions.move.success.singular.suffix": "",
  "workspace.bulkActions.move.success.plural.prefix":
    "{count} éléments déplacés vers",
  "workspace.bulkActions.move.success.plural.suffix": "",
  "workspace.bulkActions.copy.success.singular.prefix":
    "{count} élément copié vers",
  "workspace.bulkActions.copy.success.singular.suffix": "",
  "workspace.bulkActions.copy.success.plural.prefix":
    "{count} éléments copiés vers",
  "workspace.bulkActions.copy.success.plural.suffix": "",
  "workspace.bulkActions.move.error.generic":
    "Échec du déplacement des éléments. Veuillez réessayer.",
  "workspace.bulkActions.move.error.destination_full":
    "Le déplacement dépassera la limite de {limit} du Workspace. Réduisez les éléments ou sélectionnez un autre Workspace.",
  "workspace.bulkActions.copy.error.generic":
    "Échec de la copie des éléments. Veuillez réessayer.",
  "workspace.bulkActions.copy.error.destination_full":
    "La copie dépassera la limite de {limit} du Workspace. Réduisez les éléments ou sélectionnez un autre Workspace.",
  "workspace.bulkActions.delete.modal.title": "Êtes-vous sûr ?",
  "workspace.bulkActions.delete.modal.body":
    "Voulez-vous vraiment supprimer ces éléments de votre workspace ? Cette action ne peut pas être annulée.",
  "workspace.bulkActions.delete.modal.confirm": "Supprimer",
  "workspace.bulkActions.delete.modal.cancel": "Annuler",
  "workspace.bulkActions.delete.error.generic":
    "Impossible de supprimer les éléments. Veuillez réessayer.",
  "workspace.bulkActions.license.error.service_unavailable":
    "Service indisponible, veuillez réessayer plus tard.",
  "workspace.bulkActions.license.error.missing_params":
    "Paramètres requis manquants",
  "workspace.bulkActions.license.error.invalid_params":
    "Paramètres de licence invalides",
  "workspace.bulkActions.license.error.insufficient_permissions":
    "Vous n'avez pas la permission de créer des licences",
  "workspace.bulkActions.license.error.resource_not_found":
    "Éléments introuvables",
  "workspace.bulkActions.license.error.generic":
    "Échec de la création des certificats de licence. Veuillez réessayer.",
  "workspace.bulkActions.move.selectDestination": "Déplacer vers workspace",
  // Workspace duplicate action
  "workspace.duplicate.success.prefix": "Créé :",
  "workspace.duplicate.success.suffix": "Workspace",
  "workspace.duplicate.error.generic":
    "Une erreur s'est produite. Veuillez réessayer.",
  "workspace.duplicate.error.source_too_large":
    "Ce Workspace dépasse la limite de {limit} éléments. Supprimez des éléments avant de dupliquer.",
  "workspace.duplicate.error.name_variations_exhausted":
    "Impossible de générer un nom unique. Veuillez d'abord renommer certaines copies existantes.",
  "workspacesBanner.heading": "Collections deviennent des Workspaces",
  "workspacesBanner.description":
    "Toutes vos Collections existantes sont en sécurité, et vous pouvez choisir lesquelles apporter dans vos nouveaux Workspaces. Tout ce que vous enregistrez avec l'icône de signet apparaîtra dans un Workspace pour vous aider à rester organisé.",
  "workspacesBanner.migrationButton": "Migrer le travail précédent",
  "workspacesBanner.saveButton": "Enregistrer dans Workspace",
  "workspacesBanner.close.aria": "Fermer la bannière",
  "licenses.list.empty":
    "Cet article est déjà sous licence. Créez une licence uniquement si vous souhaitez la nommer pour un client ou un projet spécifique.",
  "licenses.list.searchPlaceholder": "Rechercher des licences...",
  "licenses.list.noMatches": "Aucune licence correspondante",
  "licenses.popup.empty": "Aucune licence existante",
  "workspaces.featureCallout.heading": "Collections a un nouveau chez-soi",
  "workspaces.featureCallout.body":
    "Toutes vos Collections existantes sont en sécurité et vous pouvez choisir lesquelles importer dans Workspaces.",
  "licenses.list.download": "Télécharger la licence",
  "licenses.list.downloading": "Téléchargement de la licence...",
  "licenses.list.pending": "En attente",
  "image.alt.preview": "Aperçu",
  "image.alt.threeDPreview": "Aperçu 3D",
  "image.navigation.previous": "Image précédente",
  "image.navigation.next": "Image suivante",
  "search.field.label": "Rechercher",
  "search.field.placeholder": "Que recherchez-vous?",
  "search.field.placeholder.short": "Rechercher...",
  "search.field.placeholder.addToSearch": "Ajoutez à votre recherche...",
  "prompt.quality.message":
    "Hé ! Cela pourrait ne pas vous donner ce que vous recherchez. Peut-être essayez de répondre à ces questions dans votre prompt ?",
  "search.all": "Toutes les Catégories",
  "search.button.text": "Rechercher",
  "search.button.searching": "Recherche...",
  "search.clear.button": "Effacer la recherche",
  "search.error.unavailable":
    "La recherche n'est pas disponible pour le moment. Veuillez réessayer plus tard.",
  "search.error.title": "La recherche a rencontré un problème",
  "search.error.body": "Réessayez et continuez à créer.",
  "search.error.retry": "Réessayer",
  "search.filters": "Filtres",
  "search.filters.clearAll": "Tout effacer",
  "search.filters.applyFilters": "Appliquer les filtres",
  "search.filters.noMatch": "Aucun filtre correspondant",
  "search.filters.showAll": "Afficher tous les filtres",
  "search.filters.showMore": "Afficher plus",
  "search.filters.newBadge": "Nouveau",
  "search.filterSuggestion.inCategory": "{itemType}",
  "search.filterSuggestion.category": "Catégorie",
  "search.looksLike.trigger.label": "Rechercher avec Looks Like",
  "search.looksLike.trigger.tooltip":
    "Trouvez des photos similaires en téléchargeant une image",
  "search.looksLike.loading": "Chargement...",
  "search.looksLike.descriptionTouch":
    "Appuyez pour ajouter une image et trouver des photos similaires",
  "search.looksLike.dropzoneAriaLabel":
    "Déposez un JPG ou PNG (max {fileSize}) ou appuyez sur Entrée pour choisir un fichier",
  "search.looksLike.hoverText": "Déposez l'image ici",
  "search.looksLike.loadingText": "Téléchargement: ",
  "search.looksLike.uploadPrompt":
    "Téléchargez une image pour trouver des photos similaires",
  "search.looksLike.fileTooLarge":
    "Fichier téléchargé trop volumineux. Max {fileSize}.",
  "search.looksLike.invalidFileType":
    "Type de fichier invalide (doit être jpeg, jpg, png, webp)",
  "search.looksLike.tooManyFiles":
    "Vous ne pouvez télécharger qu'un fichier à la fois.",
  "search.looksLike.unknownError": "Échec du téléchargement, réessayez.",
  "search.looksLike.unavailable":
    "Looks Like Search n'est pas disponible pour le moment. Veuillez réessayer plus tard.",
  "search.soundsLike.trigger.label": "Rechercher avec Sounds Like",
  "search.soundsLike.trigger.tooltip":
    "Trouvez de la musique similaire en collant l'URL d'un morceau",
  "search.soundsLike.placeholder": "Collez l'URL ici",
  "search.soundsLike.description.prefix": "Collez un lien vers une chanson de",
  "search.soundsLike.description.or": "ou",
  "search.soundsLike.description.suffix":
    "pour trouver de la musique similaire",
  "search.soundsLike.error.invalidUrl":
    "Cette URL n’est pas valide. Vérifiez que vous l’avez bien copiée et réessayez.",
  "search.soundsLike.error.noMatchedPlatform":
    "Cette URL ne correspond à aucune plateforme prise en charge.",
  "search.soundsLike.error.notUrl": "Veuillez saisir une URL.",
  "search.soundsLike.error.internalError":
    "Une erreur s’est produite. Veuillez réessayer.",
  "search.soundsLike.error.liveBroadcastContent":
    "Cette URL renvoie à une diffusion en direct ou à venir, ce qui n’est pas pris en charge par cette fonctionnalité. Veuillez saisir l’URL d’une vidéo contenant une chanson.",
  "search.soundsLike.error.unknown":
    "Une erreur s’est produite. Veuillez réessayer.",
  "search.soundsLike.error.invalidFileType":
    "Type de fichier non valide. Veuillez importer un fichier MP3 ou WAV.",
  "search.soundsLike.error.fileTooLarge":
    "Le fichier est trop volumineux. La taille maximale est de 50 Mo.",
  "search.soundsLike.error.uploadFailed":
    "L'importation a échoué. Veuillez réessayer.",
  "search.soundsLike.validating": "Recherche du morceau...",
  "search.soundsLike.searching": "Recherche de morceaux similaires...",
  "search.soundsLike.disabled.tooltip":
    "Supprimer la référence à la chanson pour utiliser la recherche",
  "search.itemReference.disabled.tooltip":
    "Supprimer la référence à l'article pour utiliser la recherche",
  "search.soundsLike.or": "ou",
  "search.soundsLike.uploadTrack": "Importer un audio",
  "search.sort.label": "Trier",
  "search.sort.relevant": "Pertinent",
  "search.sort.popular": "Populaire",
  "search.sort.new": "Nouveau",
  "search.results.more": "+ plus",
  "search.results.none.heading":
    'Désolé, aucun résultat n\'a été trouvé pour "{term}"',
  "search.results.none.headingNoTerm": "Désolé, aucun résultat n'a été trouvé",
  "search.results.none.subheading":
    "Vous pouvez trouver à peu près n'importe parmi nos millions d'atouts, mais apparemment pas cela !",
  "search.results.none.tips":
    "Vérifiez qu'il n'y a pas de fautes de frappe, supprimez vos filtres de recherche ou essayez un terme de recherche différent.",
  "search.results.none.tipsLabel": "Conseils de recherche :",
  "nav.backToOldSite": "Site classique",
  "nav.workspaces": "Workspaces",
  "nav.myDownloads": "Mes Téléchargements",
  "nav.myDownloadsLegacy": "Mes Téléchargements / Projets",
  "nav.myAccount": "Mon Compte",
  "nav.claimClear": "Claim Clear",
  "nav.termsAndPrivacy": "Conditions et Confidentialité",
  "nav.userTerms": "Conditions d'Utilisation",
  "nav.licenseTerms": "Conditions de Licence",
  "nav.privacy": "Politique de Confidentialité",
  "nav.cookieSettings": "Paramètres des Cookies",
  "nav.personalInformation": "Ne pas partager mes informations personnelles",
  "nav.legalCenter": "Centre Juridique",
  "nav.preferences": "Préférences",
  "userPreferences.update.success": "Préférence mise à jour",
  "userPreferences.update.error": "Impossible de mettre à jour la préférence",
  "nav.helpCenter": "Centre d'Aide",
  "nav.darkMode": "Mode Sombre",
  "nav.lightMode": "Mode Clair",
  "nav.whatsNew": "Quoi de neuf",
  "nav.signOut": "Se déconnecter",
  "music.play": "Lire",
  "music.pause": "Pause",
  "music.volume": "Volume",
  "music.waveform": "Forme d'onde pour {title}",
  "music.unknownArtist": "Artiste Inconnu",
  "music.unknownTrack": "piste musicale",
  "music.by": "Par",
  "music.claimClear.tooltip":
    "Les réclamations Content ID de YouTube peuvent être supprimées immédiatement",
  "sound-effects.by": "par",
  "sound-effects.unknownArtist": "Artiste Inconnu",
  "sound-effects.unknownTrack": "effet sonore",
  "sound-effects.waveform": "Forme d'onde pour {title}",
  "sound-effects.clips.singular": "{count} clip",
  "sound-effects.clips.plural": "{count} clips",
  "generic.back": "Retour",
  "generic.close": "Fermer",
  "welcome.title.highlight": "Bienvenue ",
  "welcome.title": "dans votre nouvelle expérience Envato",
  "welcome.body.line1":
    "Nous avons réinventé la façon dont vous découvrez, téléchargez et licenciez des ressources créatives avec :",
  "welcome.body.bullet1": "Recherche plus intelligente",
  "welcome.body.bullet2": "Téléchargement et licence en un clic",
  "welcome.body.bullet3": "Workspaces pour organiser les articles",
  "welcome.body.line2": "Vous avez déjà des collections ou des projets ?  ",
  "welcome.body.line2.link": "Apportez-les avec vous.",
  "welcome.body.line3": "En savoir plus sur ",
  "welcome.body.line3.link": "Quoi de neuf.",
  "welcome.close.aria": "Fermer le message de bienvenue",
  "download.error.title": "Erreur de téléchargement",
  "download.error.message":
    "Oups, il semble que ce fichier soit temporairement indisponible. Nous nous efforcerons de résoudre le problème. Veuillez vérifier à nouveau bientôt.",
  "download.error.continueButton": "Continuer la navigation",
  "licenses.licenseTo": "Licence pour",
  "licenses.changeHowYouLicense": "Modifier la façon dont vous licenciez",
  "licenses.createNew": "Créer une nouvelle licence",
  "licenses.namePlaceholder": "Nom de la licence",
  "licenses.create": "Créer",
  "licenses.duplicateError": "La licence existe déjà",
  "toast.download.success": "Licencié",
  "toast.download.educationalMessage":
    "Cet article a été licencié automatiquement, ",
  "toast.download.educationalMessageLink": "en savoir plus",
  "toast.download.success.workspace": "Licencié pour {workspaceName}",
  "toast.download.success.bulk.singular":
    "{count} élément sous licence pour {workspaceName}",
  "toast.download.success.bulk.plural":
    "{count} éléments sous licence pour {workspaceName}",
  "toast.license.manage": "Gérer",
  "toast.license.title": "Licencié",
  "toast.license.created": "Licencié pour {licenseName}",
  "toast.license.success.bulk.singular":
    "Téléchargé {count} licence pour {licenseName}",
  "toast.license.success.bulk.plural":
    "Téléchargé {count} licences pour {licenseName}",
  "license.education.modal.title.prefix": "Licences,",
  "license.education.modal.title.suffix": " plus simples",
  "license.education.modal.illustration.alt": "Exemple d'interface de licences",
  "license.education.modal.body.intro": "Les articles sont désormais ",
  "license.education.modal.body.highlight1":
    "automatiquement sous licence au téléchargement",
  "license.education.modal.body.middle": "! Ils sont également ",
  "license.education.modal.body.highlight2": "plus faciles à créer et à gérer",
  "license.education.modal.body.end":
    " lorsque vous téléchargez, consultez les détails d'articles et visitez My Downloads. Fini de chercher ces anciennes licences !",
  "license.education.modal.done": "Terminé",
  "license.featureCallout.heading": "Moyen plus simple de trouver les licences",
  "license.featureCallout.body":
    "Vous pouvez maintenant voir et créer des licences directement ici.",
  "license.featureCallout.cta": "En savoir plus",
  "soundsLikeSearch.loading.shortRotatingCopy1":
    "Mélodies assorties... la magie de la musique est en marche.",
  "soundsLikeSearch.loading.shortRotatingCopy2":
    "Roulement de tambour en approche... correspondance avec un son similaire !",
  "soundsLikeSearch.loading.shortRotatingCopy3":
    "Synchronisation avec votre son... on y est presque !",
  "soundsLikeSearch.loading.shortRotatingCopy4":
    "Recherche de pistes similaires... juste un moment",
  "soundsLikeSearch.loading.longRequestPrompt":
    "Nous poursuivons nos recherches, pendant que vous attendez :",
  "soundsLikeSearch.loading.longRotatingCopy1":
    "Le saviez-vous ? Il a été démontré que la musique réduit l'anxiété, améliore l'humeur et gère même la douleur, ce qui met en évidence les avantages thérapeutiques de la musique.",
  "soundsLikeSearch.loading.longRotatingCopy2":
    "Le saviez-vous ? Des études montrent que la musique peut améliorer les performances physiques. Les athlètes écoutent souvent des musiques entraînantes pour stimuler leur motivation et leur endurance pendant les séances d'entraînement.",
  "soundsLikeSearch.loading.longRotatingCopy3":
    "Le saviez-vous ? Les gens se souviennent mieux des paroles et des mélodies que des mots prononcés. Les groupes indigènes s'en servent pour préserver l'exactitude de l'histoire orale par le biais de chants et de danses.",
  "soundsLikeSearch.loading.longRotatingCopy4":
    "Le saviez-vous ? Le mot « karaoké » signifie en japonais « orchestre vide ». Ce qui est une façon élégante de décrire votre salon lors d'un chant en solo.",
  "soundsLikeSearch.loading.longRotatingCopy5":
    "Si votre musique fait fuir vos animaux de compagnie, ne vous inquiétez pas : les chats et les chiens sont réputés pour leur mauvais goût en matière de musique.",
  "soundsLikeSearch.loading.longRotatingCopy6":
    "Vous avez déjà essayé de chanter sous la douche, mais le son ressemble à celui d'un morse mourant ? C'est l'effet de réverbération unique de votre salle de bain qui est à l'œuvre !",
  "soundsLikeSearch.error.soft.title":
    "Nous n'avons pas pu charger les résultats pour cette piste",
  "soundsLikeSearch.error.soft.description":
    "Réessayez ou saisissez une autre piste de référence.",
  "soundsLikeSearch.error.soft.buttonCTA": "Réessayer",
  "soundsLikeSearch.error.hard.title":
    "Il semble y avoir un problème avec cette piste",
  "soundsLikeSearch.error.hard.description":
    "Une erreur est survenue avec la piste saisie. Essayez avec une autre URL.",
  "soundsLikeSearch.error.hard.buttonCTA": "Saisir une nouvelle piste",
  "soundsLikeSearch.unavailable.title": "Piste en cours de travail 🎶",
  "soundsLikeSearch.unavailable.body1":
    "Notre fonction de recherche Sounds Like fait actuellement une brève pause pour maintenance. Nous l'accordons pour vous offrir une meilleure expérience.",
  "soundsLikeSearch.unavailable.body2":
    "Revenez bientôt pour continuer votre découverte musicale ou consultez notre {statusPageLink} pour les mises à jour.",
  "soundsLikeSearch.unavailable.statusPage": "page de statut",
  "soundsLikeSearch.unavailable.buttonCTA": "Continuer à parcourir",
  "userUpload.loading": "Chargement...",
  "userUpload.loadingText": "Téléchargement: ",
  "userUpload.hoverText": "Déposez l'image ici",
  "userUpload.uploadPrompt": "Téléchargez une image de référence",
  "userUpload.dropzoneAriaLabel":
    "Déposez un JPG ou PNG (max {fileSize}) ou appuyez sur Entrée pour choisir un fichier",
  "userUpload.error.fileNotFound":
    "Échec du téléchargement : fichier introuvable",
  "userUpload.error.missingMetadata":
    "Échec du téléchargement : métadonnées manquantes",
  "userUpload.error.confirmFailed":
    "Échec de la confirmation du téléchargement",
  "userUpload.error.uploadFailed": "Échec du téléchargement",
  "userUpload.error.exceedsSize":
    "Le fichier dépasse la taille maximale de {fileSize}",
  "userUpload.error.invalidFileType":
    "Vous ne pouvez télécharger que : .jpg, .jpeg, .png, .webp",
  "userUpload.error.tooManyFiles": "Vous ne pouvez télécharger qu'un fichier",
  "moderation.categories.violence": "Violence",
  "moderation.categories.sexual": "Contenu Sexuel",
  "moderation.categories.sexual_minors":
    "Contenu Sexuel Impliquant des Mineurs",
  "moderation.categories.hate": "Discours de Haine",
  "moderation.categories.harassment": "Harcèlement",
  "moderation.categories.self_harm": "Automutilation",
  "moderation.categories.illegal": "Contenu Illégal",
  "moderation.categories.spam": "Spam",
  "moderation.categories.celebrity": "Célébrité",
  "moderation.categories.copyrighted_character":
    "Personnage Protégé par le Droit d'Auteur",
  "moderation.categories.brand_trademark": "Marque Déposée",
  // Common generation validation errors
  "generation.errors.prompt_required": "L'invite est requise",
  "generation.errors.reference_image_missing_fields":
    "L'image de référence {index} manque de source ou d'ID",
  "generation.errors.reference_image_not_found":
    "Image de référence {index} introuvable ou expirée",
  "generation.errors.provider_config_ids_not_found":
    "IDs de configuration du fournisseur introuvables",
  "generation.errors.generic": "Erreur de validation survenue",
  "generation.errors.prompt_moderation":
    "L'invite viole la politique de modération",
  "generation.errors.reference_moderation":
    "L'image de référence viole la politique de modération",
  "generation.errors.invalid_variations":
    "Les variations doivent être un entier positif entre 1 et 3",
  "generation.errors.quota_exceeded":
    "Quota dépassé. Veuillez réessayer plus tard",
  "generation.errors.fair_use_limit_exceeded":
    "Limite d'utilisation équitable dépassée. Veuillez réessayer plus tard",
  "generation.errors.no_active_subscription":
    "Un abonnement actif est requis pour modifier cet élément",
  "generation.errors.stock_item_not_available":
    "Impossible de charger cet élément. Il est peut-être indisponible ou n'est pas une photo",
  "generation.errors.source_not_found": "Image source introuvable ou expirée",
  "generation.errors.source_not_available":
    "L'image source n'est pas disponible",
  "generation.errors.unknown_source_type": "Type de source inconnu",
  "generation.errors.failed_to_generate": "Échec de la génération",
  "generation.errors.credit_refunded": "Crédit de génération remboursé",
  "generation.errors.all_failed": "Toutes les générations ont échoué",
  // New Plans Modal
  "newPlansModal.close.aria": "Fermer l'annonce",
  "newPlansModal.title":
    "De nouveaux forfaits conçus pour la façon dont les créatifs travaillent",
  "newPlansModal.body.paragraph1":
    "Cette nouvelle ère tarifaire est conçue pour maintenir Envato accessible aux créatifs à chaque étape, surtout alors que de plus en plus de personnes commencent à utiliser l'IA de différentes manières.",
  "newPlansModal.body.paragraph2":
    "Cela nous aide également à continuer à développer des outils créatifs de premier plan de manière responsable et durable, avec des améliorations continues qui vous donnent plus de contrôle sur votre flux de travail.",
  "newPlansModal.body.currentPlan":
    "Vous êtes actuellement sur le forfait Core, qui comprend 10 générations IA par mois. Besoin de plus\u00a0? Vous avez le choix.",
  "newPlansModal.body.chooseMomentum":
    "Choisissez votre élan créatif, de l'expérimentation légère à un élan créatif illimité\u00a0:",
  "newPlansModal.plans.core.description": "comprend 10 générations IA / mois",
  "newPlansModal.plans.plus.description": "comprend 100 générations IA / mois",
  "newPlansModal.plans.ultimate.description":
    "comprend des générations IA illimitées",
  "newPlansModal.body.closingNote":
    "Et n'oubliez pas, chaque forfait comprend des téléchargements de stock illimités parmi la plus large gamme de ressources créatives. Un forfait qui fonctionne comme vous.",
  "newPlansModal.explorePlans": "Découvrir les forfaits",
} as const satisfies Translations;
