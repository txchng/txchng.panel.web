import UserPositionListItem from '@/components/userPosition/listItem/userPositionListItem.vue';

export default {
  name: 'UserPositionList',
  components: {
    UserPositionListItem
  },
  props: {
    userPositionList: Array,
  },
};
