<template>
  <MayaCard class="login-card">
    <div class="login-header">
      <h2>Welcome Back</h2>
      <p>Sign in to your account to continue</p>
    </div>

    <MayaForm @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 24px;">
      <MayaFormGroup label="Email address" required>
        <MayaInput v-model="email" type="email" placeholder="you@example.com" />
      </MayaFormGroup>

      <MayaFormGroup label="Password" required>
        <MayaInput v-model="password" type="password" placeholder="••••••••" />
      </MayaFormGroup>

      <MayaFormGroup>
        <MayaCheckbox v-model="rememberMe">
          Remember me for 30 days
        </MayaCheckbox>
      </MayaFormGroup>

      <MayaBtn type="submit" style="width: 100%;">
        Sign in
      </MayaBtn>
    </MayaForm>
  </MayaCard>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleSubmit = () => {
  // Handle login
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 32px;
}

.login-header {
  margin-bottom: 32px;
  text-align: center;
}

.login-header h2 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--maya-text-primary);
}

.login-header p {
  margin: 0;
  color: var(--maya-text-secondary);
  font-size: 0.875rem;
}
</style>
