<template>
  <transition appear name="slide-fade" mode="out-in">
    <div
      v-if="show"
      class="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-70 flex items-center justify-center"
    >
      <div class="flex flex-col bg-dark-600 rounded-2xl p-6 modal-width">
        <vue-feather
          class="text-gold-300"
          stroke-width="1"
          size="32"
          type="phone"
        ></vue-feather>
        <div class="mt-2">
          <div class="text-lg text-gold-400 font-bold">ข้อมูลการโทรออก</div>
          <div class="flex flex-col space-y-2 w-1/2 mt-4">
            <div class="text-sm text-gray-200 font-medium">ติดต่อคุณเอ</div>
            <a
              href="#"
              class="block bg-green text-white text-center py-3 rounded font-bold"
            >
              089 987 097
            </a>
          </div>
          <div
            class="flex flex-col space-y-2 mt-4 font-medium text-gold-200 mt-4"
          >
            <div class="text-sm text-gray-200 font-medium">บันทึก</div>
            <input
              type="text"
              class="font-medium block w-full py-3 pl-4 sm:text-sm border-gold-600 rounded-lg placeholder-gold-500 hover:border-gold-600 focus:border-gold-500 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300 bg-op"
            />
          </div>
          <div
            class="flex flex-col space-y-2 mt-4 font-medium text-gold-200 mt-4"
          >
            <div class="text-sm text-gray-200 font-medium">ประวัติการโทร</div>
            <div class="bg-op rounded-lg px-6 py-4">
              <table
                class="table-fixed call-logs-table text-sm w-full text-left"
              >
                <thead>
                  <tr>
                    <th>วันที่โทร</th>
                    <th>เวลา</th>
                    <th>โทรออก</th>
                    <th>บันทึก</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12 เม.ย. 64</td>
                    <td>22:23:13</td>
                    <td>Admin A</td>
                    <td>ไม่รับสาย</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-2 mt-6">
            <button
              class="btn rounded font-medium btn-primary py-3"
              @click="$emit('close')"
            >
              ยกเลิก
            </button>
            <button
              class="btn rounded font-medium bg-white text-gold-400 py-3"
              @click="$emit('submit')"
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
/* eslint-disable */
import Modal from './BaseModal.vue'

export default {
  components: {
    Modal
  },
  inheritAttrs: false,
  emits: ['close', 'submit'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    callLogs: {
      type: String,
      default: ''
    }
  },
  methods: {
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
  width: 618px;
}
</style>
