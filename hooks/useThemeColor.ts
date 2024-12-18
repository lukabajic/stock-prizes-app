import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme][colorName];
}
