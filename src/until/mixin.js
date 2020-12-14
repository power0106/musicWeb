export const itemListenMixin = {
    props: ['cen', 'scrolltop'],
    created() {
        console.log('混入')
    },
    methods: {
        backTop() { //回到顶部
            let timer = setInterval(() => {
                let ispeed = -200
                this.cen.scrollTop = this.cen.scrollTop = this.scrolltop + ispeed
                if (this.scrolltop === 0) {
                    clearInterval(timer)
                }
                console.log(this.scrolltop)
            }, 16)
        },
    }
}