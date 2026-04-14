import type { Locale } from "../../../.server/i18n.ts";

/**
 * Discover page example generations
 *
 * Each example has a unique ID, style reference, prompts by locale,
 * and an image URL.
 */
export type DiscoverExample = {
  id: string;
  styleName: string;
  prompts: Record<Locale, string>;
  image: string;
};

/**
 * Curated examples for the discover page carousel.
 * These showcase the variety of styles and prompts available in ImageGen.
 */
export const DISCOVER_EXAMPLES: DiscoverExample[] = [
  {
    id: "discover-1",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Tangerine Wall A lone figure leaning against a smooth orange wall, sunlight cutting across the frame, strong contrast of shadow and skin tone, warm film halation, simple and bold composition, feels like a still from an indie film.",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Mandarinenwand Eine einsame Figur lehnt an einer glatten orangefarbenen Wand, Sonnenlicht schneidet durch das Bild, starker Kontrast von Schatten und Hautton, warme Film-Halation, einfache und mutige Komposition, fühlt sich an wie ein Standbild aus einem Indie-Film.",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Pared Mandarina Una figura solitaria apoyada contra una pared naranja lisa, la luz del sol cortando el encuadre, fuerte contraste de sombra y tono de piel, halación cálida de película, composición simple y audaz, se siente como un fotograma de una película indie.",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Mur Mandarine Une silhouette solitaire adossée à un mur orange lisse, la lumière du soleil traversant le cadre, fort contraste d'ombre et de teint, halation chaude du film, composition simple et audacieuse, ressemble à un photogramme d'un film indépendant.",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Parede Tangerina Uma figura solitária encostada em uma parede laranja lisa, a luz do sol cortando o quadro, forte contraste de sombra e tom de pele, halação quente do filme, composição simples e ousada, parece um fotograma de um filme indie.",
    },
    image: "/images/image-gen/image-gen-001.avif",
  },
  {
    id: "discover-2",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Olive Window A still-life of green-tinted glass bottles on a windowsill with sunlight passing through, dust particles in air, muted olive and golden tones, soft film texture, minimal composition with quiet poetry.",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Olivenfenster Ein Stillleben aus grüngetönten Glasflaschen auf einer Fensterbank mit durchscheinendem Sonnenlicht, Staubpartikel in der Luft, gedämpfte Oliv- und Goldtöne, weiche Filmtextur, minimale Komposition mit stiller Poesie.",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Ventana Oliva Una naturaleza muerta de botellas de vidrio con tinte verde en el alféizar de una ventana con luz solar atravesando, partículas de polvo en el aire, tonos oliva y dorados apagados, textura suave de película, composición mínima con poesía silenciosa.",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Fenêtre Olive Une nature morte de bouteilles en verre teintées de vert sur un rebord de fenêtre avec la lumière du soleil passant à travers, particules de poussière dans l'air, tons olive et dorés atténués, texture douce du film, composition minimale avec une poésie silencieuse.",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Janela Oliva Uma natureza-morta de garrafas de vidro com tonalidade verde em um parapeito de janela com luz solar passando, partículas de poeira no ar, tons oliva e dourados suaves, textura suave de filme, composição mínima com poesia silenciosa.",
    },
    image: "/images/image-gen/image-gen-002.avif",
  },
  {
    id: "discover-3",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Crimson Window A silhouette framed by red curtains, diffused daylight creating a hazy gradient of crimson and coral, visible film grain, halation glow, evocative and emotional yet restrained.",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Purpurrotes Fenster Eine Silhouette, gerahmt von roten Vorhängen, diffuses Tageslicht erzeugt einen verschwommenen Gradienten aus Purpur und Koralle, sichtbares Filmkorn, Halationsleuchten, evokativ und emotional, aber zurückhaltend.",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Ventana Carmesí Una silueta enmarcada por cortinas rojas, luz del día difusa creando un gradiente brumoso de carmesí y coral, grano de película visible, brillo de halación, evocador y emocional pero contenido.",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Fenêtre Cramoisie Une silhouette encadrée par des rideaux rouges, lumière du jour diffuse créant un dégradé brumeux de cramoisi et de corail, grain de film visible, lueur d'halation, évocateur et émotionnel mais retenu.",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Janela Carmesim Uma silhueta emoldurada por cortinas vermelhas, luz do dia difusa criando um gradiente nebuloso de carmesim e coral, grão de filme visível, brilho de halação, evocativo e emocional, mas contido.",
    },
    image: "/images/image-gen/image-gen-003.avif",
  },
  {
    id: "discover-4",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Ivory Wind A woman in a white outfit mid-motion, braids trailing sideways, burnt sienna background, cinematic motion blur, analog imperfection, high-art editorial vibe.",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Elfenbeinwind Eine Frau in weißem Outfit in Bewegung, Zöpfe seitlich wehend, gebrannter Siena-Hintergrund, kinematografische Bewegungsunschärfe, analoge Unvollkommenheit, High-Art-Editorial-Atmosphäre.",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Viento Marfil Una mujer con atuendo blanco en movimiento, trenzas ondeando hacia los lados, fondo siena tostado, desenfoque de movimiento cinematográfico, imperfección analógica, vibra editorial de alto arte.",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Vent Ivoire Une femme en tenue blanche en mouvement, tresses flottant sur le côté, fond terre de Sienne brûlée, flou de mouvement cinématographique, imperfection analogique, ambiance éditoriale haute couture.",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Vento Marfim Uma mulher com roupa branca em movimento, tranças flutuando para os lados, fundo siena queimado, desfoque de movimento cinematográfico, imperfeição analógica, vibração editorial de alta arte.",
    },
    image: "/images/image-gen/image-gen-004.avif",
  },
  {
    id: "discover-5",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Verdant Foam Macro shot of green bubbles or organic fluid texture, abstract and tactile, 1970s experimental film energy, rich analog texture, matte contrast.",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Grüner Schaum Makroaufnahme von grünen Blasen oder organischer Flüssigkeitstextur, abstrakt und haptisch, experimentelle Filmenergie der 1970er Jahre, reiche analoge Textur, matter Kontrast.",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Espuma Verdante Toma macro de burbujas verdes o textura fluida orgánica, abstracta y táctil, energía de película experimental de los años 70, rica textura analógica, contraste mate.",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Mousse Verdoyante Prise de vue macro de bulles vertes ou de texture fluide organique, abstraite et tactile, énergie de film expérimental des années 1970, riche texture analogique, contraste mat.",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Espuma Verdejante Foto macro de bolhas verdes ou textura fluida orgânica, abstrata e tátil, energia de filme experimental dos anos 1970, rica textura analógica, contraste fosco.",
    },
    image: "/images/image-gen/image-gen-005.avif",
  },
  {
    id: "discover-6",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Pistachio Flame A silver lighter burning against a matte pistachio-green background, shallow depth of field, soft halation around the flame, clean minimal framing, modern-retro energy.",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Pistazienflamme Ein silbernes Feuerzeug brennt vor einem matten pistaziengrünen Hintergrund, geringe Schärfentiefe, sanfte Halation um die Flamme, saubere minimale Rahmung, modern-retro Energie.",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Llama Pistacho Un encendedor plateado ardiendo contra un fondo verde pistacho mate, poca profundidad de campo, halación suave alrededor de la llama, encuadre mínimo limpio, energía moderno-retro.",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Flamme Pistache Un briquet argenté brûlant sur un fond vert pistache mat, faible profondeur de champ, halation douce autour de la flamme, cadrage minimal épuré, énergie moderne-rétro.",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Chama Pistache Um isqueiro prateado queimando contra um fundo verde pistache fosco, pouca profundidade de campo, halação suave ao redor da chama, enquadramento mínimo limpo, energia moderno-retrô.",
    },
    image: "/images/image-gen/image-gen-006.avif",
  },
  {
    id: "discover-7",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Ultramarine Room Deep ocean colored lobster, cool tones balanced by warm skin, visible 16mm film grain, natural stillness, sense of contemplation.",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Ultramarinraum Tiefseefarbener Hummer, kühle Töne ausgeglichen durch warme Haut, sichtbares 16-mm-Filmkorn, natürliche Stille, Gefühl der Kontemplation.",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Habitación Ultramar Langosta color océano profundo, tonos fríos equilibrados por piel cálida, grano de película de 16 mm visible, quietud natural, sensación de contemplación.",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Chambre Outremer Homard couleur océan profond, tons froids équilibrés par une peau chaude, grain de film 16 mm visible, immobilité naturelle, sens de la contemplation.",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Sala Ultramar Lagosta cor de oceano profundo, tons frios equilibrados por pele quente, grão de filme de 16 mm visível, quietude natural, sensação de contemplação.",
    },
    image: "/images/image-gen/image-gen-007.avif",
  },
  {
    id: "discover-8",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A collection of cinematic minimalist stills shot on 16mm film — visible halation, analog grain, soft color bleed, imperfect handheld framing, and tactile realism. Each image uses a single dominant color to drive emotion, inspired by independent art films and modern editorial photography. Natural light, authentic mood, non-commercial tone, strong negative space, subtle human presence. Green ocean, visible 16mm film grain, natural stillness, macro lense hyper close up",
      de: "Eine Sammlung kinematografisch minimalistischer Standbilder, aufgenommen auf 16-mm-Film — sichtbare Halation, analoges Korn, sanftes Farbausbluten, unperfekte Handkameraführung und haptischer Realismus. Jedes Bild verwendet eine einzige dominante Farbe, um Emotionen zu vermitteln, inspiriert von unabhängigen Kunstfilmen und moderner redaktioneller Fotografie. Natürliches Licht, authentische Stimmung, nicht-kommerzieller Ton, starker Negativraum, subtile menschliche Präsenz. Grüner Ozean, sichtbares 16-mm-Filmkorn, natürliche Stille, Makroobjektiv-Hypernahaufnahme",
      es: "Una colección de fotografías minimalistas cinematográficas filmadas en película de 16 mm — halación visible, grano analógico, sangrado suave de color, encuadre manual imperfecto y realismo táctil. Cada imagen utiliza un solo color dominante para transmitir emoción, inspirado en películas de arte independiente y fotografía editorial moderna. Luz natural, ambiente auténtico, tono no comercial, fuerte espacio negativo, presencia humana sutil. Océano verde, grano de película de 16 mm visible, quietud natural, hiper primer plano con lente macro",
      fr: "Une collection de clichés minimalistes cinématographiques tournés sur film 16 mm — halation visible, grain analogique, bavure douce des couleurs, cadrage à main levée imparfait et réalisme tactile. Chaque image utilise une seule couleur dominante pour transmettre l'émotion, inspirée des films d'art indépendants et de la photographie éditoriale moderne. Lumière naturelle, ambiance authentique, ton non commercial, fort espace négatif, présence humaine subtile. Océan vert, grain de film 16 mm visible, immobilité naturelle, hyper gros plan avec objectif macro",
      "pt-BR":
        "Uma coleção de fotos minimalistas cinematográficas filmadas em película de 16 mm — halação visível, grão analógico, sangramento suave de cor, enquadramento manual imperfeito e realismo tátil. Cada imagem usa uma única cor dominante para transmitir emoção, inspirada em filmes de arte independentes e fotografia editorial moderna. Luz natural, clima autêntico, tom não comercial, forte espaço negativo, presença humana sutil. Oceano verde, grão de filme de 16 mm visível, quietude natural, hiper close-up com lente macro",
    },
    image: "/images/image-gen/image-gen-009.avif",
  },
  {
    id: "discover-9",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A minimalist portrait of a figure wearing a wide-brimmed hat, rendered in stark black and white with a single vibrant red brushstroke across the eyes; simple yet striking; evokes high-end fashion magazine covers",
      de: "Ein minimalistisches Porträt einer Figur mit einem breitkrempigen Hut, in starkem Schwarz-Weiß gehalten mit einem einzigen lebhaften roten Pinselstrich über den Augen; einfach, aber auffällig; erinnert an Cover von High-End-Modemagazinen",
      es: "Un retrato minimalista de una figura con un sombrero de ala ancha, renderizado en blanco y negro austero con una sola pincelada roja vibrante sobre los ojos; simple pero impactante; evoca portadas de revistas de moda de alta gama",
      fr: "Un portrait minimaliste d'une silhouette portant un chapeau à larges bords, rendu en noir et blanc austère avec un seul coup de pinceau rouge vif sur les yeux ; simple mais frappant ; évoque les couvertures de magazines de mode haut de gamme",
      "pt-BR":
        "Um retrato minimalista de uma figura usando um chapéu de aba larga, renderizado em preto e branco austero com uma única pincelada vermelha vibrante sobre os olhos; simples, mas marcante; evoca capas de revistas de moda de alta gama",
    },
    image: "/images/image-gen/image-gen-011.avif",
  },
  {
    id: "discover-10",
    styleName: "Plastic Vogue",
    prompts: {
      en: "An open black umbrella standing perfectly upright in a white bathtub; soft eggshell lighting, pale peach background, calm but absurd",
      de: "Ein offener schwarzer Regenschirm steht perfekt aufrecht in einer weißen Badewanne; sanftes eierschalenfarbenes Licht, blassrosa Hintergrund, ruhig aber absurd",
      es: "Un paraguas negro abierto de pie perfectamente erguido en una bañera blanca; iluminación suave color cáscara de huevo, fondo durazno pálido, tranquilo pero absurdo",
      fr: "Un parapluie noir ouvert se tenant parfaitement droit dans une baignoire blanche ; éclairage doux coquille d'œuf, fond pêche pâle, calme mais absurde",
      "pt-BR":
        "Um guarda-chuva preto aberto de pé perfeitamente ereto em uma banheira branca; iluminação suave cor de casca de ovo, fundo pêssego pálido, calmo mas absurdo",
    },
    image: "/images/image-gen/image-gen-012.avif",
  },
  {
    id: "discover-11",
    styleName: "Plastic Vogue",
    prompts: {
      en: "One yellow-painted hand casting an electric blue shadow on a soft beige wall; minimalist tension, bold shape",
      de: "Eine gelb bemalte Hand wirft einen elektrisch blauen Schatten auf eine weiche beige Wand; minimalistische Spannung, kühne Form",
      es: "Una mano pintada de amarillo proyectando una sombra azul eléctrico en una pared beige suave; tensión minimalista, forma audaz",
      fr: "Une main peinte en jaune projetant une ombre bleu électrique sur un mur beige doux ; tension minimaliste, forme audacieuse",
      "pt-BR":
        "Uma mão pintada de amarelo projetando uma sombra azul elétrico em uma parede bege suave; tensão minimalista, forma ousada",
    },
    image: "/images/image-gen/image-gen-013.avif",
  },
  {
    id: "discover-12",
    styleName: "Plastic Vogue",
    prompts: {
      en: "Close-up portrait of a woman with flat paper strips replacing hair, off-white background, eyes closed, editorial calm",
      de: "Nahaufnahme-Porträt einer Frau mit flachen Papierstreifen anstelle von Haaren, cremefarbener Hintergrund, geschlossene Augen, redaktionelle Ruhe",
      es: "Retrato de primer plano de una mujer con tiras de papel planas reemplazando el cabello, fondo blanco hueso, ojos cerrados, calma editorial",
      fr: "Portrait en gros plan d'une femme avec des bandes de papier plates remplaçant les cheveux, fond blanc cassé, yeux fermés, calme éditorial",
      "pt-BR":
        "Retrato em close-up de uma mulher com tiras de papel planas substituindo o cabelo, fundo branco pérola, olhos fechados, calma editorial",
    },
    image: "/images/image-gen/image-gen-014.avif",
  },
  {
    id: "discover-13",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A cracked egg yolk sitting perfectly on the toe of a shiny black leather shoe; stark lavender background",
      de: "Ein aufgebrochenes Eigelb sitzt perfekt auf der Spitze eines glänzenden schwarzen Lederschuhs; starker Lavendelhintergrund",
      es: "Una yema de huevo agrietada sentada perfectamente en la punta de un zapato de cuero negro brillante; fondo lavanda austero",
      fr: "Un jaune d'œuf fissuré posé parfaitement sur la pointe d'une chaussure en cuir noir brillant ; fond lavande austère",
      "pt-BR":
        "Uma gema de ovo rachada sentada perfeitamente na ponta de um sapato de couro preto brilhante; fundo lavanda austero",
    },
    image: "/images/image-gen/image-gen-015.avif",
  },
  {
    id: "discover-14",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A mid-century wooden chair levitating a few centimeters above a terracotta floor, against teal wall; gravity-defying stillness",
      de: "Ein Holzstuhl im Mid-Century-Stil schwebt einige Zentimeter über einem Terrakottaboden vor einer blaugrünen Wand; schwerkraftwidrige Stille",
      es: "Una silla de madera de mediados de siglo levitando unos centímetros sobre un piso de terracota, contra una pared verde azulado; quietud que desafía la gravedad",
      fr: "Une chaise en bois du milieu du siècle lévitant à quelques centimètres au-dessus d'un sol en terre cuite, contre un mur bleu sarcelle ; immobilité défiant la gravité",
      "pt-BR":
        "Uma cadeira de madeira do meio do século levitando alguns centímetros acima de um piso de terracota, contra uma parede azul-petróleo; quietude que desafia a gravidade",
    },
    image: "/images/image-gen/image-gen-016.avif",
  },
  {
    id: "discover-15",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A close-up of a human mouth exhaling golden smoke; lips painted matte emerald green, background pure crimson red. Shot like a perfume ad, surreal and luxurious",
      de: "Eine Nahaufnahme eines menschlichen Mundes, der goldenen Rauch ausatmet; Lippen in mattem Smaragdgrün bemalt, Hintergrund reines Purpurrot. Aufgenommen wie eine Parfümwerbung, surreal und luxuriös",
      es: "Un primer plano de una boca humana exhalando humo dorado; labios pintados de verde esmeralda mate, fondo rojo carmesí puro. Fotografiado como un anuncio de perfume, surrealista y lujoso",
      fr: "Un gros plan d'une bouche humaine exhalant de la fumée dorée ; lèvres peintes en vert émeraude mat, fond rouge cramoisi pur. Pris comme une publicité de parfum, surréaliste et luxueux",
      "pt-BR":
        "Um close-up de uma boca humana exalando fumaça dourada; lábios pintados de verde esmeralda fosco, fundo vermelho carmesim puro. Fotografado como um anúncio de perfume, surreal e luxuoso",
    },
    image: "/images/image-gen/image-gen-017.avif",
  },
  {
    id: "discover-16",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A yellow banana bent into the shape of a teacup handle, attached to a porcelain mug filled with dark coffee; flat turquoise background, harsh spotlight, absurd but calm",
      de: "Eine gelbe Banane in die Form eines Teetassengriffs gebogen, befestigt an einer Porzellantasse gefüllt mit dunklem Kaffee; flacher türkisfarbener Hintergrund, hartes Scheinwerferlicht, absurd aber ruhig",
      es: "Un plátano amarillo doblado en forma de asa de taza de té, unido a una taza de porcelana llena de café oscuro; fondo turquesa plano, foco intenso, absurdo pero tranquilo",
      fr: "Une banane jaune courbée en forme d'anse de tasse à thé, attachée à une tasse en porcelaine remplie de café noir ; fond turquoise plat, projecteur dur, absurde mais calme",
      "pt-BR":
        "Uma banana amarela dobrada em forma de alça de xícara de chá, presa a uma caneca de porcelana cheia de café escuro; fundo turquesa plano, holofote forte, absurdo mas calmo",
    },
    image: "/images/image-gen/image-gen-018.avif",
  },
  {
    id: "discover-17",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A close-up portrait where two hands form the shape of sunglasses over the eyes; bright yellow background, matte skin tone, red nail polish, fashion editorial surrealism",
      de: "Ein Nahaufnahme-Porträt, bei dem zwei Hände die Form einer Sonnenbrille über den Augen bilden; leuchtend gelber Hintergrund, matter Hautton, roter Nagellack, Mode-Editorial-Surrealismus",
      es: "Un retrato de primer plano donde dos manos forman la forma de gafas de sol sobre los ojos; fondo amarillo brillante, tono de piel mate, esmalte de uñas rojo, surrealismo editorial de moda",
      fr: "Un portrait en gros plan où deux mains forment la forme de lunettes de soleil sur les yeux ; fond jaune vif, teint mat, vernis à ongles rouge, surréalisme éditorial de mode",
      "pt-BR":
        "Um retrato em close-up onde duas mãos formam o formato de óculos de sol sobre os olhos; fundo amarelo brilhante, tom de pele fosco, esmalte vermelho, surrealismo editorial de moda",
    },
    image: "/images/image-gen/image-gen-019.avif",
  },
  {
    id: "discover-18",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A perfect lemon carved into a cube shape, slightly melting onto a glossy cobalt-blue surface, dramatic studio light with soft shadows, pop-art minimalism",
      de: "Eine perfekte Zitrone in Würfelform geschnitzt, leicht schmelzend auf einer glänzenden kobaltblauen Oberfläche, dramatisches Studiolicht mit weichen Schatten, Pop-Art-Minimalismus",
      es: "Un limón perfecto tallado en forma de cubo, derritiéndose ligeramente sobre una superficie azul cobalto brillante, luz de estudio dramática con sombras suaves, minimalismo pop-art",
      fr: "Un citron parfait sculpté en forme de cube, fondant légèrement sur une surface bleu cobalt brillante, lumière de studio dramatique avec des ombres douces, minimalisme pop-art",
      "pt-BR":
        "Um limão perfeito esculpido em forma de cubo, derretendo levemente sobre uma superfície azul cobalto brilhante, luz de estúdio dramática com sombras suaves, minimalismo pop-art",
    },
    image: "/images/image-gen/image-gen-020.avif",
  },
  {
    id: "discover-19",
    styleName: "Plastic Vogue",
    prompts: {
      en: "A single square slice of bright blue sky with clouds, floating above a red velvet surface; surreal composition, minimal, fine-art still-life tone",
      de: "Ein einzelnes quadratisches Stück leuchtend blauer Himmel mit Wolken, schwebend über einer roten Samtoberfläche; surreale Komposition, minimal, Kunstfotografie-Stillleben-Ton",
      es: "Una sola rebanada cuadrada de cielo azul brillante con nubes, flotando sobre una superficie de terciopelo rojo; composición surrealista, mínima, tono de naturaleza muerta de bellas artes",
      fr: "Une seule tranche carrée de ciel bleu vif avec des nuages, flottant au-dessus d'une surface de velours rouge ; composition surréaliste, minimale, ton de nature morte artistique",
      "pt-BR":
        "Uma única fatia quadrada de céu azul brilhante com nuvens, flutuando acima de uma superfície de veludo vermelho; composição surreal, mínima, tom de natureza-morta de belas artes",
    },
    image: "/images/image-gen/image-gen-021.avif",
  },
];
