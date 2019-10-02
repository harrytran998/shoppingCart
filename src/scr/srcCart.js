import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {CheckBox} from 'react-native-elements';
// import {cartItems} from '../utils/cartItemDemo';
import CartItems from '../components/CartItem';
import {connect} from 'react-redux';
import BtnEdit from '../components/BtnEdit';

class srcCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckAll: false,
      totalPrice: 0,
    };
  }

  static headerStyle = StyleSheet.create({
    headerText: {
      color: '#fff',
      fontWeight: '500',
      fontSize: 16,
    },
  });

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Giỏ hàng',
      headerTitleStyle: this.headerStyle.headerText,
      headerStyle: {
        backgroundColor: '#b4060c',
        height: 58,
      },
      headerRight: <BtnEdit />,
      headerTintColor: '#fff',
    };
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
            this._payAllEvent();
            this._pressPayAll();
          }}
          size={30}
          checkedIcon="check-square"
          checkedColor="#b4060c"
        />
        <View style={styles.txtTotalMoney}>
          <Text style={styles.txtTitleStyle}>total money:</Text>
          <Text style={styles.txtPrice}>{this.state.totalPrice}đ</Text>
        </View>
        <TouchableOpacity
          style={styles.btnPay}
          onPress={() => this._payEvent()}>
          <Text style={styles.txtPayAll}>THANH TOÁN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _payEvent() {
    const items = this.props.cartItems;
    for (var i in items) {
      console.log('items[i].isPaySelect', items[i].isPaySelect);
      if (items[i].isPaySelect === true) {
        this.props.removeItem(items[i]);
      }
    }
    this._checkItemState();
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
        data={this.props.cartItems}
        keyExtractor={this._keyExtractor}
        renderItem={({index, item}) => {
          return (
            <CartItems
              item={item}
              index={index}
              onRemoveAll={() => {
                this.props.removeItem(item);
                this._checkItemState();
              }}
              onRemoveOne={() => {
                this.props.removeOneItem(item);
                this._checkItemState();
              }}
              onAddOne={() => {
                this.props.addOneItem(item);
                this._checkItemState();
              }}
              onSelectToPay={() => {
                this.props.selectToPay(item);
                this._checkItemState();
              }}
              onCancelToPay={() => {
                this.props.cancelToPay(item);
                this._checkItemState();
              }}
            />
          );
        }}
      />
    );
  }

  _returnEmptyCart() {
    return <Text>Không có Item nào -_-</Text>;
  }

  _keyExtractor = (item, index) => item.id;

  componentDidMount() {
    this._checkItemState();
  }

  _checkItemState() {
    const items = this.props.cartItems;
    let totalPrice = 0;
    let isSelectAll = true;
    for (var i in items) {
      if (items[i].isPaySelect === false) {
        isSelectAll = false;
      } else {
        totalPrice += items[i].number * items[i].price;
      }
    }
    this.setState({
      isCheckAll: isSelectAll,
      totalPrice: totalPrice,
    });
  }

  _payAllEvent() {
    let items = this.props.cartItems;
    console.log('this.state.isSelectAll', this.state.isSelectAll);
    if (this.state.isCheckAll == true) {
      for (var i in items) {
        if (items.hasOwnProperty(i)) {
          const item = items[i];
          this.props.cancelToPay(item);
        }
      }
    } else {
      for (var i in items) {
        if (items.hasOwnProperty(i)) {
          const item = items[i];
          this.props.selectToPay(item);
        }
      }
    }
    this._checkItemState();
  }

  render() {
    return (
      <View style={styles.Container}>
        {this._renderTotalPrice()}
        {this.props.cartItems.length === 0
          ? this._returnEmptyCart()
          : this._renderCartItems()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: product =>
      dispatch({type: 'REMOVE_FROM_CART', payload: product}),
    removeOneItem: product =>
      dispatch({type: 'REMOVE_ONE_ITEM', payload: product}),
    addOneItem: product => dispatch({type: 'ADD_TO_CART', payload: product}),
    selectToPay: product => dispatch({type: 'SELECT_TO_PAY', payload: product}),
    cancelToPay: product => dispatch({type: 'CANCEL_TO_PAY', payload: product}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(srcCart);

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
    backgroundColor: '#fff',
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
