<template>
  <div class="flex items-center h-40 bg-gray-500">
    <div class="container mx-auto flex items-center">
      <div class="flex-grow">
        <router-link
          class="text-gold-500 font-bold underline"
          :to="{ name: 'listing' }"
          >Back</router-link
        >
        <h4 class="text-gray-200 mt-3">
          {{ result.c ? result.c.slice(0, 190) + '...' : ''}}
        </h4>
      </div>
      <a class="flex items-center flex-initial text-gold-500" :href="result.u" target="_blank">
        <vue-feather type="link" size="16" stroke-width="1"></vue-feather>
        <span class="font-bold ml-2 underline">Original Link</span>
      </a>
    </div>
  </div>
  <div class="flex container mx-auto mt-20 mb-24">
    <div class="w-3/12 space-y-10">
      <div>
        <div class="font-medium text-gray-200 mb-1">แหล่งที่มา</div>
        <div><img :src="'/img/brands/' + result.s + '.png'" alt="" /></div>
      </div>
      <div>
        <div class="font-medium text-gray-200 mb-4">โครงการ</div>
        <ul class="flex flex-col text-gold-400 font-bold leading-6 w-52">
          <li
            class="cursor-pointer bg-gold-500 text-gold-200 py-2 px-5 rounded"
            @click="scrollTo('propertyDetail')"
          >
            ข้อมูลที่พักอาศัย
          </li>
          <li
            class="cursor-pointer font-bold py-2 px-5"
            @click="scrollTo('aiPredict')"
          >AI Prediction</li>
        </ul>
      </div>
    </div>
    <div class="w-9/12">
      <div class="space-y-16">
        <div ref="propertyDetail">
          <detail-section title="รายละเอียดโครงการ">
            <sub-section title="วันที่สร้าง" icon="file-plus">
              <div class="text-gray-100">{{ convertDate }}</div>
            </sub-section>
            <sub-section title="รายละเอียด" icon="align-left">
              <pre class="whitespace-pre-line font-medium">
                {{result.c}}
              </pre>
            </sub-section>
            <sub-section title="รายละเอียดเจ้าของบ้าน" icon="align-left">
              <pre class="whitespace-pre-line font-medium">
                {{postDetail}}
              </pre>
            </sub-section>
            <sub-section title="รูปภาพ (สูงสุด 20 รูป)" icon="align-left">
              <div class="flex flex-wrap -mx-3">
                <div v-for="images in getImages" :key="images" class="w-1/4 px-3 py-2">
                  <!-- <img class="w-full h-48 object-cover" :src="images.sizes.original.link" v-if="images.sizes.original" /> -->
                </div>
              </div>
            </sub-section>
          </detail-section>
        </div>
        <div ref="aiPredict">
          <detail-section title="AI Prediction Fields">
            <sub-section icon="percent">
              <template #custom>
                <div class="flex flex-grow items-center mb-10">
                  <div class="flex flex-col">
                    <div class="text-gray-200 mb-2">ประเภทการซื้อขาย</div>
                    <div class="flex items-center">
                      <h2 class="text-green font-medium">{{convertType}}</h2>
                      <vue-feather
                        class="text-red ml-1 pt-2"
                        type="alert-triangle"
                        size="15"
                      ></vue-feather>
                    </div>
                  </div>
                  <div class="text-gray-300 mx-6">/</div>
                  <div class="flex flex-col">
                    <div class="text-gray-200 mb-2">
                      เปอร์เซ็นต์การเป็นเจ้าของ
                    </div>
                    <h2 class="text-gray-100 font-medium">{{percentOwner}}%</h2>
                  </div>
                </div>
              </template>
            </sub-section>
            <sub-section title="ราคา" icon="dollar-sign">
              <div class="text-gray-100">{{ a_predict['price'].length > 0 ? '฿' + a_predict['price'].join(', ') : '-'}}</div>
            </sub-section>
            <sub-section title="ย่าน" icon="map-pin">
              <div class="text-gray-100">{{ a_predict['location'].length > 0 ? a_predict['location'].join(', ') : '-'}}</div>
            </sub-section>
            <sub-section title="ขนาดห้อง" icon="move">
              <div class="text-gray-100">{{ a_predict['size'].length > 0 ? a_predict['size'].join(', ') : '-'}}</div>
            </sub-section>
            <sub-section title="ประเภทห้อง" icon="box">
              <div class="text-gray-100">{{ a_predict['number_bedroom'].length > 0 ? a_predict['number_bedroom'].join(', ') : '-'}}</div>
            </sub-section>
            <sub-section title="MRT/BTS" icon="truck">
              <div class="text-gray-100">{{ a_predict['station'].length > 0 ? a_predict['station'].join(', ') : '-'}}</div>
            </sub-section>
          </detail-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailSection from '../components/Detail/Section.vue'
import SubSection from '../components/Detail/SubSection.vue'
import { HTTP } from '@/config/axios.js'
import { getToken, getUserDetail } from '@/config/utils.js'
import * as moment from 'moment/moment'
// import getContent from '@/assets/mock/data'

export default {
  components: {
    DetailSection,
    SubSection
  },
  data() {
    return {
      userDetail: getUserDetail('user'),
      result: '',
      a_predict: {
        buy_phase: [],
        investment: [],
        is_owner: [],
        location: [],
        name: [],
        number_bedroom: [],
        price: [],
        rent_phase: [],
        rentout_phase: [],
        sell_phase: [],
        sell_rentout_phase: [],
        size: [],
        soi: [],
        station: [],
      },
      params: {
        id: this.$route.params.id,
        token: getToken('user')
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    convertDate() {
      moment.locale('th')
      return moment(this.result.dt).add(543, 'year').format('LL')
    },
    postDetail() {
      let uDetail = this.result.f ? JSON.parse(this.result.f) : []
      let detail = []
      for(const ukey in uDetail) {
        if(uDetail[ukey] != '') {
          detail.push(ukey + ' : ' + uDetail[ukey])
        }
      }
      return detail.join(' ,')
    },
    convertType() {
      if (this.result.t == 'buy') return 'ซื้อ'
      if (this.result.t == 'sell') return 'ขาย'
      if (this.result.t == 'sell') return 'ขาย'
      if (this.result.t == 'rentout') return 'ให้เช่า'
      if (this.result.t == 'rentout') return 'เช่า'
      if (this.result.t == 'sell_or_rentout') return 'ขายหรือให้เช่า'
      if (this.result.t == 'unknown') return 'ไม่สามารถระบุได้'
      return 'ไม่เกี่ยวข้อง'
    },
    percentOwner() {
      const isAgent = this.result.type_agent
      let percent = Math.round(this.result.type_agent_scored * 100)
      if(isAgent == 'agent') {
        percent = 100 - percent
      }
      return percent
    },
    getImages() {
      if(this.result.s != 'baan.kaidee') return 'd'
      let a_images = typeof this.result.d !== 'undefined' ? JSON.parse(this.result.d) : []
      return a_images.ad.images
    }
  },
  methods: {
    fetchData() {
      HTTP.get('get_detail', {
        params: this.params
      }).then((response) => {
        this.result = response.data.results.hits[0]._source
        this.predictData()
      })
    },
    predictData() {
      HTTP.post('api/property/highlight/predict', {
        content: this.result.c,
        token: this.params.token,
        id: this.params.id
      }).then((response) => {
        for(const items of response.data.data){
          if(items.textExtraction.textSegment.content && items.textExtraction.textSegment.content != '') {
            this.a_predict[items.displayName].push(items.textExtraction.textSegment.content)
          }
        }
      })
    },
    scrollTo(refName) {
      let element = this.$refs[refName];
      element.scrollIntoView({behavior: 'smooth'});
    }
  }
}
</script>

<style lang="scss" scoped></style>
