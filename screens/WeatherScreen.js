import React, {View, StyleSheet, Button} from 'react-native';
import {useState, useEffect} from 'react';
import Header from '../components/Header';
import WeatherDescription from '../components/WeatherDescription';
import WeatherDetail from '../components/WeatherDetail';

const WeatherScreen = ({route}) => {
  const location = route.params.data;
  const [weather, setWeather] = useState(location);

  useEffect(() => {
    handleGetWeather();
  });

  const handleGetWeather = () => {
    setWeather(location);
  };

  return (
    <View style={styles.container}>
      <Header title={weather?.location} />
      <WeatherDescription
        title={weather?.title}
        icon={weather?.icon}
        temperature={(weather?.high + weather?.low) / 2}
        high={weather?.high}
        low={weather?.low}
      />
      <View style={styles.weatherDetailContainer}>
        {weather?.detail.map((data, i) => {
          const title = data.title.toUpperCase();
          const value = data.value;
          const unit = data.unit ? data.unit : '';

          return (
            <WeatherDetail
              key={i}
              style={styles.weatherDetail}
              title={title}
              value={value}
              unit={unit}
            />
          );
        })}
      </View>
      <View>
        <Button title="Refresh" onPress={() => handleGetWeather(location)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  weatherDetailContainer: {
    marginHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weatherDetail: {
    width: '50%',
    paddingVertical: 12,
  },
});

export default WeatherScreen;
