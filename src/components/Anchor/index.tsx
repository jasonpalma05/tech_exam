import {TouchableOpacity, TouchableOpacityProps, Text} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';

interface TAnchorProps extends TouchableOpacityProps {
  label?: string;
  fontSize?: number;
  color?: string;
}

const Anchor = (props: TAnchorProps) => {
  const {color = '#191C1D'} = props;
  return (
    <TouchableOpacity
      delayPressIn={0}
      onPress={props.onPress}
      style={props.style}>
      <Text
        style={{
          fontSize: moderateScale(14),
          lineHeight: verticalScale(18),
          color: color,
          fontWeight: 'bold',
        }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default Anchor;
