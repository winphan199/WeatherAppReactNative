import { View, Text, StyleSheet } from 'react-native';

const WeatherDetail = ({ title = '--', value = '--', unit = '', style }) => {
  if ( typeof value == 'number') {
    value = Math.round(value);
  }
  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <Text>{value + unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export default WeatherDetail;
