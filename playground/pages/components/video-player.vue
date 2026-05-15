<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Video Player</h1>
      <p class="page-desc">A fully custom-styled video player with beautiful controls and progress tracking.</p>
    </div>

    <MayaPreviewCode title="Usage" description="Just provide a video source to get a beautiful player out of the box." lang="vue" :code="code">
      <template #preview>
        <div style="width: 100%; max-width: 640px;">
          <!-- Using a sample video URL for demonstration -->
          <MayaVideoPlayer src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg" />
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable 
      title="VideoPlayer API" 
      description="Properties for the VideoPlayer component."
      :propsList="[
        { name: 'src', type: 'string', default: 'undefined', description: 'The video source URL.' },
        { name: 'poster', type: 'string', default: 'undefined', description: 'The thumbnail image to display before playing.' }
      ]"
    />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const code = `<MayaVideoPlayer 
  src="https://example.com/video.mp4" 
  poster="/images/poster.jpg" 
/>`
</script>
