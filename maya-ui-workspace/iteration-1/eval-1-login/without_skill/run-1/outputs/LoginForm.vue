<template>
  <div class="card">
    <div class="card-header">Login</div>
    <div class="card-body">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="remember" /> Remember me
        </label>
      </div>
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const remember = ref(false)

const submit = () => {}
</script>

<style scoped>
.card { border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; }
input { width: 100%; padding: 8px; }
button { width: 100%; padding: 10px; background: blue; color: white; border: none; }
</style>
