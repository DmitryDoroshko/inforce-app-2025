import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { selectCurrentProduct } from "../../store/products/productsSlice.ts";
import { fetchProductById } from "../../store/products/productsThunks.ts";
import { Product } from "../../components/Product/Product.tsx";
import { Button } from "@mui/material";
import { PREVIOUS_URL_IDENTIFIER } from "../../constants/constants.ts";

export function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(selectCurrentProduct);
  const location = useLocation();
  const [pathName, setPathName] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      const lastPathnameWithSlash = location.pathname.slice(location.pathname.lastIndexOf("/"), location.pathname.length);

      // the lastPathnameWithSlash should look like this "/01234567"
      // we need to extract the / symbol from it
      setPathName(lastPathnameWithSlash.slice(1, lastPathnameWithSlash.length));
    }

    const fetchCurrentProduct = async () => {
      dispatch(fetchProductById(pathName!));
    };

    fetchCurrentProduct();
  }, [dispatch, location, pathName]);

  const goToPreviousURL = () => {
    navigate(PREVIOUS_URL_IDENTIFIER);
  };

  if (!currentProduct) {
    return <h1>Product with id {pathName} Not Found</h1>;
  }

  return <>
    <Product {...currentProduct} />
    <Button onClick={goToPreviousURL}>Go back</Button>
  </>;
}