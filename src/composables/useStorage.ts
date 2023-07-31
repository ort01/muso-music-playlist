import { projectStorage } from "@/firebase/config"
import { ref } from "vue"
import getUser from './getUser'


//getting the user information from getUser composable
const { user } = getUser()


const useStorage = () => {

    const error = ref<string | null>(null)
    const url = ref<string | null>(null) //for using the picture on frontend through URL (like its on the internet)
    const filePath = ref<string | null>(null)


    const uploadImg = async (file: File) => {
        //path where we want to store the uploaded file (img)
        filePath.value = `covers/${user.value?.uid}/${file.name}`
        //firebase storage reference - we create the path in firebase storage ".ref"
        const storageRef = projectStorage.ref(filePath.value)

        //uploading the file to the storage reference in firebase using put()
        try {
            const res = await storageRef.put(file) //its gotta pass us back the res object
            url.value = await res.ref.getDownloadURL() //response.reference.method; for using the picture on frontend through URL (like its on internet)

        } catch (err: any) {
            console.log(err);
            error.value = err.message
        }

    }

    const deleteImg = async (path: string) => {
        const storageRef = projectStorage.ref(path) //we need the path of the file that we want to delete, thats what we are passing in

        try {
            await storageRef.delete() //calling the delete function on the storage reference
        } catch (err: any) {
            error.value = err.message
        }
    }


    return { error, url, filePath, uploadImg, deleteImg }
}

export default useStorage