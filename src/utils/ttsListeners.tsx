import Tts from "react-native-tts"

export const intializeTtsListeners = async () => {

    Tts.getInitStatus().then(() => {
        console.log("All ok TTS");
    },
        (err) => {
            if (err.code === "no_engine") {
                console.log("No Engine TTS");
                Tts.requestInstallEngine()
            }
        }
    )

    // const voices = await Tts.voices()
    // console.log(voices)
    // Tts.setDefaultLanguage("com.apple.speech.synthesis.voices.Albert")

    Tts.setDefaultRate(0.3, true)
    Tts.setIgnoreSilentSwitch('ignore')
    Tts.setDefaultPitch(0.7)

    Tts.addEventListener('tts-start', (event) => {
        console.log('TTS started : ' + event)
    })

    Tts.addEventListener('tts-progress', (event) => {
        // console.log('TTS progress : ' + event)
    })

    Tts.addEventListener('tts-finish', (event) => {
        console.log('TTS finish : ' + event)
    })

    Tts.addEventListener('tts-cancel', (event) => {
        console.log('TTS cancel : ' + event)
    })

}

export const playTTS = async (message: string) => {
    Tts.getInitStatus().then(() => {
        console.log("All ok TTS");
    },
        (err) => {
            if (err.code === "no_engine") {
                console.log("No Engine TTS");
                Tts.requestInstallEngine()
            }
        }
    )

    Tts.speak(message)
}