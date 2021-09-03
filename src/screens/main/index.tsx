import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';

const Home = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      name: 'England',
      img: require('../../assets/icon/england.png'),
    },
    {
      id: 2,
      name: 'Spain',
      img: require('../../assets/icon/spain.png'),
    },
    {
      id: 3,
      name: 'germany',
      img: require('../../assets/icon/german.png'),
    },
    {
      id: 4,
      name: 'Italy',
      img: require('../../assets/icon/italia.png'),
    },
    {
      id: 5,
      name: 'France',
      img: require('../../assets/icon/france.png'),
    },
  ];
  const renderItem = ({item}: any) => {
    return (
      <Button
        type="none"
        rounded
        withRipple={false}
        style={styles.country}
        onPress={() => navigation.navigate('ListLeague', item)}>
        <Image source={item.img} style={styles.img} />
        <Text type="semibold" align="center">
          {item.name}
        </Text>
      </Button>
    );
  };
  return (
    <View style={styles.page}>
      <Gap height={heightPercentageToDP(0.5)} />
      <View style={styles.content}>
        <Gap height={heightPercentageToDP(0.3)} />
        <View style={styles.league}>
          <Text type="semibold" size={20}>
            League by Country
          </Text>
          <Gap height={heightPercentageToDP(0.3)} />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#30336b',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginBottom: heightPercentageToDP(2),
  },
  country: {
    marginRight: widthPercentageToDP(4),
    overflow: 'hidden',
    height: heightPercentageToDP(15),
    borderRadius: 10,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  league: {
    marginHorizontal: widthPercentageToDP(3),
  },
});
