import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { circleRadius } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useWaterStore } from '../../state/waterStore'
import { playTTS } from '../../utils/ttsListeners'
import { playSound } from '../../utils/voiceUtils'

const Water = () => {

    const { waterDrinkStamps, addWaterIntake } = useWaterStore()

    const totalSegments = 8;
    const completedSegment = waterDrinkStamps?.length;

    const containerStyle = [
        styles.container,
        completedSegment === totalSegments && styles.containerCompleted
    ]

    const handlePress = async () => {
        if (completedSegment < totalSegments) {
            const timeStamp = new Date().toISOString()
            addWaterIntake(timeStamp)
            playSound('ting2')
            setTimeout(() => {
                playTTS('Good Work! Stay Hydrated!')
            }, 1000);
        } else {
            playTTS("you have completed your daily water intack !")
        }
    }

    return (
        <TouchableOpacity style={containerStyle} onPress={handlePress}>
            <Icon name='water' color='#1ca3ec' size={RFValue(32)} />
            <View style={styles.segmentContainer}>
                {Array.from({ length: totalSegments }).map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.segment,
                            {
                                backgroundColor: completedSegment === totalSegments ? "#00D100" : index < completedSegment ? "#1ca3ec" : "#eee",
                                transform: [
                                    { rotate: `${(index * 360) / totalSegments}deg` },
                                    { translateX: circleRadius / 2 - 5 }
                                ]
                            }
                        ]}
                    />
                ))}
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        height: circleRadius,
        width: circleRadius,
        borderRadius: circleRadius,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        shadowOffset: { height: 1, width: 1 },
        elevation: 10,
        shadowRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2
    },
    containerCompleted: {
        shadowColor: 'yellow',
        elevation: 10,
    },
    segmentContainer: {
        position: 'absolute',
        height: circleRadius,
        width: circleRadius,
        borderRadius: circleRadius / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    segment: {
        position: 'absolute',
        width: 8,
        height: 4,
        borderRadius: 2
    }
})

export default Water