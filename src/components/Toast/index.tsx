import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Toast = (props: any) => {
  const {
    visible,
    bottomPosition,
    message,
    toggleToast,
    backgroundColor,
    timeout = 2000,
  } = props;

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        toggleToast();
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, timeout]);

  if (visible) {
    return (
      <View style={{...styles.ToastWrapper, bottom: bottomPosition}}>
        <View
          style={{...styles.ToastContainer, backgroundColor: backgroundColor}}>
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  ToastWrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  ToastContainer: {
    margin: 20,
    padding: 20,

    borderRadius: 4,
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(14),
    color: '#F9FDFE',
  },
});
export default Toast;
