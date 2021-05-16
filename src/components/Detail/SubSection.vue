<template>
  <div class="relative flex">
    <vue-feather
      class="text-gray-200 flex-none section-icon"
      :type="icon"
      size="20"
      stroke-width="1"
    ></vue-feather>
    <div class="ml-6 flex-grow">
      <slot v-if="$slots.custom" name="custom"></slot>
      <template v-else>
        <div class="text-gray-200 mb-2">{{ title }}</div>
        <div class="text-gray-100 mb-10">
          <slot></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'untitled'
    },
    icon: {
      type: String,
      default: 'file-plus'
    }
  }
}
</script>

<style lang="scss" scoped>
i.section-icon {
  @apply relative;
  &::after {
    @apply block absolute bg-gray-200 w-px left-1/2;
    content: '';
    height: calc(100% - 32px);
    transform: translateY(8px);
  }
}
</style>
