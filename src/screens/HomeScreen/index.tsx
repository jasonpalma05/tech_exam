import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Anchor from '../../components/Anchor';
import Button from '../../components/Button';
import Container from '../../components/Container';
import TImage from '../../components/Image';
import Modal from '../../components/Modal';
import TTextInput from '../../components/TextInput';
import Toast from '../../components/Toast';
import {ADD_TO_CART, UPDATE_CART} from '../../redux/shopReducer/action';
import {TechItemList} from '../../utils/techItemList';

const HomeScreen = () => {
  const [category, setCategory] = useState<Array<any>>([]);
  const [product, setProduct] = useState<Array<any>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [sortPrice, setSortPrice] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);

  const {cart, checkout} = useSelector(
    (state: {shopReducer: any}) => state.shopReducer,
  );
  const dispatch = useDispatch();

  const capitalizeFirstLetter = ([first = '', ...rest]: string) => {
    return [first.toUpperCase(), ...rest].join('');
  };

  useEffect(() => {
    let category: any = [];
    TechItemList.map((item, index) => {
      const capitalizeLetter: string = capitalizeFirstLetter(item.category);
      if (!category.includes(capitalizeLetter)) {
        category.push(capitalizeLetter);
      }
    });
    category.unshift('All Items');
    setCategory(category);
    setProduct(TechItemList);
  }, []);

  const handleAddToCart = (item: {
    id: string;
    imageUrl: string;
    productName: string;
    unitPrice: string;
  }) => {
    const {id, imageUrl, productName, unitPrice} = item;

    let _cart: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      unitPrice: string;
      quantity: number;
    }> = [];

    _cart = [...cart];

    let tmp: any = [];
    if (Boolean(cart?.length)) {
      let itemsToPush = [];
      const findItem = cart.find(
        (obj: {productName: string}) => obj.productName === productName,
      );

      if (Boolean(findItem)) {
        const findIndex = cart.findIndex(
          (obj: {productName: string}) => obj.productName === productName,
        );
        _cart[findIndex]['quantity'] = _cart[findIndex]['quantity'] + 1;
        setShowToast(true);
        dispatch({type: ADD_TO_CART, payload: _cart});
        return;
      }

      itemsToPush.push({
        id: id,
        imageUrl: imageUrl,
        productName: productName,
        unitPrice: unitPrice,
        quantity: 1,
      });

      tmp = [...cart, ...itemsToPush];
    } else {
      tmp = [
        ...cart,
        {
          id,
          imageUrl,
          productName,
          unitPrice,
          quantity: 1,
        },
      ];
    }
    setShowToast(true);
    dispatch({type: ADD_TO_CART, payload: tmp});
  };

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      imageUrl: string;
      productName: string;
      category: string;
      unitPrice: string;
      description: string;
    };
  }) => {
    return (
      <View
        style={{
          flex: 1,
          ...styles.headerContainer,
        }}>
        <TImage
          style={{
            width: 120,
            height: 120,
            resizeMode: 'contain',
          }}
          source={{uri: item.imageUrl}}
        />
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}># {item.category}</Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: '#101F43',
              fontWeight: 'bold',
              minHeight: 50,
            }}>
            {item.productName}
          </Text>
          <Text numberOfLines={2} style={styles.categoryText}>
            {item.description}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(18),
              fontWeight: 'bold',
            }}>
            {item.unitPrice}
          </Text>
        </View>
        <Button
          label="Add"
          width={'100%'}
          onPress={() => handleAddToCart(item)}
        />
      </View>
    );
  };

  const renderModal = ({item, index}: {item: string; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity
          delayPressIn={0}
          onPress={() => {
            setShowModal(!showModal);
            const filteredProduct = TechItemList.filter(obj => {
              if (!index) return true;
              return obj.category.toLowerCase() === item.toLowerCase();
            });
            setProduct(filteredProduct);
            setSelectedCategory(index);
          }}
          style={styles.buttonContainer}>
          <Text style={styles.textRegular}>{item}</Text>
        </TouchableOpacity>
        <Divider />
      </View>
    );
  };

  return (
    <Container>
      <View style={styles.headerContainer}>
        <TTextInput
          placeholder="Search Product Name"
          setText={(text: string) => {
            const filteredProduct = TechItemList.filter(_obj => {
              if (!selectedCategory) return true;

              return (
                _obj.category.toLowerCase() ===
                category[selectedCategory].toLowerCase()
              );
            }).filter(obj => {
              return obj.productName.toLowerCase().includes(text.toLowerCase());
            });
            setProduct(filteredProduct);
          }}
        />
        <View style={styles.filterContainer}>
          <View style={styles.subFilterContainer}>
            <Text>Categories:</Text>
            <Anchor
              label={category[selectedCategory]}
              onPress={() => setShowModal(!showModal)}
            />
          </View>
          <View style={styles.subFilterContainer}>
            <Text>Sort Price:</Text>
            <Anchor
              label={sortPrice ? 'Low To High' : 'High To Low'}
              onPress={() => setSortPrice(!sortPrice)}
            />
          </View>
        </View>
      </View>
      {product.length !== 0 ? (
        <FlatList
          data={product.sort((a, b) =>
            a.unitPrice > b.unitPrice
              ? sortPrice
                ? 1
                : -1
              : sortPrice
              ? -1
              : 1,
          )}
          numColumns={2}
          renderItem={renderItem}
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: scale(5),
          }}
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text>Product not found!</Text>
        </View>
      )}

      {/* MODAL */}
      <Modal showModal={showModal} toggleModal={() => setShowModal(!showModal)}>
        <View style={styles.categoryListContainer}>
          <Text style={styles.textBold}>Select Category</Text>
          <FlatList
            data={category}
            renderItem={renderModal}
            bounces={false}
            style={{
              width: scale(250),
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Modal>
      {/* END MODAL */}

      {/* TOAST */}
      <Toast
        visible={showToast}
        bottomPosition={verticalScale(10)}
        message={'Added successfully!'}
        toggleToast={() => setShowToast(false)}
        backgroundColor={'#00b0b0'}
      />

      <Toast
        visible={checkout}
        bottomPosition={verticalScale(10)}
        message={'Thank you for purchasing!'}
        toggleToast={() =>
          dispatch({type: UPDATE_CART, newState: {checkout: false}})
        }
        backgroundColor={'#00b0b0'}
      />
      {/* END TOAST */}
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    gap: scale(5),
    margin: scale(5),
    padding: scale(15),
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#F9FDFE',
  },
  filterContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  subFilterContainer: {
    flexDirection: 'column',
    gap: scale(5),
    alignItems: 'center',
  },
  categoryContainer: {
    paddingBottom: 10,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: verticalScale(5),
  },
  categoryText: {
    color: '#101F43',
    fontSize: moderateScale(10),
    opacity: 0.7,
  },
  categoryListContainer: {
    alignItems: 'center',
    gap: verticalScale(10),
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
  },
  textRegular: {
    fontSize: moderateScale(15),
    textAlign: 'center',
  },
  listContainer: {paddingVertical: scale(5)},
  buttonContainer: {
    marginVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
