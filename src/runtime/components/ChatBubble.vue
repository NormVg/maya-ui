<template>
  <div class="maya-chat-bubble" :class="[ `is-${role}` ]">
    <div v-if="role === 'ai'" class="chat-avatar">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 8V4H8"></path>
        <rect x="4" y="8" width="16" height="12" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
      </svg>
    </div>
    
    <div class="chat-content">
      <div class="chat-text">
        <slot />
      </div>
      <div v-if="time" class="chat-time">{{ time }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  role: { type: String, default: 'user', validator: (v) => ['user', 'ai'].includes(v) },
  time: { type: String, default: '' }
})
</script>

<style scoped>
.maya-chat-bubble {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;
  animation: slideUp 400ms var(--maya-ease-bouncy);
}

.maya-chat-bubble.is-user {
  justify-content: flex-end;
}

.maya-chat-bubble.is-ai {
  justify-content: flex-start;
}

.chat-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--maya-radius-full);
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--maya-text-primary);
  flex-shrink: 0;
  box-shadow: var(--maya-shadow-sm);
}

.chat-content {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  gap: 4px;
}

.is-user .chat-content {
  align-items: flex-end;
}

.chat-text {
  padding: 12px 16px;
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  line-height: 1.5;
  box-shadow: var(--maya-shadow-sm);
  transition: all 400ms var(--maya-ease-bouncy);
}

.chat-text:hover {
  transform: translateY(-2px);
  box-shadow: var(--maya-shadow-md);
}

.is-user .chat-text {
  background: var(--maya-btn-primary-bg) var(--maya-btn-primary-gradient);
  color: var(--maya-btn-primary-text);
  border-radius: 16px 16px 4px 16px;
  box-shadow: var(--maya-btn-primary-shadow);
}

.is-ai .chat-text {
  background: var(--maya-bg-surface);
  color: var(--maya-text-primary);
  border: 1px solid var(--maya-border);
  border-radius: 16px 16px 16px 4px;
}

.chat-time {
  font-family: var(--maya-font-mono);
  font-size: 0.6875rem;
  color: var(--maya-text-muted);
  margin-top: 2px;
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(10px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
