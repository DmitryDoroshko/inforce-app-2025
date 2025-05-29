import { Link } from "react-router-dom";
import { RoutePaths } from "../../constants/constants.ts";
import { Typography } from "@mui/material";

export function HomePage() {
  return (
    <>
      <Typography variant={"h3"}>Home Page</Typography>
      <Typography variant={"subtitle1"}>With this app you can find a shop app and have fun along the way :)</Typography>
      <Link to={RoutePaths.PRODUCTS_LIST}>Go to products</Link>
    </>
  );
}