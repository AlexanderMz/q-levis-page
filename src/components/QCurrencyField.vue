<script setup lang="ts">
import { watch } from 'vue';
import { useCurrencyInput } from 'vue-currency-input';

const props = defineProps({ modelValue: Number, label: String, currency: String });

const { inputRef, formattedValue, setValue, setOptions } = useCurrencyInput({
  currency: props.currency || 'MXN',
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  precision: 0,
  valueRange: { min: 0 },
});

watch(
  () => props.modelValue,
  (value: any) => {
    setValue(value);
  },
);
watch(
  () => props.currency,
  (value: any) => {
    setOptions({
      currency: value
    });
  }
)
</script>

<template>
  <q-input v-model="formattedValue" dense borderless readonly input-class="text-right" ref="inputRef">
  </q-input>
</template>
