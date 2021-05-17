<template>
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
        v-model="dataType"
        :options="setOption(contentType)"
        label="ประเภทข้อมูล"
      ></base-select>
    </div>
    <div class="w-1/3 px-2 py-3">
      <base-select
        v-model="source"
        label="แหล่งที่มา"
        :options="setOption(sourceList)"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select
        v-model="agent"
        label="เจ้าของ/นายหน้า"
        :options="setOption(contentOwnerList)"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select
        v-model="telStatus"
        :options="setOption(contentTelList)"
        label="สถานะการโทร"
      ></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select
        v-model="saleStatus"
        :options="setOption(saleStausList)"
        label="สถานะการขาย"
      ></base-select>
    </div>

    <div class="flex w-1/4 px-2 py-3 items-end">
      <div class="flex space-x-2">
        <button class="btn-secondary rounded py-2 px-6">ล้างข้อมูล</button>
        <button 
          class="btn-primary rounded py-2 px-6"
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
    }
  },
  data() {
    return {
      config: {
        altInputClass: 'invisible',
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d'
      },
      // searchForm: {
      //   search: '',
      //   user_id_list: '',
      //   type: '',
      //   sort: 'date_desc',
      //   comeFrom: '',
      //   perpage: 50,
      //   page: 1,
      //   hilight: '',
      //   token:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYWFjOWI2OGVhZDY4MWE5MGNkZTM5MCIsInNhbHQiOiI0OWI2YTk4My0zYzNhLTcyMWUtZWMzNi0zZDRkZGQ3YjQzNjYiLCJpYXQiOjE2MTk5NjAxNjksImV4cCI6MTYyMDA0NjU2OX0.qcaemkVl2rhpyewveXd9Wsbug_AbQf4T6VQIXFkEnTo',
      //   user_id: '',
      //   startDate: '',
      //   endDate: '',
      //   predict_type: '',
      //   is_listing: 1
      // },
      date: '',
      dataType: '',
      source: '',
      agent: '',
      telStatus: '',
      saleStatus: ''
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
          label: this.convertText(items[item]),
          value: item
        }
      })
    },
    convertText(text) {
      let convertText = ''
      switch(text) {
        case 'fb_g':
          convertText = 'facebook group'
          break
        case 'fb_p':
          convertText = 'facebook page'
          break
        case 'baan.kaidee':
          convertText = 'kaidee'
          break
        default:
          convertText = text
      }
      return convertText
    }
  }
}
</script>

<style lang="scss" scoped></style>
