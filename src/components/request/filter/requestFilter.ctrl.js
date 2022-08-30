export default {
  name: 'RequestFilter',
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
          systemValue:'read',
          ar_title: 'معروض',
          fa_title: 'دیده شده',
          en_title: 'read',
        },
        {
          systemValue:'rejected',
          ar_title: 'مرفوض',
          fa_title: 'رد شده',
          en_title: 'rejected',
        },
        {
          systemValue:'waged',
          ar_title: 'فی الإنتظار',
          fa_title: 'در جریان',
          en_title: 'waged',
        },
        {
          systemValue:'canceled',
          ar_title: 'ملغي',
          fa_title: 'لغو شده',
          en_title: 'canceled',
        },
        {
          systemValue:'accepted',
          ar_title: 'متّفق',
          fa_title: 'توافق شده',
          en_title: 'accepted',
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
