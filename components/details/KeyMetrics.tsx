import { Table } from '@/components/ui/Table';
import { Section } from './Section';
import { formatVolume } from '@/utils/formatters';

interface KeyMetricsProps {
  marketCap?: string;
  pERatio?: string;
  eps?: string;
  dividendYield?: string;
  fiftyTwoWeekHigh?: string;
  fiftyTwoWeekLow?: string;
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

export const KeyMetrics: React.FC<KeyMetricsProps> = ({
  marketCap,
  pERatio,
  eps,
  dividendYield,
  fiftyTwoWeekHigh,
  fiftyTwoWeekLow,
}) => {
  const data = [
    { metric: 'Market Cap	', value: formatVolume(marketCap ?? '') },
    { metric: 'P/E Ratio', value: pERatio },
    { metric: 'EPS', value: eps },
    { metric: 'Dividend Yield', value: dividendYield },
    { metric: '52-Week High', value: fiftyTwoWeekHigh },
    { metric: '52-Week Low', value: fiftyTwoWeekLow },
  ];

  return (
    <Section title="Key Financal Metrics" icon="chart.bar.fill">
      <Table columns={columns} data={data} />
    </Section>
  );
};
