import RemittanceListItem from '@/components/remittance/listItem/remittanceListItem.vue';
export default {
  name: 'DistributionList',
  components:{ RemittanceListItem },
  props: {
    remittanceList: Array,
    onDeliveredSelectedMethod: { type: Function },
    onReverseSelectedMethod: { type: Function },
  },
  methods: {
    backToList() {
      this.$router.push({path: '/company'});
    },
  },
};
