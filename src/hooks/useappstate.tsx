import { useState } from "react"

export const enum AppStates {
    APP_STARTING = 'statring', // prepare metadata
    APP_LOADING = 'loading', // loading saved data
    APP_PAUSE = 'on pause', // service screen
    APP_ACTIVE = 'active', // game running
}

const useAppState = () => {
    const [appState,setAppState] = useState(AppStates.APP_LOADING)



    return {
        appState,
        onChange: () => {}
    }
}
export default useAppState