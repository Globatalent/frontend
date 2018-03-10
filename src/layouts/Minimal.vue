<template lang="pug">
  .minimal-layout
    b-container
      b-row
        b-col(md="6", offset-md="3")
          .flex-center
            img.img-login(src="~@/assets/img/Logo-Globatalent_2.png")
          slot
</template>

<script>
/* ============
 * Minimal Layout
 * ============
 */

export default {
  name: 'MinimalDefault',
  components: {},
  data() {
    return {
      msg: '',
    };
  },
  methods: {
    close() {
      console.debug('close');
    },
  },
};

</script>


<style lang="stylus" scoped>
  .minimal-layout
    padding-top 20px
    .flex-center
      display flex
      justify-content center
      .img-login
        height 150px
</style>
