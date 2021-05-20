<template>
  <div class="flex justify-between items-center mb-24">
    <div class="w-1/3 relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-6">
        <vue-feather
          class="text-gold-500"
          stroke-width="2"
          size="18"
          type="search"
        ></vue-feather>
      </div>
      <input
        type="text"
        class="font-medium block w-full py-4 pl-14 pr-12 sm:text-sm border-gray-300 rounded-full bg-dark-700 placeholder-gold-500 focus:border-gold-300 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300"
        placeholder="Search"
      />
    </div>
    <div
      class="flex border border-gray-300 rounded-lg overflow-hidden items-center"
    >
      <img src="https://placekitten.com/58/58" />
      <div class="py-2 px-3">
        <div class="font-medium text-gold-500 mb-1">Name Surname</div>
        <div class="text-xs text-gold-300">Admin 1</div>
      </div>
      <div class="px-2">
        <vue-feather class="text-dark-500" type="chevron-down"></vue-feather>
      </div>
    </div>
  </div>
  <search-filter></search-filter>
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-gold-300">My Listing</h3>
    <router-link
      :to="{ name: 'listing-create' }"
      class="btn-primary rounded py-2 px-6 flex items-center leading-loose"
    >
      <vue-feather size="18" stroke-width="1" type="plus-square"></vue-feather>
      <span class="ml-2">สร้าง Listing ใหม่</span>
    </router-link>
  </div>
  <div class="table-wrapper rounded-lg mb-12">
    <table class="my-saved-list-table table-auto border-collapse w-full">
      <thead>
        <tr>
          <th>วันที่สร้าง</th>
          <th>ชื่อโครงการ</th>
          <th>ประเภท</th>
          <th>เจ้าของ</th>
          <th>โทรล่าสุด</th>
          <th>สถานะการขาย</th>
          <th>บันทึกล่าสุด</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 5" :key="n">
          <td>
            <div class="">12 เม.ย. 21</div>
            <div class="text-sm text-gold-500">Admin A</div>
          </td>
          <td>
            <div class="text-gold-200">ศุภาลัย</div>
            <div class="text-sm text-gray-200">ลาดพร้าว</div>
          </td>
          <td class="">ให้เช่า</td>
          <td class="text-center">คุณเอ</td>
          <td class="text-center">12 เม.ย. 21</td>
          <td class="text-center">ขายแล้ว</td>
          <td class="text-center">
            <vue-feather
              class=""
              stroke-width="1"
              type="clipboard"
            ></vue-feather>
          </td>
          <td>
            <div class="flex space-x-3">
              <popover>
                <template #default="{ isOpen, close, open }">
                  <div class="flex flex-col items-center relative">
                    <button
                      class="btn bg-gray-500 rounded-full py-3 px-6 hover:bg-gray-400 active:bg-gray-500"
                      @focusout="close"
                      @focusin="open"
                    >
                      <div class="flex items-center">
                        <span class="mr-2">จัดการ</span>
                        <vue-feather
                          stroke-width="1"
                          type="chevron-down"
                          size="20"
                        ></vue-feather>
                      </div>
                    </button>
                    <transition appear name="slide-fade" mode="out-in">
                      <div
                        v-if="isOpen"
                        class="absolute w-40 text-gold-300 bg-gray-400 shadow-xl rounded z-10 top-full mt-2 space-y-4 py-6 px-5 text-sm"
                      >
                        <router-link
                          :to="{ name: 'listing-edit', params: { id: n } }"
                          >แก้ไขข้อมูล</router-link
                        >
                        <div
                          class="cursor-pointer"
                          @click="statusModalShow = true"
                        >
                          สถานะการขาย
                        </div>
                        <div
                          class="cursor-pointer"
                          @click="trackingModalShow = true"
                        >
                          นัดหมายการติดตาม
                        </div>
                        <div
                          class="cursor-pointer"
                          @click="reportModalShow = true"
                        >
                          รายงาน/ปรับปรุง
                        </div>
                      </div>
                    </transition>
                  </div>
                </template>
              </popover>
              <button
                class="btn bg-gray-500 rounded-full py-3 px-6 hover:bg-gray-400 active:bg-gray-500"
                @click="toggleCallLogsModal"
              >
                <div class="flex items-center">
                  <span class="mr-2">ข้อมูล</span>
                  <vue-feather
                    stroke-width="1"
                    type="phone"
                    size="20"
                  ></vue-feather>
                </div>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <pagination class="mb-40"></pagination>
  <status-modal
    :show="statusModalShow"
    @close="statusModalShow = false"
    @submit="onSubmitStatusModal"
  ></status-modal>
  <tracking-modal
    :show="trackingModalShow"
    @close="trackingModalShow = false"
    @submit="onSubmitTrackingModal"
  ></tracking-modal>
  <report-modal
    :show="reportModalShow"
    @close="reportModalShow = false"
    @submit="onSubmitReportModal"
  ></report-modal>
  <call-logs-modal
    :show="callLogsModalShow"
    @close="callLogsModalShow = false"
    @submit="onSubmitCallLogsModalForm"
  ></call-logs-modal>
</template>

<script>
import SearchFilter from '../components/SearchFilter.vue'
import Popover from '../components/Popover'
import Pagination from '../components/Pagination.vue'
import StatusModal from '../components/Modal/StatusModal.vue'
import TrackingModal from '../components/Modal/TrackingModal.vue'
import CallLogsModal from '../components/Modal/CallLogsModal.vue'
import ReportModal from '../components/Modal/ReportModal.vue'

export default {
  components: {
    SearchFilter,
    Popover,
    Pagination,
    StatusModal,
    TrackingModal,
    CallLogsModal,
    ReportModal
  },
  data() {
    return {
      statusModalShow: false,
      trackingModalShow: false,
      reportModalShow: false,
      callLogsModalShow: false,
      callLogsModalForm: {
        contact: 'เอ',
        tel: '089 987 0971',
        note: '',
        logs: [
          {
            date: '12 เม.ย. 64',
            time: '	22:23:13',
            caller: '	Admin A',
            note: '	ไม่รับสาย'
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    closeCallLogsModal(result) {
      this.callLogsModalShow = false
    },
    closeReportModal(result) {
      this.reportModalShow = false
    },
    closeTrackingModal(result) {
      this.trackingModalShow = false
    },
    closeStatusModal(result) {
      this.statusModalShow = false
    },
    toggleCallLogsModal(item) {
      // this.callLogsModalForm = item
      this.callLogsModalShow = true
    },
    onSubmitCallLogsModalForm() {
      try {
        console.log('post axios request')
      } catch (error) {
        console.log(error)
      }
      this.closeCallLogsModal()
    },
    onSubmitReportModal(payload) {
      try {
        console.log('post axios request with payload', payload)
      } catch (error) {
        console.log(error)
      }
      this.closeReportModal()
    },
    onSubmitTrackingModal(payload) {
      try {
        console.log('post axios request with payload', payload)
      } catch (error) {
        console.log(error)
      }
      this.closeTrackingModal()
    },
    onSubmitStatusModal(payload) {
      try {
        console.log('post axios request with payload', payload)
      } catch (error) {
        console.log(error)
      }
      this.closeStatusModal()
    }
  }
}
</script>

<style lang="scss" scoped>
table.my-saved-list-table {
  @apply font-medium;
  thead > tr > th {
    @apply font-medium text-gold-600 py-5;
  }
  tbody > tr > td {
    @apply py-5 px-6 text-gray-200;
  }
  tbody > tr:nth-child(even) {
    background: rgba(#5a5b63, 0.25);
  }
}

.table-wrapper {
  background: rgba(#232429, 0.6);
}

.bg-op {
  background: rgba(35, 36, 41, 0.3);
}

table.call-logs-table {
  th {
    @apply font-medium;
  }
}
</style>
