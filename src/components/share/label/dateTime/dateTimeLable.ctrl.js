import moment from 'moment';

export default {
  name: 'DateTimeLabel',
  props:["date"],
  computed: {
    formatedDate: function () {
      return moment(this.date).format('YYYY/MM/DD');
    },
    formatedTime: function(){
      return moment(this.date).format('HH:mm');
    }
  },
}
