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
            <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
        </div>
        <div class="playlist__songs">
            <p>song list here</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import getDocument from "@/composables/getDocument"
import getUser from "@/composables/getUser"
import useDocument from "@/composables/useDocument"
import { computed } from "vue";

//props
const props = defineProps({
    id: String
})

//composables
const { error, document: playlist } = getDocument("playlists", props.id) //grab the document form getDocument but call it a playlist
const { user } = getUser()
const { deleteDoc } = useDocument("playlists", props.id)

//functions
const handleDelete = async () => {
    await deleteDoc()
}

//computed property
const ownership = computed(() => {
    return playlist.value && user.value && user.value.uid === playlist.value.userID
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
            // max-width: 100px;
            // max-height: 100px;
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
}
</style>