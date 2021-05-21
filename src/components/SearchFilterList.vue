<template>
  <div class="flex flex-wrap -mx-2 mb-10">
    <div class="w-1/3 px-2 py-3">
      <datepicker
        v-model="date"
        prefix-icon="calendar"
        label="ช่วงเวลา"
        :model-value="params.startDate"
        @update:modelValue="selectDate($event)"
      ></datepicker>
    </div>
    <div class="w-1/3 px-2 py-3">
      <base-select
        v-model="params.type"
        :options="setOption(contentType)"
        label="ประเภทข้อมูล"
        :model-value="params.type"
        @update:modelValue="params.type = $event"
      ></base-select>
    </div>
    <div class="w-1/3 px-2 py-3">
      <base-select
        v-model="params.comeFrom"
        label="แหล่งที่มา"
        :options="setOptionSwap(sourceList)"
        :model-value="params.comeFrom"
        @update:modelValue="params.comeFrom = $event"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select
        v-model="params.predict_type"
        label="เจ้าของ/นายหน้า"
        :options="setOption(contentOwnerList)"
        :model-value="params.predict_type"
        @update:modelValue="params.predict_type = $event"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select
        v-model="params.is_view"
        :options="setOption(contentViewList)"
        label="ยังไม่ได้ดู/ดูแล้ว"
        :model-value="params.is_view"
        @update:modelValue="params.is_view = $event"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select
        v-model="params.is_listing"
        :options="setOption(myListingList)"
        label="My Listing"
        :model-value="params.is_listing"
        @update:modelValue="params.is_listing = $event"
      ></base-select>
    </div>

    <div class="flex w-1/4 px-2 py-3 items-end">
      <div class="flex space-x-2">
        <button class="btn-secondary rounded py-2 px-6" @click="clearData">
          ล้างข้อมูล
        </button>
        <button class="btn-primary rounded py-2 px-6" @click="searchData">
          ตกลง
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from './Forms/BaseSelect.vue'
import Datepicker from './Forms/Datepicker.vue'
import * as moment from 'moment/moment'

export default {
  components: {
    BaseSelect,
    Datepicker
  },
  props: {
    saleStausList: {
      type: Object,
      default: () => {}
    },
    contentType: {
      type: Object,
      default: () => {}
    },
    sourceList: {
      type: Object,
      default: () => {}
    },
    contentOwnerList: {
      type: Object,
      default: () => {}
    },
    contentViewList: {
      type: Object,
      default: () => {}
    },
    myListingList: {
      type: Object,
      default: () => {}
    },
    searchForm: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:submitForm'],
  data() {
    return {
      config: {
        mode: "range",
        altInputClass: 'invisible',
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d'
      },
      date: '',
      params: this.searchForm
    }
  },
  watch: {
    searchForm: {
      handler(to) {
        to.page = parseInt(to.page)
        to.perpage = parseInt(to.perpage)
        this.params = to
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setOption(items) {
      return Object.keys(items).map((item) => {
        return {
          label: items[item],
          value: item
        }
      })
    },
    setOptionSwap(items) {
      return Object.keys(items).map((item) => {
        return {
          value: items[item],
          label: this.convertText(item)
        }
      })
    },
    convertText(text) {
      let convertText = ''
      switch (text) {
        case 'facebook_group':
          convertText = 'facebook group'
          break
        case 'facebook_page':
          convertText = 'facebook page'
          break
        case 'baan.kaidee':
          convertText = 'kaidee'
          break
        default:
          convertText = text
      }
      return convertText
    },
    searchData() {
      this.params.page = 1
      this.$emit('update:submitForm', this.params)
    },
    selectDate(dateRange) {
      this.params.startDate = dateRange.start
      if(dateRange.end != 'Invalid Date') {
        this.params.endDate = dateRange.end
      }
    },
    clearData() {
      window.location = '/listing'
    }
  }
}
</script>

<style lang="scss" scoped></style>
