import React, { useEffect } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export type CarouselItemData = {
  title?: string;
  subtitle?: string;
  image?: ImageSourcePropType;
};

export type CarouselProps = {
  /**
   * Style for the container of the carousel
   */
  containerStyle?: ViewStyle;

  initialIndex?: number;

  /**
   * Data for the carousel
   */
  data: CarouselItemData[];
  /**
   * Ratio of the items in the carousel, itemsRatio.length is the number of items visible in the carousel
   * the largest ratio will be the item at 0 and max index and reset will be hidden
   * @example [0.5, 0.5, 0.5] will show 3 items with the same size
   * @example [0.5, 1, 0.5, 0.5] will show 4 items with second item twice the size of the others
   * @example [0.5, 1, 2, 0.5] will show 4 items and when user scrolls to start the 3 item will be the one visible and 1.5 (0.5 + 1) space will be empty to the left of 0 index item
   * @example [0.5, 1, 2, 0.5, 0.5] will show 5 items and when user scrolls to start the 3 item will be the one visible and 1.5 (0.5 + 1) space will be empty to the left of 0 index item
   */
  itemsRatio?: number[];

  titleTextStyle?: TextStyle;
  subTitleTextStyle?: TextStyle;
};

const Carousel: React.FC<CarouselProps> = ({
  containerStyle,
  data,
  initialIndex = 2,
  itemsRatio = [1],
  titleTextStyle,
  subTitleTextStyle,
}) => {
  const [_, setFirstCardIndex] = React.useState<number>(initialIndex);

  const animatedWidths = React.useRef<Animated.Value[]>([]);

  const containerRef = React.useRef<View>(null);

  useEffect(() => {
    if (data.length === 0 && __DEV__) {
      console.warn('Carousel: data is empty');
    }

    if (data.length < itemsRatio.length && __DEV__) {
      console.warn(
        `Carousel: itemsRatio length (${itemsRatio.length}) is greater than data length (${data.length}).`
      );
    }
    setFirstCardIndex(initialIndex);

    animatedWidths.current = [];
    let i = 0;
    while (data.length > i) {
      const ratio = itemsRatio[initialIndex - i] || 0;
      console.log(ratio);
      animatedWidths.current.push(new Animated.Value(ratio));
      i++;
    }
  }, [data, itemsRatio, initialIndex]);

  return (
    <View
      style={StyleSheet.flatten([styles.container, containerStyle])}
      ref={containerRef}
    >
      {data.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            {
              flex: index,
              height: 300,
              overflow: 'hidden',
              // marginHorizontal: 10,
            },
          ]}
        >
          <View
            style={{
              width: 500,
            }}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              {item.title && (
                <Text
                  style={StyleSheet.flatten([styles.title, titleTextStyle])}
                >
                  {item.title}
                </Text>
              )}
              {item.subtitle && (
                <Text
                  style={StyleSheet.flatten([
                    styles.subtitle,
                    subTitleTextStyle,
                  ])}
                >
                  {item.subtitle}
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
  },
});

export default Carousel;
