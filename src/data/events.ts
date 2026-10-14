import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    description: "Sektörün önde gelen firmalarıyla tanışma fırsatı.",
    date: "2026-11-15",
    location: "Merkez Kampüs",
    category: "Seminer",
    quota: 150
  },
  {
    id: "event-2",
    title: "React ve Vite Atölyesi",
    description: "Sıfırdan modern web geliştirme eğitimi.",
    date: "2026-11-20",
    location: "Bilgisayar Lab 1",
    category: "Atölye",
    quota: 30
  },
  {
    id: "event-3",
    title: "Bahar Şenliği Konseri",
    description: "Ünlü sanatçıların katılımıyla muhteşem bir gece.",
    date: "2026-12-01",
    location: "Açık Hava Sahnesi",
    category: "Konser",
    quota: 500
  }
];