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
        v-model="search"
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
        <div class="font-medium text-gold-500 mb-1">{{ userDetail.name }}</div>
        <div class="text-xs text-gold-300">{{ userDetail.role }}</div>
      </div>
      <div class="px-2">
        <vue-feather class="text-dark-500" type="chevron-down"></vue-feather>
      </div>
    </div>
  </div>
  <search-filter
    :source-list="sourceList"
    :content-owner-list="contentOwnerList"
    :content-type="es_type"
    :content-view-list="contentViewList"
    :my-listing-list="myListingList"
    :search-form="params"
    :default-form="paramDefault"
    @update:submitForm="submitForm"
  ></search-filter>
  <h5 class="text-gold-300 mb-6">Listing</h5>
  <div class="relative space-y-6">
    <card
      v-for="list in a_lists"
      :key="list.id"
      :items="list"
      :type="es_type[list.t]"
    ></card>
  </div>
  <pagination
    class="mt-10 mb-40"
    :perPage="params.perpage"
    :total="total"
  ></pagination>
</template>

<script>
import router from '@/router'
import SearchFilter from '@/components/SearchFilterList.vue'
import Pagination from '@/components/Pagination.vue'
import { HTTP } from '@/config/axios.js'
import { getToken, getUserDetail } from '@/config/utils.js'

export default {
  components: {
    SearchFilter,
    Pagination
  },
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
        1: 'My Listing',
        0: 'Listing'
      },
      // saleStatusList: {
      //   sold: 'ขายแล้ว',
      //   avaliable: 'ว่าง',
      //   cancel: 'ยกเลิก'
      // },
      contentOwnerList: {
        agent: 'agent',
        owner: 'owner'
      },
      userDetail: getUserDetail('user'),
      params: {},
      paramDefault: {
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
        is_listing: '0',
        is_view: '0',
        saleStatus: '',
        telStatus: '',
        token: getToken('user')
      }
    }
  },
  watch: {
    $route() {
      this.fetchData()
    }
  },
  created() {
    this.params = this.$route.query
    this.search = this.params.search
    if(typeof this.params.type === 'undefined') {
      this.params = this.paramDefault
      router.push({ path: 'listing', query: this.params})
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      HTTP.get('property/highlight/getData', {
        params: this.$route.query
      }).then((response) => {
        this.a_lists = response.data.data
        this.es_type = response.data.es_type
        this.sourceList = { ...this.sourceList, ...response.data.es_source }
        this.total = response.data.total
      })
    },
    submitForm(params) {
      params.search = this.search
      router.push({ path: 'listing', query: params})
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
