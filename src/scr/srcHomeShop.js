import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Text, Image, Input} from 'react-native-elements';
import {dataItems} from '../utils/Item';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import CartIcon from '../components/CartIcon';

const Items = dataItems;
//set time countdown (yyyy, mm, dd, hh, MM, ss)
const TimeTemp = new Date(2019, 9, 5);
const Now = new Date();
const Timer = Math.floor((TimeTemp - Now) / 1000);
let SaleSecond = 0;
let SaleMin = 0;
let SaleHours = 0;
class srcHomeShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Timer,
    };
  }

  static navigationOptions = {
    header: null,
    headerBackTitle: null,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({timer: prevState.timer - 1}));
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _renderHeader() {
    return (
      <View style={[styles.header, styles.padLR]}>
        <View style={styles.searchField}>
          <Input
            inputContainerStyle={styles.inputContainerStyle}
            placeholder="Search"
            rightIcon={<Icon name="search" size={24} color="#828899" />}
          />
        </View>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => this.props.navigation.push('Cart')}>
          <CartIcon />
        </TouchableOpacity>
      </View>
    );
  }

  _renderSaleTime() {
    this._countDownTime();
    return (
      <View style={[styles.timeSale, styles.padLR]}>
        <Text h4 h4Style={[styles.txtColorWhite, styles.titleSale]}>
          FLASH SALE
        </Text>
        <View style={styles.timeBoads}>
          {this._renderTimeBoadItem(SaleHours)}
          {this._renderTimeBoadItem(SaleMin)}
          {this._renderTimeBoadItem(SaleSecond)}
        </View>
      </View>
    );
  }

  _renderContent() {
    return (
      <View style={styles.content}>
        {this._renderSaleTime()}
        <FlatList
          style={styles.productsContainer}
          data={Items}
          horizontal={true}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  _renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        this.props.addItemToCart(item);
        Alert.alert('add product ' + item.name + ' to cart');
      }}>
      <Image source={{uri: item.img}} style={styles.itemImg} />
      <View style={styles.itemDetal}>
        <Text style={[styles.txtColorWhite, styles.itemTxtName]}>
          {item.name}
        </Text>
        <Text style={styles.itemTxtPrice}>{item.price}.000đ</Text>
      </View>
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => item.id;

  _renderTimeBoadItem(time) {
    return <Text style={styles.txtTime}>{time < 10 ? '0' + time : time}</Text>;
  }

  _countDownTime() {
    let saleTime = this.state.timer;
    if (saleTime > 0) {
      SaleSecond = saleTime % 60;
      SaleMin = Math.floor(saleTime / 60);
      if (SaleMin >= 60) {
        SaleHours = Math.floor(SaleMin / 60);
        SaleMin = SaleMin % 60;
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderHeader()}
        {this._renderContent()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => dispatch({type: 'ADD_TO_CART', payload: product}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(srcHomeShop);

const styles = StyleSheet.create({
  container: {
    height: '37%',
    flexDirection: 'column',
    backgroundColor: '#b4060c',
  },
  header: {
    flex: 25,
    backgroundColor: '#b4060c',
    flexDirection: 'row',
  },
  padLR: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchField: {
    flex: 85,
    height: 35,
    marginBottom: 12,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  cartBtn: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 75,
    backgroundColor: '#b4060c',
    flexDirection: 'column',
  },
  txtColorWhite: {
    color: '#fff',
  },
  txtTime: {
    minWidth: 28,
    height: 28,
    padding: 5,
    borderRadius: 6,
    backgroundColor: '#fff',
    color: '#ea0f17',
    textAlign: 'center',
  },
  timeSale: {
    flex: 3,
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  listItems: {
    flex: 7,
    marginBottom: 20,
  },
  timeBoads: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSale: {
    flex: 7,
  },
  itemImg: {
    width: 105,
    height: 105,
    borderRadius: 6,
  },
  itemContainer: {
    marginRight: 9,
  },
  itemDetal: {
    position: 'absolute',
    zIndex: 1,
    height: '40%',
    width: '100%',
    backgroundColor: '#333333ba',
    bottom: 0,
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  itemTxtName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemTxtPrice: {
    fontSize: 12,
    color: '#8dba5b',
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  productsContainer: {
    height: '70%',
    paddingLeft: 15,
    paddingBottom: 15,
  },
});
