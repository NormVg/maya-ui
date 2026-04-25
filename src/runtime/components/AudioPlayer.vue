<template>
  <div class="maya-audio-player">
    <audio ref="audioRef" :src="src" @timeupdate="updateProgress" @ended="isPlaying = false" @loadedmetadata="onLoaded" class="hidden-audio"></audio>
    <div class="audio-controls">
      <button class="play-btn" @click="togglePlay" aria-label="Play/Pause">
        <svg v-if="!isPlaying" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      </button>
      
      <div class="audio-track" @click="seek">
        <div class="audio-track-bg"></div>
        <div class="audio-track-progress" :style="{ width: progress + '%' }"></div>
        <div class="audio-track-thumb" :style="{ left: progress + '%' }"></div>
      </div>
      
      <div class="audio-time">
        <span class="current">{{ formatTime(currentTime) }}</span>
        <span class="separator">/</span>
        <span class="total">{{ formatTime(duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({ src: { type: String, required: true } })
const audioRef = ref(null)
const isPlaying = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)

const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (!audioRef.value) return
  currentTime.value = audioRef.value.currentTime
  progress.value = (audioRef.value.currentTime / audioRef.value.duration) * 100 || 0
}

const onLoaded = () => {
  if (audioRef.value) duration.value = audioRef.value.duration
}

const seek = (e) => {
  if (!audioRef.value) return
  const track = e.currentTarget
  const clickPosition = e.clientX - track.getBoundingClientRect().left
  const percentage = clickPosition / track.offsetWidth
  audioRef.value.currentTime = percentage * audioRef.value.duration
  progress.value = percentage * 100
}

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}
</script>

<style scoped>
.maya-audio-player {
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  padding: 12px 16px;
  box-shadow: var(--maya-shadow-sm);
  display: flex;
  align-items: center;
  transition: all 400ms var(--maya-ease-bouncy);
}

.maya-audio-player:hover {
  box-shadow: var(--maya-shadow-md);
  border-color: var(--maya-border-hover);
}

.hidden-audio {
  display: none;
}

.audio-controls {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
}

.play-btn {
  background: var(--maya-btn-primary-bg);
  color: var(--maya-btn-primary-text);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: var(--maya-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--maya-btn-primary-shadow);
  transition: transform 400ms var(--maya-ease-bouncy), background-color var(--maya-duration) var(--maya-ease);
}

.play-btn:hover {
  background: var(--maya-btn-primary-bg-hover);
  transform: scale(1.05);
}

.play-btn:active {
  transform: scale(0.95);
}

.audio-track {
  position: relative;
  flex: 1;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.audio-track-bg {
  position: absolute;
  width: 100%;
  height: 4px;
  background: var(--maya-border);
  border-radius: var(--maya-radius-full);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.audio-track-progress {
  position: absolute;
  height: 4px;
  background: var(--maya-accent, var(--maya-text-primary));
  border-radius: var(--maya-radius-full);
  pointer-events: none;
  transition: width 100ms linear;
}

.audio-track-thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--maya-bg-root);
  border: 2px solid var(--maya-accent, var(--maya-text-primary));
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 400ms var(--maya-ease-bouncy), opacity 200ms ease;
  box-shadow: var(--maya-shadow-sm);
}

.audio-track:hover .audio-track-thumb {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.audio-time {
  font-family: var(--maya-font-mono);
  font-size: 0.75rem;
  color: var(--maya-text-muted);
  display: flex;
  gap: 4px;
  min-width: 70px;
  justify-content: flex-end;
}

.current {
  color: var(--maya-text-primary);
  font-weight: 500;
}
</style>
