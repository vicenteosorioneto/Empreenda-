import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from './BackButton';

export default function NavigationHeader({ title, showBack = true, onBackPress, rightComponent }) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && <BackButton onPress={onBackPress} />}
      </View>
      
      <View style={styles.centerContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      
      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  leftContainer: {
    width: 50,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 50,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
