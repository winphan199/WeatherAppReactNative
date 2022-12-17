import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {StyleSheet, SafeAreaView} from 'react-native';

import MainScreen from './screens/MainScreen';
import ForecastScreen from './screens/ForecastScreen';
import WeatherScreen from './screens/WeatherScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Current" component={MainScreen} />
          <Stack.Screen name="ForeCast" component={ForecastScreen} />
          <Stack.Screen name="WeatherDesc" component={WeatherScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
