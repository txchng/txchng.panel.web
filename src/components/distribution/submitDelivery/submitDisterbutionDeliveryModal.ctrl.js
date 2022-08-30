import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import distributionSummaryCart from '@/components/distribution/summaryCart/distributionSummaryCart.vue';

export default {
    name: 'SubmitDisterbutionDeliveryModal',
    props: {
        remittance: Object,
        onCancelMethod: {type: Function},
        onConfirmMethod: {type: Function},
    },
    components: {
        Dropzone,
        distributionSummaryCart,
    },
    data() {
        return {
            token: undefined,
            uploadOptions: undefined
        }
    },
    methods: {
        close() {
            this.onCancelMethod();
        },

        confirm() {
            this.onConfirmMethod(this.remittance);
        },
    },
    created() {
        this.token = localStorage.token;
        this.uploadOptions = {
            url: "http://116.203.75.73:8002/remittance/uploadFile",
            params: {
                token: this.token,
                remittanceId: this.remittance._id,
            },
            success: function(file, respone){
              console.log(respone);
              console.log(file);
              console.log('asfasdf');
            }
        }
        if (!this.token) {
            this.$router.push({path: '/login'})
        }
    },
    mounted() {
        //const instance = this.$refs.el.dropzone;
    }
}
