import { useThemeColor } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { StylePropsWithArrayTransform } from "react-native-reanimated/lib/typescript/layoutReanimation/animationBuilder/commonTypes";
import { ThemedText } from "../ThemedText";

interface TRProps extends PropsWithChildren {
  borderBottom?: boolean;
}

interface TDProps extends PropsWithChildren {
  borderRight?: boolean;
  background?: boolean;
  bold?: boolean;
}

export const Table: React.FC<PropsWithChildren> = ({ children }) => {
  const borderColor = useThemeColor({}, "border");
  return <View style={[styles.table, { borderColor }]}>{children}</View>;
};

export const TR: React.FC<TRProps> = ({ children, borderBottom = false }) => {
  const borderColor = useThemeColor({}, "border");

  const trStyles: StylePropsWithArrayTransform[] = [styles.tr];

  if (borderBottom) {
    trStyles.push({ borderBottomWidth: 1, borderBottomColor: borderColor });
  }

  return <View style={trStyles}>{children}</View>;
};

export const TD: React.FC<TDProps> = ({
  children,
  borderRight = false,
  bold = false,
  background = false,
}) => {
  const borderColor = useThemeColor({}, "border");
  const backgroundColor = useThemeColor({}, "card");

  const tdStyles: ViewStyle[] = [styles.td];

  if (borderRight) {
    tdStyles.push({ borderRightWidth: 1, borderRightColor: borderColor });
  }

  if (background) {
    tdStyles.push({ backgroundColor });
  }

  return (
    <View style={tdStyles}>
      <ThemedText style={{ fontWeight: bold ? 600 : 300 }}>
        {children}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 4,
  },
  tr: {
    flexDirection: "row",
  },
  td: {
    width: "50%",
    padding: 8,
  },
});
