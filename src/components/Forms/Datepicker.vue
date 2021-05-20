<template>
  <div v-if="label" class="text-gold-400 mb-3 font-medium text-sm mx-2">
    {{ label }}
  </div>
  <div
    class="dropdown text-gold-300 border-b border-gold-600 pb-2 cursor-pointer"
    :class="additionalSelectClass"
    tabindex="-1"
  >
    <flat-pickr v-model="date" class="invisible absolute" :config="config" />
    <div class="relative flex items-center mx-2 z-0" data-toggle>
      <vue-feather
        v-if="prefixIcon"
        class="mr-3"
        :type="prefixIcon"
      ></vue-feather>
      <span class="font-medium text-lg">{{ selectedLabel }}</span>
      <vue-feather
        class="ml-auto"
        type="chevron-down"
        stroke-width="1"
      ></vue-feather>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/dark.css'

export default {
  components: {
    flatPickr
  },
  props: {
    prefixIcon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Date'
    },
    labelKey: {
      type: String,
      default: ''
    },
    additionalSelectClass: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      date: null,
      config: {
        wrap: true,
        onChange: (selectedDates, dateStr, instance) => {
          this.$emit('update:modelValue', dateStr)
        }
      },
      selectedValue: {}
    }
  },
  computed: {
    selectedLabel() {
      return this.date || 'Select Date'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped></style>
