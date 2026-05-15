<template>
  <div
    style="
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      background-color: #0a0a0a;
      padding: 80px;
      position: relative;
    "
  >
    <!-- Background Decorators -->
    <div
      style="
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        background-color: rgba(255, 255, 255, 0.1);
      "
    />
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 1px;
        background-color: rgba(255, 255, 255, 0.1);
      "
    />
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.1);
      "
    />
    <div
      style="
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.1);
      "
    />

    <!-- Header -->
    <div style="display: flex; align-items: center; gap: 12px">
      <div
        style="
          width: 32px;
          height: 32px;
          background-color: #ededed;
          border-radius: 4px;
        "
      />
      <span
        style="
          font-size: 32px;
          font-weight: 700;
          color: #ededed;
          letter-spacing: -1px;
        "
        >Maya UI</span
      >
    </div>

    <!-- Main Content -->
    <div style="display: flex; flex-direction: column; gap: 24px">
      <h1
        style="
          font-size: 96px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -4px;
          line-height: 1;
        "
      >
        {{ title }}
      </h1>
      <p
        style="
          font-size: 32px;
          color: #888888;
          margin: 0;
          max-width: 800px;
          line-height: 1.4;
        "
      >
        {{ description }}
      </p>
    </div>

    <!-- Footer / Badge -->
    <div style="display: flex; align-items: center; gap: 16px">
      <div
        style="
          padding: 8px 16px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 99px;
          display: flex;
        "
      >
        <span style="font-size: 18px; color: #ededed; font-weight: 600"
          >v1.0.4</span
        >
      </div>
      <span style="font-size: 18px; color: #555555"
        >Premium Nuxt Component Library</span
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
})
</script>
