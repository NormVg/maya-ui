<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Form Structure</h1>
      <p class="page-description">Structural wrappers that handle layout spacing, nested labels, semantic fieldsets, and
        automated error distribution for Maya components.</p>
    </div>

    <MayaPreviewCode title="Field" description="Auto-generates labels and description tooltips." code='<MayaField label="Email Address" description="We will never share your email." name="email">
  <MayaInput placeholder="you@example.com" />
</MayaField>'>
      <template #preview>
        <MayaField label="Email Address" description="We will never share your email." name="email"
          style="max-width: 320px;">
          <MayaInput placeholder="you@example.com" />
        </MayaField>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Field (Error State)"
      description="Passing 'error' turns the input red using CSS :deep() injection." code='<MayaField label="Password" error="Password must be at least 8 characters long.">
  <MayaInput type="password" value="secret" />
</MayaField>'>
      <template #preview>
        <MayaField label="Password" error="Password must be at least 8 characters long." style="max-width: 320px;">
          <MayaInput type="password" value="secret" />
        </MayaField>
      </template>
    </MayaPreviewCode>

    <div class="page-header" style="margin-top: 48px;">
      <h1 class="page-title">Fieldset & Form</h1>
      <p class="page-description">Group related inputs conceptually and spatially.</p>
    </div>

    <MayaPreviewCode title="Nested Forms" description="Using Form, Fieldset, FormGroup, and Field together." code='<MayaForm>
  <MayaFieldset legend="Shipping Address" description="Where should we send your device?">
    <MayaFormGroup>
      <MayaField label="Full Name">
        <MayaInput />
      </MayaField>
      <MayaInputGroup>
        <MayaInput placeholder="First Name" />
        <MayaInput placeholder="Last Name" />
      </MayaInputGroup>
      <MayaField label="Country">
        <MayaSelect :options="[{label:`United States`, value:`US`}]" modelValue="US" />
      </MayaField>
    </MayaFormGroup>
  </MayaFieldset>
  <MayaBtn>Submit Order</MayaBtn>
</MayaForm>'>
      <template #preview>
        <MayaForm style="max-width: 480px;">
          <MayaFieldset legend="Shipping Address" description="Where should we send your device?">
            <MayaFormGroup>
              <MayaField label="Full Name">
                <MayaInput />
              </MayaField>
              <MayaInputGroup>
                <MayaInput placeholder="First Name" />
                <MayaInput placeholder="Last Name" />
              </MayaInputGroup>
              <MayaField label="Country">
                <MayaSelect :options="[{ label: 'United States', value: 'us' }, { label: 'Canada', value: 'ca' }]"
                  modelValue="us" />
              </MayaField>
            </MayaFormGroup>
          </MayaFieldset>
          <MayaBtn>Submit Order</MayaBtn>
        </MayaForm>
      </template>
    </MayaPreviewCode>

  </div>
</template>

<script setup>
</script>
