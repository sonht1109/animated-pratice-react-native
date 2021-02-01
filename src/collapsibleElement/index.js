import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated'
import data from './data'

export default function CollapsibleElement() {

    const transition = (
        <Transition.Together>
            <Transition.In type='scale' durationMs={200} />
            <Transition.Change />
            <Transition.Out type='scale' durationMs={200} />
        </Transition.Together>
    )

    const [currentIndex, setCurrentIndex] = useState(-1)
    const ref = useRef(null)

    return (
        <Transitioning.View
            style={styles.container}
            transition={transition}
            ref={ref}
        >
            {data.map((item, index) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={"cate" + index}
                        style={[styles.category, { backgroundColor: item.bg }]}
                        onPress={() => {
                            ref.current.animateNextTransition()
                            setCurrentIndex(prev => {
                                return prev === index ? -1 : index
                            })
                        }}
                    >
                        <Text
                            style={{
                                color: item.color, fontSize: 20, fontWeight: "700"
                            }}
                        >
                            {item.category}
                        </Text>
                        {currentIndex === index &&
                            <View>
                                {item.subCategories.map((subCate, j) => {
                                    return <Text
                                        key={"subcate" + j}
                                        style={{ color: item.color, marginVertical: 5, textAlign: 'center' }}
                                    >
                                        {subCate}
                                    </Text>
                                })}
                            </View>}
                    </TouchableOpacity>
                )
            })}
        </Transitioning.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    category: {
        // width: "100%"
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
})
