import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import mapStyles from './mapStyles'
import foodPlaces from './foodPlaces'
import Icon from 'react-native-vector-icons/Ionicons'
import chips from './chips'
import { Caption, Chip, Title } from 'react-native-paper'
import Rating from './Rating';
import gasStations from './gasStations'
import hospitals from './hospitals'

const { width } = Dimensions.get('window')

const CARD_MARGIN = 10
const CARD_WIDTH = width - 2*CARD_MARGIN
const LATITUEDELTA = 0.05
const LONGITUEDELTA = 0.05

const hanoiLocation = {
  latitude: 21.012763,
  longitude: 105.814160,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
}

const placeObject = {
  food: foodPlaces,
  gas: gasStations,
  hospital: hospitals
}

export default function Locations() {

  const [theme, setTheme] = useState('dark')
  // dark or standard

  const [places, setPlaces] = useState([])

  const [keyword, setKeyword] = useState('')
  const _currentIndex = useRef(0)
  const _placeKey = useRef('')

  const _map = useRef(null)
  const _scrollView = useRef(null)

  const animated = new Animated.Value(0)

  useEffect(() => {
    animated.addListener(({value}) => {
      let index = Math.round(value/CARD_WIDTH)

      clearTimeout(regionTimeout)

      const regionTimeout = setTimeout(() => {
        if(index !== _currentIndex.current && places.length){
          _currentIndex.current = index
          const  {coordinate} = places[_currentIndex.current]
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: LATITUEDELTA,
              longitudeDelta: LONGITUEDELTA
            },
            300
          )
        }
      }, 10)

    })
  })

  const markerInterpolations = places.map((_, index) => {
    const inputRange = [(index-1)* width, index*width, (index+1)*width ]
    const scale = animated.interpolate({
      inputRange, 
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: "clamp"
    })
    return {scale}
  })

  const handleChangeLocation = (index)=> {
    let x = index * CARD_WIDTH + index * 2 * CARD_MARGIN
    _scrollView.current.scrollTo({x: x, y:0, animated: true})
  }

  const handleChoosePlaces = (value)=> {
    if(_placeKey.current === value){
      setPlaces([])
      _placeKey.current = ''
    }
    else{
      setPlaces(placeObject[value])
      _placeKey.current = value
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <MapView
        ref={_map}
        customMapStyle={mapStyles[theme]}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        followsUserLocation={true}
        region={hanoiLocation}
        >
        {places.map((marker, index) => {
          const scaleStyle = markerInterpolations[index].scale
          return (
            <Marker
              key={'marker' + index}
              title={marker.title}
              description={marker.subtitle}
              coordinate={marker.coordinate}
              onPress={() => {handleChangeLocation(index)}}
            >
              <Animated.View style={[styles.markerWrapper, { transform: [{scale: scaleStyle}]}]}>
                <Animated.Image
                style={{ width: 40, height: 40, }}
                source={require('./marker3.png')}
                resizeMode="cover" />
              </Animated.View>
            </Marker>
          )
        })}
      </MapView>
      {/* search bar */}
      <View style={styles.textInput}>
        <View style={{
          flex: 1, width: "100%", flexDirection: 'row', backgroundColor: "white", alignItems: "center", marginBottom: 10,
          borderRadius: 5, paddingHorizontal: 10,
        }}>
          <TextInput
          onFocus={() => {
            setPlaces([])
            _placeKey.current = ''
          }}
            value={keyword}
            onChangeText={val => setKeyword(val)}
            placeholder="Search here"
            style={{
              width: "90%", marginHorizontal: "auto", alignSelf: "center", backgroundColor: "white",
              flex: 1, width: "100%"
            }}
          />
          <Icon name="search-outline" size={20} color="black" />
        </View>
        {/* chip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {chips.map((chip, index) => {
            return (
              <Chip
                selected={chip.key === _placeKey.current}
                icon={chip.icon}
                key={'chip' + index}
                style={{ marginHorizontal: 10 }}
                onPress={()=>handleChoosePlaces(chip.key)}
              >
                {chip.name}
              </Chip>
            )
          })}
        </ScrollView>
      </View>

      {/* slider */}
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.slider}
        onScroll={Animated.event(
          [
            {nativeEvent: {contentOffset: {x: animated}}}
          ],
          {useNativeDriver: true}
        )}
      >
        {places.map((item, index) => {
          return (
            <View key={'place' + index} style={styles.sliderItem}>
              <Image
                source={{ uri: item.img }}
                style={{ width: "100%", height: 120 }}
              />
              <View style={{padding: 10}}>
                <Title>
                  {item.title}
                </Title>
                <Caption>
                  {item.subtitle}
                </Caption>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Rating reviews={item.reviews} rating={item.rating} />
                  <Text> ({item.reviews})</Text>
                </View>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text style={{color: "#ffdba9", fontWeight: "700"}}>Go Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0
  },
  textInput: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  markerWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 11,
  },
  sliderItem: {
    width: CARD_WIDTH,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fc1c4c",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5
  }
})
