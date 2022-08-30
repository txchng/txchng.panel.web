import moment from 'moment-timezone';

export default {
  name: 'DateSelectorInput',
  data() {
    return {
      fromDateFromatedValue:undefined,
    }
  },
  props: {
    onDateTimeSelectedMethod: { type: Function }
  },
  methods:{
    goPrevDay(){
      let fromDateFromatedValue =moment(this.fromDateFromatedValue).add(-1,'days').format('YYYY-MM-DD');
      this.setDateTimeRange(fromDateFromatedValue);
    },
    goNextDay(){
      let fromDateFromatedValue = moment(this.fromDateFromatedValue).add(+1,'days').format('YYYY-MM-DD');
      this.setDateTimeRange(fromDateFromatedValue);
    },
    dateTimeRangeChanged(event){
      var selectedDateTime = event.target.value;
      this.setDateTimeRange(selectedDateTime);
    },
    setDateTimeRange(fromDateFromatedValue){
      this.fromDateFromatedValue = fromDateFromatedValue;
      let fromDateTime = moment(fromDateFromatedValue).startOf('day').toDate();
      let toDateTime = moment(fromDateFromatedValue).endOf('day').toDate();
      this.onDateTimeSelectedMethod(fromDateTime, toDateTime);
    }
  },
  created() {
    let fromDateFromatedValue = moment().startOf('day').format('YYYY-MM-DD');
    this.setDateTimeRange(fromDateFromatedValue);
  },
}
