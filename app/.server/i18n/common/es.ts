import type { Translations } from "./en.ts";

export const es = {
  "auth.greeting": "Hola, {name}",
  "auth.required": "⚠️ Autenticación requerida",
  "error.oops": "¡Ups!",
  "error.unexpected": "Ha ocurrido un error inesperado.",
  "error.notFound": "No se pudo encontrar la página solicitada.",
  "error.reloadApp": "Recargar app",
  "action.done": "Listo",
  "action.generate": "Generar",
  "promptBox.prompt.placeholder": "Describe la imagen que quieres crear...",
  "promptBox.variations.label": "Variaciones",
  "promptBox.variations.option.1": "1 Variación",
  "promptBox.variations.option.3": "3 Variaciones",
  "promptBox.aspectRatio.label": "Relación de aspecto",
  "promptBox.aspectRatio.square": "Cuadrado",
  "promptBox.aspectRatio.landscape": "Horizontal",
  "promptBox.aspectRatio.portrait": "Vertical",
  "promptBox.referenceImages.button": "Imágenes de referencia",
  "promptBox.referenceImages.panelTitle": "Imágenes de referencia",
  "promptBox.referenceImages.dropzone":
    "Suelta la imagen o haz clic para subir",
  "promptBox.referenceImages.remove": "Eliminar imagen de referencia {index}",
  "promptBox.style.label": "Estilo",
  "stylePanel.all": "Todos",
  "stylePanel.label": "Aplicar estilo visual",
  "stylePanel.noMatch": "No hay estilos coincidentes",
  "stylePanel.noStyle": "Sin estilo",
  "stylePanel.showAll": "Mostrar todos los estilos",
  "promptBox.error.categories": "Categorías",
  "promptBox.error.detected": "Detectado",
  "promptBox.error.suggested": "Prompt sugerido",
  "nav.brand": "Newvato",
  "nav.showMenu": "Mostrar menú",
  "nav.newBadge": "Nuevo",
  "nav.genAI": "IA Generativa",
  "nav.genAI.imageGen": "ImageGen",
  "nav.genAI.imageEdit": "ImageEdit",
  "nav.genAI.videoGen": "VideoGen",
  "nav.genAI.musicGen": "MusicGen",
  "nav.genAI.voiceGen": "VoiceGen",
  "nav.genAI.soundGen": "SoundGen",
  "nav.genAI.graphicsGen": "GraphicsGen",
  "nav.genAI.mockupGen": "MockupGen",
  "nav.stock": "Biblioteca",
  "nav.stock.photos": "Fotos",
  "nav.stock.stock-video": "Videos",
  "nav.stock.graphics": "Gráficos",
  "nav.stock.fonts": "Fuentes",
  "nav.stock.graphicTemplates": "Plantillas gráficas",
  "nav.stock.3d": "3D",
  "nav.stock.music": "Música",
  "nav.stock.soundEffects": "Efectos de Sonido",
  "nav.stock.videoTemplates": "Plantillas de Vídeo",
  "nav.stock.web": "Web",
  "nav.stock.web.cmsTemplates": "Plantillas CMS",
  "nav.stock.web.webTemplates": "Plantillas Web",
  "nav.stock.web.wordpress": "WordPress",
  "nav.stock.addOns": "Complementos",
  "nav.stock.presentationTemplates": "Plantillas de Presentación",
  "nav.auth": "Autenticación",
  "item.addToWorkspace": "Agregar a Workspace",
  "item.removeFromWorkspace": "Eliminar de Workspace",
  "item.details": "Detalles",
  "item.includes": "Incluye",
  "item.fontsRequired": "Fuentes requeridas: {fonts}",
  "video-templates.howThisTemplateWorks.link": "Cómo funciona esta plantilla",
  "video-templates.howThisTemplateWorks.modal.title":
    "Cómo funciona esta plantilla",
  "video-templates.howThisTemplateWorks.modal.textLayers": "Capas de texto",
  "video-templates.howThisTemplateWorks.modal.media": "Medios",
  "video-templates.howThisTemplateWorks.modal.logoPlaceholder": "Logo",
  "video-templates.howThisTemplateWorks.modal.controls": "Controles",
  "video-templates.howThisTemplateWorks.modal.done": "Listo",
  "item.download": "Descargar",
  "item.downloadFormat": "Descargar {format}",
  "item.downloading": "Descargando...",
  "item.editWithAi": "Editar con IA",
  "item.convertToVideo": "Convertir a video",
  "item.description": "Descripción",
  "item.featuredSong": "Canción destacada",
  "item.featuredSongs": "Canciones destacadas",
  "item.featuredSongAuthor": "por {authorUsername}",
  "item.save": "Guardar",
  "item.saveToWorkspaceTooltip": "Guardar en Workspace",
  "item.author": "por {authorUsername}",
  "item.livePreview": "Vista previa en vivo",
  "item.error.invalidId": "Enlace de artículo no válido",
  "item.error.notFound": "Artículo no encontrado",
  "item.error.loadFailed": "No se pudieron cargar los detalles del artículo",
  "item.licenses": "Licencias",
  "item.license": "Licencia Comercial de por Vida",
  "item.licenseInformation": "Más información",
  "item.copyLink": "Copiar enlace",
  "item.copiedToClipboard": "Enlace copiado",
  "item.showAllTags": "Mostrar todas las etiquetas",
  "item.genAiImage.alt": "Imagen generada",
  "genai-image.details.prompt": "Prompt",
  "genai-image.details.licenseTerms":
    "Esta imagen generada por IA puede usarse para uso personal y comercial, sujeto a los Términos del Producto.",
  "workspace.createWorkspace": "Crear Workspace",
  "workspace.create": "Crear",
  "workspace.create.error":
    "No se pudo crear el workspace. Por favor, inténtalo de nuevo.",
  "workspace.namePlaceholder": "Nombre del Workspace",
  "workspace.workspaceIsFull":
    "Límite de Workspace alcanzado. Guarda en un Workspace diferente.",
  "workspace.limitReached": "Límite de Workspace alcanzado",
  "workspace.searchPlaceholder": "Buscar workspaces...",
  "workspace.noMatchingWorkspaces": "No hay workspaces coincidentes",
  // Workspace bulk actions
  "workspace.bulkActions.download": "Descargar",
  "workspace.bulkActions.download.tooltip": "Descargar",
  "workspace.bulkActions.move": "Mover",
  "workspace.bulkActions.copy": "Copiar",
  "workspace.bulkActions.license": "Licencia",
  "workspace.bulkActions.license.tooltip": "Descargar licencia",
  "workspace.bulkActions.license.tooltip.generative_only":
    "Las descargas de licencias no están disponibles para contenido generado por IA",
  "workspace.bulkActions.delete": "Eliminar",
  "workspace.bulkActions.itemCount.singular": "{count} artículo",
  "workspace.bulkActions.itemCount.plural": "{count} artículos",
  "workspace.bulkActions.clearSelection": "Borrar selección",
  "workspace.bulkActions.selectItem": "Seleccionar artículo",
  "workspace.bulkActions.move.success": "{count} artículos movidos",
  "workspace.bulkActions.move.success.singular.prefix":
    "{count} artículo movido a",
  "workspace.bulkActions.move.success.singular.suffix": "",
  "workspace.bulkActions.move.success.plural.prefix":
    "{count} artículos movidos a",
  "workspace.bulkActions.move.success.plural.suffix": "",
  "workspace.bulkActions.copy.success.singular.prefix":
    "{count} artículo copiado a",
  "workspace.bulkActions.copy.success.singular.suffix": "",
  "workspace.bulkActions.copy.success.plural.prefix":
    "{count} artículos copiados a",
  "workspace.bulkActions.copy.success.plural.suffix": "",
  "workspace.bulkActions.move.error.generic":
    "No se pudieron mover los artículos. Por favor, inténtalo de nuevo.",
  "workspace.bulkActions.move.error.destination_full":
    "Mover excederá el límite de {limit} del Workspace. Reduce los artículos o selecciona un Workspace diferente.",
  "workspace.bulkActions.copy.error.generic":
    "No se pudieron copiar los artículos. Por favor, inténtalo de nuevo.",
  "workspace.bulkActions.copy.error.destination_full":
    "Copiar excederá el límite de {limit} del Workspace. Reduce los artículos o selecciona un Workspace diferente.",
  "workspace.bulkActions.delete.modal.title": "¿Estás seguro?",
  "workspace.bulkActions.delete.modal.body":
    "¿Realmente quieres eliminar estos elementos de tu workspace? Esta acción no se puede deshacer.",
  "workspace.bulkActions.delete.modal.confirm": "Eliminar",
  "workspace.bulkActions.delete.modal.cancel": "Cancelar",
  "workspace.bulkActions.delete.error.generic":
    "No se pudieron eliminar los elementos. Por favor, inténtalo de nuevo.",
  "workspace.bulkActions.license.error.service_unavailable":
    "Servicio no disponible, por favor intenta más tarde.",
  "workspace.bulkActions.license.error.missing_params":
    "Faltan parámetros requeridos",
  "workspace.bulkActions.license.error.invalid_params":
    "Parámetros de licencia inválidos",
  "workspace.bulkActions.license.error.insufficient_permissions":
    "No tienes permiso para crear licencias",
  "workspace.bulkActions.license.error.resource_not_found":
    "Elementos no encontrados",
  "workspace.bulkActions.license.error.generic":
    "No se pudieron crear los certificados de licencia. Por favor, intenta de nuevo.",
  "workspace.bulkActions.move.selectDestination": "Mover a workspace",
  // Workspace duplicate action
  "workspace.duplicate.success.prefix": "Creado:",
  "workspace.duplicate.success.suffix": "Workspace",
  "workspace.duplicate.error.generic":
    "Algo salió mal. Por favor, inténtalo de nuevo.",
  "workspace.duplicate.error.source_too_large":
    "Este Workspace excede el límite de {limit} artículos. Elimina artículos antes de duplicar.",
  "workspace.duplicate.error.name_variations_exhausted":
    "No se pudo generar un nombre único. Por favor, renombra algunas copias existentes primero.",
  "workspacesBanner.heading": "Collections se están convirtiendo en Workspaces",
  "workspacesBanner.description":
    "Todas tus Colecciones existentes están a salvo, y puedes elegir cuáles llevar a tus nuevos Workspaces. Todo lo que guardes con el ícono de marcador aparecerá en un Workspace para ayudarte a mantenerte organizado.",
  "workspacesBanner.migrationButton": "Migrar trabajo anterior",
  "workspacesBanner.saveButton": "Guardar en Workspace",
  "workspacesBanner.close.aria": "Cerrar banner",
  "licenses.list.empty":
    "Este artículo ya tiene licencia. Cree una licencia solo si desea nombrarla para un cliente o proyecto específico.",
  "licenses.list.searchPlaceholder": "Buscar licencias...",
  "licenses.list.noMatches": "No hay licencias coincidentes",
  "licenses.popup.empty": "No hay licencias existentes",
  "workspaces.featureCallout.heading": "Collections tiene un nuevo hogar",
  "workspaces.featureCallout.body":
    "Todas tus Collections existentes están a salvo y puedes elegir cuáles llevar a Workspaces.",
  "licenses.list.download": "Descargar licencia",
  "licenses.list.downloading": "Descargando licencia...",
  "licenses.list.pending": "Pendiente",
  "image.alt.preview": "Vista previa",
  "image.alt.threeDPreview": "Vista previa 3D",
  "image.navigation.previous": "Imagen anterior",
  "image.navigation.next": "Imagen siguiente",
  "search.field.label": "Buscar",
  "search.field.placeholder": "¿Qué estás buscando?",
  "search.field.placeholder.short": "Buscar...",
  "search.field.placeholder.addToSearch": "Agrega a tu búsqueda...",
  "prompt.quality.message":
    "¡Oye! Eso podría no darte lo que buscas. ¿Tal vez intenta responder estas preguntas en tu prompt?",
  "search.all": "Todas las Categorías",
  "search.button.text": "Buscar",
  "search.button.searching": "Buscando...",
  "search.clear.button": "Borrar búsqueda",
  "search.error.unavailable":
    "La búsqueda no está disponible en este momento. Inténtalo de nuevo más tarde.",
  "search.error.title": "La búsqueda tuvo un problema",
  "search.error.body": "Inténtalo de nuevo y vuelve a crear.",
  "search.error.retry": "Intentar de nuevo",
  "search.filters": "Filtros",
  "search.filters.clearAll": "Borrar todo",
  "search.filters.applyFilters": "Aplicar filtros",
  "search.filters.noMatch": "No hay filtros coincidentes",
  "search.filters.showAll": "Mostrar todos los filtros",
  "search.filters.showMore": "Mostrar más",
  "search.filters.newBadge": "Nuevo",
  "search.filterSuggestion.inCategory": "{itemType}",
  "search.filterSuggestion.category": "Categoría",
  "search.looksLike.trigger.label": "Buscar con Looks Like",
  "search.looksLike.trigger.tooltip":
    "Encuentra fotos similares subiendo una imagen",
  "search.looksLike.loading": "Cargando...",
  "search.looksLike.descriptionTouch":
    "Toca para agregar imagen y encontrar fotos similares",
  "search.looksLike.dropzoneAriaLabel":
    "Suelta un JPG o PNG (máx. {fileSize}) o presiona Enter para elegir un archivo",
  "search.looksLike.hoverText": "Suelta la imagen aquí",
  "search.looksLike.loadingText": "Subiendo: ",
  "search.looksLike.uploadPrompt":
    "Subir una imagen para encontrar fotos similares",
  "search.looksLike.fileTooLarge":
    "Archivo subido demasiado grande. Máx. {fileSize}.",
  "search.looksLike.invalidFileType":
    "Tipo de archivo no válido (debe ser jpeg, jpg, png, webp)",
  "search.looksLike.tooManyFiles": "Solo puedes subir un archivo a la vez.",
  "search.looksLike.unknownError": "Error al subir, inténtalo de nuevo.",
  "search.looksLike.unavailable":
    "Looks Like Search no está disponible en este momento. Inténtalo de nuevo más tarde.",
  "search.soundsLike.trigger.label": "Buscar con Sounds Like",
  "search.soundsLike.trigger.tooltip":
    "Encuentra música similar pegando la URL de una canción",
  "search.soundsLike.placeholder": "Pega la URL aquí",
  "search.soundsLike.description.prefix": "Pega un enlace a una canción de",
  "search.soundsLike.description.or": "o",
  "search.soundsLike.description.suffix": "para encontrar música similar",
  "search.soundsLike.error.invalidUrl":
    "Esa URL no es válida. Verifica que la hayas copiado bien e inténtalo de nuevo.",
  "search.soundsLike.error.noMatchedPlatform":
    "Esa URL no corresponde a ninguna plataforma compatible.",
  "search.soundsLike.error.notUrl": "Introduce una URL.",
  "search.soundsLike.error.internalError":
    "Algo salió mal. Inténtalo de nuevo.",
  "search.soundsLike.error.liveBroadcastContent":
    "Esa URL es de una transmisión en vivo o próxima, lo cual no es compatible con esta función. Ingresa una URL de un video que incluya una canción.",
  "search.soundsLike.error.unknown": "Algo salió mal. Inténtalo de nuevo.",
  "search.soundsLike.error.invalidFileType":
    "Tipo de archivo no válido. Sube un archivo MP3 o WAV.",
  "search.soundsLike.error.fileTooLarge":
    "El archivo es demasiado grande. El tamaño máximo es de 50 MB.",
  "search.soundsLike.error.uploadFailed": "La carga falló. Intenta nuevamente.",
  "search.soundsLike.validating": "Buscando canción...",
  "search.soundsLike.searching": "Buscando canciones similares...",
  "search.soundsLike.disabled.tooltip":
    "Quitar la referencia de la canción para usar la búsqueda",
  "search.itemReference.disabled.tooltip":
    "Quitar la referencia del artículo para usar la búsqueda",
  "search.soundsLike.or": "o",
  "search.soundsLike.uploadTrack": "Subir audio",
  "search.sort.label": "Ordenar",
  "search.sort.relevant": "Relevante",
  "search.sort.popular": "Popular",
  "search.sort.new": "Nuevo",
  "search.results.more": "+ más",
  "search.results.none.heading":
    'Lo sentimos, no se han encontrado resultados para "{term}"',
  "search.results.none.headingNoTerm":
    "Lo sentimos, no se han encontrado resultados",
  "search.results.none.subheading":
    "Puedes encontrar casi cualquier cosa entre nuestros millones de recursos, ¡pero aparentemente eso no!",
  "search.results.none.tips":
    "revisa dos veces si hay errores tipográficos, borra los filtros de búsqueda o intenta un término de búsqueda diferente.",
  "search.results.none.tipsLabel": "Consejos de búsqueda principales:",
  "nav.backToOldSite": "Sitio clásico",
  "nav.workspaces": "Workspaces",
  "nav.myDownloads": "Mis Descargas",
  "nav.myDownloadsLegacy": "Mis Descargas / Proyectos",
  "nav.myAccount": "Mi Cuenta",
  "nav.claimClear": "Claim Clear",
  "nav.termsAndPrivacy": "Términos y Privacidad",
  "nav.userTerms": "Términos de Usuario",
  "nav.licenseTerms": "Términos de Licencia",
  "nav.privacy": "Política de Privacidad",
  "nav.cookieSettings": "Configuración de Cookies",
  "nav.personalInformation": "No compartir mi información personal",
  "nav.legalCenter": "Centro Legal",
  "nav.preferences": "Preferencias",
  "userPreferences.update.success": "Preferencia actualizada",
  "userPreferences.update.error": "No se pudo actualizar la preferencia",
  "nav.helpCenter": "Centro de Ayuda",
  "nav.darkMode": "Modo Oscuro",
  "nav.lightMode": "Modo Claro",
  "nav.whatsNew": "Novedades",
  "nav.signOut": "Cerrar Sesión",
  "music.play": "Reproducir",
  "music.pause": "Pausar",
  "music.volume": "Volumen",
  "music.waveform": "Forma de onda para {title}",
  "music.unknownArtist": "Artista Desconocido",
  "music.unknownTrack": "pista musical",
  "music.by": "Por",
  "music.claimClear.tooltip":
    "Las reclamaciones de Content ID de YouTube se pueden eliminar de inmediato",
  "sound-effects.by": "por",
  "sound-effects.unknownArtist": "Artista Desconocido",
  "sound-effects.unknownTrack": "efecto de sonido",
  "sound-effects.waveform": "Forma de onda para {title}",
  "sound-effects.clips.singular": "{count} clip",
  "sound-effects.clips.plural": "{count} clips",
  "generic.back": "Atrás",
  "generic.close": "Cerrar",
  "welcome.title.highlight": "Bienvenido ",
  "welcome.title": "a tu nueva experiencia Envato",
  "welcome.body.line1":
    "Hemos reimaginado cómo descubres, descargas y licencias recursos creativos con:",
  "welcome.body.bullet1": "Búsqueda más inteligente",
  "welcome.body.bullet2": "Descarga y licencia con un clic",
  "welcome.body.bullet3": "Workspaces para organizar artículos",
  "welcome.body.line2": "¿Ya tienes colecciones o proyectos?  ",
  "welcome.body.line2.link": "Tráelos contigo.",
  "welcome.body.line3": "Obtén más información sobre ",
  "welcome.body.line3.link": "Novedades.",
  "welcome.close.aria": "Descartar mensaje de bienvenida",
  "download.error.title": "Error de descarga",
  "download.error.message":
    "Vaya, parece que este archivo no está disponible temporalmente. Nos esforzaremos por solucionar el problema. Por favor, vuelve a comprobarlo pronto.",
  "download.error.continueButton": "Seguir navegando",
  "licenses.licenseTo": "Licenciar para",
  "licenses.changeHowYouLicense": "Cambia cómo licencias",
  "licenses.createNew": "Crear nueva licencia",
  "licenses.namePlaceholder": "Nombre de licencia",
  "licenses.create": "Crear",
  "licenses.duplicateError": "La licencia ya existe",
  "toast.download.success": "Licenciado",
  "toast.download.educationalMessage":
    "Este artículo se licenció automáticamente, ",
  "toast.download.educationalMessageLink": "aprende más",
  "toast.download.success.workspace": "Licenciado para {workspaceName}",
  "toast.download.success.bulk.singular":
    "{count} artículo licenciado para {workspaceName}",
  "toast.download.success.bulk.plural":
    "{count} artículos licenciados para {workspaceName}",
  "toast.license.manage": "Administrar",
  "toast.license.title": "Licenciado",
  "toast.license.created": "Licenciado para {licenseName}",
  "toast.license.success.bulk.singular":
    "Descargada {count} licencia para {licenseName}",
  "toast.license.success.bulk.plural":
    "Descargadas {count} licencias para {licenseName}",
  "license.education.modal.title.prefix": "Licencias,",
  "license.education.modal.title.suffix": " más fáciles",
  "license.education.modal.illustration.alt":
    "Ejemplo de interfaz de licencias",
  "license.education.modal.body.intro": "Los artículos ahora se ",
  "license.education.modal.body.highlight1":
    "licencian automáticamente al descargar",
  "license.education.modal.body.middle": "! También son ",
  "license.education.modal.body.highlight2": "más fáciles de crear y gestionar",
  "license.education.modal.body.end":
    " cuando descargas, ves los detalles de artículos y visitas My Downloads. ¡Nunca más busques licencias antiguas!",
  "license.education.modal.done": "Listo",
  "license.featureCallout.heading": "Forma más fácil de encontrar licencias",
  "license.featureCallout.body":
    "Ahora puedes ver y crear licencias aquí mismo.",
  "license.featureCallout.cta": "Aprende más",
  "soundsLikeSearch.loading.shortRotatingCopy1":
    "Melodías a juego... la magia de la música está en camino.",
  "soundsLikeSearch.loading.shortRotatingCopy2":
    "Redoble de tambores entrante... ¡Te busca un sonido similar!",
  "soundsLikeSearch.loading.shortRotatingCopy3":
    "Sincronizando con tu sonido... ¡ya casi está!",
  "soundsLikeSearch.loading.shortRotatingCopy4":
    "Sintonizando pistas similares... un momentito",
  "soundsLikeSearch.loading.longRequestPrompt":
    "Seguimos buscando, mientras esperas:",
  "soundsLikeSearch.loading.longRotatingCopy1":
    "¿Lo sabías? Se ha demostrado que la música ayuda a reducir la ansiedad, mejorar el estado de ánimo e incluso ayuda a controlar el dolor, lo que pone de relieve los beneficios terapéuticos de la música.",
  "soundsLikeSearch.loading.longRotatingCopy2":
    "¿Lo sabías? Los estudios demuestran que la música puede mejorar el rendimiento físico. Los atletas suelen escuchar canciones animadas para aumentar su motivación y resistencia durante los entrenamientos.",
  "soundsLikeSearch.loading.longRotatingCopy3":
    "¿Lo sabías? Las personas a menudo recuerdan las letras y las melodías mejor que las palabras habladas. Los grupos indígenas la utilizan para mantener la precisión de la historia oral a través del canto y el baile.",
  "soundsLikeSearch.loading.longRotatingCopy4":
    '¿Lo sabías? La palabra japonesa "karaoke" significa "orquesta vacía". Se trata de una forma elegante de describir tu sala de estar mientras cantas una canción en solitario.',
  "soundsLikeSearch.loading.longRotatingCopy5":
    "Si tu música hace que las mascotas huyan, no te preocupes: los gatos y los perros tienen notoriamente muy mal gusto musical.",
  "soundsLikeSearch.loading.longRotatingCopy6":
    "¿Alguna vez has intentado cantar en la ducha, pero suenas como una morsa moribunda? ¡Ese es el efecto de reverberación único de tu cuarto de baño!",
  "soundsLikeSearch.error.soft.title":
    "No pudimos cargar resultados para esa pista",
  "soundsLikeSearch.error.soft.description":
    "Inténtalo de nuevo o ingresa otra pista de referencia.",
  "soundsLikeSearch.error.soft.buttonCTA": "Reintentar",
  "soundsLikeSearch.error.hard.title":
    "Parece que hay un problema con esa pista",
  "soundsLikeSearch.error.hard.description":
    "Parece que hubo un error con la pista que ingresaste. Prueba con otra URL.",
  "soundsLikeSearch.error.hard.buttonCTA": "Ingresar nueva pista",
  "soundsLikeSearch.unavailable.title": "Pista en progreso 🎶",
  "soundsLikeSearch.unavailable.body1":
    "Nuestra función de búsqueda Sounds Like está en un breve intermedio por mantenimiento. La estamos afinando para ofrecerte una mejor experiencia.",
  "soundsLikeSearch.unavailable.body2":
    "Vuelve pronto para continuar tu descubrimiento musical o visita nuestra {statusPageLink} para actualizaciones.",
  "soundsLikeSearch.unavailable.statusPage": "página de estado",
  "soundsLikeSearch.unavailable.buttonCTA": "Seguir explorando",
  "userUpload.loading": "Cargando...",
  "userUpload.loadingText": "Subiendo: ",
  "userUpload.hoverText": "Suelta la imagen aquí",
  "userUpload.uploadPrompt": "Subir una imagen de referencia",
  "userUpload.dropzoneAriaLabel":
    "Suelta un JPG o PNG (máx. {fileSize}) o presiona Enter para elegir un archivo",
  "userUpload.error.fileNotFound": "Error al subir: archivo no encontrado",
  "userUpload.error.missingMetadata": "Error al subir: faltan metadatos",
  "userUpload.error.confirmFailed": "Error al confirmar la subida",
  "userUpload.error.uploadFailed": "Error al subir",
  "userUpload.error.exceedsSize":
    "El archivo excede el tamaño máximo de {fileSize}",
  "userUpload.error.invalidFileType":
    "Solo puedes subir: .jpg, .jpeg, .png, .webp",
  "userUpload.error.tooManyFiles": "Solo puedes subir 1 archivo",
  "moderation.categories.violence": "Violencia",
  "moderation.categories.sexual": "Contenido Sexual",
  "moderation.categories.sexual_minors": "Contenido Sexual con Menores",
  "moderation.categories.hate": "Discurso de Odio",
  "moderation.categories.harassment": "Acoso",
  "moderation.categories.self_harm": "Autolesión",
  "moderation.categories.illegal": "Contenido Ilegal",
  "moderation.categories.spam": "Spam",
  "moderation.categories.celebrity": "Celebridad",
  "moderation.categories.copyrighted_character":
    "Personaje con Derechos de Autor",
  "moderation.categories.brand_trademark": "Marca Registrada",
  // Common generation validation errors
  "generation.errors.prompt_required": "El prompt es obligatorio",
  "generation.errors.reference_image_missing_fields":
    "A la imagen de referencia {index} le faltan el origen o el ID",
  "generation.errors.reference_image_not_found":
    "La imagen de referencia {index} no se encontró o expiró",
  "generation.errors.provider_config_ids_not_found":
    "No se encontraron los IDs de configuración del proveedor",
  "generation.errors.generic": "Ocurrió un error de validación",
  "generation.errors.prompt_moderation":
    "El prompt viola la política de moderación",
  "generation.errors.reference_moderation":
    "La imagen de referencia viola la política de moderación",
  "generation.errors.invalid_variations":
    "Las variaciones deben ser un número entero positivo entre 1 y 3",
  "generation.errors.quota_exceeded":
    "Cuota excedida. Por favor, inténtelo de nuevo más tarde",
  "generation.errors.fair_use_limit_exceeded":
    "Límite de uso justo excedido. Por favor, inténtelo de nuevo más tarde",
  "generation.errors.no_active_subscription":
    "Se requiere una suscripción activa para editar este elemento",
  "generation.errors.stock_item_not_available":
    "No se puede cargar este elemento. Puede que no esté disponible o no sea una foto",
  "generation.errors.source_not_found":
    "Imagen de origen no encontrada o expirada",
  "generation.errors.source_not_available":
    "La imagen de origen no está disponible",
  "generation.errors.unknown_source_type": "Tipo de origen desconocido",
  "generation.errors.failed_to_generate": "Error al generar",
  "generation.errors.credit_refunded": "Crédito de generación reembolsado",
  "generation.errors.all_failed": "Todas las generaciones fallaron",
  // New Plans Modal
  "newPlansModal.close.aria": "Cerrar anuncio",
  "newPlansModal.title":
    "Nuevos planes diseñados para la forma en que trabajan los creativos",
  "newPlansModal.body.paragraph1":
    "Esta nueva era de precios está diseñada para mantener Envato accesible para creativos en cada etapa, especialmente a medida que más personas comienzan a usar IA de diferentes maneras.",
  "newPlansModal.body.paragraph2":
    "También nos ayuda a seguir construyendo herramientas creativas de primera clase de manera responsable y sostenible, con mejoras continuas que te dan más control sobre tu flujo de trabajo.",
  "newPlansModal.body.currentPlan":
    "Actualmente estás en el plan Core, que incluye 10 generaciones de IA cada mes. ¿Necesitas más? Tienes opciones.",
  "newPlansModal.body.chooseMomentum":
    "Elige tu impulso creativo, desde experimentación ligera hasta impulso creativo ilimitado:",
  "newPlansModal.plans.core.description": "incluye 10 generaciones de IA / mes",
  "newPlansModal.plans.plus.description":
    "incluye 100 generaciones de IA / mes",
  "newPlansModal.plans.ultimate.description":
    "incluye generaciones de IA ilimitadas",
  "newPlansModal.body.closingNote":
    "Y recuerda, cada plan incluye descargas ilimitadas de stock en la más amplia variedad de recursos creativos. Un plan que funciona como tú.",
  "newPlansModal.explorePlans": "Explorar Planes",
} as const satisfies Translations;
