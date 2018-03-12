<template lang="pug">
  v-layout
    template(v-if="createdUserMsg")
      b-alert(show, dismissible, variant="success", @dismissed="clearQueryParam")
        | {{ createdUserMsg }}
    b-jumbotron.login-cont
      h3.title Login
      b-form(@submit='onSubmit')
        b-form-group
          b-form-input#exampleInput1(
          type='text',
          v-model='form.username',
          required,
          placeholder='Username')
        b-form-group
          b-form-input#exampleInput2(
          type='password',
          v-model='form.password',
          required,
          placeholder='Password')
        b-form-group#exampleInputGroup3
          b-form-select.select(:options='role', v-model='form.role', required)
        b-form-group#exampleGroup4
          b-button(type='submit', variant='primary', block) Login
      b-alert(:show='dismissCountDown',
      dismissible,
      variant='danger',
      @dismissed='dismissCountdown=0',
      @dismiss-count-down='countDownChanged')
        | Login error
    .links
      p Don't have an account? &nbsp
        b-link(:to="{name : 'Register'}")
          b Sign Up

</template>

<script>
import VLayout from '@/layouts/Minimal.vue';
import loginService from '@/services/login/index';
import jwtDecode from 'jwt-decode';

export default {
  name: 'Login',
  components: {
    VLayout,
  },
  created() {
    this.createdUserMsg = this.$route.query.message || null;
  },
  data() {
    return {
      msg: 'LOGIN Page',
      createdUserMsg: '',
      form: {
        username: '',
        password: '',
        role: null,
      },
      role: [
        { text: 'Choose role', value: null },
        { text: 'Sportsman', value: 'sportsman' },
        { text: 'Supporter', value: 'investor' },
      ],
      dismissCountDown: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.logUser(this.form);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    logUser(data) {
      loginService.logUser(data)
        .then((res) => {
          const obj = jwtDecode(res.data.authorization);
          obj.token = res.data;
          this.$ls.set('tokenData', obj);
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => {
          this.dismissCountDown = 5;
          console.debug(err);
        });
    },
    clearQueryParam() {
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/colors.styl'
  .login-cont
    background-color #36404a
    padding-top 30px
  .title
    display flex
    justify-content center
    margin-bottom 30px
  .select
    &:after
      content: '-'
      position absolute
      width 10px
      height 10px
  .links
    display flex
    justify-content center

</style>
