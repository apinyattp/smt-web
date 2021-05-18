<template>
  <div v-if="show" v-show="false">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modalOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close'],
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.$swal({
              willOpen: () => {
                console.log('open')
              },
              // html: this.$el.innerHTML,
              html: '<div id="VueSweetAlert2"></div>',
              showConfirmButton: false,
              ...this.modalOptions
            }).then((result) => {
              this.$emit('close', result)
            })
          })
        }
      }
    }
  }
}
</script>
