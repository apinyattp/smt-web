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
    :content-view-list="contentViewList"
    :my-listing-list="myListingList"
    :search-form="params"
    @update:submitForm="submitForm($event)"
  ></search-filter>
  <h5 class="text-gold-300 mb-6">Listing</h5>
  <div class="relative space-y-6">
    <card
      v-for="list in a_lists"
      :key="list.id"
      :items="list"
      :type="es_type[list.t]"
      :user_id="user_id"
      @id-changed="viewData($event)"
      @on-save="onAddList($event)"
    ></card>
  </div>
  <pagination
    class="mt-10 mb-40"
    :per-page="parseInt(params.perpage)"
    :total="parseInt(total)"
    :current="parseInt(params.page)"
    @page-changed="changePage($event)"
    @per-page-changed="changePerPage($event)"
  ></pagination>
</template>

<script>
import Popover from '@/components/Popover'
import { clickOutside } from '@/plugins/directives'
import SearchFilter from '@/components/SearchFilterList.vue'
import Pagination from '@/components/Pagination.vue'
import { HTTP } from '@/config/axios.js'
import { getToken, getUserDetail } from '@/config/utils.js'
import authMixin from '@/config/auth.js'
import commonMixin from '@/config/common.js'

export default {
  mixins: [authMixin, commonMixin],
  components: {
    SearchFilter,
    Pagination,
    Popover
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
      contentViewList: {
        1: 'ดูแล้ว',
        0: 'ยังไม่ดู'
      },
      myListingList: {
        0: 'Not My Listing',
        false: 'Listing'
      },
      contentOwnerList: {
        '': 'All',
        agent: 'เจ้าของ',
        owner: 'นายหน้า'
      },
      userDetail: getUserDetail('user'),
      cur_member: '',
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
        is_listing: 'false',
        is_view: '0',
        saleStatus: '',
        telStatus: ''
      },
      token: getToken('user'),
      idAddList: '',
      user_id: ''
    }
  },
  watch: {
    $route(to) {
      if (to.name === 'listing') {
        this.fetchData()
      }
    },
    idAddList(to) {
      this.addToMyList(to)
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      HTTP.get('api/property/highlight/getData', {
        params: Object.assign(this.params, {
          ...this.$route.query,
          token: this.token
        })
      }).then((response) => {
        this.a_lists = response.data.data
        this.es_type = response.data.es_type
        this.sourceList = { ...this.sourceList, ...response.data.es_source }
        this.total = response.data.total
        this.user_id = response.data.user_id
        this.cur_member = response.data.user_id
        // delete this.params['token']
        // this.$router.push({ query: this.params})
      })
    },
    submitForm(params) {
      let query = this.$route.query
      this.params = { ...query, ...params }
      delete this.params['token']
      this.$router.replace({ query: this.params })
    },
    viewData(id) {
      HTTP.post('api/property/highlight/updateView', {
        token: this.token,
        id: id,
        cur_member: this.cur_member
      }).then((response) => {})
    },
    onAddList(id) {
      this.idAddList = id
    },
    setHilight(obj) {
      if (typeof obj != 'undefined') {
        let hl = {
          buy_phase: obj.html.buy_phase,
          investment: obj.html.investment,
          is_owner: obj.html.is_owner,
          location: obj.html.location,
          name: obj.html.name,
          number_bedroom: obj.html.number_bedroom,
          price: obj.html.price,
          rent_phase: obj.html.rent_phase,
          rentout_phase: obj.html.rentout_phase,
          sell_phase: obj.html.sell_phase,
          sell_rentout_phase: obj.html.sell_rentout_phase,
          size: obj.html.size,
          soi: obj.html.soi,
          station: obj.html.station
        }
        return JSON.stringify(hl)
      }
      return ''
    },
    addToMyList(items) {
      HTTP.post('api/property/highlight/updateFav', {
        token: this.token,
        id: items.id,
        listing_content: items.c,
        listing_hilight: this.setHilight(items.hl),
        url: items.u,
        type: items.t,
        dt: items.dt,
        postType: items.type_agent ? items.type_agent : '',
        comeform: items.s
      }).then((response) => {
        this.$router.push({
          name: 'listing-edit',
          params: { id: items.id }
        })
        // window.location = '/listing'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.yes {
  top: 50%;
  transform: translateY(-50%);
}
</style>
