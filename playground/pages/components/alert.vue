<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Alert</h1>
      <p class="page-desc">
        A structured message offering feedback, warnings, or notifications, utilizing soft 3D semantic styles.
      </p>
    </div>

    <MayaPreviewCode title="Base Layout" description="A simple alert offering information." lang="vue"
      :code="baseLayoutCode">
      <template #preview>
        <MayaAlert title="Update Available" :icon="RocketIcon">
          Maya UI v2.0 is now available with new animations and components. Please update your dependencies to receive
          the latest features.
        </MayaAlert>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Semantic Variants" description="Different intents to convey distinct levels of urgency."
      lang="vue" :code="variantsCode">
      <template #preview>
        <div class="alert-grid" style="width: 100%;">
          <MayaAlert intent="default" title="Default Note">
            This is a standard system default alert.
          </MayaAlert>

          <MayaAlert intent="info" title="Software Update" :icon="InfoIcon">
            A new software version (v4.2.1) has been downloaded.
          </MayaAlert>

          <MayaAlert intent="success" title="Payment Successful" :icon="CheckCircleIcon">
            Your recent transaction has been processed properly without any issues.
          </MayaAlert>

          <MayaAlert intent="warning" title="Disk Space Low" :icon="AlertTriangleIcon">
            Your internal disk is at 90% capacity. Please free up space soon.
          </MayaAlert>

          <MayaAlert intent="danger" title="Connection Lost" :icon="AlertOctagonIcon">
            We cannot connect to the server. Please check your network connection and retry.
          </MayaAlert>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="With Actions"
      description="Alerts can embed interactive actionable buttons via the 'action' slot." lang="vue"
      :code="actionsCode">
      <template #preview>
        <MayaAlert intent="info" title="New Feature" :icon="SparklesIcon">
          We've introduced interactive component demos directly in the playground. Check them out!

          <template #action>
            <MayaBtn variant="outline" size="sm">Try Now</MayaBtn>
          </template>
        </MayaAlert>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Row Layout" description="A compact layout for narrow spaces where text flows inline."
      lang="vue" :code="rowLayoutCode">
      <template #preview>
        <MayaAlert intent="warning" title="Heads up!" layout="row" :icon="AlertTriangleIcon">
          This is a compact row layout where text flows inline.
        </MayaAlert>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import {
  RocketIcon,
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  AlertOctagonIcon,
  SparklesIcon
} from 'lucide-vue-next'

const baseLayoutCode = `
<template>
  <MayaAlert title="Update Available" :icon="RocketIcon">
    Maya UI v2.0 is now available. Please update your dependencies to receive
    the latest features.
  </MayaAlert>
</template>
`.trim()
const variantsCode = `
<template>
  <div class="alert-grid" style="width: 100%;">
    <MayaAlert intent="default" title="Default Note">
      This is a standard system default alert.
    </MayaAlert>

    <MayaAlert intent="info" title="Software Update" :icon="InfoIcon">
      A new software version (v4.2.1) has been downloaded.
    </MayaAlert>

    <MayaAlert intent="success" title="Payment Successful" :icon="CheckCircleIcon">
      Your recent transaction has been processed properly without any issues.
    </MayaAlert>

    <MayaAlert intent="warning" title="Disk Space Low" :icon="AlertTriangleIcon">
      Your internal disk is at 90% capacity. Please free up space soon.
    </MayaAlert>

    <MayaAlert intent="danger" title="Connection Lost" :icon="AlertOctagonIcon">
      We cannot connect to the server. Please check your network connection and retry.
    </MayaAlert>
  </div>
</template>
`.trim()

const actionsCode = `
<template>
  <MayaAlert intent="info" title="New Feature" :icon="SparklesIcon">
    We've introduced interactive component demos directly in the playground. Check them out!

    <template #action>
      <MayaBtn variant="outline" size="sm">Try Now</MayaBtn>
    </template>
  </MayaAlert>
</template>
`.trim()

const rowLayoutCode = `
<template>
  <MayaAlert intent="warning" title="Heads up!" layout="row" :icon="AlertTriangleIcon">
    This is a compact row layout where text flows inline.
  </MayaAlert>
</template>
`.trim()
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48px;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 1.125rem;
  color: var(--maya-text-secondary);
  line-height: 1.6;
}

.showcase-section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--maya-text-primary);
  margin-bottom: 16px;
}

.demo-card {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.alert-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
