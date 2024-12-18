import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function ArticlesIndex() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Link href="/articles/123">Go to Article 123</Link>
    </View>
  );
}
