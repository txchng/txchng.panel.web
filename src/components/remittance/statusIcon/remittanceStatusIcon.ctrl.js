export default {
  name: 'DistributionStatusIcon',
  props:{
    status: String,
  },
  computed:{
    getCssClass: function(){
      if(this.status == 'new'){
        return 'stat-dot remittanceStatusIcon_New';
      } else if(this.status == 'delivered') {
        return 'stat-dot remittanceStatusIcon_Delivered';
      } else if(this.status == 'reversed') {
        return 'stat-dot remittanceStatusIcon_Reversed';
      } else if(this.status == 'timeout') {
        return 'stat-dot remittanceStatusIcon_TimeOut';
      } else if(this.status == 'accepted') {
        return 'stat-dot remittanceStatusIcon_Accepted';
      }else {
        return 'remittanceStatusIcon_Unkonown';
      }
    },
    getTranslatedTitle: function(){
      if(this.status == 'new'){
        return 'جدید';
      } else if(this.status == 'delivered') {
        return 'سلّمت';
      } else if(this.status == 'reversed') {
        return 'ردّت';
      } else if(this.status == 'timeout') {
        return 'منتهیة الصلاحیة';
      } else if(this.status == 'accepted') {
        return 'متّفق';
      } else {
        return 'غیر المعلوم';
      }
    }
  },
};
