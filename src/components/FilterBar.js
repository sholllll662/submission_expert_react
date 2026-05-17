import React from "react";
import "./FilterBar.css";

const FilterBar = ({ categories, selectedCategory, onChange }) => (
  <div className="filter-bar">
    <label htmlFor="category-select">Filter Kategori:</label>
    <select
      id="category-select"
      value={selectedCategory}
      onChange={(event) => onChange(event.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default FilterBar;
