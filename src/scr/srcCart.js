import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {CheckBox, Image} from 'react-native-elements';
import {cartItems} from '../utils/cartItemDemo';
import CartItems from '../com/listCartItems';

export default class srcCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckAll: false,
      Items: cartItems,
      isEditMode: true,
      numberOfItem: '10',
    };
  }

  static headerStyle = StyleSheet.create({
    headerText: {
      color: '#fff',
      fontWeight: '500',
      fontSize: 16,
    },
  });

  static navigationOptions = {
    headerTitle: 'Giỏ hàng',
    headerTitleStyle: this.headerStyle.headerText,
    headerStyle: {
      backgroundColor: '#b4060c',
      height: 58,
    },
    headerRight: (
      <TouchableOpacity
        style={{paddingRight: 20}}
        onPress={() => {
          alert('edit');
        }}>
        <Text style={this.headerStyle.headerText}>Sửa</Text>
      </TouchableOpacity>
    ),
    headerTintColor: '#fff',
  };

  _renderTotalPrice() {
    return (
      <View style={styles.payContainer}>
        <CheckBox
          containerStyle={styles.ckbSelectAll}
          title="Chọn tất cả"
          checked={this.state.isCheckAll}
          textStyle={styles.txtTitleStyle}
          onPress={() => {
            this._pressPayAll();
          }}
          size={30}
          checkedIcon="check-square"
          checkedColor="#b4060c"
        />
        <View style={styles.txtTotalMoney}>
          <Text style={styles.txtTitleStyle}>Tổng tiền:</Text>
          <Text style={styles.txtPrice}>1.000.000d</Text>
        </View>
        <TouchableOpacity style={styles.btnPay}>
          <Text style={styles.txtPayAll}>THANH TOÁN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _pressPayAll() {
    this.setState({
      isCheckAll: !this.state.isCheckAll,
    });
  }

  _renderCartItems() {
    return (
      <FlatList
        style={styles.Container}
        data={this.state.Items}
        keyExtractor={this._keyExtractor}
        renderItem={({index, item}) => {
          return (
            <CartItems
              imgUri={item.img}
              name={item.name}
              price={item.price}
              number={item.number}
              paySelect={item.paySelect}
            />
          );
        }}
      />
    );
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    console.log('numberOfItem:', this.state.numberOfItem);
    console.log('isEditMode:', this.state.isEditMode);
    return (
      <View style={styles.Container}>
        {this._renderTotalPrice()}
        {this._renderCartItems()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  payContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#cfd0d3',
  },
  ckbSelectAll: {
    flex: 38,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: '#0000',
    justifyContent: 'center',
  },
  ckbSelectItem: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: '#0000',
    justifyContent: 'center',
  },
  txtTotalMoney: {
    flex: 25,
    justifyContent: 'center',
  },
  btnPay: {
    flex: 37,
    backgroundColor: '#b4060c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPayAll: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  txtTitleStyle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '300',
  },
  txtPrice: {
    fontSize: 14,
    color: '#b4060c',
    fontWeight: '300',
  },
});
