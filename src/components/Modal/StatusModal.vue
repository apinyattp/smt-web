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
          type="home"
        ></vue-feather>
        <div class="mt-4">
          <div class="text-lg text-gold-400 font-bold">สถานะการขาย</div>
          <div class="text-sm text-gray-200 font-medium">แก้ไขสถานะโครงการ</div>
          <div
            class="flex flex-col items-start space-y-4 mt-6 font-medium text-gold-200"
          >
            <label for="opt1" class="radio">
              <input id="opt1" type="radio" name="rdo" class="hidden" />
              <span class="label" /> ขายแล้ว
            </label>
            <label for="opt2" class="radio">
              <input id="opt2" type="radio" name="rdo" class="hidden" />
              <span class="label" /> ว่าง
            </label>
            <label for="opt3" class="radio">
              <input id="opt3" type="radio" name="rdo" class="hidden" />
              <span class="label" /> ยกเลิก
            </label>
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
      payload: {}
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
