<template>
  <div class="layout">
    <header class="topbar">
      <h1>Dashboard</h1>
    </header>
    <div class="main-container">
      <aside class="sidebar">
        <ul>
          <li>Overview</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main class="content">
        <div class="grid">
          <div class="bento-item">Revenue</div>
          <div class="bento-item">Users</div>
          <div class="bento-item">Conversion</div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout { display: flex; flex-direction: column; height: 100vh; }
.topbar { background: #fff; padding: 16px; border-bottom: 1px solid #eee; }
.main-container { display: flex; flex: 1; }
.sidebar { width: 250px; background: #f9f9f9; padding: 16px; }
.content { flex: 1; padding: 24px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.bento-item { background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 12px; }
</style>
