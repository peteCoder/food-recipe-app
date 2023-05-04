import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Platform
} from 'react-native';

import { BlurView } from 'expo-blur';
import { COLORS, SIZES, FONTS, icons } from '../constants';


const HEADER_HEIGHT = 350;

// renderHeaderBar
const RenderHeaderBar = ({navigation, selectedRecipe, scrollY}) => {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 90,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding,
                paddingBottom: 10
            }}
        >

            {/* Animated Overlay */}
            <Animated.View 
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: COLORS.black,
                    opacity: scrollY.interpolate({
                        inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT -70],
                        outputRange: [0, 1]
                    })
                }}
            />

            {/* Header Bar Title ----------- Continue from here... */}

            {/* Back Button */}
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 35,
                    width: 35,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray,
                    backgroundColor: COLORS.transparentBlack5

                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.back}
                    style={{
                        width: 15, height: 15,
                        tintColor: COLORS.lightGray
                    }}
                />
            </TouchableOpacity>

            {/* Bookmark Button */}
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 35,
                    width: 35

                }}
            >
                <Image
                    source={selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                    style={{
                        width: 30, height: 30,
                        tintColor: COLORS.darkGreen
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

// RecipeCreateCardInfoDetail
const RecipeCreateCardInfoDetail = ({selectedRecipe}) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            {/* Profile Photo */}
            <View
                style={{
                    width: 40,
                    height: 40,
                    marginLeft: 20,
                }}
            >
                <Image 
                    source={selectedRecipe?.author?.profilePic}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,

                    }}
                />
            </View>

            {/* Labels */}
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 20,
                }}
            >
                <Text style={{color: COLORS.lightGray, ...FONTS.body4}}>Recipe by: </Text>
                <Text style={{color: COLORS.white, ...FONTS.body4}}>{selectedRecipe?.author?.name}</Text>
            </View>

            {/* Button */}
            <TouchableOpacity
                style={{
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent:'center',
                    marginRight: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: COLORS.lightGreen1
                }}

                onPress={() => console.log("View Profile...")}
            >
                <Image 
                    source={icons.rightArrow}
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.lightGreen1
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

// RecipeCreateCardInfo
const RecipeCreateCardInfo = ({selectedRecipe}) => {
    if (Platform.OS === 'ios'){
        return (
            <BlurView
                style={{
                    flex: 1,
                    borderRadius: SIZES.radius,
                }}
                tint="dark"
            >
                <RecipeCreateCardInfoDetail 
                    selectedRecipe={selectedRecipe}
                />
            </BlurView>
        )
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.transparentBlack9
                }}
            >
                <RecipeCreateCardInfoDetail 
                    selectedRecipe={selectedRecipe}
                />
            </View>
        )
    }
}



const Recipe = ({navigation, route}) => {

    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const scrollY = useRef(new Animated.Value(0)).current
    useEffect(() => {
        let { recipe } = route.params;
        console.log(recipe)
        setSelectedRecipe(recipe)
    }, [])

    

    // renderHeaderSectionCard
    const renderHeaderSectionCard = () => {
        return (
            <View
                style={{
                    alignItems: "center",
                    overflow: "hidden",
                    marginTop: -1000,
                    paddingTop: 1000
                }}
            >
                {/* Background Image */}
                <Animated.Image
                    source={selectedRecipe?.image}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT,
                        width: "200%",
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [2, 1, 0.75]
                                })
                            }
                        ],
                        
                    }}
                />
                {/* Recipe Creator Card */}

                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: 10,
                        left: 30,
                        right: 30,
                        height: 80,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, 170, 250],
                                    outputRange: [0, 0, 100],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <RecipeCreateCardInfo 
                        selectedRecipe={selectedRecipe}
                    />
                </Animated.View>

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <Animated.FlatList 
                data={selectedRecipe?.ingredients}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header Section */}
                        {renderHeaderSectionCard()}
                        {/* Info Section */}
                        {/* Ingredient Section */}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {y: scrollY}}}
                ], {useNativeDriver: true})}

                renderItem={({item}) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 30,
                            marginVertical: 5
                        }}
                    >
                        {/* Icon section */}
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 50,
                                borderRadius: 5,
                                backgroundColor: COLORS.lightGray
                            }}
                        >
                            <Image 
                                source={item.icon}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </View>
                        {/* Description */}
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 20,
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >{item.description}</Text>

                        </View>
                        {/* Quantity */}
                        <View
                            style={{
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >{item.quantity}</Text>
                        </View>
                        
                    </View>
                )}
            />
            {/* renderHeaderBar */}

            <RenderHeaderBar 
                navigation={navigation}
                selectedRecipe={selectedRecipe}
                scrollY={scrollY}
            />
        </View>
    )
}

export default Recipe;