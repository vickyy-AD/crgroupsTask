import React, { useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { incrementPage, setStatusFilter, setSearch } from '../listSlice';
import { fetchListUseCase } from '../domain/fetchListUseCase';
import ListItem from './components/ListItem';
import Button from '../../../shared/components/CustomButton';
import CustomInputField from '../../../shared/components/CustomInputField';

const ListScreen = () => {
  const dispatch = useAppDispatch();
  const { data, loading, hasMore, statusFilter, search } = useAppSelector(
    state => state.listReducer,
  );

  useEffect(() => {
    dispatch(fetchListUseCase());
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(incrementPage());
      dispatch(fetchListUseCase());
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
    <View style={{ flex: 1, padding: 16 }}>
      <CustomInputField
        label="Search"
        placeholder="Search by Runner Name, LR No, Status"
        value={search}
        onChangeText={onSearchChange}
      />

      <View style={{ flexDirection: 'row', marginBottom: 12, gap: 8 }}>
        {['All', 'Completed', 'Running', 'Draft'].map(item => (
          <View key={item} style={{ flex: 1 }}>
            <Button
              title={item}
              onPress={() => onFilterChange(item)}
              variant={statusFilter === item ? 'primary' : 'outline'}
            />
          </View>
        ))}
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListScreen;
