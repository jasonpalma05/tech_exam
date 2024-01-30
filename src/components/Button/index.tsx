import {TouchableOpacity, TouchableOpacityProps, Text} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';

interface LSButtonProps extends TouchableOpacityProps {
  label?: string;
  isDisabled?: boolean;
  width?: any;
  backgroundColor?: string;
}
const Button = (props: LSButtonProps) => {
  const {backgroundColor = '#00b0b0'} = props;
  return (
    <TouchableOpacity
      delayPressIn={0}
      onPress={props.onPress}
      style={{
        padding: 15,
        borderRadius: 10,
        backgroundColor: props.isDisabled ? '#D9DBE0' : backgroundColor,
        justifyContent: 'center',
        borderColor: props.isDisabled ? '#D9DBE0' : backgroundColor,
        alignItems: 'center',
        width: props.width,
      }}
      disabled={props.isDisabled}>
      <Text
        style={[
          {
            fontSize: moderateScale(14),
            lineHeight: verticalScale(18),
          },
          {color: '#F9FDFE'},
        ]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
