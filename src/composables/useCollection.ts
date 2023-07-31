// useCollection - is to do something with the collection, like add a new document to it.

import { ref } from "vue"
import { projectFirestore } from "../firebase/config"


const useCollection = (collectionName: string) => {
    const error = ref<string | null>(null)
    const isPending = ref<boolean>(false)

    const addDoc = async (doc: object) => {
        error.value = null
        isPending.value = true

        try {
            const res = await projectFirestore.collection(collectionName).add(doc)
            isPending.value = false

            return res

        } catch (err: any) {
            error.value = err.message
            isPending.value = false
        }
    }

    return { error, addDoc, isPending }
}

export default useCollection