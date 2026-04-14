/**
 * VideoGen discover page example generations.
 *
 * Each example has a unique ID, preset reference, prompt text,
 * and a thumbnail image URL.
 */
export type VideoExample = {
  id: string;
  presetName: string;
  prompt: string;
  image: string;
};

/**
 * Curated examples for the VideoGen discover page carousel.
 * These showcase the variety of prompts and visual styles available.
 *
 * Using picsum.photos as placeholder thumbnails since we don't have
 * real video generation thumbnails yet.
 */
export const VIDEO_EXAMPLES: VideoExample[] = [
  {
    id: "video-1",
    presetName: "Cinematic",
    prompt:
      "A neon-lit sports car drifting through rain-soaked city streets at night, reflections of red and blue neon signs shimmering on wet asphalt, cinematic slow pan following the motion",
    image: "https://picsum.photos/seed/videogen1/400/300",
  },
  {
    id: "video-2",
    presetName: "Cinematic",
    prompt:
      "An astronaut standing on a rocky alien planet, looking up at a massive ringed gas giant filling the sky, dust particles floating in low gravity, golden hour lighting",
    image: "https://picsum.photos/seed/videogen2/400/300",
  },
  {
    id: "video-3",
    presetName: "Slow Motion",
    prompt:
      "A dancer performing a graceful leap inside a transparent glass sphere, captured in extreme slow motion, particles of light swirling around them, black background",
    image: "https://picsum.photos/seed/videogen3/400/300",
  },
  {
    id: "video-4",
    presetName: "Cinematic",
    prompt:
      "Abstract crystalline structures growing and refracting light in macro detail, iridescent surfaces catching prismatic colors, dark moody atmosphere with dramatic lighting",
    image: "https://picsum.photos/seed/videogen4/400/300",
  },
  {
    id: "video-5",
    presetName: "Hyper Lapse",
    prompt:
      "Time-lapse of a futuristic city skyline transitioning from day to night, clouds racing overhead, lights flickering on in thousands of windows, smooth hyperlapse movement",
    image: "https://picsum.photos/seed/videogen5/400/300",
  },
  {
    id: "video-6",
    presetName: "Slow Motion",
    prompt:
      "A hummingbird hovering in front of a vibrant tropical flower, wings beating in slow motion creating visible air distortions, dewdrops suspended mid-air, macro lens",
    image: "https://picsum.photos/seed/videogen6/400/300",
  },
  {
    id: "video-7",
    presetName: "Documentary",
    prompt:
      "Aerial drone shot following a lone surfer paddling out into massive ocean waves at sunrise, golden light catching the spray, wide cinematic composition",
    image: "https://picsum.photos/seed/videogen7/400/300",
  },
  {
    id: "video-8",
    presetName: "Animated",
    prompt:
      "A whimsical paper craft world where origami animals come to life and walk through a miniature forest, stop-motion style animation, warm soft lighting",
    image: "https://picsum.photos/seed/videogen8/400/300",
  },
  {
    id: "video-9",
    presetName: "Cinematic",
    prompt:
      "A lone figure walking through a vast desert landscape with towering sand dunes, dramatic shadows cast by low sun, wind carrying sand in flowing patterns",
    image: "https://picsum.photos/seed/videogen9/400/300",
  },
  {
    id: "video-10",
    presetName: "Slow Motion",
    prompt:
      "Paint of multiple colors being thrown and colliding in mid-air against a pure white background, explosive splashes frozen in extreme slow motion, vivid chromatic contrast",
    image: "https://picsum.photos/seed/videogen10/400/300",
  },
];
