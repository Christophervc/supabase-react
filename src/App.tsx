import "./App.css";
import { ThemeProvider } from "./components/ThemeProvide";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
