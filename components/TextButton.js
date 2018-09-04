import React from 'react'
import { Text, View, TouchableOpacity, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View>
        <Text style={[styles.reset, style]}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.creat({
  reset: {
    textAlign: 'center',
    color: purple,
  }
})