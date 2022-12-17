import {
  Platform,
  View,
  StyleSheet,
  Button,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Header from '../components/Header';
import WeatherDescription from '../components/WeatherDescription';
import WeatherDetail from '../components/WeatherDetail';
import Search from '../components/Search';
import {getWeatherDataService} from '../services/getWeatherDataService';

const MainScreen = ({navigation}) => {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState('tampere');
  const [coords, setCoords] = useState({
    lat: 0,
    long: 0,
  });
  const [isLocating, setIslocating] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    handleGetWeather(coords, 'navigate');
  }, [coords]);

  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setCoords({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const showNotification = () => {
    if (Platform.OS === 'ios') {
    } else if (Platform.OS === 'android') {
      ToastAndroid.show('Fetching data', ToastAndroid.SHORT);
    } else {
      console.log('The app is running on web');
    }
  };

  const handleGetWeather = async (location, mode) => {
    showNotification();

    let response;
    if (mode === 'navigate') {
      response = await getWeatherDataService({
        coords: location,
      });
      setIslocating(true);
    } else {
      response = await getWeatherDataService({
        location: location,
      });
      setIslocating(false);
    }

    // standardlize data
    const sunRiseDate = new Date(response.sys.sunrise * 1000);
    const sunSetDate = new Date(response.sys.sunset * 1000);

    const data = {
      location: response?.name,
      title: response?.weather[0]?.main,
      icon: response?.weather[0]?.icon,
      temperature: response?.main?.temp,
      high: response?.main?.temp_max,
      low: response?.main?.temp_min,
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
          value: response?.wind?.speed,
          unit: 'm/s',
        },
        {
          title: 'Visibility',
          value: response?.visibility / 1000,
          unit: 'km',
        },
        {
          title: 'Feels like',
          value: response?.main?.feels_like,
          unit: '°C',
        },
        {
          title: 'Humidity',
          value: response?.main?.humidity,
          unit: '%',
        },
      ],
    };

    setWeather(data);
  };

  const handleSearch = location => {
    setLocation(location);
    handleGetWeather(location);
  };

  return (
    <View style={styles.container}>
      <Search onSearch={handleSearch} />
      <Header
        title={weather?.location}
        onLocate={() => {
          getLocation();
          handleGetWeather(coords, 'navigate');
        }}
      />
      <WeatherDescription
        title={weather?.title}
        icon={weather?.icon}
        temperature={weather?.temperature}
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
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Refresh"
          onPress={() => {
            if (isLocating) {
              handleGetWeather(coords, 'navigate');
            } else {
              handleGetWeather(location);
            }
          }}
        />
        <Button
          style={styles.button}
          title="Weekly Forecast"
          onPress={() => {
            if (isLocating) {
              navigation.navigate('ForeCast', {coords});
            } else {
              navigation.navigate('ForeCast', {location});
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    position: 'relative',
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
  button: {
    marginBottom: 12,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 12,
  },
});

export default MainScreen;
