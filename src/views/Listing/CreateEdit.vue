<template>
  <div class="flex flex-col bg-gray-500">
    <div class="flex items-center h-40">
      <div class="container mx-auto flex items-center">
        <div class="flex-grow">
          <router-link
            class="text-lg text-gold-500 font-bold underline"
            :to="{ name: 'saved-list' }"
            >Back</router-link
          >
          <div class="text-xl text-gray-200 mt-3">แก้ไขโครงการ</div>
        </div>
        <button class="btn-primary p-3 rounded w-1/5" @click="onSave()">
          บันทึกข้อมูล
        </button>
      </div>
    </div>
    <div class="w-1/2 pb-20 mx-auto">
      <!-- <div class="grid grid-cols-2 mb-7">
        <div class="font-medium text-gray-200 mb-2 col-span-2">แหล่งที่มา</div>
        <button
          class="flex items-center justify-center btn bg-white py-3 rounded text-gold-500 hover:bg-gray-100 active:bg-gray-200"
        >
          <vue-feather
            stroke-width="1"
            type="upload"
            class="mr-2"
          ></vue-feather>
          อัพโหลดไฟล์
        </button>
      </div> -->
      <div class="font-medium text-gray-200 mb-2 col-span-2 mb-4">โครงการ</div>
      <form class="space-y-8">
        <div class="grid grid-cols-2 gap-y-8 gap-x-10">
          <h3 class="text-gold-400 col-span-2">ข้อมูลที่พักอาศัย</h3>
          <div>
            <div class="font-medium text-gray-200 mb-2">ชื่อโครงการ</div>
            <input v-model="form.name" type="text" class="input-primary border-red-500" />
          </div>
          <div class="flex flex-col">
            <div class="font-medium text-gray-200 mb-2">แหล่งที่มา</div>
            <base-select
              v-model="form.comeFrom"
              :options="sourceList"
              :model-value="form.comeFrom"
              @update:modelValue="form.comeFrom = $event"
            ></base-select>
          </div>
          <div class="flex flex-col">
            <div class="font-medium text-gray-200 mb-2">ประเภทการซื้อขาย</div>
            <base-select
              v-model="form.type"
              additional-select-class="mt-auto"
              :options="es_type"
              :model-value="form.type"
              @update:modelValue="form.type = $event"
            ></base-select>
          </div>
          <div class="flex flex-col">
            <div class="font-medium text-gray-200 mb-2">เจ้าของ/นายหน้า</div>
            <base-select
              v-model="form.post_type"
              :options="setOption(contentOwnerList)"
              :model-value="form.post_type"
              @update:modelValue="form.post_type = $event"
            ></base-select>
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">ราคา</div>
            <div class="relative">
              <input
                v-model="form.price"
                type="text"
                class="input-primary pr-16"
              />
              <div
                class="absolute top-1/2 right-4 transform -translate-y-1/2 font-medium text-gray-300"
              >
                / เดือน
              </div>
            </div>
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">ย่าน</div>
            <input v-model="form.location" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">ขนาดห้อง</div>
            <div class="relative">
              <input
                v-model="form.size"
                type="text"
                class="input-primary pr-16"
              />
              <div
                class="absolute top-1/2 right-4 transform -translate-y-1/2 font-medium text-gray-300"
              >
                ตร.ม.
              </div>
            </div>
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">ประเภทห้อง</div>
            <input v-model="form.roomType" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">MRT/BTS</div>
            <input v-model="form.subway" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">แผนที่</div>
            <input v-model="form.map" type="text" class="input-primary" />
          </div>
          <div class="col-span-2">
            <div class="font-medium text-gray-200 mb-2">รายละเอียด</div>
            <textarea
              v-model="form.description"
              type="text"
              class="input-primary"
              rows="13"
            />
          </div>
          <div class="col-span-2">
            <div class="font-medium text-gray-200 mb-2">Original Link</div>
            <input v-model="form.original" type="text" class="input-primary" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-y-8 gap-x-10">
          <h3 class="text-gold-400 col-span-2">ผู้ติดต่อ</h3>
          <div>
            <div class="font-medium text-gray-200 mb-2">ชื่อผู้ติดต่อ</div>
            <input v-model="form.contact.author" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">เบอร์โทรศัพท์</div>
            <input v-model="form.contact.tel" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">อีเมล์</div>
            <input v-model="form.contact.email" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">LINE ID</div>
            <input v-model="form.contact.line" type="text" class="input-primary" />
          </div>
        </div>
        <div v-if="a_images.length > 0">
          <h3 class="text-gold-400 col-span-2 mb-8">
            รูปภาพ
            <span class="text-gray-200 text-base font-medium">({{a_images.length}}/20)</span>
          </h3>
          <div class="flex flex-wrap -mx-3">
            <div
              v-for="images in a_images"
              :key="images"
              class="w-1/4 px-3 py-2"
            >
             <img class="w-full h-48 object-cover" :src="images" />
            </div>
          </div>
          <!-- <div class="grid grid-cols-4"> -->
            <!-- <div
              class="flex flex-col items-center justify-center w-48 h-28 text-gray-200 border border-gray-400 rounded-xl add-image-bg cursor-pointer"
            >
              <vue-feather
                class="mb-1"
                type="plus-circle"
                stroke-width="1"
                size="32"
              ></vue-feather>
              <span>เพิ่มรูป</span>
            </div> -->
          <!-- </div> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/config/utils.js'
import { HTTP } from '@/config/axios.js'
import myMixin from '@/config/common.js'

export default {
  mixins: [myMixin],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    result(to) {
      const a_predict = to.a_predict
      const a_listing_obj = to.a_listing.addObj ? JSON.parse(to.a_listing.addObj) : []
      this.form = {
        type: a_listing_obj.t ? a_listing_obj.t : '',
        comeFrom: a_listing_obj.s ? a_listing_obj.s : '',
        map: a_listing_obj.map,
        description: to.a_listing.content,
        original: a_listing_obj.u,
        name: a_predict.name ? a_predict.name.join(', ') : '',
        price: a_predict.price ? a_predict.price.join(', ') : '',
        size: a_predict.size ? a_predict.size.join(', ') : '',
        roomType: a_predict.number_bedroom ? a_predict.number_bedroom.join(', ') : '',
        subway: a_predict.station ? a_predict.station.join(', ') : '',
        post_type: a_listing_obj.post_type,
        contact: {
          author: a_listing_obj.name,
          tel: a_listing_obj.tel,
          email: a_listing_obj.email,
          line: a_listing_obj.line_id
        }
      }
      this.a_images = to.a_images
    }
  },
  data() {
    return {
      params: {
        id: this.$route.params.id ? this.$route.params.id : '',
        token: getToken('user')
      },
      es_type: [],
      sourceList: [],
      result: '',
      form: {
        type: '',
        comeFrom: '',
        name: '',
        price: '',
        location: '',
        size: '',
        roomType: '',
        subway: '',
        map: '',
        description: '',
        original: '',
        post_type: '',
        contact: {
          author: '',
          tel: '',
          email: '',
          line: ''
        }
      },
      contentOwnerList: {
        agent: 'เจ้าของ',
        owner: 'นายหน้า'
      },
      a_images: []
    }
  },
  // validations: {
  //   form: {
  //     type: { required },
  //     comeFrom: { required },
  //     name: { required },
  //     price: { required },
  //     location: { required },
  //     size: { required },
  //     roomType: { required },
  //     subway: { required },
  //     map: { required },
  //     description: { required },
  //     original: { required },
  //     post_type: { required },
  //     contact: {
  //       author: { required },
  //       tel: { required },
  //       email: { required },
  //       line: { required }
  //     }
  //   },
  // },
  mounted() {
    if(this.isEdit) {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      HTTP.get('api/property/highlight/getListingId', {
        params: this.params
      }).then((response) => {
        this.result = response.data.data
        this.es_type = this.setOption(response.data.es_type)
        this.sourceList = this.setOptionSwap({ ...{'not line': 'not_line'}, ...response.data.es_source })
      })
    },
    
    async onSave() {
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
          console.log(value)
          console.log('submit api with payload here')
          // this.$router.push({ name: 'listing' })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-image-bg {
  transition: all 0.2s ease-out;
  background: rgba(67, 68, 75, 0.3);
  &:hover {
    background: rgba(67, 68, 75, 0.2);
  }
  &:active {
    background: rgba(67, 68, 75, 0.1);
  }
}
</style>
