<template>
  <div class="create-playlist">
    <form @submit.prevent="handleSubmit">
      <h4>Create New Playlist</h4>
      <input type="text" required placeholder="Playlist Title" v-model="title" />
      <textarea required placeholder="Playlist Description..." v-model="description"></textarea>
      <div class="create-playlist__upload-img">
        <label>Upload playlist cover image</label>
        <input type="file" />
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

//functions
const handleSubmit = () => {
  console.log(title.value)
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