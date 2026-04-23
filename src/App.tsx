import "./App.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AppRouter />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </>
  );
}

export default App;
