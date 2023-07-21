import { ref } from "vue"
import { projectAuth } from "../firebase/config"


const error = ref(null)
const isPending = ref<boolean>(false)

const login = async (email: string, password: string) => {
    error.value = null
    isPending.value = true

    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false
        return res

    } catch (err: any) {
        error.value = err.message
        isPending.value = false
    }
}







const useLogin = () => {
    return { error, isPending, login }
}

export default useLogin