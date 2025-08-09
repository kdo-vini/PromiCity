
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type SearchBarProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Buscar...'}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
