import { PropsWithChildren } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SectionProps extends PropsWithChildren {
  icon: IconSymbolName;
  title: string;
  titleStyles?: TextStyle;
  sectionStyles?: ViewStyle;
}

export const Section: React.FC<SectionProps> = ({
  children,
  icon,
  title,
  titleStyles = {},
  sectionStyles = {},
}) => {
  const textColor = useThemeColor('text');

  return (
    <View style={[styles.wrapper, sectionStyles]}>
      <View style={styles.iconAndTitle}>
        <IconSymbol
          style={styles.icon}
          name={icon}
          color={textColor}
          size={40}
        />
        <ThemedText style={[styles.title, titleStyles]}>{title}</ThemedText>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 48,
  },
  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 600,
  },
});
