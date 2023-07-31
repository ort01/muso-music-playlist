<template>
  <div class="navbar">
    <nav>
      <div class="navbar__logo">
        <img src="@/assets/ninja.png" alt="ninja" />
        <h1>
          <router-link :to="{ name: 'home' }"> Muso Music</router-link>
        </h1>
      </div>
      <div class="navbar__links">
        <div v-if="user">
          <router-link class="btn btn-playlist" :to="{ name: 'createPlaylist' }">Create Playlist</router-link>
          <router-link class="btn btn-playlist" :to="{ name: 'userPlaylists' }">My Playlists</router-link>
          <span>Hi there, {{ user.displayName }}</span>
          <button @click="handleLogout" :class="{ disabled: isPending }">Log Out</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'signup' }">Sign Up</router-link>
          <router-link class="btn" :to="{ name: 'login' }">Log In</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'

// config of router
const router = useRouter()

//composables
const { error, logout, isPending } = useLogout()
const { user } = getUser()

//functions
const handleLogout = async () => {
  await logout()
  if (!error.value) {
    router.push({ name: 'login' })
  }
}
</script>


<style lang="scss">
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: $color-white;
  border-radius: 0px 0px 5px 5px;
  border-bottom: 1px solid $color-secondary;

  & nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__logo {
    display: flex;
    align-items: center;

    & img {
      max-height: 60px;
      margin-left: 10px;
    }

    & h1 {
      margin-left: 10px;
    }
  }

  &__links {
    margin-right: 5px;
    display: flex;
    gap: 15px;

    & a,
    button {
      margin-left: 15px;
    }

    & .btn-playlist {
      font-size: 13px;
      background: none;

      &:hover {
        background: none;
        color: black;
      }
    }

  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
}
</style>