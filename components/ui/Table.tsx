import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface ColumnConfig {
  key: string;
  label: string;
  bold?: boolean;
  background?: boolean;
  borderRight?: boolean;
}

interface TableProps {
  columns: ColumnConfig[];
  data: Record<string, any>[];
  borderBottom?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  borderBottom = true,
}) => {
  const borderColor = useThemeColor('border');
  const backgroundColor = useThemeColor('card');

  return (
    <View style={[styles.table, { borderColor }]}>
      <View
        style={[
          styles.tr,
          { borderBottomWidth: 1, borderBottomColor: borderColor },
        ]}
      >
        {columns.map((column) => (
          <View
            key={column.key}
            style={[
              styles.td,
              column.borderRight && {
                borderRightWidth: 1,
                borderRightColor: borderColor,
              },
              { backgroundColor },
            ]}
          >
            <ThemedText style={{ fontWeight: 600 }}>{column.label}</ThemedText>
          </View>
        ))}
      </View>

      {data.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.tr,
            borderBottom && {
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
            },
          ]}
        >
          {columns.map((column) => (
            <View
              key={column.key}
              style={[
                styles.td,
                column.borderRight && {
                  borderRightWidth: 1,
                  borderRightColor: borderColor,
                },
              ]}
            >
              <ThemedText style={{ fontWeight: column.bold ? 600 : 300 }}>
                {row[column.key]}
              </ThemedText>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 4,
  },
  tr: {
    flexDirection: 'row',
  },
  td: {
    width: '50%',
    padding: 8,
  },
});
