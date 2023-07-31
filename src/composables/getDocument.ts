import { ref, watchEffect, type Ref } from "vue";
import { projectFirestore } from "../firebase/config";
import type SinglePlaylist from "@/interfaces/SinglePlaylist";


const getDocument = (collectionName: string, id: string | undefined) => {

    const error = ref<string | null>(null)
    const document = ref<SinglePlaylist | null>(null)

    //document reference - we get into the collection and find a document by passing the id of the doc
    const documentRef = projectFirestore.collection(collectionName).doc(id)

    //onSnapshot is how we set up a real time listener to the firestore database, 
    //each time theres a change in that document it sends us back a snapShot (with all of the data from that moment in time) and fires the callback F
    // onSnapshot function returns a function that can stop listening for snapshots - https://firebase.google.com/docs/firestore/query-data/listen
    const unSub = documentRef.onSnapshot((docSnap) => {
        if (docSnap.data()) {
            document.value = <SinglePlaylist>{ ...docSnap.data(), id: docSnap.id }
            error.value = null
        } else {
            error.value = "That document does not exist"
        }
    }, (err) => {
        console.log(err.message);
        error.value = err.message
    })

    // watchEffect watches for changes and when they happen the callback function is called
    // onInvalide - if the component unmountes, the onInvalidate function is called
    //unSub() - stoppes the onSnapshot functions
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unSub()
        })
    })

    return { error, document }

}

export default getDocument