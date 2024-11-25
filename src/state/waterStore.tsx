import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./Storage";
import { displayNotification } from "../notification/Notificationinitial";


interface WaterStore {
    waterDrinkStamps: string[];
    addWaterIntake: (timestamp: string) => void;
    resetWaterIntake: () => void;
}

export const useWaterStore = create<WaterStore>()(
    persist(
        (set, get) => ({
            waterDrinkStamps: [],
            addWaterIntake: (timestamp) => {
                const waterDrinkStamps = [...get().waterDrinkStamps, timestamp]
                set({ waterDrinkStamps })
                displayNotification(
                    `Water Intack ${waterDrinkStamps.length}/8`,
                    'Stay Hydrated',
                    require('../assets/images/water.png'),
                    'water-intack'
                )
            },
            resetWaterIntake: () => {
                set({ waterDrinkStamps: [] })
            },
        }),
        {
            name: "water-storage",
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
)