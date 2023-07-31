<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" autocomplete="on" v-model="email" />
    <input type="password" placeholder="Password" autocomplete="on" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="isPending" disabled>Loading</button>
    <button v-if="!isPending">Log in</button>
  </form>
</template>

<script setup lang="ts">
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// config of router
const router = useRouter()

//variables
const email = ref<string>('')
const password = ref<string>('')

//composables
const { error, login, isPending } = useLogin()

//functions
const handleSubmit = async () => {
  const res = await login(email.value, password.value)
  if (!error.value) {
    console.log('user logged in')
    router.push({ name: 'home' })
  }

}
</script>


<style lang="scss"></style>