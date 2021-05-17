<template>
  {{params}}
  {{searchForm}}
  <div class="flex flex-wrap -mx-2 mb-10">
    <div class="w-1/3 px-2 py-3">
      <base-select
        v-model="date"
        prefix-icon="calendar"
        label="ช่วงเวลา"
      ></base-select>
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
        :model-value="params.sa"
        @update:modelValue="params.saleStatus = $event"
      ></base-select>
    </div>

    <div class="flex w-1/4 px-2 py-3 items-end">
      <div class="flex space-x-2">
        <button
          class="btn-secondary rounded py-2 px-6"
        >ล้างข้อมูล</button>
        <button 
          class="btn-primary rounded py-2 px-6"
          @click="searchData(params)"
        >ตกลง</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from './Forms/BaseSelect.vue'
// import 'flatpickr/dist/flatpickr.css'
// import 'flatpickr/dist/themes/dark.css'

export default {
  components: {
    BaseSelect
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
    }
  },
  emits: ['update:submitForm'],
  data() {
    return {
      config: {
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
  methods: {
    setOption(items) {
      if(typeof items == 'undefined') {
        return [
          {
            label: 'select 1',
            value: 0
          },
          {
            label: 'select 2',
            value: 1
          },
          {
            label: 'select 3',
            value: 3
          }
        ]
      }
      return Object.keys(items).map((item) => {
        return {
          label: items[item],
          value: item
        }
      })
    },
    setOptionSwap(items) {
      if(typeof items == 'undefined') {
        return [
          {
            label: 'select 1',
            value: 0
          },
          {
            label: 'select 2',
            value: 1
          },
          {
            label: 'select 3',
            value: 3
          }
        ]
      }
      return Object.keys(items).map((item) => {
        return {
          value: items[item],
          label: this.convertText(item)
        }
      })
    },
    convertText(text) {
      let convertText = ''
      switch(text) {
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
    searchData(query) {
      this.$emit('update:submitForm', query)
    }
  }
}
</script>

<style lang="scss" scoped></style>
