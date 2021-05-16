<template>
  <div class="flex flex-wrap -mx-2 mb-10">
    <div class="w-1/3 px-2 py-3">
      <base-select
        v-model="date"
        prefix-icon="calendar"
        label="ช่วงเวลา"
      ></base-select>
    </div>
    111
    {{ saleStatus }}
    <div class="w-1/3 px-2 py-3">
      <base-select v-model="dataType" label="ประเภทข้อมูล"></base-select>
    </div>
    <div class="w-1/3 px-2 py-3">
      <base-select v-model="source" label="แหล่งที่มา"></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select v-model="agent" label="เจ้าของ/นายหน้า"></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select v-model="telStatus" label="สถานะการโทร"></base-select>
    </div>
    <div class="w-1/4 px-2 py-3">
      <base-select v-model="saleStatus" label="สถานะการขาย"></base-select>
    </div>
    <div class="flex w-1/4 px-2 py-3 items-end">
      <div class="flex space-x-2">
        <button class="btn-secondary rounded py-2 px-6">ล้างข้อมูล</button>
        <button class="btn-primary rounded py-2 px-6">ตกลง</button>
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
  data() {
    return {
      config: {
        altInputClass: 'invisible',
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        altInput: true,
        dateFormat: 'Y-m-d'
      },
      searchForm: {
        search: '',
        user_id_list: '',
        type: '',
        sort: 'date_desc',
        comeFrom: '',
        perpage: 50,
        page: 1,
        hilight: '',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYWFjOWI2OGVhZDY4MWE5MGNkZTM5MCIsInNhbHQiOiI0OWI2YTk4My0zYzNhLTcyMWUtZWMzNi0zZDRkZGQ3YjQzNjYiLCJpYXQiOjE2MTk5NjAxNjksImV4cCI6MTYyMDA0NjU2OX0.qcaemkVl2rhpyewveXd9Wsbug_AbQf4T6VQIXFkEnTo',
        user_id: '',
        startDate: '',
        endDate: '',
        predict_type: '',
        is_listing: 1
      },
      date: '',
      dataType: '',
      source: '',
      agent: '',
      telStatus: '',
      saleStatus: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
