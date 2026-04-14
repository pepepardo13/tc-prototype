import { useState } from "react";

import styles from "./SignUp.module.scss";

import backgroundSrc from "./assets/background.jpg";
import checkmarkSrc from "./assets/checkmark.svg";
import envatoLogoSrc from "./assets/envato-logo.svg";
import envatoMarkSrc from "./assets/envato-mark.svg";

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.09A6.97 6.97 0 0 1 5.49 12c0-.72.13-1.42.35-2.09V7.07H2.18A11.02 11.02 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#191919">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.51-3.23 0-1.44.64-2.2.46-3.06-.4C3.79 16.17 4.36 9.53 8.86 9.28c1.27.07 2.15.72 2.9.77.98-.2 1.92-.77 2.98-.7 1.26.1 2.21.6 2.84 1.5-2.6 1.56-1.98 4.98.36 5.94-.47 1.23-.68 1.77-1.28 2.86l-.61.63ZM12.64 9.18c-.16-2.14 1.58-3.96 3.57-4.18.3 2.38-2.15 4.2-3.57 4.18Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.384C19.612 22.954 24 17.99 24 12Z" fill="#1877F2" />
      <path d="M16.671 15.47 17.203 12h-3.328V9.75c0-.95.465-1.875 1.956-1.875h1.513V4.922s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669V12H7.078v3.47h3.047v8.384a12.1 12.1 0 0 0 3.75 0V15.47h2.796Z" fill="white" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 15 7 10 12 5" />
    </svg>
  );
}

type CardStep = "social" | "email";

interface SignUpProps {
  onSignIn?: () => void;
  onComplete?: () => void;
}

export function SignUp({ onSignIn, onComplete }: SignUpProps) {
  const [step, setStep] = useState<CardStep>("social");

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <img src={backgroundSrc} alt="" />
      </div>

      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={envatoMarkSrc} alt="" className={styles.logoMark} />
          <img src={envatoLogoSrc} alt="Envato" className={styles.logoType} />
        </div>
        <button type="button" className={styles.headerSignIn} onClick={onSignIn}>
          Sign In
        </button>
      </header>

      <div className={styles.content}>
        <h1 className={styles.heroText}>Come in, get creative.</h1>

        <div className={styles.card}>
          <h2 className={styles.cardHeading}>Create a free account</h2>

          <div className={styles.uspList}>
            <div className={styles.uspItem}>
              <span className={styles.uspIcon}>
                <img src={checkmarkSrc} alt="" />
              </span>
              <p className={styles.uspText}>
                Save assets into your own collections
              </p>
            </div>
          </div>

          {step === "social" ? (
            <SocialStep onEmailClick={() => setStep("email")} />
          ) : (
            <EmailFormStep onBack={() => setStep("social")} />
          )}

          <div className={styles.checkboxSection}>
            <label className={styles.checkboxRow}>
              <span className={styles.checkboxEmpty} />
              <span className={styles.checkboxLabel}>
                <strong>Yes to creative inspo in your inbox.</strong>{" "}
                Fresh tutorials, trends, tools (and no boring bits).
              </span>
            </label>
            <p className={styles.checkboxHint}>
              You can unsubscribe at any time.
            </p>
          </div>

          {step === "email" && (
            <button type="button" className={styles.createButton} onClick={onComplete}>
              Create account
            </button>
          )}

          <div className={styles.cardFooter}>
            <p className={styles.signInLink}>
              Already have an Envato Account?{" "}
              <a href="#sign-in" onClick={onSignIn}>Sign in here.</a>
            </p>
            <div className={styles.divider} />
            <p className={styles.legalText}>
              By continuing, you confirm you are 18 or over and agree to our{" "}
              <a href="https://www.envato.com/privacy/">Privacy Policy</a> and{" "}
              <a href="https://help.elements.envato.com/hc/en-us/articles/360000629006">
                Terms of Use
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialStep({ onEmailClick }: { onEmailClick: () => void }) {
  return (
    <div className={styles.socialButtons}>
      <button type="button" className={styles.socialButton}>
        <span className={styles.socialIcon}><GoogleIcon /></span>
        <span className={styles.socialLabel}>Continue with Google</span>
      </button>
      <button type="button" className={styles.socialButton}>
        <span className={styles.socialIcon}><AppleIcon /></span>
        <span className={styles.socialLabel}>Continue with Apple</span>
      </button>
      <button type="button" className={styles.socialButton}>
        <span className={styles.socialIcon}><FacebookIcon /></span>
        <span className={styles.socialLabel}>Continue with Facebook</span>
      </button>
      <button type="button" className={styles.socialButton} onClick={onEmailClick}>
        <span className={styles.socialIcon}><EmailIcon /></span>
        <span className={styles.socialLabel}>Continue with Email</span>
      </button>
    </div>
  );
}

function EmailFormStep({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.emailForm}>
      <button type="button" className={styles.backButton} onClick={onBack}>
        <BackArrow />
      </button>

      <div className={styles.nameRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            className={styles.input}
            autoComplete="given-name"
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            className={styles.input}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          autoComplete="email"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          autoComplete="new-password"
        />
        <p className={styles.fieldHint}>
          Use 8 or more characters with a mix of letters, numbers and symbols.
          Must not contain your name or username.
        </p>
      </div>
    </div>
  );
}
