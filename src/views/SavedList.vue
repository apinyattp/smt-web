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
        v-model="params.search"
        type="text"
        class="font-medium block w-full py-4 pl-14 pr-12 sm:text-sm border-gray-300 rounded-full bg-dark-700 placeholder-gold-500 focus:border-gold-300 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300"
        placeholder="Search"
        @keyup.enter="submitForm(params)"
      />
    </div>
    <popover>
      <template #default="{ isOpen, open, close }">
        <div v-click-outside="close" class="w-1/3 relative">
          <div>
            <div class="absolute inset-y-0 left-0 flex items-center pl-6">
              <vue-feather
                class="text-gold-500"
                stroke-width="2"
                size="18"
                type="search"
              ></vue-feather>
            </div>
            <input
              v-model="params.property_name"
              type="text"
              class="font-medium block w-full py-4 pl-14 pr-12 sm:text-sm border-gray-300 rounded-full bg-dark-700 placeholder-gold-500 focus:border-gold-300 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300"
              placeholder="ชื่อโครงการ"
              @click="open"
              @input="onSearchPropertyChange"
            />
          </div>
          <transition appear name="slide-fade" mode="out-in">
            <div
              v-if="isOpen && isSearchPropertyResultShow"
              class="w-full bg-gray-600 absolute top-full mt-2 bg-white border border-gold-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10"
            >
              <div class="py-1 autocomplete-container">
                <template v-if="propertyList.length">
                  <div
                    v-for="property in propertyList"
                    :key="property.id"
                    class="text-gold-300 w-full px-4 py-3 text-sm leading-5 text-left cursor-pointer font-medium hover:bg-dark-600 transition ease-in-out focus:bg-dark-500"
                    @click="onPropertySelect(property, close)"
                  >
                    {{ property.property_name }}
                  </div>
                </template>
                <template v-else>
                  <div
                    class="text-gold-300 px-4 py-3 text-sm leading-5 text-center"
                  >
                    <template v-if="isSearchingProperty"
                      >searching "{{ params.property_name }}"</template
                    >
                    <template
                      v-else-if="isSearchedProperty && !isSearchingProperty"
                    >
                      "{{ params.property_name }}" did not match any property.
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </transition>
        </div>
      </template>
    </popover>
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
                {{ userDetail.name }}
              </div>
              <div class="text-xs text-gold-300 capitalize">
                {{ userDetail.role }}
              </div>
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
    :teams-list="allUser"
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
          <th>
            วันที่สร้าง
            <button class="focus:outline-none" @click="sortData('created_at')">
              <vue-feather
                stroke-width="1"
                :type="params.sortFav.created_at == 'desc' ? 'chevron-down' : 'chevron-up'"
                size="20"
              ></vue-feather>
            </button>
          </th>
          <th>
            วันที่แก้ไข
            <button class="focus:outline-none" @click="sortData('updated_at')">
              <vue-feather
                stroke-width="1"
                :type="params.sortFav.updated_at == 'desc' ? 'chevron-down' : 'chevron-up'"
                size="20"
              ></vue-feather>
            </button>
          </th>
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
        <template v-if="statusFeed">
          <tr v-for="lists in a_lists" :key="lists">
            <td>
              <div class="">
                {{
                  lists.a_listing.created_at
                    ? convertDate(lists.a_listing.created_at)
                    : convertDate(lists.dt)
                }}
              </div>
              <div class="text-sm text-gold-500">{{allUser[lists.a_listing.user_update_id]}}</div>
            </td>
            <td>
              <div class="">
                {{
                  lists.a_listing.updated_at
                    ? convertDate(lists.a_listing.updated_at)
                    : '-'
                }}
              </div>
              <div class="text-sm text-gold-500">{{allUser[lists.a_listing.user_edit_id] == 'All' ? allUser[lists.a_listing.user_update_id]  : allUser[lists.a_listing.user_edit_id] }}</div>
            </td>
            <td>
              <div class="text-gold-200">
                {{ getDetailName(lists, 'name') }}
              </div>
              <div class="text-sm text-gray-200">
                {{
                  getDetailName(lists, 'location')
                }}
              </div>
            </td>
            <td class="">{{ filterType(lists.obj.t) }}</td>
            <td class="text-center">
              {{ !lists.obj.name ? '-' : lists.obj.name }}
            </td>
            <td class="text-center">
              {{ convertDate(lists.lastest_call_log) }}
            </td>
            <td class="text-center">
              {{ convertSale(lists.a_listing.saleStatus) }}
            </td>
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
                            :to="{
                              name: 'listing-edit',
                              params: { id: lists.id }
                            }"
                            >แก้ไขข้อมูล</router-link
                          >
                          <div
                            class="cursor-pointer"
                            @click="
                              setDataModalStatus(
                                'status',
                                lists.a_listing.saleStatus,
                                lists.id
                              )
                            "
                          >
                            สถานะการขาย
                          </div>
                          <div
                            class="cursor-pointer"
                            @click="
                              setDataModalStatus(
                                'tracking',
                                lists.a_listing.appointment,
                                lists.id
                              )
                            "
                          >
                            นัดหมายการติดตาม
                          </div>
                          <div
                            class="cursor-pointer"
                            @click="setDataModalStatus('report', '', lists.id)"
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
                  @click="toggleCallLogsModal(lists)"
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
        </template>
        <template v-else>
          <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
              <span class="animate-spin text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style="
                top: 50%;
              ">
                <span class="relative inline-flex rounded-full h-10 w-10 bg-gray-500"></span>
              </span>
          </div>
        </template>
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
    :selected="statusCurrent"
    @close="statusModalShow = false"
    @submit="onSubmitStatusModal"
  ></status-modal>
  <tracking-modal
    :show="trackingModalShow"
    :selected="trackingCurrent"
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
    :form="callLogsModalForm"
    @close="callLogsModalShow = false"
    @submit="onSubmitCallLogsModalForm"
  ></call-logs-modal>
</template>

<script>
import SearchFilter from '../components/SearchFilter.vue'
import Popover from '../components/Popover'
import Pagination from '../components/Pagination.vue'
import { clickOutside } from '@/plugins/directives'
import { HTTP } from '@/config/axios.js'
import { getToken, getUserDetail } from '@/config/utils.js'
import * as moment from 'moment/moment'
import StatusModal from '@/components/Modal/StatusModal.vue'
import TrackingModal from '@/components/Modal/TrackingModal.vue'
import CallLogsModal from '@/components/Modal/CallLogsModal.vue'
import ReportModal from '@/components/Modal/ReportModal.vue'
import debounce from 'lodash/debounce'
import authMixin from '@/config/auth.js'
import commonMixin from '@/config/common.js'

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
  mixins: [authMixin, commonMixin],
  data() {
    return {
      statusFeed: '',
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
        agent: 'เจ้าของ',
        owner: 'นายหน้า'
      },
      userDetail: getUserDetail('user'),
      allUser: {},
      params: {
        search: '',
        user_id_list: '',
        type: '',
        sort: 'date_desc',
        sortFav: {
          created_at: 'desc'
        },
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
        is_view: '',
        saleStatus: '',
        telStatus: '',
        property_id: '',
        property_name: ''
      },
      token: getToken('user'),
      statusCurrent: '',
      trackingCurrent: '',
      idCurrent: '',
      statusModalShow: false,
      trackingModalShow: false,
      reportModalShow: false,
      callLogsModalShow: false,
      callLogsModalForm: {
        contact: '',
        tel: '',
        note: '',
        logs: []
      },
      propertyList: [],
      isSearchingProperty: false,
      isSearchedProperty: false
    }
  },
  computed: {
    onSearchPropertySubmit() {
      return debounce(this.getPropertyName, 500)
    },
    isSearchPropertyResultShow() {
      return (
        this.params.property_name &&
        (this.isSearchedProperty || this.isSearchingProperty)
      )
    }
  },
  watch: {
    $route(to) {
      if (to.name === 'saved-list') {
        this.fetchData()
      }
    },
    'params.property_name'(to) {
      this.isSearchedProperty = false
      this.propertyList = []
      if (!to) this.onSearchPropertySubmit.cancel()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    onPropertySelect(property, close) {
      this.params.property_name = property.property_name
      this.params.property_id = property._id
      this.submitForm(this.params)
      close()
    },
    async getPropertyName() {
      this.isSearchingProperty = true
      const params = {
        type: 'current',
        search: this.params.search,
        page: 1,
        token: this.token
      }

      const {
        data: { dataList }
      } = await HTTP.get('api/property/getData', {
        params
      })

      this.propertyList = dataList
      this.isSearchingProperty = false
      this.isSearchedProperty = true
    },
    onSearchPropertyChange(event) {
      const { value } = event.target
      if (value) {
        this.onSearchPropertySubmit(value)
      }
    },
    fetchData() {
      this.statusFeed = ''
      HTTP.get('api/property/highlight/getDataListing', {
        params: Object.assign(this.params, {
          ...this.$route.query,
          token: this.token
        })
      }).then((response) => {
        this.a_lists = response.data.data
        this.es_type = response.data.es_type
        this.sourceList = { ...this.sourceList, ...response.data.es_source }
        this.total = response.data.total
        this.allUser[''] = 'All'
        this.allUser[response.data.admin_id] = this.userDetail.name
        this.allUser = {...this.allUser, ...response.data.team }
        this.statusFeed = 'success'
      })
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
      this.params = { ...query, ...params }
      delete this.params['token']
      this.$router.replace({ name: 'saved-list', query: this.params })
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
    toggleCallLogsModal(items) {
      if (!items.obj.tel) {
        const { value } = this.$swal.fire({
          icon: 'warning',
          title: 'กรุณาอัพเดตเบอร์โทร',
          width: 426,
          confirmButtonText: 'ตกลง',
          showCancelButton: false
        })
      } else {
        this.idCurrent = items.id
        HTTP.get('api/property/highlight/get_call_log', {
          params: {
            token: this.token,
            id: items.id
          }
        }).then((response) => {
          this.callLogsModalForm = {
            contact: items.obj.name,
            tel: items.obj.tel,
            note: '',
            logs: response.data.results
          }
          this.callLogsModalShow = true
        })
      }
    },
    onSubmitCallLogsModalForm(note) {
      try {
        if (note) {
          HTTP.post('api/property/highlight/call_log', {
            token: this.token,
            id: this.idCurrent,
            note: note
          }).then((response) => {
            this.idCurrent = ''
            this.callLogsModalForm = {
              contact: '',
              tel: '',
              note: '',
              logs: []
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.closeCallLogsModal()
    },
    onWarning() {
      const { value } = this.$swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        width: 426,
        confirmButtonText: 'ตกลง',
        showCancelButton: false
      })
    },
    onSubmitReportModal(payload) {
      try {
        if (
          payload.selected == '' ||
          (payload.selected == 'other' && payload.note == '')
        ) {
          return this.onWarning()
        } else {
          HTTP.post('api/property/highlight/log_report', {
            token: this.token,
            id: this.idCurrent,
            reason: payload.selected,
            content: payload.note
          }).then((response) => {
            this.idCurrent = ''
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.closeReportModal()
    },
    onSubmitTrackingModal(payload) {
      try {
        if (!payload) {
          return this.onWarning()
        } else {
          HTTP.post('api/property/highlight/appointment', {
            token: this.token,
            id: this.idCurrent,
            date: payload
          }).then((response) => {
            this.idCurrent = ''
            this.trackingCurrent = ''
            this.fetchData()
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.closeTrackingModal()
    },
    onSubmitStatusModal(payload) {
      try {
        if (!payload) {
          this.onWarning()
        } else {
          if (payload != this.statusCurrent) {
            HTTP.post('api/property/highlight/updateSaleStatus', {
              token: this.token,
              id: this.idCurrent,
              status: payload
            }).then((response) => {
              this.idCurrent = ''
              this.statusCurrent = ''
              this.fetchData()
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
      this.closeStatusModal()
    },
    setDataModalStatus(dataSetName, status, id) {
      if (status != '') {
        this[dataSetName + 'Current'] = status
      }
      this.idCurrent = id
      this[dataSetName + 'ModalShow'] = true
    },
    getDetailName(items, name) {
      const a_predict = items.a_predict
      const predict_name = a_predict[name] ? a_predict[name].join(', ') : ''
      const a_hilight = items.a_listing.hilight ? JSON.parse(items.a_listing.hilight) : []
      let hilight_name = a_hilight[name] ? a_hilight[name].join(', ') : predict_name
      return hilight_name ? hilight_name : '-'
    },
    sortData(type) {
      if(type == 'created_at') {
        delete this.params.sortFav['updated_at']
      }else{
        delete this.params.sortFav['created_at']
      }
      this.params.sortFav[type] = this.params.sortFav[type] == 'desc' ? 'asc' : 'desc'
      this.fetchData()
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

.autocomplete-container {
  max-height: 50vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b6a68f;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b6a68f;
  }
}
</style>
