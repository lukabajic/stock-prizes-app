import { useMemo } from 'react';

import { Section } from '@/components/details/Section';
import { useThemeColor } from '@/hooks/useThemeColor';
import { DailyData, Keys } from '@/types/marketData';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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
  const textColor = useThemeColor('text');
  const backgroundColor = useThemeColor('background');

  const data = useMemo(() => prepareChartData(chartData), [chartData]);

  return (
    <Section
      title="Price Chart (Last 30 Days)"
      icon="chart.line.uptrend.xyaxis"
    >
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
    </Section>
  );
};
