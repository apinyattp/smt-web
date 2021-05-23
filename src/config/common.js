export default {
    data: () => ({
      mySharedDataProperty: null
    }),
    methods: {
        setOption(items) {
            return Object.keys(items).map((item) => {
              return {
                label: items[item],
                value: item
              }
            })
        },
        setOptionSwap(items) {
            return Object.keys(items).map((item) => {
                return {
                value: items[item],
                label: this.convertText(item)
                }
            })
        },
        convertText(text) {
            let convertText = ''
            switch (text) {
                case 'facebook_group':
                convertText = 'facebook group'
                break
                case 'facebook_page':
                convertText = 'facebook page'
                break
                case 'baan.kaidee':
                convertText = 'kaidee'
                break
                default:
                convertText = text
            }
            return convertText
        },
        searchData() {
            this.params.page = 1
            this.$emit('update:submitForm', this.params)
        },
        selectDate(dateRange) {
            this.params.startDate = dateRange.start
            if(dateRange.end != 'Invalid Date') {
              this.params.endDate = dateRange.end
            }
        },
        changePage(page) {
            this.params.page = page
            this.submitForm(this.params)
        },
        changePerPage(perPage) {
            this.params.page = 1
            this.params.perpage = perPage
            this.submitForm(this.params)
        }
    }
}