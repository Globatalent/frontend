<template lang="pug">
  v-layout
    template(v-if="loading")
      loading
    template(v-else)
      b-container
        b-row
          b-col(md="6", offset-md="3")
            b-jumbotron.reg-cont
              h3.title Profile
              b-form.sign-up-form(@submit='updateProfile')
                b-form-group(label='Name')
                  b-form-input(
                    type='text',
                    v-model.lazy='form.name')
                b-form-group(label='Surname')
                  b-form-input(
                    type='text',
                    v-model.lazy='form.surname')
                b-form-group(label='Email')
                  b-form-input(
                    type='email',
                    v-model.lazy='form.email')
                b-form-group
                  b-button.button-style(type='submit',
                  variant='primary',
                  block)
                    | Update Profile &nbsp;

                    i.fa.fa-spinner.fa-spin(v-if="isButtonLoadingProfile", aria-hidden='true')
              template(v-if="statusProfile.result")
                b-alert(:show='dismissCountDown',
                dismissible,
                :variant="statusProfile.result == 'success' ? 'success' : 'danger'",
                @dismissed='dismissCountdown=0',
                @dismiss-count-down='countDownChanged')
                  | {{ statusProfile.message }}
            b-jumbotron.reg-cont
              h3.title Update Password
              b-form.sign-up-form(@submit='updatePassword')
                b-form-group(label='Old Password')
                  b-form-input(
                    type='password',
                    v-model.lazy='pass.oldPassword',
                    required)
                b-form-group(label='New Password')
                  b-form-input(
                    type='password',
                    v-model.lazy='pass.newPassword',
                    required)
                b-form-group(label='Confirm New Password')
                  b-form-input(
                    type='password',
                    v-model.lazy='confirmPassword',
                    required)
                template(v-if='errorPass')
                  small.form-text.text-danger You must type the same password each time.
                b-form-group
                  b-button.button-style(type='submit',
                  variant='primary', block)
                    | Update Password &nbsp;

                    i.fa.fa-spinner.fa-spin(v-if="isButtonLoadingPassword", aria-hidden='true')

              template(v-if="statusUpdatePassword")
                b-alert(:show='dismissCountDownPassword',
                dismissible,
                :variant="statusUpdatePassword.result == 'success' ? 'success' : 'danger'",
                @dismissed='dismissCountdownPassword=0',
                @dismiss-count-down='countDownChangedPassword')
                  | {{ statusUpdatePassword.message }}

</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["$_", "_id"] }] */
import VLayout from '@/layouts/Default.vue';
import Loading from '@/components/Loading.vue';
import mixinToken from '@/mixins/token';
import homeServ from '@/services/home';

export default {
  name: 'Profile',
  components: {
    VLayout,
    Loading,
  },
  mixins: [
    mixinToken,
  ],
  async created() {
    this.loading = true;
    this.tokenData = this.getToken();
    await Promise.all([
      this.getProfile(this.userName),
    ]);
    this.loading = false;
  },
  data() {
    return {
      dismissCountDown: false,
      dismissCountDownPassword: false,
      statusProfile: {
        result: null,
        message: null,
      },
      statusUpdatePassword: null,
      form: {
        name: null,
        surname: null,
        email: null,
      },
      pass: {
        oldPassword: null,
        newPassword: null,
      },
      confirmPassword: null,
      loading: null,
      isButtonLoadingProfile: false,
      isButtonLoadingPassword: false,
      errorPass: false,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    countDownChangedPassword(dismissCountDownPassword) {
      this.dismissCountDownPassword = dismissCountDownPassword;
    },
    updateProfile(evt) {
      evt.preventDefault();
      this.isButtonLoadingProfile = true;
      return homeServ.updateProfile(this.userName, this.form.name, this.form.surname, this.form.email, this.tokenData.token.authorization)
        .then(() => {
          this.isButtonLoadingProfile = false;
          this.dismissCountDown = 5;
          this.statusProfile.result = 'success';
          this.statusProfile.message = 'Profile updated';
          this.getProfile(this.userName);
        })
        .catch((err) => {
          this.isButtonLoadingProfile = false;
          this.dismissCountDown = 5;
          this.statusProfile.result = 'failed';
          this.statusProfile.message = 'Profile fail updated';
          console.debug(err);
        });
    },
    updatePassword(evt) {
      evt.preventDefault();
      this.errorPass = false;
      this.isButtonLoadingPassword = false;
      if (this.pass.newPassword !== this.confirmPassword) {
        this.errorPass = true;
        this.isButtonLoadingPassword = false;
      } else {
        this.isButtonLoadingPassword = true;
        return homeServ.updatePassword(this.userName, this.pass.oldPassword, this.pass.newPassword, this.tokenData.token.authorization)
          .then((res) => {
            this.dismissCountDownPassword = 5;
            console.log(res);
            this.pass.oldPassword = '';
            this.pass.newPassword = '';
            this.confirmPassword = '';
            this.errorPass = false;
            this.isButtonLoadingPassword = false;
            this.statusUpdatePassword = res.data;
          })
          .catch((err) => {
            this.isButtonLoadingPassword = false;
            console.debug(err);
          });
      }
      return true;
    },
    getProfile(username) {
      return homeServ.getProfile(username, this.tokenData.token.authorization)
        .then((res) => {
          this.form.name = res.data.name;
          this.form.surname = res.data.surname;
          this.form.email = res.data.email;
        })
        .catch((err) => {
          console.debug(err);
        });
    },
  },
  computed: {
    userName() {
      return this.tokenData.sub.username;
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
