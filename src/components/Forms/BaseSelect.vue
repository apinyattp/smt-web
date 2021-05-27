<template>
  <div v-if="label" class="text-gold-400 mb-3 font-medium text-sm mx-2">
    {{ label }}
  </div>
  <div
    class="dropdown text-gold-300 border-b border-gold-600 pb-2 cursor-pointer"
    :class="additionalSelectClass"
    tabindex="-1"
  >
    <div class="relative flex items-center mx-2 z-0">
      <vue-feather
        v-if="prefixIcon"
        class="mr-3"
        :type="prefixIcon"
      ></vue-feather>
      <span class="font-medium text-lg">{{ selectedLabel }}</span>
      <caret-down
        class="caret-icon transform h-4 w-4 transition duration-300 ml-auto"
      />
    </div>
    <div
      class="relative opacity-0 invisible dropdown-menu transition-all transform origin-top -translate-y-2 scale-95 z-10"
    >
      <div
        class="bg-gray-600 absolute left-0 top-2 w-56 mt-2 origin-top bg-white border border-gold-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-full"
      >
        <div class="py-1">
          <div
            v-for="(option, index) in options"
            :key="option.value"
            :tabindex="index"
            class="text-gold-300 flex justify-between w-full px-4 py-3 text-sm leading-5 text-left cursor-pointer font-medium hover:bg-dark-600 transition ease-in-out focus:bg-dark-500"
            role="menuitem"
            @click="onSelectOption(option.value)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CaretDown from '../Icons/CaretDown.vue'

export default {
  components: {
    CaretDown
  },
  props: {
    prefixIcon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: ''
    },
    additionalSelectClass: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => [
        {
          label: 'select 1',
          value: 0
        },
        {
          label: 'select 2',
          value: 1
        },
        {
          label: 'select 3',
          value: 3
        }
      ]
    },
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selectedValue: {}
    }
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find(
        ({ value }) => value === this.modelValue
      )
      return (selected && selected.label) || 'All'
    }
  },
  methods: {
    onSelectOption(val) {
      this.$emit('update:modelValue', val)
      document.activeElement.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  --tw-border-opacity: 1;
  border-color: rgba(220, 38, 38, var(--tw-border-opacity));
}

.dropdown:focus-within {
  .caret-icon {
    transform: rotate(180deg);
  }
}

.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
