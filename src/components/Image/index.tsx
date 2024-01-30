import React from 'react';
import {Image, ImageProps, View} from 'react-native';

interface TImageProps extends ImageProps {}

const TImage: React.FC<TImageProps> = ({source, style, ...rest}) => {
  return (
    <View>
      <Image source={source} style={style} {...rest} />
    </View>
  );
};

export default TImage;
