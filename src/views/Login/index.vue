<template lang="pug">
  v-layout
    b-jumbotron.login-cont
      h3.title Login
      b-form(@submit='onSubmit')
        b-form-group
          b-form-input#exampleInput1(
          type='text',
          v-model='form.username',
          required,
          placeholder='Email')
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
  created() {},
  data() {
    return {
      msg: 'LOGIN Page',
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
      console.log(JSON.stringify(this.form));
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
