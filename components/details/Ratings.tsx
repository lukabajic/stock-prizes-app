import { Table } from '@/components/ui/Table';

import { Section } from './Section';

interface RatingsProps {
  strongBuy?: string;
  buy?: string;
  hold?: string;
  sell?: string;
  strongSell?: string;
}

const columns = [
  {
    key: 'rating',
    label: 'Rating',
    bold: true,
    background: true,
    borderRight: true,
  },
  { key: 'count', label: 'Count', bold: true, background: true },
];

export const Ratings: React.FC<RatingsProps> = ({
  strongBuy,
  buy,
  hold,
  sell,
  strongSell,
}) => {
  const data = [
    { rating: 'Strong Buy', count: strongBuy },
    { rating: 'Buy', count: buy },
    { rating: 'Hold', count: hold },
    { rating: 'Sell', count: sell },
    { rating: 'Strong Sell	', count: strongSell },
  ];

  return (
    <Section title="Analyst Ratings" icon="star.fill">
      <Table columns={columns} data={data} />
    </Section>
  );
};
