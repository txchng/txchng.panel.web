export default {
    name: 'UserLabel',
    props: ["user"],
    computed: {
        visibleTitle: function () {
          console.log(this.user);
            if (this.user.title) {
                return this.user.title;
            } else {
                var value = '';
                if (this.user.firstname) {
                    value = this.user.firstname;
                }
                if (this.user.lastname) {
                    value = value + ' ' + this.user.lastname;
                }
                return value;
            }
        }
    },
}
