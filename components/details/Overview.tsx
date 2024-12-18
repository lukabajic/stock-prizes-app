import { StyleSheet } from 'react-native';
import { Section } from './Section';

interface OverviewProps {}

export const Overview: React.FC<OverviewProps> = ({}) => {
  return <Section title="Company Overview" icon="building.2.fill"></Section>;
};

const styles = StyleSheet.create({});
