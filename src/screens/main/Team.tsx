import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Gap, Text} from '../../components/atom';
import {colors} from '../../themes/color';

const Team = ({route}: any) => {
  const params = route.params;
  console.log(params);
  return (
    <View style={styles.page}>
      <View style={styles.border}>
        <Image source={{uri: params.data.strTeamBadge}} style={styles.logo} />
      </View>
      <Text align="center" color="white" type="semibold" size={26}>
        {params.data.strTeam}
      </Text>
      <Text align="center" color="white" type="semibold" size={18}>
        {params.data.strAlternate}
      </Text>
      <Gap height={heightPercentageToDP(2.4)} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Text style={styles.desc} type="regular">
          {params.data.strDescriptionEN}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  logo: {
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(11),
  },
  border: {
    marginBottom: 5,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: heightPercentageToDP(10),
    zIndex: 99,
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  desc: {
    marginHorizontal: widthPercentageToDP(5),
    marginTop: heightPercentageToDP(10),
  },
});
