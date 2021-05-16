<template>
  <div
    class="h-96 bg-gray-600 bg-opacity-50 rounded-3xl shadow-md flex items-center overflow-hidden"
  >
    <div class="w-1/5 flex-shrink-0 p-5 bg-gray-600 bg-opacity-60 h-full">
      <div class="flex flex-col h-full">
        <div>
          <img class="mx-auto" src="/img/brands/kaidee.svg" alt="Kaidee Logo" />
          <div
            class="flex items-center justify-center space-x-2 text-gray-200 w-full -mt-3"
          >
            <vue-feather type="link" size="18"></vue-feather>
            <a href="#" class="font-bold underline">Original Link</a>
          </div>
        </div>
        <div class="mt-auto mb-8 space-y-1">
          <div class="text-green font-bold text-lg text-center">หาเช่า</div>
          <div class="flex text-gray-200 items-center space-x-2 justify-center">
            <vue-feather type="alert-triangle"></vue-feather>
            <a href="#" class="font-medium">แจ้งผิดประเภท</a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-grow p-8 h-full">
      <div class="content relative overflow-hidden">
        <pre
          class="text-gold-300 font-medium leading-7 line-clamp-10 whitespace-pre-line pr-16"
          >{{ getContent() }}</pre
        >
        <div class="absolute right-0 top-0">
          <span class="text-sm text-gray-300">2 เม.ย. 64</span>
        </div>
      </div>
      <div class="flex -mx-3 text-gold-500 font-bold justify-end mt-auto">
        <router-link
          class="flex items-center px-3"
          :to="{ name: 'listing-detail', params: { id: 1 } }"
        >
          <vue-feather type="eye" stroke-width="1"></vue-feather>
          <span class="ml-2">More details</span>
        </router-link>
        <div class="flex items-center px-3">
          <vue-feather type="plus-square" stroke-width="1"></vue-feather>
          <span class="ml-2">Add to my listing</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getContent from '@/assets/mock/data'

export default {
  name: 'Card',
  computed: {
    getContent() {
      return getContent
    }
  }
}
</script>

<style lang="scss" scoped>
.content pre {
  font-family: 'Anuphan' !important;
}
</style>
