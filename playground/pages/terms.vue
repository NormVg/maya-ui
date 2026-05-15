<template>
  <div class="legal-page">
    <h1>Terms of Service</h1>
    <p class="updated">Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>

    <section>
      <h2>1. Acceptance of Terms</h2>
      <p>By using Maya UI (<code>@thenormvg/maya-ui</code>), you agree to these Terms of Service. Maya UI is an open-source software project maintained by TaoHQ.</p>
    </section>

    <section>
      <h2>2. License</h2>
      <p>Maya UI is distributed under the terms of its open-source license as specified in the project's GitHub repository. You are free to use, modify, and distribute the library in accordance with the license terms.</p>
    </section>

    <section>
      <h2>3. Usage</h2>
      <p>You may use Maya UI in personal and commercial projects. The library is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement.</p>
    </section>

    <section>
      <h2>4. Limitation of Liability</h2>
      <p>In no event shall the authors or copyright holders of Maya UI be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.</p>
    </section>

    <section>
      <h2>5. Documentation Website</h2>
      <p>The Maya UI documentation website (ui.taohq.org) is provided for informational purposes. We strive to keep all code examples and documentation accurate and up to date, but we make no guarantees about the completeness or accuracy of the content.</p>
    </section>

    <section>
      <h2>6. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Changes will be reflected on this page with an updated revision date.</p>
    </section>

    <section>
      <h2>7. Contact</h2>
      <p>For questions about these Terms, contact us at <a href="mailto:thealphaones.work@gmail.com">thealphaones.work@gmail.com</a>.</p>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })

useSeoMeta({
  title: 'Terms of Service — Maya UI',
  description: 'Terms of Service for Maya UI, a premium Nuxt component library by TaoHQ.',
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
