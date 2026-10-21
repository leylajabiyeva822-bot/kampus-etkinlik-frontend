import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <button
        onClick={() => onNavigate("home")}
        aria-current={current === "home" ? "page" : undefined}
      >
        Ana Sayfa
      </button>
      <button
        onClick={() => onNavigate("events")}
        aria-current={current === "events" ? "page" : undefined}
      >
        Etkinlikler
      </button>
      <button
        onClick={() => onNavigate("add")}
        aria-current={current === "add" || current === "update" ? "page" : undefined}
      >
        Ekle
      </button>
    </nav>
  );
}