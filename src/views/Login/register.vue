<template lang="pug">
  v-layout
    b-jumbotron.reg-cont
      h3.title Sign Up
      b-form.sign-up-form(@submit.prevent='onSubmit')
        b-form-group(label='Name')
          b-form-input(
          name='Name',
          type='text',
          v-model='form.name',
          placeholder='Name',
          v-validate="'required|alpha'",
          :class="{'input': true, 'is-danger': errors.has('form.name') }")
          span.help.is-danger(v-show="errors.has('Name')").failAlert {{ errors.first('Name') }}
        b-form-group(label='Surname')
          b-form-input(
          name='Surname',
          type='text',
          v-model='form.surname',
          placeholder='Surname',
          v-validate="'required|alpha'",
          :class="{'input': true, 'is-danger': errors.has('form.surname') }")
          span.help.is-danger(v-show="errors.has('Surname')").failAlert {{ errors.first('Surname') }}
        b-form-group(label='Birth date')
          b-form-input(
          name='Birth date',
          type='date',
          v-model='form.birthdate',
          placeholder='Birth date',
          v-validate="'required'",
          :class="{'input': true, 'is-danger': errors.has('form.birthdate') }")
          span.help.is-danger(v-show="errors.has('Birth date')").failAlert {{ errors.first('Birth date') }}
          span.help.is-danger(v-show="underEighteen").failAlert You must be of legal age to enter the application
        b-form-group(label='Role')
          b-form-select.select(:options='role', v-model='form.role', required)
        b-form-group(label='Username')
          b-form-input(
          name='Username',
          type='text',
          v-model='form.username',
          placeholder='Username',
          v-validate="'required|alpha|min:8'",
          :class="{'input': true, 'is-danger': errors.has('form.username') }")
          span.help.is-danger(v-show="errors.has('Username')").failAlert {{ errors.first('Username') }}
        b-form-group(label='Email')
          b-form-input(
          name='Email',
          type='email',
          v-model='form.email',
          placeholder='E-mail address',
          v-validate="'required|email'",
          :class="{'input': true, 'is-danger': errors.has('form.email') }")
          span.help.is-danger(v-show="errors.has('Email')").failAlert {{ errors.first('Email') }}
        b-form-group(label='Password')
          b-form-input(
          name='Password',
          type='password',
          v-model='form.password',
          placeholder='Password',
          v-validate="'required|min:8'",
          :class="{'input': true, 'is-danger': errors.has('form.password') }")
          span.help.is-danger(v-show="errors.has('Password')").failAlert {{ errors.first('Password') }}
        b-form-group(label='Confirm Password')
          b-form-input(
          name='Confirm Password',
          type='password',
          v-model='confirmPassword',
          placeholder='Password',
          v-validate="'required|min:8'",
          :class="{'input': true, 'is-danger': errors.has('confirmPassword') }")
          span.help.is-danger(v-show="errors.has('Confirm Password')").failAlert {{ errors.first('Confirm Password') }}
          span.help.is-danger(v-show="errorPass").failAlert Passwords does not match.

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
import sha256 from 'js-sha256';

export default {
  name: 'Register',
  components: {
    VLayout,
  },
  created() {},
  data() {
    return {
      underEighteen: false,
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
      },
      confirmPassword: '',
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
    resetForm() {
      this.form.name = '';
      this.form.surname = '';
      this.form.birthdate = '';
      this.form.role = null;
      this.form.username = '';
      this.form.email = '';
      this.form.password = '';
      this.confirmPassword = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.underEighteen = false;
      this.errorPass = false;
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          if (this.isOverEighteen(this.form.birthdate)){
            this.isButtonLoading = true;
            this.errorPass = false;
            if (this.form.role === 'sportsman') {
              this.resetForm();
              this.errMessage = 'This is an alpha version, we are currently working on this feature';
              this.dismissCountDown = 5;
              this.isButtonLoading = false;
            } else if (this.form.password === this.confirmPassword) {
              this.isSignupButtonDisabled = true;
              this.form.password = sha256(this.form.password);
              this.regUser(this.form);
            } else {
              this.isButtonLoading = false;
              this.errorPass = true;
            }
          } else {
            this.underEighteen = true;
          }
        }
      });
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
    isOverEighteen(userDate) {
      const userDateSplit = userDate.split('-').map(el => parseInt(el, 10));
      const d = new Date();
      const years = d.getFullYear() - userDateSplit[0];
      const months = d.getMonth() - (userDateSplit[1] + 1);
      const days = d.getDate() - userDateSplit[2];
      if (years < 18) {
        return false;
      } else if (years > 18) {
        return true;
      } else if (months < 0) {
        return false;
      } else if (months > 0) {
        return true;
      }
      return days >= 0;
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
    background-color #335aa1
    border-color #335aa1
  .failAlert
    color red

</style>
