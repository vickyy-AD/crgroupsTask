import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem as ListItemType } from '../../listSlice';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#4CAF50';  
    case 'running':
      return '#2196F3'; 
    case 'draft':
      return '#FFC107'; 
    default:
      return '#757575'; 
  }
};

const ListItem = ({ item }: { item: ListItemType }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.runnerName}>{item.runnerName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '20' }, 
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>LR No:</Text>
        <Text style={styles.value}>{item.lrNo}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>
          {item.startTime} - {item.endTime}
        </Text>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  runnerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    width: 60,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
});
