export default {
  methods: {
    getToken() {
      return this.$ls.get('tokenData');
    },
  },
};
