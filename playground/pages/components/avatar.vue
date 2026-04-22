<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Avatar</h2>
      <p class="component-desc">User identity representations. Supports images, initials fallback, status dots, and
        stacked groups.</p>
    </div>

    <Showcase title="Sizes & Initials" description="Four sizes with automatic initials fallback.">
      <template #preview>
        <div class="row align-center">
          <MayaAvatar initials="VN" size="sm" />
          <MayaAvatar initials="VN" size="md" />
          <MayaAvatar initials="VN" size="lg" />
          <MayaAvatar initials="VN" size="xl" />
        </div>
      </template>
    </Showcase>

    <Showcase title="Status Dots" description="Semantic status indicators using design tokens.">
      <template #preview>
        <div class="row align-center">
          <div class="col-center">
            <MayaAvatar initials="A" size="lg" status="online" />
            <MayaBadge variant="soft" intent="success" dot size="sm">Online</MayaBadge>
          </div>
          <div class="col-center">
            <MayaAvatar initials="B" size="lg" status="away" />
            <MayaBadge variant="soft" intent="warning" dot size="sm">Away</MayaBadge>
          </div>
          <div class="col-center">
            <MayaAvatar initials="C" size="lg" status="busy" />
            <MayaBadge variant="soft" intent="danger" dot size="sm">Busy</MayaBadge>
          </div>
          <div class="col-center">
            <MayaAvatar initials="D" size="lg" status="offline" />
            <MayaBadge variant="soft" dot size="sm">Offline</MayaBadge>
          </div>
        </div>
      </template>
    </Showcase>

    <Showcase title="Avatar Group" description="Stacked avatars with +N overflow.">
      <template #preview>
        <div class="col">
          <MayaAvatarGroup :avatars="[
            { initials: 'VN' },
            { initials: 'AK' },
            { initials: 'MR' },
            { initials: 'SL' },
            { initials: 'JD' },
            { initials: 'PW' },
          ]" :max="4" size="md" />
          <MayaAvatarGroup :avatars="[{ initials: 'A' }, { initials: 'B' }, { initials: 'C' }]" :max="4" size="lg" />
        </div>
      </template>
    </Showcase>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 16px;
}

.row.align-center {
  align-items: center;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
