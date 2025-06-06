import { useEffect, useState } from "react"

const useSafeAreaInsets = () => {
    const [insets, setInsets] = useState({
        top: 0,
        bottom: 0,
    })

    useEffect(() => {
        const computedStyle = getComputedStyle(document.documentElement)
        const safeAreaTop = computedStyle.getPropertyValue(
            "--ion-safe-area-top"
        )
        const safeAreaBottom = computedStyle.getPropertyValue(
            "--ion-safe-area-bottom"
        )
        setInsets({
            top: parseInt(safeAreaTop),
            bottom: parseInt(safeAreaBottom),
        })
    }, [])

    return { insets }
}

export default useSafeAreaInsets
