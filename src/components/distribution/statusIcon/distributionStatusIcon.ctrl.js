export default {
  name: 'DistributionStatusIcon',
  props:{
    status: String,
  },
  computed:{
    getCssClass: function(){
      if(this.status == 'new'){
        return 'stat-dot distributionStatusIcon_New';
      } else if(this.status == 'delivered') {
        return 'stat-dot distributionStatusIcon_Delivered';
      } else if(this.status == 'reversed') {
        return 'stat-dot distributionStatusIcon_Reversed';
      } else if(this.status == 'timeout') {
        return 'stat-dot distributionStatusIcon_TimeOut';
      } else {
        return 'distributionStatusIcon_Unkonown';
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
      } else {
        return 'غیر المعلوم';
      }
    }
  },
};
