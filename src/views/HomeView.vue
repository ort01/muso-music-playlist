<template>
  <div class="home">
    <div v-if="documents">
      <ListPlaylist :playlists="documents" />
    </div>

    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import ListPlaylist from '@/components/ListPlaylist.vue'
import getCollection from '@/composables/getCollection'

//composables
const { error, documents } = getCollection('playlists')
</script>
