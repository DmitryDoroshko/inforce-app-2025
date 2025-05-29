import { Product } from "../Product/Product.tsx";
import type { IProduct } from "../../model/Product.ts";
import { Grid, Typography, Box } from "@mui/material";

export function ProductList({ products }: { products: IProduct[] }) {
  const renderedProducts = products.map(product => (
    <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
      <Product {...product} />
    </Grid>
  ));

  return (
    <Box sx={{ width: "100%" }}>
      {
        products.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            No products available
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {renderedProducts}
          </Grid>
        )
      }
    </Box>
  );
}
