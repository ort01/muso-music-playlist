<template>
  <div class="create-playlist">
    <form @submit.prevent="handleSubmit">
      <h4>Create New Playlist</h4>
      <input type="text" required placeholder="Playlist Title" v-model="title" />
      <textarea required placeholder="Playlist Description..." v-model="description"></textarea>
      <div class="create-playlist__upload-img">
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange" />
        <div class="error" v-if="fileError">{{ fileError }}</div>
      </div>
      <div class="error"></div>
      <button v-if="isPending" disabled>Saving...</button>
      <button v-if="!isPending">Create</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

// config of router
const router = useRouter()

//variables
const title = ref<string>('')
const description = ref<string>('')
const isPending = ref<boolean>(false)
//variables for upload input
const file = ref<File | null>(null)
const fileError = ref<string | null>(null)

//composables
const { url, filePath, uploadImg } = useStorage()
const { user } = getUser()
const { error, addDoc } = useCollection('playlists')

//allowed file types
const types = ['image/png', 'image/jpeg']

//functions
const handleSubmit = async () => {
  //we submit the form only if we have a value for file (succesfuly uploaded the img)
  if (file.value) {
    isPending.value = true

    await uploadImg(file.value)

    const res = await addDoc({
      userID: user.value?.uid, //from getUser composable (uid is from firebase)
      userName: user.value?.displayName, //from getUser composable (displayName is from firebase)
      title: title.value, // from input
      description: description.value, // from input
      coverURL: url.value, // from useStorage composable; after we call uploadImg function we get a res object with url for that uploaded img
      filePath: filePath.value, //from useStorage (in case we want to delete the cover picture)
      createdAt: timestamp(), //from "firebase/config"
      songs: []
    })

    isPending.value = false

    if (!error.value) {
      console.log('playlist added')
      router.push({ name: 'playlistDetails', params: { id: res?.id } })
    } else {
      console.log(error.value)
    }
  }
}

const handleChange = (event: any) => {
  //we always upload only one file [0]
  const selected = event.target.files[0]
  //if selected has value and is in type of png or jpeg
  if (selected && types.includes(selected.type)) {
    file.value = selected
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'Please select an image file (png/jpg)'
  }
}
</script>


<style lang="scss">
.create-playlist {
  &__upload-img {
    & input[type='file'] {
      border: none;
      padding: 0;
    }

    & label {
      font-size: 12px;
      display: block;
      margin-top: 30px;
    }
  }

  & button {
    margin-top: 20px;
  }
}
</style>