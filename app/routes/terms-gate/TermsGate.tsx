import { useCallback, useEffect, useState } from "react";

import styles from "./TermsGate.module.scss";

import envatoMarkSrc from "../dashboard/assets/envato-mark-dark.svg";
import envatoLogoSrc from "../dashboard/assets/envato-logo-dark.svg";

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 15 7 10 12 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.checkboxCheck} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2.5 7 5.5 10 11.5 4" />
    </svg>
  );
}

interface TermsGateProps {
  onAccept: () => void;
  onBack?: () => void;
}

export function TermsGate({ onAccept, onBack }: TermsGateProps) {
  const [agreed, setAgreed] = useState(false);

  const handleTermsClick = useCallback(() => {
    window.open("https://www.envato.com/terms-policies", "_blank");
  }, []);

  useEffect(() => {
    function onFocus() {
      setAgreed(true);
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={envatoMarkSrc} alt="" className={styles.logoMark} />
          <img src={envatoLogoSrc} alt="Envato" className={styles.logoType} />
        </div>
        <span className={styles.headerLink}>Sign In</span>
      </header>

      <main className={styles.main}>
        {onBack && (
          <button type="button" className={styles.backButton} onClick={onBack}>
            <BackArrow />
          </button>
        )}

        <h1 className={styles.title}>Updated Terms &amp; policies</h1>

        <p className={styles.body}>
          We've recently updated our Terms &amp; policies.
          <br />
          Please review and accept the{" "}
          <a
            href="https://www.envato.com/terms-policies"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleTermsClick();
            }}
          >
            updated Terms &amp; policies
          </a>{" "}
          to continue using Envato.
        </p>

        <button
          type="button"
          className={styles.checkbox}
          onClick={() => setAgreed((v) => !v)}
        >
          <span className={agreed ? styles.checkboxBoxChecked : styles.checkboxBox}>
            {agreed && <CheckIcon />}
          </span>
          <span className={styles.checkboxLabel}>
            I agree to Envato's Terms &amp; policies that apply to my use of
            Envato products
          </span>
        </button>

        <button
          type="button"
          className={styles.submitButton}
          disabled={!agreed}
          onClick={onAccept}
        >
          Accept &amp; continue
        </button>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <span className={styles.footerLink}>About Envato</span>
          <span className={styles.footerLink}>Plans &amp; Pricing</span>
          <span className={styles.footerLink}>License Terms</span>
          <span className={styles.footerLink}>Terms &amp; Conditions</span>
          <span className={styles.footerLink}>Privacy Policy</span>
          <span className={styles.footerLink}>Cookies</span>
          <span className={styles.footerLink}>Do not share my personal information</span>
          <span className={styles.footerLink}>Help Center</span>
          <span className={styles.footerLink}>Cookie Settings</span>
        </div>
        <div className={styles.footerSocials}>
          {["IG", "TK", "FB", "YT", "TH", "PI", "X"].map((s) => (
            <div key={s} className={styles.footerSocialIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <text x="10" y="14" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="PolySans, sans-serif">{s}</text>
              </svg>
            </div>
          ))}
        </div>
        <span className={styles.footerCopyright}>
          &copy; 2025 Envato Trademarks and brands are the property of their respective owners.
        </span>
      </footer>
    </div>
  );
}
