/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';
import {API_HOST} from '../../config';
import {colors} from '../../themes/color';

const DetailTeam = ({route}: any) => {
  const params = route.params,
    [team, setTeam] = useState(),
    navigation = useNavigation();
  const getDataTeam = () => {
    axios.get(`${API_HOST.team}${params.id}`).then(({data}: any) => {
      setTeam(data.teams);
    });
  };
  useEffect(() => {
    getDataTeam();
  }, []);
  const renderItem = ({item}: any) => (
    <Button
      rounded
      style={styles.item}
      onPress={() => navigation.navigate('Team', {data: item})}>
      <Image source={{uri: item.strTeamBadge}} style={styles.logo} />
      <Text type="regular">{item.strTeam}</Text>
    </Button>
  );
  console.log(team);
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Gap height={heightPercentageToDP(0.7)} />
        <View style={styles.title}>
          <Text size={22} color="white" type="semibold" align="center">
            List Team in {params.name}
          </Text>
        </View>
        <Image source={{uri: params.img}} style={styles.flag} />
      </View>
      <FlatList
        data={team}
        renderItem={renderItem}
        keyExtractor={(_, idx: number) => idx.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default DetailTeam;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    height: heightPercentageToDP(15),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  flag: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
    marginTop: heightPercentageToDP(0),
    opacity: 0.5,
    position: 'absolute',
    zIndex: -99,
  },
  title: {
    marginHorizontal: widthPercentageToDP(16),
  },
  item: {
    height: heightPercentageToDP(20),
    width: widthPercentageToDP(40),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: widthPercentageToDP(5),
    marginVertical: heightPercentageToDP(2),
    shadowColor: '#000',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    overflow: 'hidden',
  },
  logo: {
    width: widthPercentageToDP(18),
    height: heightPercentageToDP(9),
    marginBottom: 5,
  },
  page: {
    flex: 1,
  },
});
