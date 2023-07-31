import { ref } from "vue";
import { projectFirestore } from "../firebase/config";


//for editing and deleting documents
const useDocument = (collection: string, docID: string | undefined) => {

    const error = ref<string | null>(null)
    const isPending = ref<boolean>(false)

    // let docRef = projectFirestore.collection(collection).doc(docID)
    const docRef = projectFirestore.collection(collection).doc(docID)

    const deleteDoc = async () => {
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        } catch (err: any) {
            console.log(err.message)
            isPending.value = false
            error.value = err.message
        }
    }

    const updateDoc = async (updates: object) => { //passing in the object with certain properties that we want to update
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.update(updates)
            isPending.value = false
            return res
        } catch (err: any) {
            console.log(err.message)
            isPending.value = false
            error.value = err.message
        }
    }
    return { error, isPending, deleteDoc, updateDoc }

}

export default useDocument
