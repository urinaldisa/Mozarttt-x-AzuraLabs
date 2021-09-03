/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';
import {API_HOST} from '../../config';
import {colors} from '../../themes/color';

const ListLeague = ({route}: any) => {
  const params = route.params,
    navigation = useNavigation();
  const [league, setLeague]: any = useState([]);
  const getLeague = () => {
    axios.get(`${API_HOST.league}${params.name}`).then(({data}: any) => {
      setLeague(data.countrys);
    });
  };
  console.log('data', league);
  useEffect(() => {
    getLeague();
  }, []);
  const renderItem = ({item}: any) => (
    <Button
      type="none"
      rounded
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetailTeam', {
          id: item.idLeague,
          name: item.strLeague,
          img: item.strBadge,
        })
      }>
      <Image source={{uri: item.strBadge}} style={styles.img} />
      <Text type="semibold">{item.strLeague}</Text>
    </Button>
  );
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Gap height={heightPercentageToDP(0.2)} />
        <Text size={20} color="white" type="semibold" align="center">
          List League in {params.name}
        </Text>
        <Image source={params.img} style={styles.flag} />
      </View>
      <FlatList
        data={league.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={(_, idx: number) => idx.toString()}
      />
    </View>
  );
};

export default ListLeague;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    height: heightPercentageToDP(12),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  flag: {
    resizeMode: 'contain',
    borderRadius: 12,
    width: widthPercentageToDP(10),
    marginTop: heightPercentageToDP(-10),
    alignSelf: 'center',
  },
  card: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(15),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: heightPercentageToDP(1),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    width: 50,
    height: 50,
  },
});
