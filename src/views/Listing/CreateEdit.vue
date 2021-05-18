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
      <div class="grid grid-cols-2 mb-7">
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
      </div>
      <div class="font-medium text-gray-200 mb-2 col-span-2 mb-4">โครงการ</div>
      <form class="space-y-8">
        <div class="grid grid-cols-2 gap-y-8 gap-x-10">
          <h3 class="text-gold-400 col-span-2">ข้อมูลที่พักอาศัย</h3>
          <div>
            <div class="font-medium text-gray-200 mb-2">ชื่อโครงการ</div>
            <input v-model="form.name" type="text" class="input-primary" />
          </div>
          <div class="flex flex-col">
            <div class="font-medium text-gray-200 mb-2">ประเภทการซื้อขาย</div>
            <base-select additional-select-class="mt-auto"></base-select>
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
            <input v-model="form.author" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">เบอร์โทรศัพท์</div>
            <input v-model="form.tel" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">อีเมล์</div>
            <input v-model="form.email" type="text" class="input-primary" />
          </div>
          <div>
            <div class="font-medium text-gray-200 mb-2">LINE ID</div>
            <input v-model="form.line" type="text" class="input-primary" />
          </div>
        </div>
        <div>
          <h3 class="text-gold-400 col-span-2 mb-8">
            รูปภาพ
            <span class="text-gray-200 text-base font-medium">(0/20)</span>
          </h3>
          <div class="grid grid-cols-4">
            <div
              class="flex flex-col items-center justify-center w-48 h-28 text-gray-200 border border-gray-400 rounded-xl add-image-bg cursor-pointer"
            >
              <vue-feather
                class="mb-1"
                type="plus-circle"
                stroke-width="1"
                size="32"
              ></vue-feather>
              <span>เพิ่มรูป</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        dealType: '',
        price: '',
        location: '',
        size: '',
        roomType: '',
        subway: '',
        map: '',
        description: '',
        original: '',
        contact: {}
      }
    }
  },
  methods: {
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
          console.log('submit api with payload here')
          this.$router.push({ name: 'listing' })
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
