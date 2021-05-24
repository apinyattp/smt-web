<template>
    <popover>
      <template #default="{ isOpen, open, close }">
        <div v-click-outside="close" class="w-1/3 relative">
          <div>
            <div class="absolute inset-y-0 left-0 flex items-center pl-6">
              <vue-feather
                class="text-gold-500"
                stroke-width="2"
                size="18"
                type="search"
              ></vue-feather>
            </div>
            <input
              v-model="selected"
              type="text"
              class="font-medium block w-full py-4 pl-14 pr-12 sm:text-sm border-gray-300 rounded-full bg-dark-700 placeholder-gold-500 focus:border-gold-300 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300"
              :placeholder="label"
              @click="open"
              @input="onSearchChange"
            />
          </div>
          <transition appear name="slide-fade" mode="out-in">
            <div
              v-if="isOpen && isSearchResultShow"
              class="w-full bg-gray-600 absolute top-full mt-2 bg-white border border-gold-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10"
            >
              <div class="py-1 autocomplete-container">
                <template v-if="itemsList.length">
                  <div
                    v-for="items in itemsList"
                    :key="items[labelKey]"
                    class="text-gold-300 w-full px-4 py-3 text-sm leading-5 text-left cursor-pointer font-medium hover:bg-dark-600 transition ease-in-out focus:bg-dark-500"
                    @click="onDataSelect(items, close)"
                  >
                    {{ items[labelName] }}
                  </div>
                </template>
                <template v-else>
                  <div
                    class="text-gold-300 px-4 py-3 text-sm leading-5 text-center"
                  >
                    <template v-if="isSearching"
                      >searching "{{ selected }}"</template
                    >
                    <template
                      v-else-if="isSearched && !isSearching"
                    >
                      "{{ selected }}" did not match any "{{ label }}".
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </transition>
        </div>
      </template>
    </popover>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: ''
    },
    labelName: {
      type: String,
      default: ''
    },
    itemsList: {
      type: Array,
      default: []
    }
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selectedValue: {},
      isSearching: false,
      isSearched: false,
      selected: ''
    }
  },
  computed: {
    onDataSelect(dataSelected, close) {
        alert(dataSelected)
        //emit data to parent
    //   this.submitForm(this.params)
      close()
    },
    onSearchSubmit() {
      //emit for get detail
      return debounce(this.getDataSeatch, 500)
    },
    selectedLabel() {
      const selected = this.options.find(
        ({ value }) => value === this.modelValue
      )
      return (selected && selected.label) || 'All'
    },
    isSearchResultShow() {
      return (
        this.selected &&
        (this.isSearched || this.isSearching)
      )
    }
  },
  methods: {
    onSearchChange(event) {
      const { value } = event.target
      if (value) {
        this.onSearchSubmit(value)
      }
    },
    getDataSeatch() {
    //   this.propertyList = dataList
      this.isSearching = false
      this.isSearched = true
    }
    // async getPropertyName() {
    //   this.isSearchingProperty = true
    //   const params = {
    //     type: 'current',
    //     search: this.params.search,
    //     page: 1,
    //     token: this.token
    //   }

    //   const {
    //     data: { dataList }
    //   } = await HTTP.get('api/property/getData', {
    //     params
    //   })

    //   this.propertyList = dataList
    //   this.isSearchingProperty = false
    //   this.isSearchedProperty = true
    // },
  }
}
</script>

<style lang="scss" scoped>
.error {
  --tw-border-opacity: 1;
  border-color: rgba(220, 38, 38, var(--tw-border-opacity));
}
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
