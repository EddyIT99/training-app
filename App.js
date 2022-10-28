import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";
import ThemeProvider from "./context/themeContext";

// App Navigation Component
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </SafeAreaView>
  );
}
