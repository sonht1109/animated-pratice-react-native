import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import notificationList from './notificationList'
import Item from './Item';

export default function SwipeToDeleteList() {

    const [list, setList] = useState(notificationList)
    const renderItem = ({item}) => {
        return(
            <Item item={item} />
        )
    }

    return (
        <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({})
