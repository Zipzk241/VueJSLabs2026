<script setup>
import { useId } from 'vue'

defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  error: { type: String, default: '' },
})

const emit = defineEmits(['blur'])

// v-model на рівні компонента
const model = defineModel({ type: String, default: '' })

const id = useId()
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="{ invalid: error }"
      @blur="emit('blur')"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 14px;
}

label {
  display: block;
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font: inherit;
}

input:focus {
  outline: 2px solid #bfdbfe;
  border-color: #2563eb;
}

input.invalid {
  border-color: #dc2626;
}
</style>
