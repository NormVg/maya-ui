<template>
  <div class="page-content">
    <MayaPreviewCode
      title="Default Tabs"
      description="A sliding indicator tracks the active tab with a bouncy spring transition. Built with provide/inject state orchestration."
      lang="vue"
      :code="defaultTabsCode"
    >
      <template #preview>
        <div class="center-col">
          <MayaTabs default-value="account">
            <MayaTabsList>
              <MayaTabsTrigger value="account">Account</MayaTabsTrigger>
              <MayaTabsTrigger value="password">Password</MayaTabsTrigger>
              <MayaTabsTrigger value="billing">Billing</MayaTabsTrigger>
            </MayaTabsList>
            <MayaTabsContent value="account">
              <MayaCard>
                <template #header>Account Settings</template>
                Update your display name and email address linked to your account.
              </MayaCard>
            </MayaTabsContent>
            <MayaTabsContent value="password">
              <MayaCard>
                <template #header>Change Password</template>
                Set a strong password. It must be at least 12 characters long.
              </MayaCard>
            </MayaTabsContent>
            <MayaTabsContent value="billing">
              <MayaCard>
                <template #header>Billing Plan</template>
                You are currently on the Pro plan. Manage your subscription below.
              </MayaCard>
            </MayaTabsContent>
          </MayaTabs>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Pills Variant"
      description="A round pill-shaped variant for secondary navigation bars or filter groups."
      lang="vue"
      :code="pillsTabsCode"
    >
      <template #preview>
        <div class="center-col">
          <MayaTabs default-value="all">
            <MayaTabsList variant="pills">
              <MayaTabsTrigger value="all">All</MayaTabsTrigger>
              <MayaTabsTrigger value="active">Active</MayaTabsTrigger>
              <MayaTabsTrigger value="archived">Archived</MayaTabsTrigger>
              <MayaTabsTrigger value="draft">Draft</MayaTabsTrigger>
            </MayaTabsList>
          </MayaTabs>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Vertical Tabs"
      description="Orient tabs vertically for sidebar-style navigation layouts using the orientation prop."
      lang="vue"
      :code="verticalTabsCode"
    >
      <template #preview>
        <div style="min-height: 200px;">
          <MayaTabs default-value="general" orientation="vertical">
            <MayaTabsList orientation="vertical">
              <MayaTabsTrigger value="general">General</MayaTabsTrigger>
              <MayaTabsTrigger value="security">Security</MayaTabsTrigger>
              <MayaTabsTrigger value="notifications">Notifications</MayaTabsTrigger>
            </MayaTabsList>
            <MayaTabsContent value="general">
              <MayaCard><template #header>General</template>Configure your general preferences.</MayaCard>
            </MayaTabsContent>
            <MayaTabsContent value="security">
              <MayaCard><template #header>Security</template>Manage 2FA and active sessions.</MayaCard>
            </MayaTabsContent>
            <MayaTabsContent value="notifications">
              <MayaCard><template #header>Notifications</template>Choose what you want to be notified about.</MayaCard>
            </MayaTabsContent>
          </MayaTabs>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const defaultTabsCode = `<MayaTabs default-value="account">
  <MayaTabsList>
    <MayaTabsTrigger value="account">Account</MayaTabsTrigger>
    <MayaTabsTrigger value="password">Password</MayaTabsTrigger>
    <MayaTabsTrigger value="billing">Billing</MayaTabsTrigger>
  </MayaTabsList>
  <MayaTabsContent value="account">
    <MayaCard>Account settings content...</MayaCard>
  </MayaTabsContent>
</MayaTabs>`

const pillsTabsCode = `<MayaTabs default-value="all">
  <MayaTabsList variant="pills">
    <MayaTabsTrigger value="all">All</MayaTabsTrigger>
    <MayaTabsTrigger value="active">Active</MayaTabsTrigger>
    <MayaTabsTrigger value="archived">Archived</MayaTabsTrigger>
  </MayaTabsList>
</MayaTabs>`

const verticalTabsCode = `<MayaTabs default-value="general" orientation="vertical">
  <MayaTabsList orientation="vertical">
    <MayaTabsTrigger value="general">General</MayaTabsTrigger>
    <MayaTabsTrigger value="security">Security</MayaTabsTrigger>
  </MayaTabsList>
  <MayaTabsContent value="general">...</MayaTabsContent>
</MayaTabs>`
</script>

<style scoped>
.page-content { display: flex; flex-direction: column; gap: 32px; }
.center-col { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; padding: 16px; }
</style>
