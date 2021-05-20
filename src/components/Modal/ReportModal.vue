<template>
  <transition appear name="slide-fade" mode="out-in">
    <div
      v-if="show"
      class="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-70 flex items-center justify-center"
    >
      <div class="flex flex-col w-80 bg-dark-600 rounded-2xl p-6 modal-width">
        <vue-feather
          class="text-gold-300"
          stroke-width="1"
          size="32"
          type="clipboard"
        ></vue-feather>
        <div class="mt-4">
          <div class="text-lg text-gold-400 font-bold">รายงาน</div>
          <div class="text-sm text-gray-200 font-medium">
            เลือกเหตุผลที่ต้องการให้ปรับปรุง
          </div>
          <div class="flex flex-col space-y-2 mt-4 font-medium text-gold-200">
            <base-select></base-select>
            <input
              v-model="payload.note"
              type="text"
              class="font-medium block w-full py-3 pl-4 sm:text-sm border-gold-600 rounded-lg placeholder-gold-500 hover:border-gold-600 focus:border-gold-500 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300 bg-op"
            />
          </div>
          <div class="grid grid-cols-2 gap-x-2 mt-8">
            <button
              class="btn rounded btn-primary py-3"
              @click="$emit('close')"
            >
              ยกเลิก
            </button>
            <button
              class="btn rounded bg-white text-gold-400 py-3"
              @click="$emit('submit', payload)"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'submit'],
  data() {
    return {
      payload: {
        selected: '',
        note: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-op {
  background: rgba(35, 36, 41, 0.3);
}

table.call-logs-table {
  th {
    @apply font-medium;
  }
}

.modal-width {
  width: 328px;
}
</style>
