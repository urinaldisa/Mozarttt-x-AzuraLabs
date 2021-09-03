/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {StyleSheet, View, Dimensions, Animated} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button} from '../../components/atom';
import {colors} from '../../themes/color';
import {images} from '../../themes/images';
import {sizes} from '../../themes/sizes';
const {width, height} = Dimensions.get('window');
const DOT_SIZE = heightPercentageToDP(5);
const CIRCLE_SIZE = width * 0.6;

const startedScreen = [
  {
    imageUri: images.onBoarding.lewy,
    heading: 'Discover All About Sport',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur justo sem, cursus accumsan erat at, commodo tincidunt tortor.',
    key: 'first',
    color: colors.primary + 60,
  },
  {
    imageUri: images.onBoarding.mbape,
    heading: 'Update news from your favorite club',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur justo sem, cursus accumsan erat at, commodo tincidunt tortor.',
    key: 'second',
    color: colors.primary + 60,
  },
  {
    imageUri: images.onBoarding.firmino,
    heading: 'Update your favorite league standings',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur justo sem, cursus accumsan erat at, commodo tincidunt tortor.',
    key: 'third',
    color: colors.primary + 60,
  },
];
const Circle = ({scrollX}: any) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {startedScreen.map(({color}: any, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{scale}],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const Item = ({imageUri, heading, description, index, scrollX}: any) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[
          styles.imageStyle,
          {
            transform: [{scale}],
          },
        ]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{translateX: translateXHeading}],
            },
          ]}>
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
              ],
            },
          ]}>
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const Pagination = ({scrollX, index}: any) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  const mountedAnimation = React.useRef(new Animated.Value(1)).current;

  const animation = (toValue: number, duration: number) => {
    Animated.timing(mountedAnimation, {
      toValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    index >= 2 ? animation(0, 300) : animation(1, 300);
  }, [index]);

  return (
    <Animated.View style={[styles.pagination, {opacity: mountedAnimation}]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            transform: [{translateX}],
          },
        ]}
      />
      {startedScreen.map((item: any) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View style={[styles.paginationDot]} />
          </View>
        );
      })}
    </Animated.View>
  );
};

function OnBoarding({navigation}: {navigation: any}) {
  const [index, setIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const onScrollEnd = (e: any) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = contentOffset.x / viewSize.width;
    setIndex(pageNum);
  };
  const buttonMounted = React.useRef(new Animated.Value(0)).current;

  const animation = (toValue: number, duration: number) => {
    Animated.timing(buttonMounted, {
      toValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    navigation.replace('MainApp');
  };

  React.useEffect(() => {
    index >= 2 ? animation(1, 300) : animation(0, 300);
  }, [index]);

  return (
    <View style={styles.container}>
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        bounces={false}
        keyExtractor={(item: any) => item.key}
        data={startedScreen}
        renderItem={({item, index}: any) => {
          return <Item {...item} index={index} scrollX={scrollX} />;
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
      />
      <Pagination scrollX={scrollX} index={index} />
      <Animated.View style={[styles.pagination, {opacity: buttonMounted}]}>
        {index === 2 ? (
          <Button
            rounded
            type="danger"
            title="LANJUT"
            // onPress={handleNext}
            onPress={handleNext}
            style={styles.button}
          />
        ) : null}
      </Animated.View>
    </View>
  );
}

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: -0,
    height: height / 2.9,
    width,
    backgroundColor: colors.warning,
  },
  itemStyle: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#130f40',
  },
  imageStyle: {
    flex: 0.6,
    width: widthPercentageToDP(65),
    resizeMode: 'contain',
  },
  textContainer: {
    marginBottom: -60,
    marginTop: -50,
    flex: 0.27,
    paddingTop: 20,
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    width,
    backgroundColor: colors.primary,
  },
  heading: {
    color: 'white',
    fontSize: RFValue(24, height),
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  description: {
    color: '#ccc',
    width: '70%',
    textAlign: 'center',
    fontSize: RFValue(15, height),
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    lineHeight: 16 * 1.5,
  },
  pagination: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    flexDirection: 'row',
    height: DOT_SIZE,
    zIndex: 1000,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
    backgroundColor: 'white',
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
  button: {
    width: widthPercentageToDP(80),
    alignSelf: 'center',
    backgroundColor: '#4834d4',
  },
  buttonChangeLang: {
    height: heightPercentageToDP(4),
    width: widthPercentageToDP(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: sizes.radiusMedium,
  },
  skip: {
    justifyContent: 'center',
    height: heightPercentageToDP(5),
    width: widthPercentageToDP(30),
  },
});
