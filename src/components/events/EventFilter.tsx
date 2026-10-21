import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

export default function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filtre-alani">
      <input
        type="search"
        placeholder="Örn. atölye, kariyer..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
      >
        <option value="">Tümü</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}