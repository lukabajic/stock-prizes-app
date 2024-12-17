import { useThemeColor } from "@/hooks/useThemeColor";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";

export const Loader: React.FC<Pick<ActivityIndicatorProps, "size">> = ({
  size = "large",
}) => {
  const primary = useThemeColor({}, "primary");

  return (
    <View style={styles.loader}>
      <ActivityIndicator color={primary} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
