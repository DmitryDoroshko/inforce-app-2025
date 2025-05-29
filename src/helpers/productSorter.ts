import type { IProduct } from "../model/Product.ts";

export type SortOption = "name" | "count-asc" | "count-desc";

export const sortProducts = (products: IProduct[], sortBy: SortOption): IProduct[] => {
  const productsCopy = [...products];

  switch (sortBy) {
    case "name":
      // Sort alphabetically by name
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));

    case "count-asc":
      // Sort by count (ascending), then by name
      return productsCopy.sort((a, b) => {
        if (a.count !== b.count) {
          return a.count - b.count;
        }
        return a.name.localeCompare(b.name);
      });

    case "count-desc":
      // Sort by count (descending), then by name
      return productsCopy.sort((a, b) => {
        if (a.count !== b.count) {
          return b.count - a.count;
        }
        return a.name.localeCompare(b.name);
      });

    default:
      return productsCopy;
  }
};
