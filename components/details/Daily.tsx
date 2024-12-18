import { Table } from '@/components/ui/Table';
import { DailyData, Keys } from '@/types/marketData';
import { formatVolume } from '@/utils/formatters';
import { Section } from './Section';

interface DailyProps {
  lastRefreshed: string;
  dailyData: DailyData;
}

const columns = [
  {
    key: 'metric',
    label: 'Metric',
    bold: true,
    background: true,
    borderRight: true,
  },
  { key: 'value', label: 'Value', bold: true, background: true },
];

export const Daily: React.FC<DailyProps> = ({ lastRefreshed, dailyData }) => {
  const data = [
    { metric: 'Open', value: dailyData[Keys.Open] },
    { metric: 'High', value: dailyData[Keys.High] },
    { metric: 'Low', value: dailyData[Keys.Low] },
    { metric: 'Close', value: dailyData[Keys.Close] },
    { metric: 'Volume', value: formatVolume(dailyData[Keys.Volume]) },
    { metric: 'Last Updated', value: lastRefreshed },
  ];

  return (
    <Section title="Daily Performance" icon="chart.bar.fill">
      <Table columns={columns} data={data} />
    </Section>
  );
};
