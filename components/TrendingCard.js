import { 
    View, 
    Text,
    Platform,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../constants';

import React from 'react';
// import {BlurView} from '@react-native-community/blur';

import { BlurView } from 'expo-blur';

// Continue from here...

const RecipeCardDetails = ({recipeItem}) => {
    return (
        <View
        style={{
            flex: 1
        }}
        >
            {/* Name and Bookmark */}
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Text
                    style={{
                        width: '70%',
                        ...FONTS.h3,
                        fontSize: 18,
                        color: COLORS.white,
                    }}
                >
                    {recipeItem.name}
                </Text>
                <Image
                    source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                    style={{
                        width:20,
                        height: 20,
                        marginRight: SIZES.base,
                        tintColor: COLORS.darkGreen,
                    }}
                />
            </View>

            
            
            <Text
                style={{
                    color: COLORS.lightGray,
                    ...FONTS.body4
                }}
            >
                {recipeItem.duration} | {recipeItem.serving} Serving
            </Text>
            
        </View>
    )
}

const RecipeCardInfo = ({recipeItem}) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView
                tint='dark'
                style={styles.recipeStyleContainer}
                intensity={50}
            >
                <RecipeCardDetails
                    recipeItem={recipeItem}
                />
            </BlurView>
    
        )
    } else {
        return (
            <View
                style={{
                    ...styles.recipeStyleContainer,
                    backgroundColor: COLORS.gray,
                }}
            >
                <RecipeCardDetails
                    recipeItem={recipeItem}
                />
            </View>
    
        )
    }
    
}

const TrendingCard = ({containerStyle, recipeItem, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                height: 350,
                width: 250,
                marginTop: SIZES.radius,
                marginRight: 20,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}

            onPress={onPress}
        >
            <Image 
            source={recipeItem.image}
            resizeMode="cover"
                style={{
                    width:250,
                    height: 350,
                    borderRadius: SIZES.radius,

                }}
            />
            {/* Category */}
            <View
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 15,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    backgroundColor: COLORS.transparentGray,
                    borderRadius: SIZES.radius
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        ...FONTS.h4
                    }}
                >{recipeItem.category}</Text>

            </View>

            {/* Card info */}

            <RecipeCardInfo
                recipeItem={recipeItem}
            />
            
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    recipeStyleContainer: {
        position: 'absolute',
        bottom: 10,
        left:10,
        right: 10,
        height: 100,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius
    }
});

export default TrendingCard;