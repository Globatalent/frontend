<template lang="pug">
  .default-layout
    b-container.separation-bar
      b-row
        b-col(md='8')
          img.logo(src="~@/assets/img/Globatalent-logo-vert.png")
          p  {{ username }}
        b-col(md='4')
          .align-right
            b-button(@click="close")
              i.fa.fa-bars(aria-hidden='true')
      // Contenido de la página
      slot
    footer.fix-bottom
      b-container
        b-row
          b-col
            .bottom-nav(@click="navigateTo('Home')", :class="navIsHome")
              span
                i.fa.fa-home(aria-hidden='true')
          b-col
            .bottom-nav(@click="navigateTo('Search')", class="navIsHome")
              span
                i.fa.fa-search(aria-hidden='true')
          b-col
            .bottom-nav(@click="navigateTo('Invest')", class="navIsInvests")
              span
                i.fa.fa-newspaper-o(aria-hidden='true')
</template>

<script>
/* ============
 * Default Layout
 * ============
 */

import token from '@/mixins/token';

export default {
  name: 'LayoutDefault',
  created() {
    this.tokenData = this.getToken();
  },
  data() {
    return {
      tokenData: null,
    };
  },
  mixins: [
    token,
  ],
  methods: {
    close() {
      console.debug('close');
    },
  },
  computed: {
    navIsHome() {
      let className = '';
      if (this.$route.name === 'Home') {
        className = 'bottom-active';
      }
      return className;
    },
    navIsSearch() {
      let className = '';
      if (this.$route.name === 'Search') {
        className = 'bottom-active';
      }
      return className;
    },
    navIsInvests() {
      let className = '';
      if (this.$route.name === 'Invests') {
        className = 'bottom-active';
      }
      return className;
    },
    username() {
      return `@${this.tokenData.sub.username}`;
    },
  },
};

</script>


<style lang="stylus" scoped>
  .default-layout
    padding-top 20px
  .separation-bar
    padding-bottom 50px
  .logo
    height 50px
  .align-right
    display flex
    justify-content flex-end
  .fix-bottom
    position: absolute;
    left: 0;
    bottom: 0;
    height: 50px;
    width 100%
    background-color: #394450;
    .container
      height 100%
      .row
        height 100%
    .bottom-nav
      display flex
      align-items center
      justify-content center
      height 100%
      cursor pointer
      &:hover
        background-color #5a6773
      span
        font-size 20px
        color orange
    .bottom-active
      background-color #5a6773

</style>
