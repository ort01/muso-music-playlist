<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <input type="text" placeholder="Display Name" autocomplete="on" v-model="displayName" />
    <input type="email" placeholder="Email" autocomplete="on" v-model="email" />
    <input type="password" placeholder="Password" autocomplete="on" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign Up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script setup lang="ts">
import useSignUp from '@/composables/useSignUp'
import { ref } from 'vue'

//variables
const email = ref<string>('')
const password = ref<string>('')
const displayName = ref<string>('')

//composables
const { error, signUp, isPending } = useSignUp()

//functions
const handleSubmit = async () => {
  const res = await signUp(email.value, password.value, displayName.value)
  if (!error.value) {
    console.log('user signed up')
  }
}
</script>


<style lang="scss">
</style>