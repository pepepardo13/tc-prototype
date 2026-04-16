import { useCallback, useEffect, useState } from "react";

import { Dashboard } from "../dashboard/Dashboard.tsx";
import { SignIn } from "../sign-in/SignIn.tsx";
import { SignUp } from "../sign-up/SignUp.tsx";
import { TermsGate } from "../terms-gate/TermsGate.tsx";

import styles from "./Hub.module.scss";

type Screen = "hub" | "sign-up" | "sign-in" | "terms-gate" | "dashboard";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

function CategoryCard({ title, subtitle, onClick }: CategoryCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardSubtitle}>{subtitle}</p>
      </div>
    </button>
  );
}

export function Hub() {
  const [screen, setScreen] = useState<Screen>("hub");

  const goHome = useCallback(() => setScreen("hub"), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "r" || e.key === "Escape") {
        setScreen("hub");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (screen === "dashboard") {
    return <Dashboard />;
  }

  if (screen === "terms-gate") {
    return <TermsGate onAccept={() => setScreen("dashboard")} />;
  }

  if (screen === "sign-in") {
    return (
      <SignIn
        onSignIn={() => setScreen("terms-gate")}
        onCreateAccount={() => setScreen("sign-up")}
      />
    );
  }

  if (screen === "sign-up") {
    return <SignUp onSignIn={goHome} onComplete={() => setScreen("terms-gate")} />;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.subtitle}>Terms &amp; conditions Update</p>
        <h1 className={styles.title}>Select to Continue</h1>
      </header>

      <div className={styles.cards}>
        <CategoryCard
          title="Creating a new account"
          subtitle="User Journey 1"
          onClick={() => setScreen("sign-up")}
        />
        <CategoryCard
          title="Signing into existent account"
          subtitle="User Journey 2"
          onClick={() => setScreen("sign-in")}
        />
      </div>

      <p className={styles.hint}>
        Press &ldquo;r&rdquo; or &ldquo;esc&rdquo; key to restart the
        prototypes.
      </p>
    </div>
  );
}
