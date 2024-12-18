import { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';

type ErrorPropsWithoutButton = PropsWithChildren & {
  onButtonPress?: never;
  buttonText?: never;
};

type ErrorPropsWithButton = PropsWithChildren & {
  onButtonPress: TouchableOpacityProps['onPress'];
  buttonText: string;
};

type ErrorProps = ErrorPropsWithoutButton | ErrorPropsWithButton;

export const Error: React.FC<ErrorProps> = ({
  onButtonPress,
  buttonText,
  children,
}) => {
  const errorColor = useThemeColor('notification');

  const hasButton = onButtonPress && buttonText;

  return (
    <View style={styles.wrapper}>
      <IconSymbol
        style={styles.icon}
        name="exclamationmark.triangle.fill"
        size={120}
        color={errorColor}
      />

      <Text style={[styles.title, { color: errorColor }]}>Whoops!</Text>

      <Text
        style={[
          styles.text,
          { color: errorColor, marginBottom: hasButton ? 32 : 0 },
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 600,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 24,
  },
});
