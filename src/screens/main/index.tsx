import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';
import News from './news';

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
        <Gap height={heightPercentageToDP(0.6)} />
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
            showsHorizontalScrollIndicator={false}
          />
          <Text type="semibold" size={20}>
            Sport Soccer News
          </Text>
          <News />
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
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: heightPercentageToDP(2),
  },
  country: {
    marginRight: widthPercentageToDP(5),
    overflow: 'hidden',
    height: heightPercentageToDP(20),
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
