import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle';
};

export const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) => {
  const color = useThemeColor('text');

  const typeStyle = styles[type] || styles.default;

  return <Text style={[{ color }, typeStyle, style]} {...rest} />;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
