import ReactUpdates from "react-dom/lib/ReactUpdates"
import ReactDefaultBatchingStrategy from "react-dom/lib/ReactDefaultBatchingStrategy"
import utils from 'edf-utils'

let isHandlingError = false

const ReactTryCatchBatchingStrategy = {
    get isBatchingUpdates() {
        return ReactDefaultBatchingStrategy.isBatchingUpdates
    },

    batchedUpdates(...args) {
        try {
            ReactDefaultBatchingStrategy.batchedUpdates(...args)
        } catch (e) {
            utils.exception.error(e)
        }
    },
}

ReactUpdates.injection.injectBatchingStrategy(ReactTryCatchBatchingStrategy)