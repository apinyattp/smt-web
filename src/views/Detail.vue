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
          📌📌ให้เช่า The Nest Sukhumvit22 ชั้น6 ขนาด 29 ตร.ม 1 ห้องนอน...
        </h4>
      </div>
      <a class="flex items-center flex-initial text-gold-500" href="#">
        <vue-feather type="link" size="16" stroke-width="1"></vue-feather>
        <span class="font-bold ml-2 underline">Original Link</span>
      </a>
    </div>
  </div>
  <div class="flex container mx-auto mt-20 mb-24">
    <div class="w-3/12 space-y-10">
      <div>
        <div class="font-medium text-gray-200 mb-1">แหล่งที่มา</div>
        <div><img src="/img/brands/kaidee-s.svg" alt="" /></div>
      </div>
      <div>
        <div class="font-medium text-gray-200 mb-4">โครงการ</div>
        <ul class="flex flex-col text-gold-400 font-bold leading-6 w-52">
          <li
            class="cursor-pointer bg-gold-500 text-gold-200 py-2 px-5 rounded"
          >
            ข้อมูลที่พักอาศัย
          </li>
          <li class="cursor-pointer font-bold py-2 px-5">AI Prediction</li>
        </ul>
      </div>
    </div>
    <div class="w-9/12">
      <div class="space-y-16">
        <detail-section title="รายละเอียดโครงการ">
          <sub-section title="วันที่สร้าง" icon="file-plus">
            <div class="text-gray-100">14 เมษายน 2564</div>
          </sub-section>
          <sub-section title="รายละเอียด" icon="align-left">
            <pre class="whitespace-pre-line font-medium">
              {{ getContent() }}
            </pre>
          </sub-section>
          <sub-section title="รายละเอียดเจ้าของบ้าน" icon="align-left">
            <pre class="whitespace-pre-line font-medium">
              {{ getContent() }}
            </pre>
          </sub-section>
          <sub-section title="รูปภาพ (สูงสุด 20 รูป)" icon="align-left">
            <div class="flex flex-wrap -mx-3">
              <div v-for="n in 8" :key="n" class="w-1/4 px-3 py-2">
                <img class="w-full" src="/img/brands/kaidee-s.svg" />
              </div>
            </div>
          </sub-section>
        </detail-section>
        <detail-section title="AI Prediction Fields">
          <sub-section icon="percent">
            <template #custom>
              <div class="flex flex-grow items-center mb-10">
                <div class="flex flex-col">
                  <div class="text-gray-200 mb-2">ประเภทการซื้อขาย</div>
                  <div class="flex items-center">
                    <h2 class="text-green font-medium">ปล่อยเช่า</h2>
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
                  <h2 class="text-gray-100 font-medium">57%</h2>
                </div>
              </div>
            </template>
          </sub-section>
          <sub-section title="ราคา" icon="dollar-sign">
            <div class="text-gray-100">฿17,807 / เดือน</div>
          </sub-section>
          <sub-section title="ย่าน" icon="map-pin">
            <div class="text-gray-100">ดอนเมือง, ลาดพร้าว, บางนา</div>
          </sub-section>
          <sub-section title="ขนาดห้อง" icon="move">
            <div class="text-gray-100">48 ตารางเมตร</div>
          </sub-section>
          <sub-section title="ประเภทห้อง" icon="box">
            <div class="text-gray-100">2 ห้องนอน, 1 ห้องน้ำ</div>
          </sub-section>
          <sub-section title="MRT/BTS" icon="truck">
            <div class="text-gray-100">บางนา, ลาดพร้าว</div>
          </sub-section>
        </detail-section>
      </div>
    </div>
  </div>
</template>

<script>
import DetailSection from '../components/Detail/Section.vue'
import SubSection from '../components/Detail/SubSection.vue'
import getContent from '@/assets/mock/data'

export default {
  components: {
    DetailSection,
    SubSection
  },
  computed: {
    getContent() {
      return getContent
    }
  }
}
</script>

<style lang="scss" scoped></style>
