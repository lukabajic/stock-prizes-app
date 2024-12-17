import { StyleSheet, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

interface ChartProps {}

export const Chart: React.FC<ChartProps> = ({}) => {
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

  return (
    <View style={[styles.daily, { borderTopColor: borderColor }]}>
      <View style={styles.iconAndSubtitle}>
        <IconSymbol
          style={styles.icon}
          name="chart.line.uptrend.xyaxis"
          color={textColor}
          size={40}
        />
        <ThemedText style={styles.subtitle}>
          Price Chart (Last 30 Days)
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daily: {
    paddingTop: 24,
    marginTop: 24,
    borderTopWidth: 1,
  },
  iconAndSubtitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 600,
  },
});
