<template lang="pug">
  v-layout
    template(v-if="createdUserMsg")
      b-alert(show, dismissible, variant="success", @dismissed="clearQueryParam")
        | {{ createdUserMsg }}
    b-jumbotron.login-cont
      h3.title Login
      b-form(@submit.prevent='onSubmit')
        b-form-group
          b-form-input(
          name='Username or E-mail address'
          type='text',
          v-model='form.username',
          placeholder='Username or E-mail address',
          v-validate="'required'",
          :class="{'input': true, 'is-danger': errors.has('form.name') }")
          span.help.is-danger(v-show="errors.has('Username or E-mail address')").failAlert {{ errors.first('Username or E-mail address') }}
        b-form-group
          b-form-input(
          name='Password',
          type='password',
          v-model='form.password',
          placeholder='Password',
          v-validate="'required|min:6'",
          :class="{'input': true, 'is-danger': errors.has('form.password') }")
          span.help.is-danger(v-show="errors.has('Password')").failAlert {{ errors.first('Password') }}
        b-form-group
          b-form-select.select(:options='role', v-model='form.role', required)
        b-form-group
          b-button(type='submit', variant='primary', block).colorButton Log In
        .links
          b-link(:to="{name : 'Reset'}").mt-3
            b Forgot your password ?
      b-alert(:show='dismissCountDown',
      dismissible,
      variant='danger',
      @dismissed='dismissCountdown=0',
      @dismiss-count-down='countDownChanged')
        | {{ errorMessage }}
    .links
      p Don't have an account? &nbsp
        b-link(:to="{name : 'Register'}")
          b Sign Up

</template>

<script>
import VLayout from '@/layouts/Minimal.vue';
import loginService from '@/services/login/index';
import jwtDecode from 'jwt-decode';
import sha256 from 'js-sha256';

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
      errorMessage: '',
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
      this.form.password = sha256(this.form.password);
      this.logUser(this.form);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    logUser(data) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (data.role !== 'sportsman') {
            loginService.logUser(data)
              .then((res) => {
                const obj = jwtDecode(res.data.authorization);
                obj.token = res.data;
                this.$ls.set('tokenData', obj);
                this.$router.push({ name: 'Home' });
              })
              .catch((err) => {
                this.dismissCountDown = 5;
                this.errorMessage = 'User or password incorrect';
                console.debug(err);
              });
          } else {
            this.dismissCountDown = 5;
            this.errorMessage = 'This is an alpha version, we are currently working on this feature';
          }
        }
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
  .colorButton
    background-color #335aa1
    border-color #335aa1
  .failAlert
    color red

</style>
