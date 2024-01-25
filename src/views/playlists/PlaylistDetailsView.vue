<template>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="playlist" class="playlist">
        <div class="playlist__info">
            <div class="playlist__info--cover">
                <img :src="playlist.coverURL" alt="cover">
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="playlist__info--username">Created by {{ playlist.userName }}</p>
            <p class="playlist__info--description">{{ playlist.description }}</p>
            <button v-if="ownership" @click="handlePlaylistDelete">Delete Playlist</button>
        </div>
        <div class="playlist__songs">
            <div v-if="!playlist.songs.length">No songs have been added to this playlist yet</div>
            <div v-for="song in playlist.songs" :key="song.id" class="playlist__songs--single">
                <div class="song-details">
                    <h3>{{ song.title }}</h3>
                    <p>{{ song.artist }}</p>
                </div>
                <div class="song-details__delete" v-if="ownership" @click="handleSongDelete(song.id)">X</div>
            </div>
            <AddSong v-if="ownership" :playlist="playlist" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AddSong from "@/components/AddSong.vue"
import getDocument from "@/composables/getDocument"
import getUser from "@/composables/getUser"
import useDocument from "@/composables/useDocument"
import useStorage from "@/composables/useStorage";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

//props
const props = defineProps<{ //from router path '/playlists/:id' prop - :id
    id: string
}>()

//router
const router = useRouter()

//composables
const { error, document: playlist } = getDocument("playlists", props.id) //grab the document form getDocument but call it a playlist
const { user } = getUser()
const { deleteDoc, updateDoc } = useDocument("playlists", props.id)
const { deleteImg } = useStorage()

//functions
const handlePlaylistDelete = async () => {
    if (playlist.value) {
        await deleteImg(playlist.value.filePath) //we get the path from the getDocument {document: playlist} - its an object with properties
        await deleteDoc()
        router.push({ name: "home" })
    }
}

const handleSongDelete = async (songID: number) => {
    const filteredSongs = playlist.value?.songs.filter((song) => {
        return song.id != songID
    })
    await updateDoc({
        songs: filteredSongs
    })
}

//computed property
const ownership = computed(() => {
    return playlist.value && user.value && user.value.uid === playlist.value.userID //returns TRUE
})

</script>


<style lang="scss">
.playlist {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;

    &__info {
        text-align: center;

        &--cover {
            border-radius: 20px;
            position: relative;
            padding: 160px;
            overflow: hidden;

            & img {
                position: absolute;
                top: 0;
                left: 0;
                min-width: 100%;
                min-height: 100%;
                max-width: 100%;
                max-height: 100%;
                display: block;
                object-fit: cover;
            }
        }

        & h2 {
            text-transform: uppercase;
            font-size: 28px;
            margin-top: 20px;
        }

        &--username {
            margin-bottom: 20px;
            color: #999;
        }

        &--description {
            margin-bottom: 20px;
            text-align: left;
        }
    }

    &__songs {

        &--single {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed $color-secondary;
            margin-bottom: 20px;
        }

        & .song-details__delete {
            color: rgb(230, 162, 162);
            cursor: pointer;
            transition: all 0.3s;
            margin-right: 15px;

            &:hover {
                transform: translateY(-2px);
            }

            &:active {
                transform: translateY(1px);
            }
        }
    }
}
</style>