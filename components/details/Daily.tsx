import { StyleSheet, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { TR, TD, Table } from '@/components/ui/Table';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { DailyData, Keys } from '@/types/marketData';
import { formatVolume } from '@/types/formatters';

interface DailyProps {
  lastRefreshed: string;
  dailyData: DailyData;
}

export const Daily: React.FC<DailyProps> = ({ lastRefreshed, dailyData }) => {
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.daily, { borderTopColor: borderColor }]}>
      <View style={styles.iconAndSubtitle}>
        <IconSymbol
          style={styles.icon}
          name="chart.bar.fill"
          color={textColor}
          size={40}
        />
        <ThemedText style={styles.subtitle}>Daily Performance</ThemedText>
      </View>

      <Table>
        <TR borderBottom>
          <TD borderRight bold background>
            Metric
          </TD>
          <TD borderRight bold background>
            Value
          </TD>
        </TR>

        <TR borderBottom>
          <TD borderRight bold>
            Open
          </TD>
          <TD>{dailyData[Keys.Open]}</TD>
        </TR>
        <TR borderBottom>
          <TD borderRight bold>
            High
          </TD>
          <TD>{dailyData[Keys.High]}</TD>
        </TR>
        <TR borderBottom>
          <TD borderRight bold>
            Low
          </TD>
          <TD>{dailyData[Keys.Low]}</TD>
        </TR>
        <TR borderBottom>
          <TD borderRight bold>
            Close
          </TD>
          <TD>{dailyData[Keys.Close]}</TD>
        </TR>
        <TR borderBottom>
          <TD borderRight bold>
            Volume
          </TD>
          <TD>{formatVolume(dailyData[Keys.Volume])}</TD>
        </TR>
        <TR borderBottom>
          <TD borderRight bold>
            Last Updated
          </TD>
          <TD>{lastRefreshed}</TD>
        </TR>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  daily: {
    marginBottom: 48,
  },
  iconAndSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
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
