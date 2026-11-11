export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma" | "Konser";

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: Category;
  quota: number;
  image?: string;
}