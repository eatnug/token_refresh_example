/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {auth, fetch} from './reducer';
import {store} from './redux';

const buttonStyle = {
  width: 100,
  height: 100,
  borderColor: 'white',
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 5,
  borderRadius: 10,
  backgroundColor: 'white'
};

const itemStyle = {
  width: 100,
  height: 30,
  borderColor: 'white',
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 5,
  borderRadius: 10,
  backgroundColor: 'white'
}

const App = () => {
  const {token, data} = useSelector((store) => store.root);
  const dispatch = useDispatch();
  const onPressFetch = () => {
    dispatch(fetch());
  };
  const onPressAuth = () => {
    dispatch(auth());
  };

  useEffect(() => {
    if(token === 'valid') Alert.alert('token is valid now')
  }, [token]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={onPressFetch}
        style={buttonStyle}>
        <Text>fetch</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressAuth}
        style={buttonStyle}>
        <Text>auth</Text>
      </TouchableOpacity>
      {data.map((item, index) => <View key={index} style={itemStyle}><Text>{item}</Text></View>)}
    </View>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
