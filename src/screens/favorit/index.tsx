/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Gap, Text, TextInput} from '../../components/atom';
import {API_HOST} from '../../config';
import {colors} from '../../themes/color';

const Favorit = () => {
  const [key, setKey] = useState<string>(''),
    [club, setClub] = useState(''),
    getData = () => {
      axios.get(`${API_HOST.search}${key}`).then(({data}: any) => {
        setClub(data.teams);
      });
    };

  const renderItem = ({item}: any) => (
    <View style={styles.box}>
      <View style={styles.list}>
        <Gap height={heightPercentageToDP(0.2)} />
        <Text type="semibold">{item.strTeam}</Text>
        <Text type="regular" color="grey">
          {item.strCountry}
        </Text>
        <Text type="regular" color="grey">
          {item.strLeague}
        </Text>
        <Image source={{uri: item.strTeamBadge}} style={styles.logo} />
      </View>
    </View>
  );
  useEffect(() => {
    getData();
  }, [key]);
  console.log('klub :', club);
  return (
    <View style={styles.page}>
      <Gap height={heightPercentageToDP(0.5)} />
      <View style={styles.content}>
        <View style={styles.item}>
          <Gap height={heightPercentageToDP(1)} />
          <Text type="semibold" size={20}>
            Search your favorite team
          </Text>
          <TextInput
            label="Input by Name"
            placeholder="Text here"
            onChangeText={(value: string) => setKey(value)}
          />
          <Gap height={heightPercentageToDP(1)} />
          <FlatList
            data={club}
            renderItem={renderItem}
            keyExtractor={(_, idx: number) => idx.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Favorit;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    marginHorizontal: widthPercentageToDP(0),
    backgroundColor: 'white',
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  item: {
    marginHorizontal: widthPercentageToDP(5),
  },
  box: {
    height: heightPercentageToDP(12),
    backgroundColor: '#dff9fb',
    marginBottom: heightPercentageToDP(3),
    borderRadius: 16,
  },
  list: {
    marginHorizontal: widthPercentageToDP(5),
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: heightPercentageToDP(1),
    opacity: 0.8,
  },
});
