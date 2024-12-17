import { StyleSheet, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { DailyData } from "@/types/marketData";

interface DailyProps {
  lastRefreshed: string;
  dailyData: DailyData;
}

export const Daily: React.FC<DailyProps> = ({ lastRefreshed, dailyData }) => {
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

  return (
    <View style={[styles.daily, { borderBottomColor: borderColor }]}>
      <View style={styles.iconAndSubtitle}>
        <IconSymbol
          style={styles.icon}
          name="chart.bar.fill"
          color={textColor}
          size={40}
        />
        <ThemedText style={styles.subtitle}>Daily Performance</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daily: {
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
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
