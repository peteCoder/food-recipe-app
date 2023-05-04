import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const TabIcon = ({focused, icon}) => {
  return (
    <View
        style={{
            alignItems:"center",
            justifyContent: "center",
            height: 50,
            width: 50,
            position: "relative"
        }}
    >
      <Image
        source={icon}
        resizeMethod="contain"
        style={{
            width: 30,
            height: 30,
            tintColor: focused ? COLORS.darkGreen : COLORS.darkLime,
        }}
      />

      {focused && (
        <View
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height:5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor: COLORS.darkGreen
            }}
        ></View>
      )}
    </View>
  )
}

export default TabIcon