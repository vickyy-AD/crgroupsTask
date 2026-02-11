import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  incrementPage,
  setStatusFilter,
  setSearch,
} from '../../store/slices/listSlice';

import { useList } from '../../hooks/useFetchList';
import ListItem from '../../components/ListItem';
import Button from '../../components/CustomButton';
import CustomInputField from '../../components/CustomInputField';
import { COLORS } from '../../constants/colors';

const ListScreen = () => {
  
  const dispatch = useAppDispatch();
  const { fetchList } = useList();

  const { data, loading, hasMore, statusFilter, search } = useAppSelector(
    state => state.listReducer,
  );

  useEffect(() => {
    fetchList();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(incrementPage());
      fetchList();
    }
  };

  const onFilterChange = (status: string) => {
    dispatch(setStatusFilter(status));
  };

  const onSearchChange = (text: string) => {
    dispatch(setSearch(text));
  };

  const filteredData = data.filter(item => {
    const matchesStatus =
      statusFilter === 'All' || item.status === statusFilter;

    const matchesSearch =
      search === '' ||
      item.runnerName.toLowerCase().includes(search.toLowerCase()) ||
      item.lrNo.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.LIGHT_ORANGE} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.screenTitle}>Line Run</Text>
        <CustomInputField
            label=""
            placeholder="Search by Runner, LR No..."
            value={search}
            onChangeText={onSearchChange}
            containerStyle={styles.searchBar}
        />
      </View>

      <View style={styles.filterSection}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={['All', 'Completed', 'Running', 'Draft']}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        statusFilter === item && styles.activeFilterChip
                    ]}
                    onPress={() => onFilterChange(item)}
                >
                    <Text style={[
                        styles.filterChipText,
                        statusFilter === item && styles.activeFilterChipText
                    ]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.filterListContent}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator color={COLORS.LIGHT_ORANGE} /> : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_FADE,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  filterSection: {
    paddingVertical: 16,
  },
  filterListContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  activeFilterChip: {
    backgroundColor: COLORS.LIGHT_ORANGE,
    borderColor: COLORS.LIGHT_ORANGE,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
  },
  activeFilterChipText: {
    color: COLORS.WHITE,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
