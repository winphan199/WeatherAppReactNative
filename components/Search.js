import React, {View, TextInput, StyleSheet, Button} from 'react-native';
import {useState} from 'react';

const Search = ({onSearch}) => {
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search location..."
        placeholderTextColor="#cdcdcd"
        onChangeText={onChangeText}
        value={text}
      />
      <View style={styles.button}>
        <Button
          title="Search"
          onPress={() => {
            if (text) {
              onSearch(text);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    flex: 2,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;
