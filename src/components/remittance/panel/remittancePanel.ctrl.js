import RemittanceRestResource from '@/util/http/remittance.srv';
import SendDistributionRequestModal
    from '@/components/remittance/sendDistributionRequestModal/sendDistributionRequestModal.vue';

const RemittanceService = new RemittanceRestResource();

import RemittanceList from '@/components/remittance/list/remittanceList.vue';
import LoadingList from '@/components/share/loading/list/loadingList.vue'
import CurrencyLabel from '@/components/share/label/currency/currencyLabel.vue'
import RemittanceFilter from '@/components/remittance/filter/remittanceFilter.vue'


export default {
    name: 'RemittancePanel',
    props: ["remittanceId"],
    components: {CurrencyLabel, RemittanceList, LoadingList, RemittanceFilter, SendDistributionRequestModal},
    data() {
        return {
            remittanceList: [],
            visibleRemittanceList: [],
            showSubmitDeliveredRemittanceModal: false,
            selectedDeliveredRemittance: undefined,
            isLoading: false,
            filterObject: {
                status: undefined,
                searchKeyword: undefined,
            }
        }
    },
    methods: {
        filteChanged(status, searchKeyword) {
            console.log('selectedStatus');
            console.log(status);
            console.log('seachKeyword');
            console.log(searchKeyword);
            this.filterObject.status = status;
            this.filterObject.searchKeyword = searchKeyword;
            this.visibleRemittanceList = this.filterRequestList(this.remittanceList, this.filterObject);
            console.log('asdf');
        },
        filterRequestList(remittanceList, filter) {
            if (
                !filter.status &&
                !filter.searchKeyword
            ) {
                return this.remittanceList;
            }
            var result = remittanceList
                .filter(function (remittance) {
                    if (
                        filter.status
                    ) {
                        if (remittance.status == filter.status) {
                            return remittance;
                        }
                    } else {
                        return remittance;
                    }
                })
                .filter(function (remittance) {
                    if (
                        filter.searchKeyword
                    ) {
                        if (
                            (
                                remittance.receiver.user &&
                                remittance.receiver.user.title &&
                                remittance.receiver.user.title.includes(filter.searchKeyword)
                            ) ||
                            remittance.intermediateCompany.name.includes(filter.searchKeyword) ||
                            remittance._id.includes(filter.searchKeyword)
                        ) {
                            return remittance;
                        }
                    } else {
                        return remittance;
                    }
                })
            ;
            console.log('new result is');
            console.log(result.length);
            return result;
        },
        showSubmitDeliveryDistributionModal(remittance) {
            this.selectedDeliveredRemittance = remittance;
            this.showSubmitDeliveredRemittanceModal = true;
        },
        hideSubmitDeliveryDistributionModal() {
            this.selectedDeliveredRemittance = undefined;
            this.showSubmitDeliveredRemittanceModal = false;
        },
        backToList() {
            this.$router.push({path: '/company'})
        },
        getRemittanceList() {
            this.isLoading = true;
            RemittanceService
                .getAll_remittanceCompany(this.token)
                .then(this.onGetAllRemittanceListSuccess)
                .catch(this.onGetAllRemittanceListFail);
        },

        onGetAllRemittanceListSuccess(response) {
            this.remittanceList = response.data.remittanceList;
            this.visibleRemittanceList = this.filterRequestList(this.remittanceList, this.filterObject);
            this.isLoading = false;
        },
        onGetAllRemittanceListFail(err) {
            alert(err.response.data.message);
            this.isLoading = false;
        },
    },
    created() {
        this.token = localStorage.token;
        if (!this.token) {
            this.$router.push({path: '/login'});
        }
        this.getRemittanceList();
    }
}
