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
        <button class="btn-secondary">ล้างข้อมูล</button>
        <button class="btn-primary">ตกลง</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from './Forms/BaseSelect.vue'

export default {
  components: {
    BaseSelect
  },
  data() {
    return {
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
