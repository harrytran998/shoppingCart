import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {CheckBox, Image} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderChangeNumber() {
    return (
      <View style={styles.changeNumContainer}>
        <Text style={styles.txtDetailItem}>Số lượng:</Text>
        <View style={styles.editNumber}>
          <TouchableOpacity>
            <Icon name="remove" size={25} color="#828899" />
          </TouchableOpacity>
          <TextInput
            style={styles.inputNumber}
            value={'0'}
            onChangeText={text => {
              //todo
            }}
            keyboardType="phone-pad"
            multiline={false}
          />
          <TouchableOpacity>
            <Icon name="add" size={25} color="#828899" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const SwipeoutSetting = {
      backgroundColor: '#fff',
      autoClose: true,
      right: [
        {
          onPress: () => {},
          text: 'Xoá',
          type: 'delete',
        },
      ],
      disabled: false,
      onOpen: (secId, rowId, direction) => {
        this.setState({isEditMode: true});
      },
      onClose: (secId, rowId, direction) => {
        this.setState({isEditMode: false});
      },
    };
    return (
      <Swipeout {...SwipeoutSetting}>
        <View style={styles.cartItem}>
          <CheckBox
            containerStyle={styles.ckbSelectItem}
            title={null}
            checked={true}
            textStyle={styles.txtTitleStyle}
            size={30}
            checkedIcon="check-square"
            checkedColor="#b4060c"
          />
          <Image source={{uri: this.props.imgUri}} style={styles.itemImg} />
          <View style={styles.itemDetail}>
            <Text style={styles.txtTitleStyle}>weqsdazxc </Text>
            <Text style={styles.txtPrice}>200.000d</Text>
            <Text style={styles.txtDetailItem}>weqsdazxc</Text>
            <Text style={styles.txtDetailItem}>weqsdazxc</Text>
          </View>
          {this._renderChangeNumber()}
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  cartItem: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#cfd0d3',
  },
  ckbSelectItem: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: '#0000',
    justifyContent: 'center',
  },
  txtTitleStyle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '300',
  },
  itemDetail: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  txtPrice: {
    fontSize: 14,
    color: '#b4060c',
    fontWeight: '300',
  },
  changeNumContainer: {
    minWidth: 120,
    marginLeft: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editNumber: {
    height: 30,
    marginTop: 5,
    flexDirection: 'row',
  },
  inputNumber: {
    width: 30,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 4,
    borderColor: '#cfd0d3',
    borderWidth: 1,
    textAlign: 'center',
  },
  txtDetailItem: {
    fontSize: 12,
    fontWeight: '100',
    color: '#828899',
  },
  itemImg: {
    width: 65,
    height: 65,
    borderRadius: 4,
    marginLeft: 10,
  },
});
