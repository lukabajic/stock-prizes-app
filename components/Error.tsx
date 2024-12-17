import { PropsWithChildren } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Button } from "@/components/Button";

type ErrorPropsWithoutButton = PropsWithChildren & {
  onButtonPress?: never;
  buttonText?: never;
};

type ErrorPropsWithButton = PropsWithChildren & {
  onButtonPress: TouchableOpacityProps["onPress"];
  buttonText: string;
};

type ErrorProps = ErrorPropsWithoutButton | ErrorPropsWithButton;

export const Error: React.FC<ErrorProps> = ({
  onButtonPress,
  buttonText,
  children,
}) => {
  const notification = useThemeColor({}, "notification");

  const hasButton = onButtonPress && buttonText;

  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          styles.text,
          { color: notification, marginBottom: hasButton ? 32 : 0 },
        ]}
      >
        {children}
      </Text>

      {hasButton && (
        <Button onPress={onButtonPress} color="error">
          {buttonText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 8,
  },
});
