import type { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ParallaxScrollView: React.FC<PropsWithChildren> = ({ children }) => (
  <SafeAreaView style={styles.safeArea}>
    <ThemedView style={styles.container}>
      <ScrollView scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollView>
    </ThemedView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ParallaxScrollView;
