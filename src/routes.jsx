import HomePage from "./pages/HomePage";
import TipDetailPage from "./pages/TipDetailPage";
import SavedTipsPage from "./pages/SavedTipsPage";
import AboutPage from "./pages/AboutPage";
import PageNotFound from "./pages/PageNotFound";

export const appRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/tip/:id", element: <TipDetailPage /> },
    { path: "/saved", element: <SavedTipsPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "*",element: <PageNotFound/> } 
];
