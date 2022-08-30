import UserLabel from '@/components/user/label/userLabel.vue';


export default {
  name: 'UserPositionListItem',
  components: {
    UserLabel
  },
  props: {
      index: Number,
      userPosition: Object,
  },
};
