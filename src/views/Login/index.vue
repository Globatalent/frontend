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
          v-validate="'required|min:8'",
          :class="{'input': true, 'is-danger': errors.has('form.password') }")
          span.help.is-danger(v-show="errors.has('Password')").failAlert {{ errors.first('Password') }}
        b-form-group
          b-button(type='submit',block).colorButton Log In
        .links
          b-link(:to="{name : 'Reset'}").mt-3
            b.linkColor Forgot your password ?
      b-alert(:show='dismissCountDown',
      dismissible,
      variant='danger',
      @dismissed='dismissCountdown=0',
      @dismiss-count-down='countDownChanged')
        | {{ errorMessage }}
    .links
      p Don't have an account? &nbsp
        b-link(:to="{name : 'Register'}")
          b.linkColor Sign Up

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
      },
      dismissCountDown: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const dataLogin = Object.assign({}, this.form);
      // Pasamos contraseña a sistema sha256
      dataLogin.password = sha256(this.form.password);
      // Pasamos el objeto con logUser
      this.logUser(dataLogin);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    logUser(data) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          loginService.logUser(data)
            .then((res) => {
              const obj = jwtDecode(res.data.authorization);
              obj.token = res.data;
              this.$ls.set('tokenData', obj);
              if (obj.sub.role === 'investor') {
                // Al ser investor , redirigimos a Home, en caso contrario, a SportsmenHome. ¿Tenemos que crear componente SportsmenHome.vue?
                this.$router.push({ name: 'Home' });
              } else {
                this.$router.push({ name: 'SportsmenHome', params: { sportsmenid: obj.sub.username } });
              }
            })
            .catch((/* err */) => {
              this.dismissCountDown = 5;
              this.errorMessage = 'User or password incorrect';
              // console.debug(err);
            });
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
    background-color rgb(51, 90, 161)
    border-color rgb(51, 90, 161)
  .failAlert
    color red
  .linkColor
    color rgb(51, 90, 161)

</style>
