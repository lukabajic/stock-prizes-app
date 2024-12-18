import { useThemeColor } from '@/hooks/useThemeColor';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { StylePropsWithArrayTransform } from 'react-native-reanimated/lib/typescript/layoutReanimation/animationBuilder/commonTypes';

type ButtonProps = TouchableOpacityProps & {
  variant?: 'outlined' | 'contained';
  color?: 'primary' | 'error';
  children: string;
  fluid?: boolean;
};

const white = 'rgb(255, 255, 255)';
const transparent = 'transparent';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  fluid = true,
  ...rest
}) => {
  const primary = useThemeColor('primary');
  const error = useThemeColor('notification');

  const backgroundColor =
    variant === 'contained'
      ? color === 'primary'
        ? primary
        : error
      : transparent;

  const textColor =
    variant === 'contained' ? white : color === 'primary' ? primary : error;

  const borderColor =
    variant === 'outlined'
      ? color === 'primary'
        ? primary
        : error
      : transparent;

  const buttonStyles: StylePropsWithArrayTransform[] = [styles.button];
  if (fluid) buttonStyles.push(styles.fluid);

  return (
    <TouchableOpacity
      style={[
        ...buttonStyles,
        {
          backgroundColor,
          borderColor,
          borderWidth: variant === 'outlined' ? 2 : 0,
        },
      ]}
      {...rest}
    >
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  fluid: {
    width: '100%',
  },
});
