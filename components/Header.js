import React, {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Header = ({title, onLocate}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onLocate}>
        <View style={styles.image}>
          {onLocate && (
            <Image
              style={styles.icon}
              source={require('../assets/img/compass.png')}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    flex: 1,
  },
  container: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  image: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Header;
