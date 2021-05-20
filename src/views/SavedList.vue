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
        <tr v-for="lists in a_lists" :key="lists">
          <td>
            <div class="">12 เม.ย. 21</div>
            <div class="text-sm text-gold-500">Admin A</div>
          </td>
          <td>
            <div class="text-gold-200">ศุภาลัย</div>
            <div class="text-sm text-gray-200">ลาดพร้าว</div>
          </td>
          <td class="">{{ filterType(lists.obj.t)}}</td>
          <td class="text-center">{{!lists.obj.name ? '-' : lists.obj.name}}</td>
          <td class="text-center">{{ convertDate(lists.a_listing.appointment) }}</td>
          <td class="text-center">{{ convertSale(lists.a_listing.saleStatus) }}</td>
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
                        <div>สถานะการขาย</div>
                        <div>นัดหมายการติดตาม</div>
                        <div>รายงาน/ปรับปรุง</div>
                      </div>
                    </transition>
                  </div>
                </template>
              </popover>
              <button
                class="btn rounded-full py-3 px-6 hover:bg-gray-400 active:bg-gray-500"
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

  <div class="flex flex-col w-80 bg-dark-600 rounded-2xl p-6 hidden">
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
        <button class="btn rounded btn-primary py-3">ยกเลิก</button>
        <button class="btn rounded bg-white text-gold-400 py-3">ยืนยัน</button>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-80 bg-dark-600 rounded-2xl p-6 hidden">
    <vue-feather
      class="text-gold-300"
      stroke-width="1"
      size="32"
      type="calendar"
    ></vue-feather>
    <div class="mt-4">
      <div class="text-lg text-gold-400 font-bold">นัดหมายการติดตาม</div>
      <div class="text-sm text-gray-200 font-medium">
        เลือกวันเวลาที่สะดวกติดตาม
      </div>
      <div class="flex flex-col space-y-2 mt-4 font-medium text-gold-200">
        <base-select></base-select>
      </div>
      <div class="grid grid-cols-2 gap-x-2 mt-8">
        <button class="btn rounded btn-primary py-3">ยกเลิก</button>
        <button class="btn rounded bg-white text-gold-400 py-3">ยืนยัน</button>
      </div>
    </div>
  </div>
  <div class="hidden flex flex-col w-80 bg-dark-600 rounded-2xl p-6">
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
          type="text"
          class="font-medium block w-full py-3 pl-4 sm:text-sm border-gold-600 rounded-lg placeholder-gold-500 hover:border-gold-600 focus:border-gold-500 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300 bg-op"
        />
      </div>
      <div class="grid grid-cols-2 gap-x-2 mt-8">
        <button class="btn rounded btn-primary py-3">ยกเลิก</button>
        <button class="btn rounded bg-white text-gold-400 py-3">ยืนยัน</button>
      </div>
    </div>
  </div>
  <!-- <call-logs-modal
    :show="showModal"
    something-more="hello?"
    @close="showModal = false"
  ></call-logs-modal> -->
</template>

<script>
import SearchFilter from '../components/SearchFilter.vue'
import Popover from '../components/Popover'
import Pagination from '../components/Pagination.vue'
// import Modal from '../components/Modal/BaseModal.vue'
import { HTTP } from '@/config/axios.js'
import { getToken, getUserDetail } from '@/config/utils.js'
import * as moment from 'moment/moment'

export default {
  components: {
    SearchFilter,
    Popover,
    Pagination
    // Modal
  },
  data() {
    return {
      showModal: false,
      search: '',
      total: 0,
      a_lists: [],
      es_type: {},
      sourceList: {
        'not line': 'not_line'
      },
      saleStatusList: {
        sold: 'ขายแล้ว',
        avaliable: 'ว่าง',
        cancel: 'ยกเลิก'
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
        type: 'buy',
        sort: 'date_desc',
        comeFrom: 'not_line',
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
        token: getToken('user')
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
  },
  methods: {
    fetchData() {
      HTTP.get('api/property/highlight/getDataListing', {
        params: this.params
      }).then((response) => {
        this.a_lists = response.data.data
        this.es_type = response.data.es_type
        this.sourceList = { ...this.sourceList, ...response.data.es_source }
        this.total = response.data.total
      })
    },
    closeModal(result) {
      this.showModal = false
    },
    convertDate(date) {
      if(date == null || date == '') return '-'
      moment.locale('th')
      return moment(date).add(543, 'year').format('ll')
    },
    filterType(type) {
      if(type == null || type == '') return '-'
      if (type == 'buy') return 'ซื้อ'
      if (type == 'sell') return 'ขาย'
      return type
    },
    convertSale(type) {
      if(type == null || type == '') return '-'
      if (type == 'cancel') return 'ยกเลิก'
      if (type == 'sold') return 'ขายแล้ว'
      return 'ว่าง'
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
