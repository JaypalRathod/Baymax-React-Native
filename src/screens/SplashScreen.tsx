import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Colors, Fonts, lightColors } from '../utils/Constants'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Image } from 'react-native'
import { screenHeight, screenWidth } from '../utils/Scaling'
import LinearGradient from 'react-native-linear-gradient'
import CustomText from '../components/global/CustomText'
import LottieView from 'lottie-react-native'
import { intializeTtsListeners, playTTS } from '../utils/ttsListeners'
import { resetAndNavigate } from '../utils/NavigationUtils'
import { playSound } from '../utils/voiceUtils'

const bottomColors = [...lightColors].reverse()

const SplashScreen: FC = () => {

    const baymaxAnimation = useSharedValue(screenHeight * 0.8)
    const messageContainerAnimation = useSharedValue(screenHeight * 0.8)

    const launchAnimation = async () => {
        messageContainerAnimation.value = screenWidth * 0.001
        playSound('ting2')
        setTimeout(() => {
            baymaxAnimation.value = -screenHeight * 0.02;
            playTTS('Hello world! I am a Baymax.')
        }, 600);

        setTimeout(() => {
            resetAndNavigate('BaymaxScreen')
        }, 4000);
    }

    useEffect(() => {
        launchAnimation()
        intializeTtsListeners();
    }, [])

    const animateImageStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: withTiming(
                    baymaxAnimation.value,
                    { duration: 1500 }
                )
            }]
        }
    })

    const messageContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: withTiming(
                    messageContainerAnimation.value,
                    { duration: 1200 }
                )
            }]
        }
    })


    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, animateImageStyle]}>
                <Image
                    source={require('../assets/images/launch.png')}
                    style={styles.img}
                />
            </Animated.View>

            <Animated.View style={[styles.gradiantContainer, messageContainerStyle]}>
                <LinearGradient colors={bottomColors} style={styles.gradiant} >
                    <View style={styles.textContainer}>
                        <CustomText fontSize={34} fontFamily={Fonts.Theme}>
                            BAYMAX!
                        </CustomText>
                        <LottieView
                            source={require('../assets/animations/sync.json')}
                            style={{ width: 280, height: 100 }}
                            autoPlay={true}
                            loop
                        />
                        <CustomText>
                            syncronizing best configuration for you...
                        </CustomText>
                    </View>
                </LinearGradient>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    imageContainer: {
        width: screenWidth - 20,
        height: screenHeight * 0.5
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    gradiantContainer: {
        position: 'absolute',
        height: '35%',
        bottom: 0,
        width: '100%'
    },
    gradiant: {
        width: '100%',
        height: '100%',
        paddingTop: 30
    },
    textContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 20,
        padding: 20,
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        alignItems: 'center',
        shadowColor: Colors.border
    }

})

export default SplashScreen