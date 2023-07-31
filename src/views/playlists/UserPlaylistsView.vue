<template>
    <div class="user-playlists">
        <div v-if="playlists">
            <ListPlaylist :playlists="playlists" />
        </div>
        <router-link :to="{ name: 'createPlaylist' }" class="btn btn-add">+</router-link>
    </div>
</template>

<script setup lang="ts">
import ListPlaylist from '@/components/ListPlaylist.vue';
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';


//composables
const { user } = getUser()
const { error, documents: playlists } = getCollection('playlists', ['userID', "==", user.value?.uid]) //passing in 3 arguments as one (query)

// console.log(playlists);


</script>


<style lang="scss">
.user-playlists {

    & .btn-add {
        border-radius: 50%;
        padding: 3px 10px;
        font-size: 20px;
        display: block;
        width: fit-content;
        margin: 0 auto;
    }
}
</style>