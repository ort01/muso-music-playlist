import { ref } from "vue"
import { projectAuth } from "../firebase/config"
import firebase from 'firebase/app';



const user = ref<firebase.User | null>(projectAuth.currentUser) // property from firebase
// if the app loads and user is logged in -> user = object; 
// logged out -> user = null



//firebase f with callback f that fires everytime there`s a change in authentication status (login,logout)
projectAuth.onAuthStateChanged((_user: firebase.User | null) => {
    //login _user = object; logout _user = null
    console.log(_user);
    user.value = _user
})


// exporting user OBJECT with multiple values (user.displayName, user.email.....)
const getUser = () => {
    return { user }
}

export default getUser
