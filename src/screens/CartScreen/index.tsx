import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Anchor from '../../components/Anchor';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import {CLEAR_CART, UPDATE_CART} from '../../redux/shopReducer/action';
import TImage from '../../components/Image';

const CartScreen = () => {
  const [showModal, setShowModal] = useState<{type: string; modal: boolean}>({
    type: '',
    modal: false,
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const {cart} = useSelector((state: {shopReducer: any}) => state.shopReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // get total items
  const totalItems = cart.map((obj: {quantity: number}) => obj.quantity);
  let totalItem = 0;
  if (totalItems?.length) {
    totalItems.forEach((num: number) => {
      totalItem += num;
    });
  }
  // end

  // get total amount
  const totalAmounts = cart.map(
    (obj: {unitPrice: number; quantity: number}) =>
      obj.quantity * obj.unitPrice,
  );
  let totalAmount = 0;
  if (totalAmounts?.length) {
    totalAmounts.forEach((num: number) => {
      totalAmount += num;
    });
  }
  // end

  const formatPeso = (value: number | null) => {
    if (value === null || value === 0) {
      return `₱ 0`;
    }

    return value?.toLocaleString('en-PH', {
      currency: 'PHP',
      style: 'currency',
    });
  };

  const modalText = `Do you want to ${
    showModal.type === 'checkout' ? 'checkout' : 'clear cart'
  }?`;

  const onPressIncreDecre = ({type, index}: {type: string; index: string}) => {
    cart[index].quantity =
      type === 'add' ? cart[index].quantity + 1 : cart[index].quantity - 1;
    dispatch({type: UPDATE_CART, newState: {cart}});
  };

  const renderItem = ({item, index}: any) => {
    return (
      <View
        style={{
          ...styles.headerContainer,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: scale(10),
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -15,
              right: -15,
              zIndex: 1,
              alignSelf: 'flex-end',
              backgroundColor: '#E54F6D',
              width: scale(30),
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              const cartIndex = cart.findIndex(
                (obj: {id: string}) => obj?.id === item?.id,
              );
              cart.splice(cartIndex, 1);
              setShowToast(true);
              dispatch({
                type: UPDATE_CART,
                newState: {
                  cart: cart,
                },
              });
            }}>
            <Text
              style={{
                fontSize: moderateScale(15),
                color: '#F9FDFE',
                alignSelf: 'center',
              }}>
              X
            </Text>
          </TouchableOpacity>
          <TImage
            style={{
              width: 120,
              height: 120,
              resizeMode: 'contain',
            }}
            source={{uri: item.imageUrl}}
          />
          <View style={styles.categoryContainer}>
            <Text
              style={{
                fontSize: moderateScale(14),
                color: '#101F43',
                fontWeight: 'bold',
              }}>
              {item.productName}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(18),
                fontWeight: 'bold',
              }}>
              {item.unitPrice}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Button
                label="-"
                width={scale(35)}
                onPress={() => onPressIncreDecre({type: 'minus', index})}
                backgroundColor="#E54F6D"
                isDisabled={parseInt(item.quantity) === 1}
              />
              <Text
                style={{
                  backgroundColor: '#F9FDFE',
                  color: '#191C1D',
                  paddingHorizontal: 5,
                  marginHorizontal: 8,
                }}>
                {item.quantity}
              </Text>
              <Button
                label="+"
                width={scale(35)}
                onPress={() => onPressIncreDecre({type: 'add', index})}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <View style={styles.checkoutContainer}>
        <View style={styles.itemsContainer}>
          <Text style={styles.totalText}>My Cart</Text>
          <Anchor
            label="Clear Cart"
            color="#E54F6D"
            onPress={() =>
              setShowModal({type: 'clear_cart', modal: !showModal.modal})
            }
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={cart}
          renderItem={renderItem}
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: scale(5),
          }}
        />
      </View>
      <View style={styles.checkoutContainer}>
        <View style={styles.itemsContainer}>
          <Text style={styles.totalText}>Total Items</Text>
          <Text style={styles.totalText}>{totalItem}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalText}>{formatPeso(totalAmount)}</Text>
        </View>
        <Button
          label="Checkout"
          onPress={() =>
            setShowModal({type: 'checkout', modal: !showModal.modal})
          }
        />
      </View>
      <Modal
        showModal={showModal.modal}
        toggleModal={() => setShowModal({type: '', modal: !showModal.modal})}>
        <View style={styles.container}>
          <Text style={styles.textBold}>{modalText}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Anchor
            label="YES"
            onPress={() => {
              setShowModal({type: '', modal: !showModal.modal});
              dispatch({type: CLEAR_CART});
              if (showModal.type === 'checkout') {
                dispatch({type: UPDATE_CART, newState: {checkout: true}});
                navigation.goBack();
                return;
              }
              setShowToast(!showToast);
            }}
            color="#00b0b0"
          />
          <Anchor
            label="NO"
            onPress={() => setShowModal({type: '', modal: !showModal.modal})}
            color="#E54F6D"
          />
        </View>
      </Modal>
      <Toast
        visible={showToast}
        bottomPosition={verticalScale(10)}
        message={'Removed successfully!'}
        toggleToast={() => setShowToast(false)}
        backgroundColor={'#E54F6D'}
      />
    </Container>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  checkoutContainer: {
    gap: verticalScale(10),
    margin: scale(5),
    padding: scale(15),
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#F9FDFE',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    gap: verticalScale(10),
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
  },
  categoryContainer: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: verticalScale(5),
  },
  headerContainer: {
    gap: scale(5),
    margin: scale(5),
    padding: scale(15),
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#F9FDFE',
  },
});
