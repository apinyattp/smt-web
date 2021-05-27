<template>
  <div class="flex justify-between items-center mb-24">
    <div class="w-1/3 relative"></div>
    <popover>
      <template #default="{ isOpen, toggler, close }">
        <div
          v-click-outside="close"
          class="flex flex-col items-center relative"
          @click="toggler"
        >
          <div
            class="flex border overflow-hidden items-center cursor-pointer transition"
            :class="
              isOpen
                ? 'rounded-t-lg border-gold-400 bg-gray-600 profile-border-bottom'
                : 'rounded-lg border-gray-300 bg-dark-700'
            "
          >
            <div class="h-14 w-14">
              <img
                src="/img/sherman-tree.svg"
                class="h-full w-full object-contain"
              />
            </div>
            <div class="py-2 px-4">
              <div class="font-medium text-gold-500 mb-1 w-28 truncate">
                {{ userDetail.name }}
              </div>
              <div class="text-xs text-gold-300 capitalize">
                {{ userDetail.role }}
              </div>
            </div>
            <div class="px-2">
              <vue-feather
                class="text-dark-500"
                type="chevron-down"
              ></vue-feather>
            </div>
            <transition appear name="slide-fade" mode="out-in">
              <div
                v-if="isOpen"
                class="w-full bg-gray-600 absolute top-full bg-white border border-gold-400 divide-y divide-gray-100 rounded-b-lg shadow-lg outline-none border-t-0 left-0"
              >
                <div class="py-1">
                  <div
                    class="text-gray-300 text-gold-300 flex justify-between w-full px-4 py-3 text-sm leading-5 text-left cursor-pointer font-medium hover:bg-dark-600 transition ease-in-out focus:bg-dark-500"
                    @click.stop="onLogout(close)"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </template>
    </popover>
  </div>
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-gold-300">My Team</h3>
    <button
      v-if="!isLimit && is_head == '1' "
      class="btn-primary rounded py-2 px-6 flex items-center leading-loose"
      @click="toggleCreateTeamModal()"
    >
      <vue-feather size="18" stroke-width="1" type="plus-square"></vue-feather>
      <span class="ml-2">สร้าง Team ใหม่</span>
    </button>
  </div>
  <div class="table-wrapper rounded-lg mb-12">
    <table class="my-saved-list-table table-fixed border-collapse w-full">
      <thead>
        <tr>
          <th class="w-1/4">ลำดับ</th>
          <th class="w-1/2">ชื่อ</th>
          <th class="w-1/2" v-if="is_head == '1'"></th>
          <th class="w-1/4" v-else></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="statusFeed">
          <tr v-for="(name, id, index) in a_lists" class="text-center">
            <td>
              <div class="">
                {{index + 1}}
              </div>
            </td>
            <td>
              <div class="text-gold-200">
                {{ name }}
              </div>
            </td>
            <td class="float-right" v-if="is_head == '1' && id != userId">
              <div class="flex space-x-3">
                <button
                  class="btn bg-gray-500 rounded-full py-3 px-6 hover:bg-gray-400 active:bg-gray-500"
                  @click="toggleTransferModal(id, name)"
                >
                  <div class="flex items-center">
                    <span class="mr-2">โอนสิทธิ์</span>
                    <vue-feather
                      stroke-width="1"
                      type="refresh-cw"
                      size="20"
                    ></vue-feather>
                  </div>
                </button>
                <button
                  class="btn bg-gray-500 rounded-full py-3 px-6 hover:bg-gray-400 active:bg-gray-500"
                  @click="toggleNotiModal(id, name)"
                >
                  <div class="flex items-center">
                    <span class="mr-2">แจ้งเตือน</span>
                    <vue-feather
                      stroke-width="1"
                      type="alert-circle"
                      size="20"
                    ></vue-feather>
                  </div>
                </button>
              </div>
            </td>
            <td v-else></td>
          </tr>
        </template>
        <loading-overlay :is-loading="!statusFeed"></loading-overlay>
      </tbody>
    </table>
  </div>
  <create-team-modal
    :show="createTeamModalShow"
    @close="createTeamModalShow = false"
    @submit="onSubmitCreateTeamModalForm"
  ></create-team-modal>
</template>

<script>
import Popover from '../components/Popover'
import { clickOutside } from '@/plugins/directives'
import { HTTP } from '@/config/axios.js'
import { getToken, getUserDetail } from '@/config/utils.js'
import * as moment from 'moment/moment'
import authMixin from '@/config/auth.js'
import CreateTeamModal from '@/components/Modal/CreateTeamModal.vue'

export default {
  components: {
    Popover,
    CreateTeamModal
  },
  directives: { clickOutside },
  mixins: [authMixin],
  data() {
    return {
      statusFeed: '',
      a_lists: [],
      token: getToken('user'),
      userDetail: getUserDetail('user'),
      is_head: '',
      userId: '',
      createTeamModalShow: false,
      isLimit: false
    }
  },
  computed: {},
  watch: {
    $route(to) {
      if (to.name === 'my-team') {
        this.fetchData()
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.statusFeed = ''
      HTTP.get('api/user/getMyTeam', {
        params: {
          token: this.token
        }
      }).then((response) => {
        this.a_lists = response.data.data
        const objectLength = Object.getOwnPropertyNames(this.a_lists);
        if(objectLength.length >=5) {
          this.isLimit = true
        }
        this.is_head = response.data.is_head
        this.userId = response.data.admin_id
        this.statusFeed = 'success'
      })
    },
    async toggleTransferModal(id, name) {
        const { value } = await this.$swal.fire({
          icon: 'question',
          title: 'กรุณากด "ตกลง" หากคุณต้องการโอนสิทธิ์ให้กับ ' + name,
          width: 426,
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true
        })
        if(value) {
          HTTP.post('api/user/transferTeam', {
            token: this.token,
            id: id
          }).then((response) => {
            if(response.data.status == 'fail') {
              return this.notiAlert('error', 'โอนสิทธิ์ไม่สำเร็จ')
            }else{
              window.location = '/my-team'
            }
          })
        }
    },
    async toggleNotiModal(id, name) {
        const { value } = await this.$swal.fire({
          icon: 'question',
          title: 'คุณต้องการแจ้งเตือนให้กับ ' + name,
          width: 426,
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true
        })
        if(value) {
          HTTP.post('api/user/notiUser', {
            token: this.token,
            id: id
          }).then((response) => {
            const status = response.data.status
            const icon =  status == 'fail' ? 'error' : 'success'
            const title =  status == 'fail' ? 'แจ้งเตือนไม่สำเร็จ' : 'แจ้งเตือนสำเร็จ'
            return this.notiAlert(icon, title)
          })
        }
    },
    notiAlert(icon, title) {
      const { value } = this.$swal.fire({
        icon: icon,
        title: title,
        width: 426,
        confirmButtonText: 'ตกลง',
        showCancelButton: false
      })
    },
    async onSubmitCreateTeamModalForm(items) {
      try {
        const { value } = await this.$swal.fire({
          icon: 'question',
          title: 'กรุณากด "ตกลง" เพื่อทำการบันทึก',
          width: 426,
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true
        })
        if(value) {
          HTTP.post('api/user/createTeam', {
            token: this.token,
            name: items.name,
            email: items.email
          }).then((response) => {
            if(response.data.status == 'fail') {
              const error = response.data.is_exist ? 'user มี team อยู่เเล้ว' : 'ไม่สามารถบันทึกข้อมูลได้'
              return this.notiAlert('error', error)
            }else{
              this.notiAlert('success', 'บันทึกสำเร็จ')
              window.location = '/my-team'
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
     this.createTeamModalShow = false
    },
    toggleCreateTeamModal() {
      this.createTeamModalShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
table.my-saved-list-table {
  @apply font-medium;
  thead > tr > th {
    @apply font-medium text-gold-600 py-5;
  }
  tbody > tr > td {
    @apply py-5 px-6 text-gray-200;
  }
  tbody > tr:nth-child(even) {
    background: rgba(#5a5b63, 0.25);
  }
}

.table-wrapper {
  background: rgba(#232429, 0.6);
}

.bg-op {
  background: rgba(35, 36, 41, 0.3);
}

table.call-logs-table {
  th {
    @apply font-medium;
  }
}

.profile-border-bottom {
  border-bottom-color: #5c544a;
}

.autocomplete-container {
  max-height: 50vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b6a68f;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b6a68f;
  }
}
</style>
