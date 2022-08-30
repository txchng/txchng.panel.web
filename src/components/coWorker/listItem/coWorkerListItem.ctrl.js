export default {
  name: 'CoWorkerListItem',
  props:{
    index:Number,
    coWorker: Object,
  },
  computed: {
    bgColor: function () {
      return this.index%2===0 ? '' : 'bg-light-blue';
    }
  },
  components:{},
  methods: {},
};
