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
        <div class="font-medium text-gold-500 mb-1">Name Surname</div>
        <div class="text-xs text-gold-300">Admin 1</div>
      </div>
      <div class="px-2">
        <vue-feather class="text-dark-500" type="chevron-down"></vue-feather>
      </div>
    </div>
  </div>
  <search-filter></search-filter>
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-gold-300">My Listing</h3>
    <router-link
      :to="{ name: 'saved-list-create' }"
      class="btn-primary flex items-center leading-loose"
    >
      <vue-feather size="18" stroke-width="1" type="plus-square"></vue-feather>
      <span class="ml-2">สร้าง Listing ใหม่</span>
    </router-link>
  </div>
  <div class="table-wrapper rounded-lg">
    <table class="table-auto border-collapse w-full">
      <thead>
        <tr>
          <th>วันที่สร้าง</th>
          <th>ชื่อโครงการ</th>
          <th>ประเภท</th>
          <th>เจ้าของ</th>
          <th>โทรล่าสุด</th>
          <th>สถานะการขาย</th>
          <th>บันทึกล่าสุด</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 5" :key="n">
          <td>
            <div class="">12 เม.ย. 21</div>
            <div class="text-sm text-gold-500">Admin A</div>
          </td>
          <td>
            <div class="text-gold-200">ศุภาลัย</div>
            <div class="text-sm text-gray-300">ลาดพร้าว</div>
          </td>
          <td class="">ให้เช่า</td>
          <td class="text-center">คุณเอ</td>
          <td class="text-center">12 เม.ย. 21</td>
          <td class="text-center">ขายแล้ว</td>
          <td class="text-center">
            <vue-feather
              class=""
              stroke-width="1"
              type="clipboard"
            ></vue-feather>
          </td>
          <td>
            <div class="space-x-3">
              <button
                class="btn rounded-full py-3 px-6 hover:bg-gray-400 active:bg-gray-500"
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
              <button
                class="btn rounded-full py-3 px-6 hover:bg-gray-400 active:bg-gray-500"
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
      </tbody>
    </table>
  </div>
</template>

<script>
import SearchFilter from '../components/SearchFilter.vue'
export default {
  components: {
    SearchFilter
  }
}
</script>

<style lang="scss" scoped>
table {
  @apply font-medium;
  thead > tr > th {
    @apply font-medium text-gold-600 py-5;
  }
  tbody > tr > td {
    @apply py-5 px-6 text-gray-200;
  }
  tbody > tr:nth-child(even) {
    background: rgba(#43444b, 0.6);
  }
}

.table-wrapper {
  background: rgba(#232429, 0.6);
}
</style>
