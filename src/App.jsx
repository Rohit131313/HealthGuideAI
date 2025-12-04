import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { appRoutes } from "./routes";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {appRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;


