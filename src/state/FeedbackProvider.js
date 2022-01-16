import { createContext, useState } from "react"

export const FeedbackContext = createContext()

export default function FeedbackProvider({ children }) {
    const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
    const [disableFeedback, setDisableFeedback] = useState(false)

    const exported = {
        showFeedbackDialog,
        setShowFeedbackDialog,
        disableFeedback,
        setDisableFeedback
    }

    return (
        <FeedbackContext.Provider value={exported} >
            {children}
        </FeedbackContext.Provider>
    )

}