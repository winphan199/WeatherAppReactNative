import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherDescription = ({title = '--', temperature = '--', high = '--', low = '--',icon='01d', unit = '°C'}) => {
  high = Math.round(high);
  low = Math.round(low);
  temperature = Math.round(temperature);
  return (
    <View style={styles.container}>
      <View style={styles.weatherDesc}>
        <Image
          style={styles.weatherIcon}
          source={{uri: `https://openweathermap.org/img/wn/${icon}@2x.png`}}
        />
        <Text style={styles.weatherTitle}>{title}</Text>
      </View>
      <View style={styles.tempDesc}>
        <Text style={styles.currentTemp}>{temperature + unit}</Text>
        <View style={styles.tempLimit}>
          <Text>H: {high + unit}</Text>
          <Text>L: {low + unit}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  weatherIcon: {
    width: '50%',
    height: '50%',
    flex: 1
  },
  weatherDesc: {
    flex: 1,
    height: "100%",
    width:"100%",
    alignItems: 'center'
  },
  weatherTitle: {
    fontSize: 15,
    textAlign: 'center'
  },
  tempDesc: {
    flex: 1
  },
  currentTemp: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center'
  },
  tempLimit: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});

export default WeatherDescription;
