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
    <div class="w-1/5 px-2 py-3">
      <base-select
        v-model="params.user_id_list"
        :options="setOption(teamsList)"
        label="เพื่อนร่วมทีม"
        :model-value="params.user_id_list"
        @update:modelValue="params.user_id_list = $event"
      ></base-select>
    </div>
    <div class="w-1/5 px-2 py-3">
      <base-select
        v-model="params.type"
        :options="setOption(contentType)"
        label="ประเภทข้อมูล"
        :model-value="params.type"
        @update:modelValue="params.type = $event"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
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
        v-model="params.telStatus"
        :options="setOption(contentTelList)"
        label="สถานะการโทร"
        :model-value="params.telStatus"
        @update:modelValue="params.telStatus = $event"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select
        v-model="params.saleStatus"
        :options="setOption(saleStausList)"
        label="สถานะการขาย"
        :model-value="params.saleStatus"
        @update:modelValue="params.saleStatus = $event"
      ></base-select>
    </div>

    <div class="flex flex-grow px-2 py-3 items-end">
      <div class="flex w-full space-x-2">
        <button
          class="btn-secondary rounded py-2 px-6 flex-1"
          @click="clearData"
        >
          ล้างข้อมูล
        </button>
        <button
          class="btn-primary rounded py-2 px-6 flex-1"
          @click="searchData(params)"
        >
          ตกลง
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from './Forms/BaseSelect.vue'
import Datepicker from './Forms/Datepicker.vue'
import myMixin from '@/config/common.js'
// import 'flatpickr/dist/flatpickr.css'
// import 'flatpickr/dist/themes/dark.css'

export default {
  components: {
    BaseSelect,
    Datepicker
  },
  mixins: [myMixin],
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
    contentTelList: {
      type: Object,
      default: () => {}
    },
    searchForm: {
      type: Object,
      default: () => {}
    },
    defaultForm: {
      type: Object,
      default: () => {}
    },
    teamsList: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:submitForm'],
  data() {
    return {
      config: {
        mode: 'range',
        altInputClass: 'invisible',
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d'
      },
      date: '',
      params: this.searchForm,
      defaultParams: this.defaultForm
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
    clearData() {
      window.location = '/saved-list'
    }
  }
}
</script>

<style lang="scss" scoped></style>
