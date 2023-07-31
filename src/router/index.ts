import { createRouter, createWebHistory } from 'vue-router'


//route GUARD
import { projectAuth } from '@/firebase/config'

const requireAuth = (to: any, from: any, next: any) => {
  const user = projectAuth.currentUser //property on projectAuth = firebase.auth()
  if (!user) {
    next({ name: 'login' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/auth/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/playlists/create',
      name: 'createPlaylist',
      component: () => import('../views/playlists/CreatePlaylistView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/playlists/:id',
      name: 'playlistDetails',
      component: () => import('../views/playlists/PlaylistDetailsView.vue'),
      beforeEnter: requireAuth,
      props: true //we can accept any route parameters as props, inside this component
    },
    {
      path: '/playlists/user',
      name: 'userPlaylists',
      component: () => import('../views/playlists/UserPlaylistsView.vue'),
      beforeEnter: requireAuth
    },
  ]
})

export default router
