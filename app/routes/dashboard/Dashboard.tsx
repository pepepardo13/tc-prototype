import styles from "./Dashboard.module.scss";

import envatoMarkSrc from "./assets/envato-mark-dark.svg";
import envatoLogoSrc from "./assets/envato-logo-dark.svg";

import promo1Src from "./assets/promo1.jpg";
import promo2Src from "./assets/promo2.jpg";
import cat1Src from "./assets/cat1.jpg";
import cat2Src from "./assets/cat2.jpg";
import cat3Src from "./assets/cat3.jpg";
import cat4Src from "./assets/cat4.jpg";
import cat5Src from "./assets/cat5.jpg";
import cat6Src from "./assets/cat6.jpg";
import cat7Src from "./assets/cat7.jpg";
import grid1Src from "./assets/grid1.jpg";
import grid2Src from "./assets/grid2.jpg";
import grid3Src from "./assets/grid3.jpg";
import grid4Src from "./assets/grid4.jpg";
import grid5Src from "./assets/grid5.jpg";
import grid6Src from "./assets/grid6.jpg";
import pick1Src from "./assets/pick1.jpg";
import pick2Src from "./assets/pick2.jpg";
import pick3Src from "./assets/pick3.jpg";
import pick4Src from "./assets/pick4.jpg";
import pick5Src from "./assets/pick5.jpg";
import searchIconSrc from "./assets/search-icon.svg";
import chevronDownSrc from "./assets/chevron-down.svg";
import aiIconSrc from "./assets/ai-icon-color.svg";

const NAV_TABS = [
  "Gen AI",
  "Video Templates",
  "Stock Video",
  "Audio",
  "Graphics",
  "Design Templates",
  "Photos",
  "3D",
  "Fonts",
  "More",
];

const CATEGORIES = [
  { label: "Category tile", src: cat1Src },
  { label: "Category tile", src: cat2Src },
  { label: "Category tile", src: cat3Src },
  { label: "Category tile", src: cat4Src },
  { label: "Category tile", src: cat5Src },
  { label: "Category tile", src: cat6Src },
  { label: "Category tile", src: cat7Src },
];

const ACTIVITY_GRID = [grid1Src, grid2Src, grid3Src, grid4Src, grid5Src, grid6Src];

const TOP_PICKS = [pick1Src, pick2Src, pick3Src, pick4Src, pick5Src];

const AUTHOR_NAMES = [
  "Author name",
  "Author name",
  "Author name",
  "Author name",
  "Author name",
  "Author name",
  "Author name",
  "Author name",
];

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" fill="#191919" />
    </svg>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: string;
}) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionTitleGroup}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
      </div>
      {action && (
        <button type="button" className={styles.sectionAction}>
          {action}
        </button>
      )}
    </div>
  );
}

export function Dashboard() {
  return (
    <div className={styles.page}>
      {/* Site header */}
      <header className={styles.siteHeader}>
        <nav className={styles.navBar}>
          <div className={styles.navLogo}>
            <img src={envatoMarkSrc} alt="" className={styles.navLogoMark} />
            <img src={envatoLogoSrc} alt="Envato" className={styles.navLogoType} />
          </div>

          <div className={styles.navTabs}>
            {NAV_TABS.map((tab) => (
              <button key={tab} type="button" className={styles.navTab}>
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.navRight}>
            <div className={styles.navLinks}>
              <span className={styles.navLink}>License</span>
              <span className={styles.navLink}>Pricing</span>
            </div>
            <div className={styles.navCtaWrap}>
              <button type="button" className={styles.navCta}>
                Get unlimited downloads
              </button>
            </div>
            <div className={styles.navAvatar}>
              <UserIcon />
            </div>
          </div>
        </nav>

        <div className={styles.searchBarWrap}>
          <div className={styles.searchBox}>
            <div className={styles.searchDropdown}>
              <span className={styles.searchDropdownLabel}>All items</span>
              <img
                src={chevronDownSrc}
                alt=""
                className={styles.searchDropdownChevron}
              />
            </div>
            <div className={styles.searchSeparator} />
            <div className={styles.searchInputArea}>
              <img src={searchIconSrc} alt="" className={styles.searchIcon} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search"
              />
              <button type="button" className={styles.aiButton}>
                <img src={aiIconSrc} alt="" width="8" height="12" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome */}
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome, Taylor</h1>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Promotion modules */}
        <div className={styles.promoRow}>
          <div className={styles.promoModule}>
            <div className={styles.promoContent}>
              <div>
                <h3 className={styles.promoTitle}>
                  VideoGen: Now with groundbreaking editing control
                </h3>
                <p className={styles.promoBody}>
                  Iterate on video generations with editing tools built for
                  tighter creative control.
                </p>
              </div>
              <button type="button" className={styles.promoButton}>
                Learn more
              </button>
            </div>
            <div className={styles.promoImage}>
              <img src={promo1Src} alt="" />
            </div>
          </div>

          <div className={styles.promoModule}>
            <div className={styles.promoContent}>
              <div>
                <h3 className={styles.promoTitle}>
                  Create with Nano Bananas 2
                </h3>
                <p className={styles.promoBody}>
                  Generate and edit images with sharper detail and precise text
                  rendering, powered by Google's latest image model.
                </p>
              </div>
              <button type="button" className={styles.promoButton}>
                Learn more
              </button>
            </div>
            <div className={styles.promoImage}>
              <img src={promo2Src} alt="" />
            </div>
          </div>
        </div>

        {/* Explore top categories */}
        <div>
          <SectionHeader
            title="Explore top categories"
            subtitle="Discover the latest content in the categories you spend the most time."
            action="Show all"
          />
          <div className={styles.categoryRow}>
            {CATEGORIES.map((cat, i) => (
              <div key={i} className={styles.categoryTile}>
                <div className={styles.categoryImage}>
                  <img src={cat.src} alt="" />
                </div>
                <span className={styles.categoryLabel}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Based on your activity */}
        <div>
          <SectionHeader
            title="Based on your activity"
            subtitle="A selection of top recommendations based on your downloads."
          />
          <div className={styles.assetGrid}>
            {ACTIVITY_GRID.map((src, i) => (
              <div key={i} className={styles.assetCard}>
                <div className={styles.assetImage}>
                  <img src={src} alt="" />
                </div>
              </div>
            ))}
            {ACTIVITY_GRID.map((src, i) => (
              <div key={`r2-${i}`} className={styles.assetCard}>
                <div className={styles.assetImage}>
                  <img src={src} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top picks */}
        <div>
          <SectionHeader
            title="Top picks"
            subtitle="Top quality assets, all hand-picked by our team."
          />
          <div className={styles.picksGrid}>
            {TOP_PICKS.map((src, i) => (
              <div key={i} className={styles.pickCard}>
                <div className={styles.pickImage}>
                  <img src={src} alt="" />
                </div>
              </div>
            ))}
            {TOP_PICKS.map((src, i) => (
              <div key={`r2-${i}`} className={styles.pickCard}>
                <div className={styles.pickImage}>
                  <img src={src} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discover our active authors */}
        <div>
          <SectionHeader
            title="Discover our active authors"
            subtitle="Discover premium content from our most active authors."
          />
          <div className={styles.authorRow}>
            {AUTHOR_NAMES.map((name, i) => (
              <div key={i} className={styles.authorCard}>
                <div className={styles.authorAvatar}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `hsl(${i * 40 + 20}, 50%, 75%)`,
                    }}
                  />
                </div>
                <span className={styles.authorName}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div className={styles.footerCol}>
            <div className={styles.footerLogoSection}>
              <div className={styles.footerLogo}>
                <img src={envatoMarkSrc} alt="" style={{ width: 22, height: 32 }} />
                <img src={envatoLogoSrc} alt="Envato" style={{ height: 24 }} />
              </div>
              <div className={styles.footerSocials}>
                {["IG", "TW", "FB", "YT", "TK", "PI", "LI"].map((s) => (
                  <div key={s} className={styles.footerSocialIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <text x="12" y="16" textAnchor="middle" fill="#191919" fontSize="8" fontFamily="PolySans, sans-serif">{s}</text>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footerCol}>
            <div className={styles.footerGroup}>
              <span className={styles.footerGroupTitle}>Discover</span>
              {["About Envato", "Our Pricing & Plans", "Stock Video", "Video Templates", "Royalty-Free Music", "Stock Photos", "Fonts", "Monthly Free Files", "Popular Searches"].map((link) => (
                <span key={link} className={styles.footerLink}>{link}</span>
              ))}
            </div>
          </div>

          <div className={styles.footerCol}>
            <div className={styles.footerGroup}>
              <span className={styles.footerGroupTitle}>License & User Terms</span>
              {["License Terms", "Terms & Conditions", "Privacy Policy", "Acceptable Use Policy", "Fair Use Policy", "Cookies", "Do not sell or share my personal information"].map((link) => (
                <span key={link} className={styles.footerLink}>{link}</span>
              ))}
            </div>
            <div className={styles.footerGroup}>
              <span className={styles.footerGroupTitle}>Resources</span>
              {["Discover Tuts+", "Video & Music", "Design", "Marketing", "Web Design", "Explore our Blog"].map((link) => (
                <span key={link} className={styles.footerLink}>{link}</span>
              ))}
            </div>
          </div>

          <div className={styles.footerCol}>
            <div className={styles.footerGroup}>
              <span className={styles.footerGroupTitle}>Help</span>
              {["Help Center", "Become an Affiliate"].map((link) => (
                <span key={link} className={styles.footerLink}>{link}</span>
              ))}
            </div>
            <div className={styles.footerGroup}>
              <span className={styles.footerGroupTitle}>About Us</span>
              {["Who we are", "Our Products", "Join our Team", "Our Forum", "Company Blog"].map((link) => (
                <span key={link} className={styles.footerLink}>{link}</span>
              ))}
            </div>
            <div className={styles.footerGroup}>
              <span className={styles.footerGroupTitle}>Authors</span>
              {["Become an Author", "Author Sign In", "Author Help Center"].map((link) => (
                <span key={link} className={styles.footerLink}>{link}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomLeft}>
            <div className={styles.footerBottomLinks}>
              <div className={styles.footerProductLinks}>
                <span>Envato Market</span>
                <span>Envato Tuts+</span>
                <span>Placeit by Envato</span>
                <span>Mixkit</span>
                <span>All Products</span>
                <span>Sitemap</span>
              </div>
              <span className={styles.footerCopyright}>
                &copy; 2023 Envato Elements Pty Ltd. Trademarks and brands are
                the property of their respective owners.
              </span>
            </div>
          </div>
          <button type="button" className={styles.footerLanguage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            English
          </button>
        </div>
      </footer>
    </div>
  );
}
