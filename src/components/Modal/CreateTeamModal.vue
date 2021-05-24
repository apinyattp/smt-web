<template>
  <transition appear name="slide-fade" mode="out-in">
    <div
      v-if="show"
      class="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-70 flex items-center justify-center"
    >
      <div class="flex flex-col bg-dark-600 rounded-2xl p-6 modal-width">
        <vue-feather
          class="text-gold-300"
          stroke-width="1"
          size="32"
          type="user-plus"
        ></vue-feather>
        <div class="mt-2">
          <div class="text-lg text-gold-400 font-bold">ข้อมูล user</div>
          <div
            class="flex flex-col space-y-2 mt-4 font-medium text-gold-200 mt-4"
          >
            <div class="text-sm text-gray-200 font-medium">ชื่อ</div>
            <input
              type="text"
              v-model="form.name"
              class="font-medium block w-full py-3 pl-4 sm:text-sm border-gold-600 rounded-lg placeholder-gold-500 hover:border-gold-600 focus:border-gold-500 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300 bg-op"
              :class="errorName"
            />
            <div class="text-sm text-gray-200 font-medium">อีเมล์</div>
            <input
              type="email"
              v-model="form.email"
              class="font-medium block w-full py-3 pl-4 sm:text-sm border-gold-600 rounded-lg placeholder-gold-500 hover:border-gold-600 focus:border-gold-500 focus:ring-0 transition-colors duration-200 ease-in-out text-gold-300 bg-op"
              :class="errorEmail"
            />
          </div>
          <div class="grid grid-cols-2 gap-x-2 mt-6">
            <button
              class="btn rounded font-medium btn-primary py-3"
              @click="$emit('close')"
            >
              ยกเลิก
            </button>
            <button
              class="btn rounded font-medium bg-white text-gold-400 py-3"
              @click="submitData()"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import Modal from './BaseModal.vue'
import * as moment from 'moment/moment'

export default {
  components: {
    Modal
  },
  inheritAttrs: false,
  emits: ['close', 'submit'],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
          name: '',
          email: ''
      },
      errorName: '',
      errorEmail: ''
    }
  },
  watch: {
    'form.name'(to) {
      this.errorName = !to ? 'error' : ''
    },
    'form.email'(to) {
      const vEmail = this.validateEmail(to)
      this.errorEmail = !to || !vEmail ? 'error' : ''
    }
  },
  methods: {
    submitData() {
      if(this.form.name == '' || !this.form.email) {
        if(this.form.name == '') this.errorName = 'error'
        if(this.form.email == '') this.errorEmail = 'error'
        return
      }
      this.$emit('submit', this.form)
      this.form = {
          name: '',
          email: ''
      }
    },
    validateEmail(email) {
      if(!email) return false
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  --tw-border-opacity: 1;
  border-color: rgba(220, 38, 38, var(--tw-border-opacity));
}

.bg-op {
  background: rgba(35, 36, 41, 0.3);
}

table.call-logs-table {
  th {
    @apply font-medium;
  }
}

.modal-width {
  width: 618px;
}
</style>
