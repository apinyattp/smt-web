<template>
  <div
    class="h-96 bg-gray-600 bg-opacity-50 rounded-3xl shadow-md flex items-center overflow-hidden"
  >
    <div class="w-1/5 flex-shrink-0 p-5 bg-gray-600 bg-opacity-60 h-full">
      <div class="flex flex-col h-full">
        <div>
          <div>
            <img src="/img/brands/kaidee.svg" alt="Kaidee Logo" />
          </div>
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
    <div class="flex-grow p-8 h-full">
      <pre class="content text-gold-300 font-medium leading-7">{{
        getContent()
      }}</pre>
    </div>
  </div>
</template>

<script>
import getContent from '@/assets/mock/data'

export default {
  computed: {
    getContent() {
      return getContent
    }
  }
}
</script>

<style lang="scss" scoped>
pre.content {
  font-family: 'Anuphan' !important;
}

.text-green {
  color: #34c759;
}
</style>
