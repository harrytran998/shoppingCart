import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Text, Image, Input, Badge} from 'react-native-elements';
import {dataItems} from '../utils/Item';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Items = dataItems;
const TimeTemp = new Date(2019, 7, 30, 4);
const Now = new Date();
const Timer = Math.floor((TimeTemp - Now) / 1000);
let SaleSecond = 0;
let SaleMin = 0;
let SaleHours = 0;
export default class srcHomeShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberCartItems: 5,
      timer: Timer,
    };
  }

  static navigationOptions = {
    header: null,
    headerBackTitle: null,
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(prevState => ({timer: prevState.timer - 1})),
      1000,
    );
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
            inputContainerStyle={{borderBottomWidth: 0}}
            placeholder="Search"
            rightIcon={<Icon name="search" size={24} color="#828899" />}
          />
        </View>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => this.props.navigation.push('Cart')}>
          <Icon name="shopping-cart" size={30} color="#fff" />
          <Badge
            containerStyle={styles.cartItemsBadge}
            badgeStyle={styles.badgeCartStyle}
            textStyle={styles.cartItemsNum}
            value={this.state.numberCartItems}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _renderSaleTime() {
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
          style={{paddingLeft: 15, paddingBottom: 15}}
          data={Items}
          horizontal={true}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  _renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        alert(item.id);
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
    this._countDownTime();
    return (
      <SafeAreaView style={styles.container}>
        {this._renderHeader()}
        {this._renderContent()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '37%',
    flexDirection: 'column',
    backgroundColor: '#b4060c',
  },
  header: {
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
    flex: 1,
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
    flex: 25,
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  listItems: {
    flex: 75,
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
  },
  itemTxtName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemTxtPrice: {
    fontSize: 12,
    color: '#8dba5b',
  },
  cartItemsBadge: {
    position: 'absolute',
    top: 8,
    right: -4,
  },
  cartItemsNum: {
    fontSize: 12,
    color: '#b4060c',
  },
  badgeCartStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#828899',
  },
});
