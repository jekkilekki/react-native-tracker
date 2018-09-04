import React from 'react'
import { View, Text, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default function TrackerStepper({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View>
      <View>
        <TouchableNativeFeedback onPress={onDecrement}>
          <View>
            <FontAwesome name='minus' size={30} color={'black'}/>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onIncrement}>
          <View>
            <FontAwesome name='plus' size={30} color={'black'}/>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}