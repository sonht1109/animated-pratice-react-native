import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Rating({rating, reviews}) {

    const floorRating = Math.floor(rating)

    const mapRating = () => {
        let arr = []
        for(let i=0; i<floorRating; i++){
            arr.push(<Icon name='star' size={15} color="#f5682c" key={"star" + i} />)
        }
        if(rating - floorRating > 0){
            arr.push(<Icon name='star-half' size={15} color="#f5682c" key={'star' + (rating - floorRating)} />)
        }
        return arr
    }

    return (
        <View style={{flexDirection: 'row'}}>
            {mapRating()}
        </View>
    )
}

const styles = StyleSheet.create({})
