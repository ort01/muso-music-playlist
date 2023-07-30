<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add New Song</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Song</h4>
            <div class="add-song__close" @click="showForm = false">X</div>
            <input required type="text" placeholder="Song Title" v-model="title">
            <input required type="text" placeholder="Artist" v-model="artist">
            <button>+</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type SinglePlaylist from '../interfaces/SinglePlaylist'
import useDocument from "@/composables/useDocument"



//props
const props = defineProps<{
    playlist: SinglePlaylist
}>()

//variables
const title = ref<string>('')
const artist = ref<string>('')
const showForm = ref<boolean>(false)

//composables
const { updateDoc } = useDocument("playlists", props.playlist.id)


//functions
const handleSubmit = async () => {
    const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
    }
    await updateDoc({
        songs: [...props.playlist.songs, newSong]
    })
    title.value = ""
    artist.value = ""
    showForm.value = false

}

</script>


<style lang="scss" scoped>
.add-song {
    text-align: center;
    margin-top: 40px;
    position: relative;
    transition: all 1ss ease;

    & form {
        max-width: 100%;
        transition: all 1ss ease;

        & button {
            font-size: 20px;
            padding: 3px 10px;
            border-radius: 50%;
        }
    }

    &__close {
        position: absolute;
        padding: 10px;
        top: 5%;
        right: 3%;
        color: rgb(230, 162, 162);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(1px);
        }
    }
}
</style>