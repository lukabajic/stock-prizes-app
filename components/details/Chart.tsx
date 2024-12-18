import { StyleSheet, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '../ThemedText';
import { DailyData, Keys } from '@/types/marketData';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useMemo } from 'react';

interface ChartProps {
  chartData: Record<string, DailyData>;
}

const prepareChartData = (data: Record<string, DailyData>) => {
  const sortedEntries = Object.entries(data)
    .map(([date, values]) => ({
      date,
      close: parseFloat(values[Keys.Close]),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const last30Days = sortedEntries.slice(-30);

  const labels = last30Days.map(() => '');
  const dataset = last30Days.map((entry) => entry.close);

  const minValue = Math.min(...dataset);
  const maxValue = Math.max(...dataset);

  return {
    labels,
    datasets: [{ data: dataset }],
    minValue,
    maxValue,
  };
};

export const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  const data = useMemo(() => prepareChartData(chartData), [chartData]);

  return (
    <View style={[styles.daily, { borderTopColor: borderColor }]}>
      <View style={styles.iconAndSubtitle}>
        <IconSymbol
          style={styles.icon}
          name="chart.line.uptrend.xyaxis"
          color={textColor}
          size={40}
        />
        <ThemedText style={styles.subtitle}>
          Price Chart (Last 30 Days)
        </ThemedText>
      </View>

      <LineChart
        data={{
          labels: data.labels,
          datasets: data.datasets,
        }}
        width={Dimensions.get('window').width - 48}
        height={400}
        chartConfig={{
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          color: () => textColor,
          labelColor: () => textColor,
          decimalPlaces: 4,
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
          fillShadowGradientOpacity: 0,
          fillShadowGradient: backgroundColor,
        }}
        withDots={false}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  daily: {},
  iconAndSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
