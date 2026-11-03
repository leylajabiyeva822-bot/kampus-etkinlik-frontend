import { createContext, useState, useContext, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent, Category } from "../types/campus-event";

// Formlardan gelecek verinin tipi
export interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  category: Category | "";
  capacity: string;
  description: string;
  image: string;
}

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

// Havuzu oluşturuyoruz
const EventsContext = createContext<EventsContextValue | null>(null);

// Havuzun sağlayıcısı (Provider)
export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    const newEvent: CampusEvent = {
      id: `event-${Date.now()}`,
      title: data.title.trim(),
      date: `${data.date}T${data.time}`,
      location: data.location,
      category: data.category as Category,
      quota: Number(data.capacity),
      description: data.description,
      image: data.image
    };
    setEvents([...events, newEvent]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(events.map(e => e.id === id ? {
      ...e,
      title: data.title.trim(),
      date: `${data.date}T${data.time}`,
      location: data.location,
      category: data.category as Category,
      quota: Number(data.capacity),
      description: data.description,
      image: data.image
    } : e));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter(e => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// Diğer sayfalarda kolayca kullanmak için custom hook
export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) throw new Error("useEvents Provider içinde kullanılmalı");
  return context;
}