import { ref } from "vue"
import { projectAuth } from "../firebase/config"


const error = ref(null)
const isPending = ref<boolean>(false)


const signUp = async (email: string, password: string, displayName: string) => {

    error.value = null
    isPending.value = true

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Could not complete the signup')
        } else {
            await res.user?.updateProfile({ displayName: displayName })
            // await the res object; 
            // we get back the user; 
            // method updateProfile where we pass in an object in which, we can update any existing property on the res.user that we want


            error.value = null
            isPending.value = false
            return res
        }
    } catch (err: any) {
        error.value = err.message
        isPending.value = false
    }
}

const useSignUp = () => {
    return { error, signUp, isPending }
}



export default useSignUp 