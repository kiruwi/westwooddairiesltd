import { productsStyles } from "./productsStyles";

type ProductSearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function ProductSearchBar({
  query,
  onQueryChange,
}: ProductSearchBarProps) {
  return (
    <header className={productsStyles.searchHeader}>
      <div className={productsStyles.searchWrap}>
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          placeholder="Search products"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className={productsStyles.searchInput}
        />
      </div>
    </header>
  );
}
