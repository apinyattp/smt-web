<template>
  <div class="flex justify-between items-center">
    <div class="flex text-gray-200 space-x-4">
      <div>Rows per page</div>
      <popover>
        <template #default="{ isOpen, toggler, close }">
          <div
            v-click-outside="close"
            class="flex flex-col items-center relative"
            @click="toggler"
          >
            <button class="text-gold-400 flex items-center">
              {{ perPage }}
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
                    class="text-gold-300 w-full px-4 py-3 text-sm leading-5 text-left cursor-pointer font-medium hover:bg-dark-600 transition ease-in-out focus:bg-dark-500 text-center"
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
    <div v-if="hasFirst()" class="flex space-x-4">
      <div class="cursor-pointer px-4 py-2 text-sm font-medium">...</div>
    </div>
    <div class="flex space-x-4">
      <div
        v-for="page in pages"
        :key="page"
        class="cursor-pointer px-4 py-2 text-sm font-medium"
        :class="
          current == page
            ? 'bg-gray-300 rounded text-gold-300'
            : 'text-gold-400'
        "
        @click.prevent="changePage(page)"
      >
        {{ page }}
      </div>
      <div
        v-if="hasLast()"
        class="cursor-pointer px-4 py-2 text-sm font-medium"
      >
        ...
      </div>
      <div
        v-if="hasLast()"
        class="cursor-pointer px-4 py-2 text-sm font-medium text-gold-400"
        @click.prevent="changePage(totalPages)"
      >
        {{ totalPages }}
      </div>
    </div>
    <div class="flex items-center space-x-3 text-gray-200">
      <div>Go to page</div>
      <div class="w-12">
        <input
          v-model.number="input"
          type="text"
          class="font-medium block w-full pl-4 sm:text-sm border-gray-300 rounded bg-gray-500 placeholder-gold-500 hover:border-gold-600 focus:border-gold-300 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300"
          @keyup.enter="changePage(input)"
        />
      </div>
      <vue-feather
        class="cursor-pointer"
        type="chevron-right"
        @click.prevent="changePage(input)"
      ></vue-feather>
    </div>
  </div>
</template>

<script>
import Popover from './Popover'
import { clickOutside } from '../plugins/directives'

export default {
  components: {
    Popover
  },
  directives: { clickOutside },
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 25
    },
    pageRange: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      perpages: ['25', '50', '100'],
      input: ''
    }
  },
  computed: {
    pages: function () {
      var pages = []
      for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    rangeStart: function () {
      var start = this.current - this.pageRange
      return start > 0 ? start : 1
    },
    rangeEnd: function () {
      var end = this.current + this.pageRange
      return end < this.totalPages ? end : this.totalPages
    },
    totalPages: function () {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage: function () {
      return this.current + 1
    },
    prevPage: function () {
      return this.current - 1
    }
  },
  methods: {
    hasFirst: function () {
      return this.rangeStart !== 1
    },
    hasLast: function () {
      return this.rangeEnd < this.totalPages
    },
    hasPrev: function () {
      return this.current > 1
    },
    hasNext: function () {
      return this.current < this.totalPages
    },
    changePage: function (page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    },
    onPerpageChange(to, close) {
      this.$emit('per-page-changed', to)
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
