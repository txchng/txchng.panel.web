import RequestListItem from '@/components/request/listItem/requestListItem.vue'

export default {
  name: 'RequestList',
  props:{
    requestList: Array,
    onSetRequestWageSelectedMethod: { type: Function },
    onRequestRejectSelectedMethod: { type: Function },
  },
  components:{ RequestListItem },
  data() {
    return {
    }
  },
  methods: {},
  created() {

 }
}
