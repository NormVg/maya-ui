<template>
  <MayaAppShell>
    <template #topbar>
      <MayaTopbar>
        <div style="font-weight: 600; font-size: 1.25rem;">Dashboard</div>
        <div style="margin-left: auto;">
          <MayaAvatar src="/avatar.jpg" alt="User" />
        </div>
      </MayaTopbar>
    </template>

    <template #sidebar>
      <MayaSidebar>
        <div style="padding: 16px;">
          <h3 style="margin: 0 0 16px; font-size: 0.875rem; color: var(--maya-text-secondary);">MENU</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <MayaBtn variant="ghost" style="justify-content: flex-start;">Overview</MayaBtn>
            <MayaBtn variant="ghost" style="justify-content: flex-start;">Analytics</MayaBtn>
            <MayaBtn variant="ghost" style="justify-content: flex-start;">Settings</MayaBtn>
          </div>
        </div>
      </MayaSidebar>
    </template>

    <div style="padding: 24px;">
      <MayaBentoGrid>
        <MayaBentoItem title="Total Revenue" description="This month's earnings">
          <div style="font-size: 2rem; font-weight: 600; margin-top: 16px;">$12,450</div>
        </MayaBentoItem>
        
        <MayaBentoItem title="Active Users" description="Currently online" cols="2">
          <div style="font-size: 2rem; font-weight: 600; margin-top: 16px;">1,204</div>
        </MayaBentoItem>
        
        <MayaBentoItem title="Conversion Rate" description="Compared to last week">
          <div style="font-size: 2rem; font-weight: 600; margin-top: 16px;">+4.2%</div>
        </MayaBentoItem>
      </MayaBentoGrid>
    </div>
  </MayaAppShell>
</template>
