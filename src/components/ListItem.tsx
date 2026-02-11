import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem as ListItemType } from '../store/slices/listSlice';
import { COLORS } from '../constants/colors';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return COLORS.GREEN;
    case 'running':
      return COLORS.BLUE;
    case 'draft':
      return COLORS.AMBER;
    default:
      return COLORS.GREY;
  }
};

const ListItem = ({ item }: { item: ListItemType }) => {
  const statusColor = getStatusColor(item.status);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.runnerInfo}>
          <Text style={styles.runnerLabel}>Runner Name</Text>
          <Text style={styles.runnerName}>{item.runnerName}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColor + '15' },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: statusColor },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{item.date}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>LR No</Text>
            <Text style={styles.value}>{item.lrNo}</Text>
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Start Time</Text>
            <Text style={styles.value}>{item.startTime}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>End Time</Text>
            <Text style={styles.value}>{item.endTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: COLORS.WHITE,
    marginBottom: 16,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  runnerInfo: {
    flex: 1,
    marginRight: 10,
  },
  runnerLabel: {
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  runnerName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 85,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_GREY,
    marginBottom: 16,
  },
  grid: {
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  infoBlock: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
  },
});
