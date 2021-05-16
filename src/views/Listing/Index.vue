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
        <div class="font-medium text-gold-500 mb-1">{{ name }}</div>
        <div class="text-xs text-gold-300">Admin 1</div>
      </div>
      <div class="px-2">
        <vue-feather class="text-dark-500" type="chevron-down"></vue-feather>
      </div>
    </div>
  </div>
  <search-filter></search-filter>
  <h5 class="text-gold-300 mb-6">Listing</h5>
  <div class="relative space-y-6">
    <card
      v-for="list in a_lists"
      :key="list.id"
      :items="list"
      :type="es_type[list.t]"
    ></card>
  </div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter.vue'
import { HTTP } from '@/config/axios.js'
import { getToken, getName } from '@/config/utils.js'

export default {
  components: {
    SearchFilter
  },
  data() {
    return {
      a_lists: [],
      es_type: {},
      name: getName('user'),
      params: {
        token: getToken('user'),
        search: '',
        user_id_list: '',
        type: '',
        sort: 'date_desc',
        comeFrom: '',
        page: 1,
        perpage: 50,
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
        is_listing: false,
        is_view: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      HTTP.get('property/highlight/getData', {
        params: this.params
      }).then((response) => {
        this.a_lists = response.data.data
        this.es_type = response.data.es_type
        // console.log(response.data)
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
