import { ref } from "vue"
import { projectAuth } from "../firebase/config"


const error = ref(null)
const isPending = ref<boolean>(false)

const logout = async () => {

    error.value = null
    isPending.value = true

    try {
        await projectAuth.signOut()
        error.value = null
        isPending.value = false
    } catch (err: any) {
        error.value = err.message
        isPending.value = false
    }
}




const useLogout = () => {
    return { error, logout, isPending }
}

export default useLogout
