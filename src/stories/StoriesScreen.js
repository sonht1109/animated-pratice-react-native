import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'

export default function StoriesScreen() {
    return (
        <View style={styles.storyContainer}>
            <Video
                source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1' }}
                style={{...StyleSheet.absoluteFillObject }}
                controls={true}
                ref={(ref) => {
                    this.player = ref
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    storyContainer: {
        flex: 1,
    }
})
