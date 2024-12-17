import { useThemeColor } from "@/hooks/useThemeColor";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  View,
  ViewProps,
} from "react-native";

type LoaderProps = ViewProps & Pick<ActivityIndicatorProps, "size">;

export const Loader: React.FC<LoaderProps> = ({
  size = "large",
  ...viewProps
}) => {
  const primary = useThemeColor({}, "primary");

  return (
    <View {...viewProps}>
      <ActivityIndicator color={primary} size={size} />
    </View>
  );
};
