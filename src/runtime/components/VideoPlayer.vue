<template>
  <div class="maya-video-player" :class="{ 'is-playing': isPlaying, 'is-fullscreen': isFullscreen }" @mouseenter="showControls = true" @mouseleave="showControls = false">
    <video ref="videoRef" :src="src" :poster="poster" @timeupdate="updateProgress" @ended="isPlaying = false" @loadedmetadata="onLoaded" class="video-element" @click="togglePlay"></video>
    
    <div class="video-overlay" v-show="!isPlaying && showControls">
      <button class="big-play-btn" @click="togglePlay" aria-label="Play">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </button>
    </div>

    <transition name="maya-fade">
      <div class="video-controls" v-show="showControls || !isPlaying">
        <div class="video-track" @click="seek" @mousemove="onMouseMove">
          <div class="video-track-bg"></div>
          <div class="video-track-progress" :style="{ width: progress + '%' }"></div>
          <div class="video-track-thumb" :style="{ left: progress + '%' }"></div>
        </div>
        
        <div class="controls-row">
          <div class="controls-left">
            <button class="control-btn" @click="togglePlay" aria-label="Play/Pause">
              <svg v-if="!isPlaying" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
            <div class="video-time">
              <span class="current">{{ formatTime(currentTime) }}</span>
              <span class="separator">/</span>
              <span class="total">{{ formatTime(duration) }}</span>
            </div>
          </div>
          
          <div class="controls-right">
            <button class="control-btn" @click="toggleFullscreen" aria-label="Fullscreen">
              <svg v-if="!isFullscreen" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ src: { type: String, required: true }, poster: { type: String, default: '' } })
const videoRef = ref(null)
const isPlaying = ref(false)
const showControls = ref(true)
const isFullscreen = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)

const togglePlay = () => {
  if (!videoRef.value) return
  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (!videoRef.value) return
  currentTime.value = videoRef.value.currentTime
  progress.value = (audioRef.value.currentTime / audioRef.value.duration) * 100 || 0
}

const onLoaded = () => {
  if (videoRef.value) duration.value = videoRef.value.duration
}

const seek = (e) => {
  if (!videoRef.value) return
  const track = e.currentTarget
  const clickPosition = e.clientX - track.getBoundingClientRect().left
  const percentage = clickPosition / track.offsetWidth
  videoRef.value.currentTime = percentage * audioRef.value.duration
  progress.value = percentage * 100
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoRef.value?.parentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}
</script>

<style scoped>
.maya-video-player {
  position: relative;
  background: #000;
  border-radius: var(--maya-radius-xl);
  overflow: hidden;
  box-shadow: var(--maya-shadow-md);
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 400ms var(--maya-ease-bouncy);
}

.maya-video-player:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.big-play-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 400ms var(--maya-ease-bouncy), background-color 200ms ease;
}

.big-play-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.big-play-btn:active {
  transform: scale(0.95);
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  padding: 32px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.video-track {
  position: relative;
  height: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.video-track-bg {
  position: absolute;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: var(--maya-radius-full);
}

.video-track-progress {
  position: absolute;
  height: 4px;
  background: var(--maya-accent, #fff);
  border-radius: var(--maya-radius-full);
  pointer-events: none;
}

.video-track-thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 400ms var(--maya-ease-bouncy), opacity 200ms ease;
}

.video-track:hover .video-track-thumb {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.controls-left, .controls-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-btn {
  background: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  padding: 4px;
  display: flex;
  transition: opacity 150ms ease, transform 400ms var(--maya-ease-bouncy);
}

.control-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.control-btn:active {
  transform: scale(0.9);
}

.video-time {
  font-family: var(--maya-font-mono);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  gap: 4px;
}

.video-time .current {
  color: #fff;
  font-weight: 500;
}
</style>
