import React from 'react'
import { Text, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'

export default function TextButton({ children, onPress }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View>
        <Text>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}