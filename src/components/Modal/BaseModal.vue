<template>
  <transition appear name="slide-fade" mode="out-in">
    <div
      v-if="show"
      class="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-70 flex items-center justify-center"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'submit']
}
</script>
