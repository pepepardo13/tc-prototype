import { useMemo, useState } from "react";

import { Icon } from "@envato/design-system/components";

import envatoLogoHref from "../../components/Navigation/HomeLink/envato.svg";

import categoryPhotos from "./assets/category-photos.png";
import categoryVideos from "./assets/category-videos.png";
import categoryVideoTemplates from "./assets/category-video-templates.png";
import categoryMusic from "./assets/category-music.png";
import categoryGraphics from "./assets/category-graphics.png";
import categorySoundEffects from "./assets/category-sound-effects.png";
import categoryGraphicTemplates from "./assets/category-graphic-templates.png";
import categoryFonts from "./assets/category-fonts.png";
import category3d from "./assets/category-3d.png";
import categoryPresentationTemplates from "./assets/category-presentation-templates.png";

import thumbMusicVisual from "./assets/thumb-music-visual.png";
import thumbToteBag from "./assets/thumb-tote-bag.png";
import thumbPosterSet from "./assets/thumb-poster-set.png";
import thumbHelloGraphics from "./assets/thumb-hello-graphics.png";
import thumbCompanyProfile from "./assets/thumb-company-profile.png";
import thumbBeautyPortrait from "./assets/thumb-beauty-portrait.png";

import sparkTexture from "./assets/spark-texture.png";
import shapeA from "./assets/shape-a.png";
import shapeB from "./assets/shape-b.png";
import sparkLine from "./assets/spark-line.png";

import styles from "./ExploreStock.module.scss";

const GEN_AI_ITEMS: { icon: string; label: string }[] = [
  { icon: "photo-landscape-outlined", label: "ImageGen" },
  { icon: "crop", label: "ImageEdit" },
  { icon: "video-horizontal", label: "VideoGen" },
  { icon: "music", label: "MusicGen" },
  { icon: "comment-text", label: "VoiceGen" },
  { icon: "claim-clear", label: "SoundGen" },
  { icon: "ai-graphics", label: "GraphicsGen" },
  { icon: "cube", label: "MockupGen" },
];

const STOCK_ITEMS: { icon: string; label: string }[] = [
  { icon: "photo-landscape-outlined", label: "Photos" },
  { icon: "video-horizontal", label: "Videos" },
  { icon: "ai-video", label: "Video Templates" },
  { icon: "music", label: "Music" },
  { icon: "claim-clear", label: "Sound Effects" },
  { icon: "palette", label: "Graphics" },
  { icon: "canvas-graphics", label: "Graphic Templates" },
  { icon: "fonts", label: "Fonts" },
  { icon: "cube", label: "3D" },
  { icon: "canvas-text", label: "Presentation Templates" },
  { icon: "add", label: "Add-Ons" },
  { icon: "globe", label: "Web" },
];

const FOOTER_ITEMS: { icon: string; label: string }[] = [
  { icon: "hot", label: "What's New" },
  { icon: "bookmark", label: "Workspaces" },
  { icon: "documents", label: "Generation history" },
];

const SECTIONS: {
  label: string;
  defaultOpen: boolean;
  items: { icon: string; label: string }[];
}[] = [
  { label: "Gen AI", defaultOpen: false, items: GEN_AI_ITEMS },
  { label: "Stock", defaultOpen: true, items: STOCK_ITEMS },
];

const CATEGORIES: { label: string; src: string }[] = [
  { label: "Photos", src: categoryPhotos },
  { label: "Videos", src: categoryVideos },
  { label: "Video templates", src: categoryVideoTemplates },
  { label: "Music", src: categoryMusic },
  { label: "Graphics", src: categoryGraphics },
  { label: "Sound effects", src: categorySoundEffects },
  { label: "Graphic templates", src: categoryGraphicTemplates },
  { label: "Fonts", src: categoryFonts },
  { label: "3D", src: category3d },
  { label: "Presentation templates", src: categoryPresentationTemplates },
];

const THUMBNAILS: { label: string; src: string }[] = [
  { label: "Music visual", src: thumbMusicVisual },
  { label: "Tote bag", src: thumbToteBag },
  { label: "Poster set", src: thumbPosterSet },
  { label: "Hello graphics", src: thumbHelloGraphics },
  { label: "Company profile", src: thumbCompanyProfile },
  { label: "Beauty portrait", src: thumbBeautyPortrait },
];

export function ExploreStock() {
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(SECTIONS.map((s) => [s.label, s.defaultOpen])),
  );

  const filteredThumbs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q
      ? THUMBNAILS.filter((t) => t.label.toLowerCase().includes(q))
      : THUMBNAILS;
  }, [search]);

  return (
    <div className={styles.page}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.sidebarHeader}>
            <img alt="Envato" className={styles.logo} src={envatoLogoHref} />
            <button
              aria-label="Toggle sidebar"
              className={styles.sidebarToggle}
              type="button"
            />
          </div>

          <div aria-hidden="true" className={styles.sidebarSpacer} />

          {SECTIONS.map((section, idx) => (
            <div key={section.label} className={styles.sidebarSectionGroup}>
              <section className={styles.sidebarSection}>
                <button
                  aria-controls={`sidebar-section-${section.label}`}
                  aria-expanded={openSections[section.label]}
                  className={styles.sidebarSectionHeader}
                  onClick={() =>
                    setOpenSections((prev) => ({
                      ...prev,
                      [section.label]: !prev[section.label],
                    }))
                  }
                  type="button"
                >
                  <span>{section.label}</span>
                  <span
                    className={`${styles.chevron} ${openSections[section.label] ? styles.chevronOpen : ""}`}
                  >
                    <Icon name="chevron-down" size="1x" />
                  </span>
                </button>

                <div
                  className={`${styles.navList} ${openSections[section.label] ? styles.navListOpen : styles.navListClosed}`}
                  id={`sidebar-section-${section.label}`}
                >
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      className={styles.navItem}
                      type="button"
                    >
                      <Icon name={item.icon as any} size="1x" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {idx === 0 && (
                <div aria-hidden="true" className={styles.sidebarSpacer} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.generationPanel}>
            <div className={styles.generationHeader}>
              <span>5 Generations remaining</span>
              <Icon name="chevron-down" size="1x" />
            </div>
            <div className={styles.generationTrack}>
              <div
                className={styles.generationFill}
                style={{ width: "50%" }}
              />
            </div>
          </div>

          <div className={styles.sidebarFooter}>
            {FOOTER_ITEMS.map((item) => (
              <button
                key={item.label}
                className={styles.navItem}
                type="button"
              >
                <Icon name={item.icon as any} size="1x" />
                <span>{item.label}</span>
              </button>
            ))}

            <button
              className={`${styles.navItem} ${styles.profileItem}`}
              type="button"
            >
              <div className={styles.profileLeft}>
                <Icon name="user" size="1x" />
                <span>John Doe</span>
              </div>
              <Icon name="chevron-right" size="1x" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className={styles.main}>
        <div className={styles.heroPattern} />

        <div className={styles.content}>
          <header className={styles.hero}>
            <h1 className={styles.headline}>
              <span>Let&rsquo;s</span>
              <span className={styles.sparkWrap}>
                <img alt="" className={styles.sparkShapeA} src={shapeA} />
                <img alt="" className={styles.sparkShapeB} src={shapeB} />
                <img alt="" className={styles.sparkLine} src={sparkLine} />
                <img
                  alt="SPARK"
                  className={styles.sparkTexture}
                  src={sparkTexture}
                />
              </span>
              <span>something new</span>
            </h1>

            <div className={styles.searchBar}>
              <button className={styles.categoryButton} type="button">
                <span>All Items</span>
                <Icon name="chevron-down" size="1x" />
              </button>
              <input
                aria-label="Search assets"
                className={styles.searchInput}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                type="search"
                value={search}
              />
              <button
                aria-label="Search"
                className={styles.searchButton}
                type="button"
              >
                <Icon name="search" size="1x" />
              </button>
            </div>

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${styles.tabActive}`}
                type="button"
              >
                <Icon name="claim-clear" size="1x" />
                <span>Explore stock</span>
              </button>
              <button className={styles.tab} type="button">
                <Icon name="bookmark" size="1x" />
                <span>Workspace</span>
              </button>
            </div>
          </header>

          <section
            className={styles.categoryRail}
            aria-label="Browse categories"
          >
            {CATEGORIES.map((cat) => (
              <article key={cat.label} className={styles.categoryCard}>
                <div className={styles.categoryCardVisual}>
                  <img alt="" className={styles.categoryImage} src={cat.src} />
                </div>
                <span className={styles.categoryLabel}>{cat.label}</span>
              </article>
            ))}
          </section>

          <section
            className={styles.thumbRail}
            aria-label="Featured assets"
          >
            {filteredThumbs.map((t) => (
              <article key={t.label} className={styles.thumbCard}>
                <img
                  alt={t.label}
                  className={styles.thumbImage}
                  src={t.src}
                />
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
