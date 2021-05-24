<template>
  <form ref="formData" class="space-y-8" @submit.prevent="onSave">
    <div class="flex flex-col bg-gray-500">
      <div class="flex items-center h-40">
        <div class="container mx-auto flex items-center">
          <div class="flex-grow">
            <a
              class="text-lg text-gold-500 font-bold underline"
              href="/saved-list"
            >
              Back
            </a>
            <!-- <router-link
              class="text-lg text-gold-500 font-bold underline"
              :to="{ name: 'saved-list' }"
              >Back</router-link
            > -->
            <div class="text-xl text-gray-200 mt-3">แก้ไขโครงการ</div>
          </div>
          <button class="btn-primary p-3 rounded w-1/5" type="submit">
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
          <div class="grid grid-cols-2 gap-y-8 gap-x-10">
            <h3 class="text-gold-400 col-span-2">ข้อมูลที่พักอาศัย</h3>
            <div>
              <div class="font-medium text-gray-200 mb-2">ชื่อโครงการ</div>
              <input
                v-model="name" type="text"
                :class="errors['name'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div class="flex flex-col">
              <div class="font-medium text-gray-200 mb-2">แหล่งที่มา</div>
              <base-select
                v-model="comeFrom"
                :options="setOptionSwap(sourceList)"
                :model-value="comeFrom"
                :additional-select-class="errors['comeFrom'] ? 'error' : ''"
                @update:modelValue="comeFrom = $event == 'All' ? '' : $event"
              ></base-select>
            </div>
            <div class="flex flex-col">
              <div class="font-medium text-gray-200 mb-2">ประเภทการซื้อขาย</div>
              <base-select
                v-model="type"
                :additional-select-class="errors['type'] ? 'mt-auto error' : 'mt-auto'"
                :options="setOption(es_type)"
                :model-value="type"
                @update:modelValue="type = $event == 'All' ? '' : $event"
              ></base-select>
            </div>
            <div class="flex flex-col">
              <div class="font-medium text-gray-200 mb-2">เจ้าของ/นายหน้า</div>
              <base-select
                v-model="post_type"
                :additional-select-class="errors['post_type'] ? 'error' : ''"
                :options="setOption(contentOwnerList)"
                :model-value="post_type"
                @update:modelValue="post_type = $event == 'All' ? '' : $event"
              ></base-select>
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-2">ราคา</div>
              <div class="relative">
                <input
                  v-model="price"
                  type="text"
                  :class="errors['price'] ? 'input-primary pr-16 error' : 'input-primary pr-16'"
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
              <input
                v-model="location"
                type="text"
                :class="errors['location'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-2">ขนาดห้อง</div>
              <div class="relative">
                <input
                  v-model="size"
                  type="text"
                  :class="errors['size'] ? 'input-primary pr-16 error' : 'input-primary pr-16'"
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
              <input
                v-model="roomType"
                type="text"
                :class="errors['roomType'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-2">MRT/BTS</div>
              <input
                v-model="subway"
                type="text"
                :class="errors['subway'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-2">แผนที่</div>
              <input
                v-model="map"
                type="text"
                :class="errors['map'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div class="col-span-2">
              <div class="font-medium text-gray-200 mb-2">รายละเอียด</div>
              <textarea
                v-model="description"
                type="text"
                :class="errors['description'] ? 'input-primary error' : 'input-primary'"
                rows="13"
              />
            </div>
            <div class="col-span-2">
              <div class="font-medium text-gray-200 mb-2">Original Link</div>
              <input
                v-model="original"
                type="text"
                :class="errors['original'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-y-8 gap-x-10">
            <h3 class="text-gold-400 col-span-2">ผู้ติดต่อ</h3>
            <div>
              <div class="font-medium text-gray-200 mb-2">ชื่อผู้ติดต่อ</div>
              <input
                v-model="author"
                type="text"
                :class="errors['author'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-2">เบอร์โทรศัพท์</div>
              <input
                v-model="tel"
                type="text"
                :class="errors['tel'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-2">อีเมล์</div>
              <input
                v-model="email"
                type="text"
                :class="errors['email'] ? 'input-primary error' : 'input-primary'"
              />
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-2">LINE ID</div>
              <input
                v-model="line"
                type="text"
                :class="errors['line'] ? 'input-primary error' : 'input-primary'"
              />
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
      </div>
    </div>
  </form>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { getToken } from '@/config/utils.js'
import { HTTP } from '@/config/axios.js'
import myMixin from '@/config/common.js'
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {},
  mixins: [myMixin],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {

    const router = useRouter()
    const route = useRoute()

    let attrs = ['name', 'price', 'location', 'size', 'roomType', 'subway', 'map', 'description', 'original', 'line', 'author', 'tel', 'email', 'line', 'comeFrom', 'type', 'post_type'] 
    let schema = {}
    for(const attr of attrs) {
      if(attr == 'author' || attr == 'line' || attr == 'subway' || attr == 'location') {
        schema[attr] = yup.string()
      }else if(attr == 'email') {
        schema[attr] = yup.string().email()
      }else if(attr == 'map') {
        schema[attr] = yup.string().url()
      }else if(attr == 'tel') {
        schema[attr] = yup.number().positive().integer().min(9).nullable(true)
      }else{
        schema[attr] = yup.string().required()
      }
    }
    const { handleSubmit, errors } = useForm({
      validationSchema: yup.object(schema),
    });

    const { value: name } = useField('name');
    const { value: price } = useField('price');
    const { value: location } = useField('location');
    const { value: size } = useField('size');
    const { value: roomType } = useField('roomType');
    const { value: subway } = useField('subway');
    const { value: map } = useField('map');
    const { value: description } = useField('description');
    const { value: original } = useField('original');
    const { value: author } = useField('author');
    const { value: tel } = useField('tel');
    const { value: email } = useField('email');
    const { value: line } = useField('line');
    const { value: comeFrom } = useField('comeFrom');
    const { value: type } = useField('type');
    const { value: post_type } = useField('post_type');

    const onSubmit = handleSubmit(submitData => {
      const a_entity = {
        price: submitData.price.split(','),
        location: submitData.location.split(','),
        name: submitData.name.split(','),
        size: submitData.size.split(','),
        number_bedroom: submitData.roomType.split(','),
        investment: [],
        buy_phase: [],
        sell_phase: [],
        rent_phase: [],
        rentout_phase: [],
        sell_rentout_phase: [],
        is_owner: [],
        soi: [],
        station: submitData.subway.split(','),
      }

      const params = {
        token: props.token,
        content: submitData.description,
        url: submitData.original,
        type: submitData.type,
        name: submitData.author,
        tel: submitData.tel,
        email: submitData.email,
        line_id: submitData.line,
        map: submitData.map
      }

      let urlPath = 'addDataListing'
      if(props.isEdit) {
        urlPath = 'updateListingData'
        params['id'] = route.params.id
        params['comeform'] = submitData.comeFrom
        params['post_type'] = submitData.post_type
        params['highlightData'] = {
          a_entity: JSON.stringify(a_entity)
        }
      }else{
        params['a_entity'] = JSON.stringify(a_entity)
        params['comeFrom'] = submitData.comeFrom
        params['postType'] = submitData.post_type
      }

      HTTP.post('api/property/highlight/' + urlPath, {
        ...params
      }).then((response) => {
        router.push({ name: 'saved-list' })
      })
    });

    return {
      name,
      price,
      location,
      size,
      roomType,
      subway,
      map,
      description,
      original,
      author,
      tel,
      email,
      line,
      comeFrom,
      type,
      post_type,
      onSubmit,
      errors
    };
  },
  watch: {
    result(to) {
      const a_hilight = to.a_listing.hilight ? JSON.parse(to.a_listing.hilight) : []
      const a_predict = to.a_predict
      const a_listing_obj = to.a_listing.addObj ? JSON.parse(to.a_listing.addObj) : []
      const mapPredict = { 
        name : a_predict.name ? a_predict.name.join(', ') : '',
        location : a_predict.location ? a_predict.location.join(', ') : '',
        price : a_predict.price ? a_predict.price.join(', ') : '',
        size : a_predict.size ? a_predict.size.join(', ') : '',
        roomType : a_predict.number_bedroom ? a_predict.number_bedroom.join(', ') : '',
        subway : a_predict.station ? a_predict.station.join(', ') : '',
      }

      this.type = a_listing_obj.t ? a_listing_obj.t : ''
      this.comeFrom = a_listing_obj.s ? a_listing_obj.s : ''
      this.map = a_listing_obj.map
      this.description = to.a_listing.content
      this.original = a_listing_obj.u
      this.name = a_hilight.name ? a_hilight.name.join(', ') : mapPredict.name
      this.location = a_hilight.location ? a_hilight.location.join(', ') : mapPredict.location
      this.price = a_hilight.price ? a_hilight.price.join(', ') : mapPredict.price
      this.size = a_hilight.size ? a_hilight.size.join(', ') : mapPredict.size
      this.roomType = a_hilight.number_bedroom ? a_hilight.number_bedroom.join(', ') : mapPredict.roomType
      this.subway = a_hilight.station ? a_hilight.station.join(', ') : mapPredict.subway
      this.post_type = a_listing_obj.post_type
      this.author = a_listing_obj.name ? a_listing_obj.name : this.name
      this.tel = a_listing_obj.tel ? a_listing_obj.tel : null
      this.email = a_listing_obj.email
      this.line = a_listing_obj.line_id
      this.a_images = to.a_images
    }
  },
  data() {
    return {
      params: {
        id: this.$route.params.id ? this.$route.params.id : '',
        token: this.token
      },
      es_type: {
        buy: 'buy',
        sell: 'sell',
        rent: 'หาเช่า',
        rentout: 'ปล่อยเช่า',
        unknown: 'unknown',
        sell_or_rentout: 'sell or rentout',
        not_relate: 'not relate'
      },
      sourceList: {
        facebook_group: 'fb_g',
        baan_kaidee: 'baan.kaidee',
        line: 'line',
        zmyhome: 'zmyhome'
      },
      result: '',
      contentOwnerList: {
        agent: 'เจ้าของ',
        owner: 'นายหน้า'
      },
      a_images: []
    }
  },
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
        if(this.isEdit && response.data.status == 'fail') {
          router.push({ name: 'saved-list' })
        }
        this.result = response.data.data
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
         return this.onSubmit();
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  --tw-border-opacity: 1;
  border-color: rgba(220, 38, 38, var(--tw-border-opacity));
}
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
