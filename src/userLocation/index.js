import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';


export default function UserLocation() {

    const [region, setRegion] = useState({
        latitude: 10.17,
        longitude: 105.02,
        latitudeDelta: 20,
        longitudeDelta: 20,  
    })

    const [showsUserLocation, setShowsUserLocation] = useState(false)

    const onFindLocation = ()=> {
        Geolocation.getCurrentPosition((infor) => setRegion({
            ...region,
            latitude: infor.coords.latitude,
            longitude: infor.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        }))
        setShowsUserLocation(true)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={{backgroundColor: "black", padding: 20, color: 'white', textAlign: "center"}}
                onPress={onFindLocation}>
                    Find my location
                </Text>
            </TouchableOpacity>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={showsUserLocation}
                userLocationAnnotationTitle="You are here"
                followsUserLocation={true}
                onRegionChangeComplete={region => {
                    setRegion({
                        ...region,
                        latitude: region.latitude,
                        longitude: region.longitude,
                    })
                }}
                region={region}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%'
    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
    }
})
