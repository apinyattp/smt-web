export default {
  name: 'Popover',
  data() {
    return { isOpen: false }
  },
  methods: {
    open() {
      if (!this.isOpen) this.isOpen = true
    },
    close() {
      if (this.isOpen) this.isOpen = false
    },
    toggler() {
      this.isOpen = !this.isOpen
    }
  },

  render() {
    return this.$slots.default({
      isOpen: this.isOpen,
      open: this.open,
      close: this.close,
      toggler: this.toggler
    })
  }
}
