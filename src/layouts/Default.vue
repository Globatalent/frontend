<template lang="pug">
  .default-layout
    b-container.separation-bar
      b-navbar(toggleable='md', type='dark', variant='faded')
        b-navbar-toggle(target='nav_collapse')
        b-navbar-brand(href='#')
          img.logo(src="~@/assets/img/Globatalent-logo-vert.png")
        b-collapse#nav_collapse(is-nav='')
          // Right aligned nav items
          b-navbar-nav.ml-auto
            b-nav-item-dropdown(right)
              template(slot='button-content')
                span.username {{ username }}
                span.avatar
                  i.fa.fa-user
              b-dropdown-item-btn(@click="logOut")
                | Log out &nbsp;
                i.fa.fa-sign-out
      hr.line
      template(v-if="!isHomePage")
        b-button.go-back(variant="link", @click="goBack") ⟵ Back to previous page
      // Contenido de la página
      b-row.pt-3
        slot
    footer.fix-bottom
      b-container
        b-row
          b-col
            .bottom-nav(@click="navigateTo('Home')", :class="navIsHome")
              span
                i.fa.fa-home(aria-hidden='true')
          b-col
            .bottom-nav(@click="navigateTo('Search')", :class="navIsSearch")
              span
                i.fa.fa-search(aria-hidden='true')
          b-col
            .bottom-nav(@click="navigateTo('Market')", :class="navIsMarket")
              span
                i.fa.fa-area-chart(aria-hidden='true')
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
    logOut() {
      this.$router.push({ name: 'Logout' });
    },
    navigateTo(name) {
      this.$router.push({ name });
    },
    goBack() {
      this.$router.go(-1);
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
    navIsMarket() {
      let className = '';
      if (this.$route.name === 'Market') {
        className = 'bottom-active';
      }
      return className;
    },
    username() {
      return `${this.tokenData.sub.username}`;
    },
    isHomePage() {
      return this.$route.name === 'Home';
    },
  },
};

</script>


<style lang="stylus" scoped>
  .line
    margin-top 0
    border-top 1px solid #4f555d
  .go-back
    font-size 14px
    font-weight 100
    letter-spacing 1px
  .separation-bar
    padding-bottom 50px
  .logo
    height 60px
  .username
    color white
    letter-spacing 3px
  .align-right
    display flex
    justify-content flex-end
  .fix-bottom
    position: fixed;
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
        color #00bcd4
    .bottom-active
      background-color #5a6773
  .avatar
    position relative
    display inline-block
    top: -6px
    width 35px
    height 35px
    background-color #155aa5
    border-radius 50%
    margin-left 10px
    margin-right 5px
    i
      font-size 20px
      position relative
      left 10.5px
      top 6px

</style>
