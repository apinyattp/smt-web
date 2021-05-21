<template>
  <div class="relative">
    <div
      v-if="checkIsView()"
      class="absolute -right-0.5 -top-0.5"
    >
      <span class="flex h-4 w-4">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-50"
        ></span>
        <span class="relative inline-flex rounded-full h-4 w-4 bg-green"></span>
      </span>
    </div>
    <div
      class="h-96 bg-gray-600 bg-opacity-50 rounded-3xl shadow-md flex items-center overflow-hidden"
    >
      <div class="w-1/5 flex-shrink-0 p-5 bg-gray-600 bg-opacity-60 h-full">
        <div class="flex flex-col h-full">
          <div>
            <img
              class="mx-auto p-9"
              :src="'/img/brands/' + itemsData.s + '.png'"
              alt="Kaidee Logo"
            />
            <div
              class="flex items-center justify-center space-x-2 text-gray-200 w-full -mt-3"
            >
              <vue-feather type="link" size="18"></vue-feather>
              <a
                :href="itemsData.u"
                class="font-bold underline"
                target="_blank"
                @click="clickDetail(itemsData.id)"
                >Original Link</a
              >
            </div>
          </div>
          <div class="mt-auto mb-8 space-y-1">
            <div class="text-green font-bold text-lg text-center">
              {{ filterType }}
            </div>
            <div
              class="flex text-gray-200 items-center space-x-2 justify-center"
            >
              <vue-feather type="alert-triangle"></vue-feather>
              <a href="#" class="font-medium">แจ้งผิดประเภท</a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col flex-grow p-8 h-full relative">
        <div class="content relative overflow-hidden">
          <pre
            class="text-gold-300 font-medium leading-7 line-clamp-10 whitespace-pre-line pr-24"
            >{{ itemsData.c }}</pre
          >
          <div class="absolute right-0 top-0">
            <span class="text-sm text-gray-300">{{ convertDate }}</span>
          </div>
        </div>
        <div class="flex -mx-3 text-gold-500 font-bold justify-end mt-auto">
          <router-link
            class="flex items-center px-3"
            :to="{ name: 'listing-detail', params: { id: itemsData.id } }"
          >
            <vue-feather type="eye" stroke-width="1"></vue-feather>
            <span class="ml-2">More details</span>
          </router-link>
          <div class="flex items-center px-3">
            <vue-feather type="plus-square" stroke-width="1"></vue-feather>
            <span class="ml-2" @click="onAddList()"> {{ itemsData.a_listing && itemsData.a_listing == 1 ? 'Remove' : 'Add to' }} my listing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment/moment'
import { HTTP } from '@/config/axios.js'

export default {
  name: 'Card',
  props: {
    items: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    user_id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      itemsData: Object.assign({}, this.items)
    }
  },
  computed: {
    convertDate() {
      moment.locale('th')
      return moment(this.itemsData.dt).add(543, 'year').format('ll')
    },
    filterType() {
      if (this.type == 'buy') return 'ซื้อ'
      if (this.type == 'sell') return 'ขาย'
      return this.type
    }
  },
  methods: {
    checkIsView() {
      if(!this.itemsData.member_view) return true
      const spiltData = this.itemsData.member_view.split(',')
      if(spiltData.includes(this.user_id)) {
        return false
      }
      return true
    },
    clickDetail(id) {
      this.$emit('id-changed', id)
    },
    async onAddList() {
      const { value } = await this.$swal.fire({
        icon: 'info',
        title: 'กรุณา “บันทึกข้อมูล” ก่อนออกจากหน้านี้',
        width: 426,
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
        showCancelButton: true
      })
      if (value) {
        try {
          this.$emit('on-save', this.itemsData)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content pre {
  font-family: 'Anuphan' !important;
}
</style>
