import { View, StyleSheet } from 'react-native';
import Carousel from '@rn-vui/carousel';

export default function App() {
  return (
    <View style={styles.container}>
      <Carousel
        data={[
          {
            image: { uri: 'https://picsum.photos/600/400?random=1' },
            title: 'First Item',
            subtitle: 'This is the first item in the carousel.',
          },
          {
            image: { uri: 'https://picsum.photos/600/400?random=2' },
            title: 'Second Item',
            subtitle: 'This is the second item in the carousel.',
          },
          {
            image: { uri: 'https://picsum.photos/600/400?random=3' },
            title: 'Third Item',
            subtitle: 'This is the third item in the carousel.',
          },
          {
            image: { uri: 'https://picsum.photos/600/400?random=4' },
            title: 'Fourth Item',
            subtitle: 'This is the fourth item in the carousel.',
          },
          {
            image: { uri: 'https://picsum.photos/600/400?random=5' },
            title: 'Fifth Item',
            subtitle: 'This is the fifth item in the carousel.',
          },
        ]}
        containerStyle={{
          width: '100%',
          height: 300,
        }}
        itemsRatio={[1, 4, 1]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
