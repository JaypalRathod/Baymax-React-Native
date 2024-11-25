import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../utils/Constants'
import Background from '../components/baymax/Background'
import Loading from '../components/baymax/Loading'
import BigHero6 from '../components/baymax/BigHero6'
import { playTTS } from '../utils/ttsListeners'
import SoundPlayer from 'react-native-sound-player'
import { playSound } from '../utils/voiceUtils'
import { prompt } from '../utils/data'
import Instructions from '../components/baymax/Instructions'
import Pedometer from '../components/pedometer/Pedometer'
import { askAI } from '../service/ApiService'

const BaymaxScreen: FC = () => {

    const [showIntruction, setShowIntruction] = useState(false)
    const [showLoader, setShowLoader] = useState(true)
    const [message, setMessage] = useState('')
    const [showPedometer, setShowPedometer] = useState(false)

    const blurOpacity = useRef(new Animated.Value(0)).current

    const startBlur = () => {
        Animated.timing(blurOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    const unBlur = () => {
        Animated.timing(blurOpacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        const timer = setTimeout(startBlur, 500)
        return () => clearTimeout(timer)
    }, [])

    const handleError = (error: string) => {
        playTTS('There was an error! please try again')
        startBlur()
        setMessage('')
        setShowLoader(true)
        SoundPlayer.stop();
        setShowIntruction(false)
        console.log(error)
    }

    const handleResponce = async (type: string, promptText: string, sound: string) => {
        setShowLoader(true)

        try {

            if (type === 'meditation') {
                playTTS('Focus on your breath !')
                playSound(sound)
                setMessage('meditation')
                return
            }

            const data = await askAI(promptText)
            setMessage(data)
            playTTS(data)

            if (type === 'happiness') {
                setTimeout(() => {
                    playSound(sound)
                }, 5000);
            } else {
                playSound(sound)
            }

            unBlur()

        } catch (error: any) {
            handleError(error)
        } finally {
            setShowLoader(false)
        }
    }

    const onOptionPressHandler = (type: string) => {
        setShowIntruction(true)
        if (type === 'pedometer') {
            setShowPedometer(true)
            setShowLoader(false)
            return
        }

        switch (type) {
            case 'happiness':
                handleResponce(type, prompt.joke, 'laugh')
                break
            case 'motivation':
                handleResponce(type, prompt.motivation, 'motivation')
                break
            case 'health':
                handleResponce(type, prompt.health, 'meditation')
                break
            case 'meditation':
                handleResponce(type, prompt.health, 'meditation')
                break
            default:
                handleError('there was no type like that')
        }
    }

    return (
        <View style={styles.container}>

            {message && (
                <Instructions
                    onCross={() => {
                        startBlur()
                        setMessage('')
                        setShowLoader(true)
                        SoundPlayer.stop();
                        setShowIntruction(false)
                    }}
                    message={message}
                />
            )}

            {showPedometer && (
                <Pedometer
                    onCross={() => {
                        startBlur()
                        setMessage('')
                        setShowLoader(true)
                        setShowPedometer(false)
                        SoundPlayer.stop();
                        setShowIntruction(false)
                    }}
                    message={message}
                />
            )}

            {showLoader &&
                <View style={styles.loaderContainer}>
                    <Loading />
                </View>
            }

            {!showIntruction &&
                <BigHero6 onPress={onOptionPressHandler} />
            }

            <Background blurOpacity={blurOpacity} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondry
    },
    loaderContainer: {
        position: 'absolute',
    }
})

export default BaymaxScreen