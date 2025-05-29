import { Link as RouterLink, Outlet } from "react-router-dom";
import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RoutePaths } from "../../../constants/constants.ts";

const StyledContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: "calc(100vh - 128px)", // 64px header + 64px footer
}));

const StyledFooter = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  position: "relative",
  bottom: 0,
  width: "100%",
}));

export function Layout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inforce App
          </Typography>
          <Button color="inherit" component={RouterLink} to={RoutePaths.HOME}>
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to={RoutePaths.PRODUCTS_LIST}>
            Products List
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg">
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Container>
      <StyledFooter square variant="outlined">
        <Typography variant="body2" color="textSecondary">
          Inforce App - Made by Dmytro Doroshko :)
        </Typography>
      </StyledFooter>
    </Box>
  );
}