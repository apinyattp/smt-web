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
    <popover>
      <template #default="{ isOpen, toggler, close }">
        <div
          v-click-outside="close"
          class="flex flex-col items-center relative"
          @click="toggler"
        >
          <div
            class="flex border overflow-hidden items-center cursor-pointer transition"
            :class="
              isOpen
                ? 'rounded-t-lg border-gold-400 bg-gray-600 profile-border-bottom'
                : 'rounded-lg border-gray-300 bg-dark-700'
            "
          >
            <div class="h-14 w-14">
              <img
                src="/img/sherman-tree.svg"
                class="h-full w-full object-contain"
              />
            </div>
            <div class="py-2 px-4">
              <div class="font-medium text-gold-500 mb-1 w-28 truncate">
                Name Surname
              </div>
              <div class="text-xs text-gold-300 capitalize">Admin</div>
            </div>
            <div class="px-2">
              <vue-feather
                class="text-dark-500"
                type="chevron-down"
              ></vue-feather>
            </div>
            <transition appear name="slide-fade" mode="out-in">
              <div
                v-if="isOpen"
                class="w-full bg-gray-600 absolute top-full bg-white border border-gold-400 divide-y divide-gray-100 rounded-b-lg shadow-lg outline-none border-t-0 left-0"
              >
                <div class="py-1">
                  <div
                    class="text-gray-300 text-gold-300 flex justify-between w-full px-4 py-3 text-sm leading-5 text-left cursor-pointer font-medium hover:bg-dark-600 transition ease-in-out focus:bg-dark-500"
                    @click.stop="onLogout(close)"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </template>
    </popover>
  </div>
  <search-filter
    :source-list="sourceList"
    :content-owner-list="contentOwnerList"
    :content-type="es_type"
    :content-tel-list="contentTelList"
    :sale-staus-list="saleStatusList"
    :search-form="params"
    @update:submitForm="submitForm($event)"
  ></search-filter>
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
          <th>นัดหมายล่าสุด</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lists in a_lists" :key="lists">
          <td>
            <div class="">{{ !lists.dt ? convertDate(lists.a_listing.created_at) : convertDate(lists.dt) }}</div>
            <div class="text-sm text-gold-500">Admin A</div>
          </td>
          <td>
            <div class="text-gold-200">{{lists.a_predict.name ? lists.a_predict.name[0] : '-'}}</div>
            <div class="text-sm text-gray-200">{{lists.a_predict.location ? lists.a_predict.location[0] : ''}}</div>
          </td>
          <td class="">{{ filterType(lists.obj.t)}}</td>
          <td class="text-center">{{!lists.obj.name ? '-' : lists.obj.name}}</td>
          <td class="text-center">{{ convertDate(lists.lastest_call_log) }}</td>
          <td class="text-center">{{ convertSale(lists.a_listing.saleStatus) }}</td>
          <td class="text-center">
            {{ convertDate(lists.a_listing.appointment) }}
            <!-- <vue-feather
              class=""
              stroke-width="1"
              type="clipboard"
            ></vue-feather> -->
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


  <pagination
    class="mt-10 mb-40"
    :per-page="parseInt(params.perpage)"
    :total="parseInt(total)"
    :current="parseInt(params.page)"
    @page-changed="changePage($event)"
    @per-page-changed="changePerPage($event)"
  ></pagination>

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
import { clickOutside } from '../plugins/directives'
import { HTTP } from '@/config/axios.js'
import { getToken, getUserDetail } from '@/config/utils.js'
import * as moment from 'moment/moment'
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
  directives: { clickOutside },
  data() {
    return {
      search: '',
      total: 0,
      a_lists: [],
      es_type: {},
      sourceList: {
        'not line': 'not_line'
      },
      saleStatusList: {
        '': 'All',
        sold: 'ขายแล้ว',
        avaliable: 'ว่าง',
        cancel: 'ยกเลิก'
      },
      contentTelList: {
        '': 'All',
        0: 'ยังไม่โทร',
        1: 'โทรแล้ว'
      },
      contentOwnerList: {
        '': 'All',
        agent: 'agent',
        owner: 'owner'
      },
      userDetail: getUserDetail('user'),
      params: {
        search: '',
        user_id_list: '',
        type: '',
        sort: 'date_desc',
        comeFrom: '',
        page: 1,
        perpage: 25,
        highlight: '',
        is_owner_text: '',
        user_id: '',
        startDate: '',
        endDate: '',
        is_complete: '',
        advance_contain_word: '',
        advance_not_contain_word: '',
        is_check: '',
        predict_type: '',
        is_listing: '1',
        is_view: '0',
        saleStatus: '',
        telStatus: '',
        property_id: '',
      },
      token: getToken('user'),
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
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      HTTP.get('api/property/highlight/getDataListing', {
        params: Object.assign(this.params, {token: this.token})
      }).then((response) => {
        this.a_lists = response.data.data
        this.es_type = response.data.es_type
        this.sourceList = { ...this.sourceList, ...response.data.es_source }
        this.total = response.data.total
      })
    },
    onLogout(close) {
      // this.$auth.logout()
      console.log('logout')
      close()
    },
    convertDate(date) {
      if (date == null || date == '') return '-'
      moment.locale('th')
      return moment(date).add(543, 'year').format('ll')
    },
    filterType(type) {
      if (type == null || type == '') return '-'
      if (type == 'buy') return 'ซื้อ'
      if (type == 'sell') return 'ขาย'
      return type
    },
    convertSale(type) {
      if (type == null || type == '') return '-'
      if (type == 'cancel') return 'ยกเลิก'
      if (type == 'sold') return 'ขายแล้ว'
      return 'ว่าง'
    },
    submitForm(params) {
      let query = this.$route.query
      this.params = {...query, ...params}
      this.$router.replace({ query: this.params})
    },
    changePage(page) {
      this.params.page = page
      this.submitForm(this.params)
    },
    changePerPage(perPage) {
      this.params.page = 1
      this.params.perpage = perPage
      this.submitForm(this.params)
    },
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

.profile-border-bottom {
  border-bottom-color: #5c544a;
}
</style>
