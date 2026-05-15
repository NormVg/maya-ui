<template>
  <div class="legal-page">
    <h1>Privacy Policy</h1>
    <p class="updated">Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>

    <section>
      <h2>1. Information We Collect</h2>
      <p>Maya UI is an open-source component library distributed via npm. We do not collect any personal information through the library itself. When you visit our documentation website (ui.taohq.org), we may collect basic analytics data such as page views and browser type to improve the experience.</p>
    </section>

    <section>
      <h2>2. How We Use Information</h2>
      <p>Any information collected through our documentation site is used solely to improve the quality of our documentation, understand usage patterns, and fix bugs. We do not sell, trade, or share personal information with third parties.</p>
    </section>

    <section>
      <h2>3. npm Package</h2>
      <p>The <code>@thenormvg/maya-ui</code> npm package does not include any telemetry, tracking, or analytics. It runs entirely on your machine and does not communicate with any external servers.</p>
    </section>

    <section>
      <h2>4. Third-Party Services</h2>
      <p>Our documentation site may use third-party services such as Vercel for hosting and GitHub for source code management. These services have their own privacy policies, which we encourage you to review.</p>
    </section>

    <section>
      <h2>5. Cookies</h2>
      <p>Our documentation site may use minimal cookies to store your theme preference (light/dark mode). No tracking cookies are used.</p>
    </section>

    <section>
      <h2>6. Contact</h2>
      <p>If you have any questions about this Privacy Policy, you can reach us at <a href="mailto:thealphaones.work@gmail.com">thealphaones.work@gmail.com</a>.</p>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })

useSeoMeta({
  title: 'Privacy Policy — Maya UI',
  description: 'Privacy Policy for Maya UI, a premium Nuxt component library by TaoHQ.',
})
</script>

<style scoped>
.legal-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 100px 32px 80px;
}

h1 {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 8px;
  color: var(--maya-text-primary);
}

.updated {
  font-size: 0.875rem;
  color: var(--maya-text-muted);
  margin: 0 0 48px;
}

section {
  margin-bottom: 36px;
}

h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--maya-text-primary);
}

p {
  font-size: 0.9375rem;
  color: var(--maya-text-secondary);
  line-height: 1.7;
  margin: 0;
}

code {
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.8125rem;
  font-family: var(--maya-font-mono);
}

a {
  color: var(--maya-primary, #3b82f6);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
