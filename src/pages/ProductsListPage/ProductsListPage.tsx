import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux.ts";
import { selectProducts } from "../../store/products/productsSlice.ts";
import { ProductList } from "../../components/ProductList/ProductList.tsx";
import Modal from "../../components/Modal/Modal.tsx";
import { Form } from "../../components/Form/Form.tsx";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import { RoutePaths } from "../../constants/constants.ts";
import { type SortOption, sortProducts } from "../../helpers/productSorter.ts";

const SORTING_DEFAULT_IDENTIFIER = "name";

export function ProductsListPage() {
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(SORTING_DEFAULT_IDENTIFIER);
  const allProducts = useAppSelector(selectProducts);

  const sortedProducts = useMemo(() => {
    return sortProducts(allProducts, sortBy);
  }, [allProducts, sortBy]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortOption);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Products List</Typography>

        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {sortedProducts.length} products • Sorted by: {sortBy === "name" ? "Name" : 
                sortBy === "count-asc" ? "Count (Low to High)" : "Count (High to Low)"}
            </Typography>
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="sort-products-label">Sort by</InputLabel>
              <Select
                labelId="sort-products-label"
                value={sortBy}
                label="Sort by"
                onChange={handleSortChange}
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="count-asc">Count (Low to High)</MenuItem>
                <MenuItem value="count-desc">Count (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleShowModal}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <ProductList products={sortedProducts} />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Form isEditing={false} setShowModal={setShowModal} />
        </Modal>
      )}

      <Box sx={{ mt: 3 }}>
        <Link to={RoutePaths.HOME}>Go home</Link>
      </Box>
    </>
  );
}
