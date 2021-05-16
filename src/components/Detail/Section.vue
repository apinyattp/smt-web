<template>
  <div class="font-medium">
    <h3 class="text-gold-400 mb-8">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'untitled'
    }
  }
}
</script>
