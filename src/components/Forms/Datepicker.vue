<template>
  <div v-if="label" class="text-gold-400 mb-3 font-medium text-sm mx-2">
    {{ label }}
  </div>
  <div
    class="dropdown text-gold-300 border-b border-gold-600 pb-2 cursor-pointer"
    :class="additionalSelectClass"
    tabindex="-1"
  >
    <flat-pickr
      ref="flatpickrEl"
      v-model="date"
      class="invisible absolute"
      :config="config"
    />
    <div class="relative flex items-center mx-2 z-0" data-toggle>
      <vue-feather
        v-if="prefixIcon"
        class="mr-3"
        :type="prefixIcon"
      ></vue-feather>
      <span class="font-medium text-lg mr-auto">{{ selectedLabel }}</span>
      <transition name="fade" mode="out-in"
        ><vue-feather
          v-if="date"
          type="x-circle"
          class="flex-none"
          size="20"
          data-clear
          @click.stop="clearDate"
      /></transition>
      <caret-down
        class="caret-icon transform h-4 w-4 transition duration-300 ml-3"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/dark.css'
import CaretDown from '../Icons/CaretDown.vue'

export default {
  components: {
    flatPickr,
    CaretDown
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
    },
    mode: {
      type: String,
      default: 'range'
    },
    minDate: {
      type: [String, Boolean],
      default: false
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      date: null,
      dateFormat: "Y-m-d",
      config: {
        minDate: this.minDate,
        allowInput: true,
        mode: this.mode,
        wrap: true,
        onChange: (selectedDates, dateStr, instance) => {
          const dateRange = {
            start: new Date(selectedDates[0]).toLocaleDateString('en-GB'),
            end: new Date(selectedDates[1]).toLocaleDateString('en-GB'),
            dateStr: dateStr
          }
          this.$emit('update:modelValue', dateRange)
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
    clearDate() {
      this.$refs.flatpickrEl.fp.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown:focus-within {
  .caret-icon {
    transform: rotate(180deg);
  }
}
</style>
