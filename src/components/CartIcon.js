import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Badge} from 'react-native-elements';
import {connect} from 'react-redux';

const CartIcon = props => {
  return (
    <View>
      <Icon name="shopping-cart" size={30} color="#fff" />
      <Badge
        containerStyle={styles.cartItemsBadge}
        badgeStyle={styles.badgeCartStyle}
        textStyle={styles.cartItemsNum}
        value={props.cartItems}
      />
    </View>
  );
};

const mapStateToProps = state => {
  let numbetItem = 0;
  state.forEach(item => {
    numbetItem += item.number;
  });
  return {
    cartItems: numbetItem,
  };
};

const styles = StyleSheet.create({
  cartItemsBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
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

export default connect(mapStateToProps)(CartIcon);
