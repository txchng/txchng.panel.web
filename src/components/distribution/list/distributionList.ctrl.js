import DistributionListItem from '@/components/distribution/listItem/distributionListItem.vue';
export default {
  name: 'DistributionList',
  components:{ DistributionListItem },
  props: {
    remittanceList: Array,
    onDeliveredSelectedMethod: { type: Function },
    onReverseSelectedMethod: { type: Function },
  },
  methods: {
    backToList() {
      this.$router.push({path: '/company'})
    },
  },
}
