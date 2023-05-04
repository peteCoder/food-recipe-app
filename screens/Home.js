import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    SafeAreaView,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {COLORS, FONTS, dummyData, SIZES, images, icons} from '../constants'
import { CategoryCard, TrendingCard } from '../components';

const Home = ({ navigation }) => {

    // RenderHeader
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    marginHorizontal: SIZES.padding,
                    alignItems: 'center',
                    height: 80
                }}
            >

                {/* Text */}
                <View>
                    <Text
                        style={{
                            color: COLORS.darkGreen,
                            ...FONTS.h2
                        }}
                    >
                        Hello, Peter.
                    </Text>

                    <Text
                        style={{
                            color: COLORS.gray,
                            margin: 3,
                            fontSize: 17,
                            // ...FONTS.h2
                        }}
                    >
                        What would you have today ?
                    </Text>
                </View>

                {/* Image */}
                <TouchableOpacity
                    onPress={() => console.log("Profile")}
                >
                    <Image 
                        source={images.profile}

                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                        }}
                    />
                </TouchableOpacity>
                <Image />
            </View>
        )
    }

    // renderSearchBar
    const renderSearchBar = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    height: 50,
                    alignItems:"center",
                    marginHorizontal: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGray,
                    overflow: "hidden"
                }}
            >
                <Image 
                    source={icons.search}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray,
                    }}
                />
                <TextInput 
                    style={{
                        marginLeft: SIZES.radius,
                        ...FONTS.body3,
                    }}
                    placeholder="Search Recipes..."
                    placeholderTextColor={COLORS.gray}
                />

            </View>
        )
    }

    // renderSeeRecipeCard
    const renderSeeRecipeCard = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,

                }}
            >
                {/* Image */}
                <View
                    style={{
                        width: 100,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Image 
                        source={images.recipe}
                        style={{
                            width: 50,
                            height: 50
                        }}
                    />
                </View>
                {/* Text */}

                <View
                    style={{flex: 1, paddingVertical: SIZES.radius}}
                >
                    <Text
                        style={{
                            width: "70%",
                            ...FONTS.body4,

                        }}
                    >
                        You have 12 recipes that you haven't tried yet.
                    </Text>
                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                        }}
                        onPress={() => console.log("See Recipes")}
                    >
                        <Text
                            style={{
                                color: COLORS.darkGreen,
                                textDecorationLine: "underline",
                                ...FONTS.h4
                            }}
                        >
                            See recipes
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // renderTrendingSection
    const renderTrendingSection = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,

                }}
            >
                <Text
                    style={{
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Trending Recipe
                </Text>

                <FlatList
                    data={dummyData.trendingRecipes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item, index}) => (
                        <TrendingCard 
                            recipeItem={item}
                            containerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : 0
                            }}
                            onPress={() => navigation.navigate("Recipe", {recipe: item})}
                        />
                    )}
                />
            </View>
        )
    }

    // renderCategoryHeader
    const renderCategoryHeader = ()  => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    marginHorizontal: SIZES.padding,
                }}
            >
                {/* Section Title */}
                <Text
                    style={{
                        flex:1,
                        ...FONTS.h2,
                    }}
                >
                    Categories
                </Text>
                {/* View All */}
                <TouchableOpacity>
                    <Text
                        style={{
                            color: COLORS.gray,
                            ...FONTS.body4
                        }}
                    >View All</Text>
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",

            }}
        >
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header Section */}
                        {renderHeader()}
                        {/* Search Bar Section */}
                        {renderSearchBar()}
                        {/* See Recipe Section */}
                        {renderSeeRecipeCard()}
                        {/* See Trending Section */}
                        {renderTrendingSection()}
                        {/* See Category Header Section */}
                        {renderCategoryHeader()}
                    </View>
                }
                renderItem={({item}) => (
                    <CategoryCard 
                        containerStyle={{
                            marginHorizontal: SIZES.padding,
                        }}
                        categoryItem={item} 
                        onPress={() => navigation.navigate("Recipe", {recipe: item})}
                    />
                )}

                ListFooterComponent={
                    <View
                        style={{
                            marginBottom: 100,
                        }}
                    />
                }
            />

        </SafeAreaView>
    )
}

export default Home;