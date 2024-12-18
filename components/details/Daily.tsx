import { TR, TD, Table } from '@/components/ui/Table';
import { DailyData, Keys } from '@/types/marketData';
import { formatVolume } from '@/types/formatters';
import { Section } from './Section';

interface DailyProps {
  lastRefreshed: string;
  dailyData: DailyData;
}

export const Daily: React.FC<DailyProps> = ({ lastRefreshed, dailyData }) => (
  <Section title="Daily Performance" icon="chart.bar.fill">
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
  </Section>
);
