<template lang="pug">
  v-layout
    b-jumbotron.reg-cont
      h3.title Sign Up
      b-form.sign-up-form(@submit='onSubmit')
        b-form-group(label='Name')
          b-form-input(
          type='text',
          v-model='form.name',
          required,
          placeholder='Name')
        b-form-group(label='Surname')
          b-form-input(
          type='text',
          v-model='form.surname',
          required,
          placeholder='Surname')
        b-form-group(label='Birth date')
          b-form-input(
            type='date',
            v-model='form.birthdate',
            required,
            placeholder='Birth date')
        b-form-group(label='Role')
          b-form-select.select(:options='role', v-model='form.role', required)
        b-form-group(label='Username')
          b-form-input(
          type='text',
          v-model='form.username',
          required,
          placeholder='Username')
        b-form-group(label='Email')
          b-form-input(
            type='email',
            v-model='form.email',
            required,
            placeholder='Email')
        b-form-group(label='Password')
          b-form-input(
          type='password',
          v-model='form.password',
          required,
          placeholder='Password')
        b-form-group(label='Confirm Password')
          b-form-input(
          type='password',
          v-model='form.confirmPassword',
          required,
          placeholder='Confirm Password')
          template(v-if='errorPass')
            small.form-text.text-danger You must type the same password each time.
        b-form-group
          b-button.button-style(type='submit', variant='primary',
          block, :disabled='isSignupButtonDisabled')
            | Sign Up &nbsp;

            i.fa.fa-spinner.fa-spin(v-if="isButtonLoading", aria-hidden='true')

      b-alert(:show='dismissCountDown',
      dismissible,
      variant='danger',
      @dismissed='dismissCountdown=0',
      @dismiss-count-down='countDownChanged')
        | {{ errMessage }}
    .links
      p Already have account? &nbsp
        b-link(:to="{name : 'Login'}")
          b Login


</template>

<script>
import VLayout from '@/layouts/Minimal.vue';
import loginService from '@/services/login/index';

export default {
  name: 'Register',
  components: {
    VLayout,
  },
  created() {},
  data() {
    return {
      msg: 'Register Page',
      isButtonLoading: false,
      form: {
        name: '',
        surname: '',
        birthdate: '',
        role: null,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      role: [
        { text: 'Choose role', value: null },
        { text: 'Sportsman', value: 'sportsman' },
        { text: 'Supporter', value: 'investor' },
      ],
      dismissCountDown: false,
      errMessage: null,
      errorPass: false,
      isSignupButtonDisabled: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.isButtonLoading = true;
      this.errorPass = false;
      if (this.form.password === this.form.confirmPassword) {
        this.isSignupButtonDisabled = true;
        this.regUser(this.form);
      } else {
        this.errorPass = true;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    regUser(data) {
      loginService.createUser(data)
        .then(() => {
          const obj = {
            message: 'An email has been sent to confirm your registration',
          };
          this.$router.push({ name: 'Login', query: obj });
          this.isButtonLoading = true;
        })
        .catch((err) => {
          this.isSignupButtonDisabled = false;
          this.isButtonLoading = false;
          this.errMessage = err.response.data.message;
          this.dismissCountDown = 5;
          console.debug(err);
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/colors.styl'
  .reg-cont
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
  .sign-up-form
    fieldset
      color #aaa
      font-size 13px
      font-weight bold
  .button-style
    margin-top 10px

</style>
