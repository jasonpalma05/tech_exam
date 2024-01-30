// React modules
import React from 'react';
import {View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {scale, verticalScale} from 'react-native-size-matters';

interface TModalProps {
  showModal: boolean;
  children: React.ReactNode;
  toggleModal: () => void;
}

const Modal = (props: TModalProps) => {
  const {showModal, toggleModal, children} = props;
  return (
    <Overlay isVisible={showModal} onBackdropPress={toggleModal}>
      <View
        style={{
          width: scale(280),
          padding: scale(20),
          gap: verticalScale(20),
        }}>
        {children}
      </View>
    </Overlay>
  );
};

export default Modal;
