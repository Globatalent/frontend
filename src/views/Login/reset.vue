<template lang="pug">
  v-layout
    template(v-if="createdUserMsg")
      b-alert(show, dismissible, variant="success", @dismissed="clearQueryParam")
        | {{ createdUserMsg }}
    b-jumbotron.login-cont
      h3.title Password Reset
      h5.styleMessage Forgotten your password? Enter your e-mail address below,
        | and we'll send you an e-mail allowing you to reset it.
      b-form(@submit='regenPassword').mt-3
        b-form-group
          b-form-input(
          type='email',
          v-model='form.email',
          required,
          placeholder='E-mail address')
        b-form-group
          b-button(type='submit', block).colorButton Reset Password
      h6.styleMessage Please contact us if you have any trouble resetting your password.
      p.mt-5 Click here to &nbsp;
        b-link(:to="{name : 'Login'}")
          b.login Go Login
      b-alert(:show='dismissCountDown',
      :variant="resultStatus == 'success' ? 'success' : 'danger'",
      dismissible,
      @dismissed='dismissCountdown=0',
      @dismiss-count-down='countDownChanged')
        | {{ resultMessage }}

</template>

<script>
import VLayout from '@/layouts/Minimal.vue';
import loginService from '@/services/login/index';

export default {
  name: 'Reset',
  components: {
    VLayout,
  },
  created() {
    this.createdUserMsg = this.$route.query.message || null;
  },
  data() {
    return {
      msg: 'Reset password Page',
      createdUserMsg: '',
      resultMessage: null,
      resultStatus: null,
      form: {
        email: null,
      },
      dismissCountDown: false,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    navigateTo(name) {
      this.$router.push({ name });
    },
    regenPassword() {
      loginService.regenPassword(this.form.email)
        .then((res) => {
          this.resultMessage = res.data.message;
          this.resultStatus = res.data.result;
          this.dismissCountDown = 5;
        })
        .catch((err) => {
          this.dismissCountDown = 5;
          this.resultMessage = err;
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
  .styleMessage
    color #b6b6b6
  .colorButton
    background-color rgb(51, 90, 161)
    border-color rgb(51, 90, 161)
  .login
    color rgb(51, 90, 161)


</style>
