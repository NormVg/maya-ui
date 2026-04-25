<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Visualisation</h2>
      <p class="component-desc">Advanced UI components for displaying complex media, data structures, and communications.</p>
    </div>

    <MayaPreviewCode title="Bento Grid" description="A flexible, responsive bento box layout for dashboards." lang="vue" :code="bentoCode">
      <template #preview>
        <MayaBentoGrid :columns="3" gap="16px">
          <MayaBentoItem :colSpan="2" :rowSpan="2" hoverable>
            <div class="bento-content primary">
              <div class="text-xl font-bold mb-2">Main Dashboard</div>
              <p class="text-sm text-muted">Primary statistics and overview</p>
            </div>
          </MayaBentoItem>
          <MayaBentoItem hoverable>
            <div class="bento-content secondary">
              <div class="text-lg font-semibold">Stats</div>
              <div class="text-2xl mt-4">84%</div>
            </div>
          </MayaBentoItem>
          <MayaBentoItem hoverable>
            <div class="bento-content tertiary">
              <div class="text-lg font-semibold">Active</div>
              <div class="text-2xl mt-4">1,240</div>
            </div>
          </MayaBentoItem>
        </MayaBentoGrid>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Chat Bubbles" description="Communication interface with bouncy physics." lang="vue" :code="chatCode">
      <template #preview>
        <div class="chat-container">
          <MayaChatBubble role="user" time="10:42 AM">Hey! Could you analyze the performance data from last week?</MayaChatBubble>
          <MayaChatBubble role="ai" time="10:43 AM">I'd be happy to help. Let me fetch that information and generate a summary report for you.</MayaChatBubble>
          <MayaChatBubble role="user" time="10:44 AM">Awesome, thanks.</MayaChatBubble>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="File Upload" description="Interactive drag-and-drop file uploader." lang="vue" :code="uploadCode">
      <template #preview>
        <div style="width: 100%; max-width: 500px; margin: 0 auto;">
          <MayaFileUpload @change="onFileChange" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Audio Player" description="Custom, native-feeling audio player with smooth scrubbing." lang="vue" :code="audioCode">
      <template #preview>
        <div style="width: 100%; max-width: 400px; margin: 0 auto;">
          <MayaAudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Image Viewer" description="Click to open in a modal overlay with zoom and pan support." lang="vue" :code="imageCode">
      <template #preview>
        <div style="width: 100%; max-width: 400px; height: 250px; margin: 0 auto;">
          <MayaImageViewer src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop" />
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const onFileChange = (file) => {
  console.log('File selected:', file)
}

const bentoCode = `<MayaBentoGrid :columns="3" gap="16px">
  <MayaBentoItem :colSpan="2" :rowSpan="2" hoverable>
    <div class="content">Main Dashboard</div>
  </MayaBentoItem>
  <MayaBentoItem hoverable>
    <div class="content">Stats</div>
  </MayaBentoItem>
</MayaBentoGrid>`

const chatCode = `<MayaChatBubble role="user" time="10:42 AM">
  Hey! Could you analyze the performance data?
</MayaChatBubble>

<MayaChatBubble role="ai" time="10:43 AM">
  I'd be happy to help. Let me fetch that information.
</MayaChatBubble>`

const uploadCode = `<MayaFileUpload @change="onFileChange" />`

const audioCode = `<MayaAudioPlayer src="/path/to/audio.mp3" />`

const imageCode = `<MayaImageViewer src="/path/to/image.jpg" />`
</script>

<style scoped>
.bento-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.text-muted { color: var(--maya-text-muted); }
.text-xl { font-size: 1.25rem; }
.text-lg { font-size: 1.125rem; }
.text-2xl { font-size: 1.5rem; font-weight: bold; color: var(--maya-text-primary); }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.mb-2 { margin-bottom: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.chat-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
