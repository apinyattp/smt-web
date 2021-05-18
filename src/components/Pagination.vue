<template>
  <div class="flex justify-between items-center">
    <div class="flex text-gray-200 space-x-4">
      <div>Rows per page</div>
      <popover>
        <template #default="{ isOpen, toggler, close }">
          <div class="flex flex-col items-center relative" @click="toggler">
            <button class="text-gold-400 flex items-center">
              10
              <vue-feather
                size="16"
                class="ml-1"
                stroke-width="4"
                type="chevron-down"
              ></vue-feather>
            </button>
            <transition appear name="slide-fade" mode="out-in">
              <div
                v-if="isOpen"
                class="bg-gray-600 absolute top-full mt-2 bg-white border border-gold-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              >
                <div class="py-1">
                  <div
                    v-for="n in perpages"
                    :key="n"
                    class="text-gold-300 flex justify-between w-full px-4 py-3 text-sm leading-5 text-left cursor-pointer font-medium hover:bg-dark-600 transition ease-in-out focus:bg-dark-500"
                    @click.stop="onPerpageChange(n, close)"
                  >
                    {{ n }}
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </template>
      </popover>
    </div>
    <div class="flex space-x-4">
      <div
        v-for="n in 4"
        :key="n"
        class="cursor-pointer px-4 py-2 text-sm font-medium"
        :class="n === 1 ? 'bg-gray-300 rounded text-gold-300' : 'text-gold-400'"
      >
        {{ n }}
      </div>
    </div>
    <div class="flex items-center space-x-3 text-gray-200">
      <div>Go to page</div>
      <div class="w-12">
        <input
          type="text"
          class="font-medium block w-full pl-4 sm:text-sm border-gray-300 rounded bg-gray-500 placeholder-gold-500 hover:border-gold-600 focus:border-gold-300 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300"
        />
      </div>
      <vue-feather class="cursor-pointer" type="chevron-right"></vue-feather>
    </div>
  </div>
</template>

<script>
import Popover from './Popover'
export default {
  components: {
    Popover
  },
  props: {
    pageCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      perpages: ['10', '15', '20']
    }
  },
  methods: {
    onPerpageChange(to, close) {
      console.log(to)
      close()
    }
  }
}
</script>

<style lang="scss" scoped>
.paginate.is-active {
  @apply bg-gray-300 rounded;
}
</style>
