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
      <button>Create</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

//variables
const title = ref<string>('')
const description = ref<string>('')

const file = ref(null)
const fileError = ref<string | null>(null)

//allowed file types
const types = ['image/png', 'image/jpeg']

//functions
const handleSubmit = () => {
  //we submit the form only if we have a value for file (succesfuly uploaded the img)
  if (file.value) {
    console.log(title.value, description.value, file.value)
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