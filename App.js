import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";

// App Navigation Component
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation />
    </SafeAreaView>
  );
}
