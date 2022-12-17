import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ForecastItem = ({ day, high, low, icon = '01d', onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.day}>{day}</Text>
      <View style={styles.rightContainer}>
        <Image
          style={styles.image}
          source={{uri: `https://openweathermap.org/img/wn/${icon}@2x.png`}}
        />
        <View style={styles.tempLimit}>
          <Text style={{ marginRight: 5 }}>H: {high}</Text>
          <Text>L: {low}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  image: {
    width: 50,
    height: 50,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1
  },
  tempLimit: {
    flexDirection: 'row',
  },
});

export default ForecastItem;
