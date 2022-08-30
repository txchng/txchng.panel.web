export default {
  name: 'RequestStatusIcon',
  props:{
    status: String,
  },
  computed:{
    getCssClass: function(){
      if(this.status == 'new'){
        return 'stat-dot requestStatusIcon_New';
      } else if(this.status == 'read') {
        return 'stat-dot requestStatusIcon_Read';
      } else if(this.status == 'rejected') {
        return 'stat-dot requestStatusIcon_Rejected';
      } else if(this.status == 'waged') {
        return 'stat-dot requestStatusIcon_Waged';
      } else if(this.status == 'canceled') {
        return 'stat-dot requestStatusIcon_Canceled';
      } else if(this.status == 'accepted') {
        return 'stat-dot requestStatusIcon_Accepted';
      } else {
        return 'requestStatusIcon_Unkonown';
      }
    },
    getTranslatedTitle: function(){
      if(this.status == 'new'){
        return 'جدید';
      } else if(this.status == 'read') {
        return 'معروض';
      } else if(this.status == 'rejected') {
        return 'مرفوض';
      } else if(this.status == 'waged') {
        return 'فی الإنتظار';
      } else if(this.status == 'canceled') {
        return 'ملغي';
      } else if(this.status == 'accepted') {
        return 'متّفق';
      } else {
        return 'غیر معلوم';
      }
    }
  },
};
