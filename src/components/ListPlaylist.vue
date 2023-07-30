<template>
  <div v-for="playlist in props.playlists" :key="playlist.id">
    <router-link :to="{ name: 'playlistDetails', params: { id: playlist.id } }">
      <div class="single-playlist">
        <div class="single-playlist__thumbnail">
          <img :src="playlist.coverURL" alt="thumbnail" />
        </div>
        <div class="single-playlist__info">
          <h3>{{ playlist.title }}</h3>
          <p>Created by {{ playlist.userName }}</p>
        </div>
        <div class="single-playlist__songs">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">

import type SinglePlaylist from '../interfaces/SinglePlaylist'

//props
const props = defineProps<{
  playlists: SinglePlaylist[]
}>()
</script>


<style lang="scss">
.single-playlist {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: $color-white;
  margin: 16px 0;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transition: all ease .3s;

  &:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.2);
    transform: scale(1.01);
    transition: all ease 0.2s;
  }

  &__thumbnail {
    max-width: 100px;
    max-height: 100px;
    border-radius: 10px;
    overflow: hidden;

    & img {
      max-width: 150%;
      max-height: 150%;
      display: block;
    }
  }

  &__info {
    margin: 0 30px;
  }

  &__songs {
    margin-left: auto;
  }
}
</style>