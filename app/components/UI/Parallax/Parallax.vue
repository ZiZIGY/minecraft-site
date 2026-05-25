<script lang="ts" setup>
interface IProps {
  speed?: number
  reverse?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  speed: 0.4,
  reverse: false,
})

const { y } = useWindowScroll()

const style = computed(() => ({
  transform: `translateY(${y.value * props.speed * (props.reverse ? -1 : 1)}px)`,
}))
</script>

<template>
  <div class="absolute inset-0 scale-110 will-change-transform" :style="style">
    <slot />
  </div>
</template>
