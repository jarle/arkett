import { createContext, useState } from "react"

export const FeedbackContext = createContext<FeedbackContextInterface>(null)

interface FeedbackContextInterface {
    showFeedbackDialog: boolean
    setShowFeedbackDialog(b: boolean): void
    disableFeedback: boolean
    setDisableFeedback(b: boolean): void
}

export default function FeedbackProvider({ children }) {
    const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
    const [disableFeedback, setDisableFeedback] = useState(false)

    const exported: FeedbackContextInterface = {
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