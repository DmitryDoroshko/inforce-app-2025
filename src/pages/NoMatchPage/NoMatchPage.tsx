import {Link} from "react-router-dom";
import { RoutePaths } from "../../constants/constants.ts";

export function NoMatchPage() {
  return (
    <>
      <h1>Not Found</h1>
      <Link to={RoutePaths.HOME}>Go home</Link>
    </>
  );
}