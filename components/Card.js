import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'

const styles = StyleSheet.create({
  card: {
    height: 100,
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 0.2,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
})

const Card = () => (
  <TouchableOpacity style={styles.card}>
    <View style={{flex: 2, justifyContent: 'center', paddingLeft: 10}}>
      <Text style={{fontFamily: 'Roboto-Bold', fontSize: 20}}>Выпить таблетки</Text>
      <Text style={{fontFamily: 'Roboto-Regular'}}>Сегодня 21:00</Text>
    </View>
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Button
        buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
        icon={<Icon name="check-circle" size={25} color={MAIN_COLOR} />}
      />
      <Button
        buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
        icon={<Icon name="chevron-down" size={25} color={MAIN_COLOR} />}
      />
    </View>
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderColor: MAIN_COLOR,
        borderWidth: 0.4,
        backgroundColor: MAIN_COLOR,
      }}
    >
      <Icon
        size={16}
        name="pills"
        color={GREY_COLOR}
        style={{marginLeft: 8, marginBottom: 8, marginTop: 6, marginRight: 4}}
      />
    </View>
  </TouchableOpacity>
)

export default Card
