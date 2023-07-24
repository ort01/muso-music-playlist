import { projectStorage } from "@/firebase/config"
import { ref } from "vue"
import getUser from './getUser'

//getting the user information from getUser compodable
const { user } = getUser()


const useStorage = () => {

    const error = ref<string | null>(null)
    const url = ref<any>(null) //for using the picture on frontend through URL (like its on internet)
    const filePath = ref<string | null>(null)


    const uploadImg = async (file: File) => {
        //path where we want to store the uploaded file (img)
        filePath.value = `covers/${user.value?.uid}/${file.name}`
        //firebase storage reference - we create the path in firebase storage .ref
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


    return { error, url, filePath, uploadImg }
}

export default useStorage