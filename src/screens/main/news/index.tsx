import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Gap, Text} from '../../../components/atom';
import {images} from '../../../themes/images';

const News = () => {
  return (
    <View style={styles.border}>
      <Image source={images.bayern} style={styles.img} />
      <Text type="regular" style={styles.label}>
        Ki Prana Lewu Meramalkan bayern munchen menjuarai Liga Champion tahun
        ini
      </Text>
      <Text type="regular" color="grey">
        3 September 2021
      </Text>
      <Gap height={heightPercentageToDP(0.5)} />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    marginTop: heightPercentageToDP(-10),
    borderRadius: 10,
  },
  label: {
    marginTop: heightPercentageToDP(-11),
  },
  border: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: widthPercentageToDP(3),
  },
});
