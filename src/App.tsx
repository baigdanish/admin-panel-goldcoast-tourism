import { Fragment } from "react/jsx-runtime";
import APP_ROUTES from "./routes/Routes";
import { useRoutes } from "react-router-dom";

function App() {
  const routing = useRoutes(APP_ROUTES);
  
  return <Fragment>{routing}</Fragment>;
}

export default App;