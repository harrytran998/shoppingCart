import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

const BtnEdit = props => {
  const isEditMode =
    props.cartItems.length > 0 ? props.cartItems[0].isEditMode : false;

  return (
    <TouchableOpacity
      style={headerStyle.hearderEditBtn}
      onPress={() => {
        if (props.cartItems.length > 0) {
          isEditMode
            ? props.cancelEditMode(props.cartItems[0])
            : props.editMode(props.cartItems[0]);
        }
        //todo
      }}>
      <Text style={headerStyle.headerText}>{isEditMode ? 'Done' : 'Sửa'}</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => {
  return {
    cartItems: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editMode: product => dispatch({type: 'EDIT_MODE', payload: product}),
    cancelEditMode: product =>
      dispatch({type: 'CANCEL_EDIT_MODE', payload: product}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(BtnEdit));

const headerStyle = StyleSheet.create({
  headerText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  hearderEditBtn: {
    paddingRight: 20,
  },
});
