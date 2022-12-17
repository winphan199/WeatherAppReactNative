import {View, Button, FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import ForecastItem from '../components/ForecastItem';
import {getForeCastDataService} from '../services/getForeCastDataService';
import {default as convertToWeekDay} from '../services/convertToWeekDayService';

const ForecastScreen = ({route, navigation}) => {
  const [weatherList, setWeatherList] = useState([]);
  useEffect(() => {
    if (location.lat) {
      handleGetForecast(location, 'navigate');
    } else {
      handleGetForecast(location);
    }
  }, [location]);

  const location = route.params.coords
    ? route.params.coords
    : route.params.location;
  console.log(route.params);
  const renderItem = ({item}) => {
    return (
      <ForecastItem
        day={item.day}
        high={item.high}
        low={item.low}
        icon={item.icon}
        onPress={() => navigation.navigate('WeatherDesc', {data: item})}
      />
    );
  };

  const handleGetForecast = async (location, mode) => {
    let response;
    if (mode === 'navigate') {
      response = await getForeCastDataService({
        coords: location,
        count: 7,
      });
    } else {
      response = await getForeCastDataService({
        location,
        count: 7,
      });
    }

    const data = response.list.map(item => {
      const sunRiseDate = new Date(item.sunrise * 1000);
      const sunSetDate = new Date(item.sunset * 1000);
      const weekDay = convertToWeekDay(item.dt);

      return {
        day: weekDay,
        location: response?.city?.name,
        title: item?.weather[0]?.description,
        icon: item?.weather[0]?.icon,
        high: Math.floor(item?.temp?.max),
        low: Math.floor(item?.temp?.min),
        detail: [
          {
            title: 'Sun rise',
            value: `${sunRiseDate.getHours()}:${sunRiseDate.getMinutes()}`,
          },
          {
            title: 'Sun set',
            value: `${sunSetDate.getHours()}:${sunSetDate.getMinutes()}`,
          },
          {
            title: 'Wind speed',
            value: item?.speed,
            unit: 'm/s',
          },
          {
            title: 'Humidity',
            value: item?.humidity,
            unit: '%',
          },
          {
            title: 'Rain Probability',
            value: item?.pop * 100,
            unit: '%',
          },
        ],
      };
    });
    setWeatherList(data);
  };

  return (
    <View style={styles.container}>
      <Header title="Weekly forecast" />
      <FlatList data={weatherList} renderItem={renderItem} />
      <View>
        <Button
          title="Refresh"
          onPress={() => {
            if (location.lat) {
              handleGetForecast(location, 'navigate');
            } else {
              handleGetForecast(location);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default ForecastScreen;
