import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { Layout } from "./components/shared/Layout/Layout.tsx";
import { NoMatchPage } from "./pages/NoMatchPage/NoMatchPage.tsx";
import { ProductsListPage } from "./pages/ProductsListPage/ProductsListPage.tsx";
import { ProductPage } from "./pages/ProductPage/ProductPage.tsx";
import { useAppDispatch } from "./hooks/redux.ts";
import { fetchProducts } from "./store/products/productsThunks.ts";
import { RoutePaths } from "./constants/constants.ts";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={RoutePaths.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={RoutePaths.PRODUCTS_LIST} element={<ProductsListPage />} />
        <Route path={RoutePaths.PRODUCT}>
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<NoMatchPage />} />
      </Route>
    </Routes>
  );
}
