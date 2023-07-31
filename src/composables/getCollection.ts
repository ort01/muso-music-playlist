// getCollection - is to set up a real time listener to get the documents from the certain collection

import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
import type SinglePlaylist from "@/interfaces/SinglePlaylist";


const getCollection = (collectionName: string, query?: [string, any, any?]) => {

    const error = ref<string | null>(null)
    const documents = ref<SinglePlaylist[] | []>([])

    //colection reference
    let collectionRef = projectFirestore.collection(collectionName).orderBy("createdAt")

    if (query) {
        collectionRef = collectionRef.where(...query) //where() - takes in 3 arguments "x", "==", "y"
        //with spread syntax we get "userID", "==", "user.value.uid"
        //https://firebase.google.com/docs/firestore/query-data/queries#web-namespaced-api_1
    }

    //onSnapshot is how we set up a real time listener to the firestore database, 
    //each time theres a change in that database collection it sends us back a snapShot (with all of the data from that moment in time) and fires the callback F
    // onSnapshot function returns a function that can stop listening for snapshots - https://firebase.google.com/docs/firestore/query-data/listen
    const unSub = collectionRef.onSnapshot((snapshot) => {
        const results: any = []

        //cycling through the documents from snapshot and adding each document to results array (.docs we get from the snapshot)
        snapshot.docs.forEach((doc) => {
            // must wait for the server to create the timestamp & send it back
            // we don't want to edit data until it has done this
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })

        })
        documents.value = results
        error.value = null
    }, (err) => {
        documents.value = []
        error.value = err.message
    })

    // watchEffect watches for changes and when they happen the callback function is called
    // onInvalide - if the component unmountes onInvalidate function is called
    //unSub() - stoppes the onSnapshot functions
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unSub()
        })
    })

    return { error, documents }

}

export default getCollection