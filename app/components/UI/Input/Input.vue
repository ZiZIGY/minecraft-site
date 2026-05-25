<script lang="ts" setup>
  import { inputVariants, type TInputVariants } from './variants';

  defineOptions({ inheritAttrs: false });

  interface IInputProps {
    modelValue?: string;
    size?: TInputVariants['size'];
    disabled?: boolean;
    type?: string;
    placeholder?: string;
  }

  const props = withDefaults(defineProps<IInputProps>(), {
    size: 'md',
    type: 'text',
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();
</script>

<template>
  <input
    :type="props.type"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :class="cn(inputVariants({ size: props.size, disabled: props.disabled }), $attrs.class)"
    v-bind="$attrs"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
