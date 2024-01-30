import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

interface TContainerProps {
  children: React.ReactNode;
}

const Container = (props: TContainerProps) => {
  const {children} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4D5D7',
  },
  subContainer: {flex: 1, padding: scale(5), gap: scale(5)},
});

export default Container;
