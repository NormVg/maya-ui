<template>
  <footer class="site-footer">
    <div class="section-container">
      <div class="footer-grid">
        <!-- Brand column -->
        <div class="footer-brand">
          <h3 class="footer-logo">Maya UI</h3>
          <p class="footer-tagline">Premium component library for Nuxt, crafted with obsessive attention to motion, aesthetics, and developer experience.</p>
          <p class="footer-org">
            A project by <a href="https://taohq.org" target="_blank" rel="noopener">taohq</a>
          </p>
        </div>

        <!-- Docs -->
        <div class="footer-col">
          <h4 class="footer-heading">Documentation</h4>
          <ul>
            <li><NuxtLink to="/install">Installation</NuxtLink></li>
            <li><NuxtLink to="/theming">Theming</NuxtLink></li>
            <li><NuxtLink to="/foundations/colors">Colors & Surfaces</NuxtLink></li>
            <li><NuxtLink to="/components/button">Components</NuxtLink></li>
          </ul>
        </div>

        <!-- Popular -->
        <div class="footer-col">
          <h4 class="footer-heading">Popular</h4>
          <ul>
            <li><NuxtLink to="/components/toast">Toast</NuxtLink></li>
            <li><NuxtLink to="/components/dialog">Dialog</NuxtLink></li>
            <li><NuxtLink to="/components/command">Command Palette</NuxtLink></li>
            <li><NuxtLink to="/components/data-table">Data Table</NuxtLink></li>
            <li><NuxtLink to="/components/dither-shader">Dither Shader</NuxtLink></li>
          </ul>
        </div>

        <!-- Community -->
        <div class="footer-col">
          <h4 class="footer-heading">Community</h4>
          <ul>
            <li><a href="https://github.com/TheAlphaOnes/maya-ui" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://discord.gg/BafRxadauZ" target="_blank" rel="noopener">Discord</a></li>
            <li><a href="https://x.com/TheNormVg" target="_blank" rel="noopener">Twitter / X</a></li>
            <li><a href="mailto:thealphaones.work@gmail.com">Email</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} <a href="https://taohq.org" target="_blank" rel="noopener">taohq</a>. All rights reserved.</p>
        <div class="footer-legal">
          <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 80px 0 40px;
  background: var(--maya-bg-root);
  border-top: 1px solid var(--maya-border);
}

.section-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 80px;
}

.footer-logo {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--maya-text-primary);
  margin: 0 0 16px;
}

.footer-tagline {
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  line-height: 1.6;
  max-width: 280px;
  margin: 0 0 16px;
}

.footer-org {
  font-size: 0.8125rem;
  color: var(--maya-text-muted);
  margin: 0;
}

.footer-org a {
  color: var(--maya-text-primary);
  text-decoration: none;
  font-weight: 500;
}

.footer-heading {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--maya-text-muted);
  margin: 0 0 20px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-col a {
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: var(--maya-text-primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32px;
  border-top: 1px solid var(--maya-border);
  font-size: 0.8125rem;
  color: var(--maya-text-muted);
}

.footer-bottom a {
  color: var(--maya-text-secondary);
  text-decoration: none;
}

.footer-bottom a:hover {
  color: var(--maya-text-primary);
}

.footer-legal {
  display: flex;
  gap: 24px;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
