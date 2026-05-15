<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #0a0a0a;
      color: #fff;
      padding: 72px 80px;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    "
  >
    <!-- Background texture bars (mirrors Maya UI aesthetic) -->
    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 10px;
        opacity: 0.06;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 1200px;
        height: 200px;
      "
    >
      <div style="height: 8px; background: #fff; width: 1200px" />
      <div style="height: 13px; background: #fff; width: 1200px" />
      <div style="height: 21px; background: #fff; width: 1200px" />
      <div style="height: 34px; background: #fff; width: 1200px" />
      <div style="height: 55px; background: #fff; width: 1200px" />
    </div>

    <!-- Top: wordmark -->
    <div
      style="
        font-family: 'Inter', sans-serif;
        font-size: 22px;
        font-weight: 400;
        letter-spacing: 0.01em;
        line-height: 1;
        color: rgba(255,255,255,0.5);
      "
    >
      maya ui
    </div>

    <!-- Middle: title -->
    <div style="flex: 1; display: flex; align-items: center;">
      <div
        style="
          font-size: 72px;
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          max-width: 900px;
          color: #fff;
        "
      >
        {{ title || 'A premium, highly customizable component library.' }}
      </div>
    </div>

    <!-- Bottom: description + domain -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div
        style="
          font-size: 24px;
          line-height: 1.4;
          color: rgba(255,255,255,0.55);
          max-width: 700px;
        "
      >
        {{ description || 'Dark-first, pure CSS tokens, engineered for Nuxt.' }}
      </div>
      <div
        style="
          font-size: 20px;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
          margin-left: 40px;
        "
      >
        ui.taohq.org
      </div>
    </div>
  </div>
</template>
