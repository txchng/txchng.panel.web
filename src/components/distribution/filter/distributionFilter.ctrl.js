export default {
  name: 'DistributionFilter',
  props:{
    onFilterObjectChanged: { type: Function },
  },
  components:{},
  data() {
    return {
      searchKeyword: undefined,
      statusList:[
        {
          systemValue:'all',
          ar_title: 'کل',
          fa_title: 'همه',
          en_title: 'all',
        },
        {
          systemValue:'new',
          ar_title: 'جدید',
          fa_title: 'جدید',
          en_title: 'new',
        },
        {
          systemValue:'delivered',
          ar_title: 'سلّمت',
          fa_title: 'تحویل شده',
          en_title: 'delivered',
        },
        {
          systemValue:'reversed',
          ar_title: 'ردّت',
          fa_title: 'بازپرداخت شده',
          en_title: 'reversed',
        },
        {
          systemValue:'timeout',
          ar_title: 'منتهیة الصلاحیة',
          fa_title: 'منقضی شده',
          en_title: 'timeout',
        },
      ],
      selectedStatus:undefined,

    }
  },
  methods: {
    seachKeywordChanged(){
      if(this.searchKeyword.trim().toString() == ''){
        this.searchKeyword = undefined;
      }
      this.callParent();
    },
    selectStatus(event){
      var status = event.target.value;
      this.selectedStatus = status;
      if(status == 'all'){
        this.selectedStatus  = undefined
      }
      this.callParent();
    },
    callParent(){
      if(this.onFilterObjectChanged){
          this.onFilterObjectChanged(this.selectedStatus, this.searchKeyword);
      }
    }

  },
}
