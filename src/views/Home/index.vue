<template lang="pug">
  v-layout
    template(v-if="loading")
      loading

    template(v-else)
      b-modal#modalValidate1(
        v-model="showModal1",
        centered=true,
        body-text-variant="dark",
        header-text-variant="dark",
        title="Validate your account",
        :ok-disabled="formCompleted",
        @ok="validate1",
        no-close-on-backdrop=true,
        :busy="loading")
        b-form.sign-up-form()
          b-form-group(label='Phone number')
            b-input(type="number",
              placeholder="Phone number",
              @change="verifyForm1")
          b-form-group(label='Choose country')
            model-select(name='country-select',
            :options="countries"
            v-model="selectedCountry",
            placeholder="Choose country")
          b-form-group(label='Captcha')
            vue-recaptcha(sitekey="6LcjAUwUAAAAAG5zxMgZRWqlPbOU0TQNY1SctALm",
              @verify="verifyForm3",
              @expired="unverifyForm3")
      b-modal#modalValidate2(
        v-model="showModal2",
        centered=true,
        body-text-variant="dark",
        header-text-variant="dark",
        title="Enter security answers",
        :ok-disabled="form2Completed"
        @ok="validate2",
        no-close-on-backdrop=true,
        :busy="loading")
        b-form.sign-up-form()
          b-form-group(label='Choose a security question')
            model-select(name='country-select',
            :options="securityQuestions"
            v-model="selectedSecurityQuestion",
            placeholder="Choose question")
          b-form-group(label='Answer')
            b-input(type="text",
              placeholder="Answer",
              @change="verifyForm4")
          b-form-group(label='Captcha')
            vue-recaptcha(sitekey="6LcjAUwUAAAAAG5zxMgZRWqlPbOU0TQNY1SctALm",
              @verify="verifyForm5",
              @expired="unverifyForm5")
      template(v-if="overview.validate1 === false")
        b-col(sm="12")
          b-alert.d-flex.align-items-center(show, dismissible, variant="warning")
            i.fa.fa-exclamation-circle.fa-2x(aria-hidden='true')
            | &nbsp; You must &nbsp;
            b-button.button-style2(href="#", class="alert-link", v-b-modal="'modalValidate1'") Validate
            | &nbsp; your account before starting to invest
      template(v-if="overview.validate1 === true && overview.validate2 === false")
        b-col(sm="12")
          b-alert.d-flex.align-items-center(show, dismissible, variant="warning")
            i.fa.fa-exclamation-circle.fa-2x(aria-hidden='true')
            | &nbsp; To invest more than 5000 USD you must pass a 2nd &nbsp;
            b-button.button-style2(href="#", class="alert-link", v-b-modal="'modalValidate2'") Validation
            | &nbsp; step
      template(v-if="excededInvestment")
        b-col(sm="12")
          b-alert.d-flex.align-items-center(show, dismissible, variant="danger")
            i.fa.fa-exclamation-circle.fa-2x(aria-hidden='true')
            | &nbsp; {{ investmentMessage }} &nbsp;
      b-col(sm="12")
        b-row.swag
          b-col(sm="8")
            .overview-block-1.bg-block.d-flex
              .block
                .item-left
                  p.lead.text-uppercase Investment Overview
                  .block-data
                    .item.top
                      p.title
                        span.h2
                          // span.h2 {{ overview.tokenFounds }}
                          vue-numeric(currency='USD',
                          separator='.',
                          v-model='overview.tokenFounds',
                          :read-only="true",
                          :precision="2")
                      span.lead.text-muted Token Capitalization
                    .item.bottom
                      p.title
                        span.currency
                        span.h4(style='color:lightgreen', v-if="overview.changes >0") {{ overview.changes }} %
                        span.h4(style='color:red', v-else="overview.changes <0") {{ overview.changes }} %
                      span.lead.text-muted Changes (24h)
                .item-right
                  template(v-if="overview.chart.hasData")
                    chart-doughnut(:data="datacollection", :options="chartOptions")
                  template(v-else)
                    chart-doughnut(:data="noDataChart", :options="chartOptions")
          b-col(sm="4")
            .overview-block-2.bg-block.d-flex.flex-column
              .block-top.align-self-start.w-100
                .item
                  p.h5.m-0
                    vue-numeric(currency='USD',
                    separator='.',
                    v-model='overview.totalInvest',
                    :read-only="true",
                    :precision="2")
                  span.text-muted Available to invest
                .item.mt-3
                  p.h5.m-0
                    vue-numeric(currency='USD',
                    separator='.',
                    v-model='overview.totalFounds',
                    :read-only="true",
                    :precision="2")
                  span.text-muted Total Funds
                .item.mt-3
                  p.h5.m-0
                    vue-numeric(currency='USD',
                    separator='.',
                    v-model='overview.cashFounds',
                    :read-only="true",
                    :precision="2")
                  span.text-muted Cash
                .item.mt-3
                  p.h5.m-0
                    vue-numeric(currency='USD',
                    separator='.',
                    v-model='overview.tokenFounds',
                    :read-only="true",
                    :precision="2")
                  span.text-muted Token

              .block-bottom.d-flex.w-100.h-100
                .button-cont.align-self-end.w-100
                  template(v-if='isValidated')
                    b-input-group(prepend='USD', append='.00').mb-3
                      b-form-input(
                      name='Funds',
                      v-model='funds',
                      type='number',
                      placeholder='Amount of money',
                      v-validate="'required|numeric|max:8|min:1'",
                      :class="{'input': true, 'is-danger': errors.has('funds') }")
                    span.help.is-danger(v-show="errors.has('Funds')").failAlert {{ errors.first('Funds') }}
                    span.clase(style='color:lightgreen', v-if='comprado == true') Funds Added !!
                    b-button.button-style(:disabled="funds<=0", @click='handleOk',block).mt-3
                      |Add funds &nbsp;
          b-col(md='12')
            .performance-block
          b-col(md="12")
            .bg-block.p-4.mb-5.mt-4
              b-tabs()
                b-tab(, title='INVESTMENTS', active)
                  b-table(striped, hover,
                  :items='investments', :fields='investmentsFields', dark, fixed)
                    template(slot='fullName', slot-scope='data',)
                      b-link(
                      :to="{ name: 'Sportsmen', params: { sportsmenid: data.item.sportsman }}")
                        | {{ data.item.fullName }}
                    template(slot='changes', slot-scope='data',)
                      span.clase(style='color:lightgreen', v-if='data.item.changes > 0') {{ data.item.changes }} %
                      span.clase(style='color:red', v-else='data.item.changes < 0') {{ data.item.changes }} %

                b-tab(title='WATCHLIST')
                  b-table(striped, hover,
                  :items='watchlist', :fields='watchlistFields', dark, fixed)
                    template(slot='fullName', slot-scope='data')
                      b-link(
                      :to="{ name: 'Sportsmen', params: { sportsmenid: data.item.sportsman }}")
                        | {{ data.item.fullName }}
                    template(slot='changes', slot-scope='data',)
                      span.clase(style='color:lightgreen', v-if='data.item.changes > 0') {{ data.item.changes }} %
                      span.clase(style='color:red', v-else='data.item.changes < 0') {{ data.item.changes }} %

</template>

<script>
import VLayout from '@/layouts/Default.vue';
import ChartDoughnut from '@/components/ChartDoughnut.vue';
import Loading from '@/components/Loading.vue';
import mixinToken from '@/mixins/token';
import mixinCountries from '@/mixins/countries';
import homeServ from '@/services/home';
import { ModelSelect } from 'vue-search-select';
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Home',
  components: {
    VLayout,
    ChartDoughnut,
    ModelSelect,
    VueRecaptcha,
    Loading,
  },
  mixins: [
    mixinToken,
    mixinCountries,
  ],
  async created() {
    this.loading = true;
    this.tokenData = this.getToken();
    await Promise.all([
      this.getOverview(this.userName),
      this.getWatchlist(this.userName),
      this.getInvestments(this.userName),
    ]);
    this.countries = this.getCountries();
    this.loading = false;
    this.comprado = false;
  },
  data() {
    return {
      comprado: null,
      info: '',
      name: '',
      names: [],
      csv: '',
      csvs: [],
      selectedSecurityQuestion: null,
      securityQuestions: [
        { text: 'Where was your mother born?', value: 1 },
        { text: 'What is your mother\'s surname?', value: 2 },
        { text: 'What was your childhood nickname?', value: 3 },
      ],
      investmentMessage: null,
      excededInvestment: false,
      isButtonLoading: false,
      showModal1: false,
      showModal2: false,
      form1: false,
      form3: false,
      form4: false,
      form5: false,
      selectedCountry: null,
      isValidated: false,
      funds: null,
      loading: null,
      chartOptions: {
        legend: {
          position: 'bottom',
          labels: {
            fontColor: '#fafafa',
          },
        },
        title: {
          fontColor: '#fafafa',
        },
      },
      datacollection: {
        labels: [],
        datasets: [],
      },
      noDataChart: {
        datasets: [
          {
            data: [1],
            backgroundColor: ['#bdbdbd'],
          },
        ],
        labels: ['No data'],
      },
      tokenData: null,
      validateMsg: 'You must validate your account before to continue',
      overview: null,
      // Chart
      chartBgColors: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
      chartBorderColors: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      // Investments
      investments: null,
      investmentsFields: [
        {
          key: 'fullName',
          label: 'PLAYER/CLUB',
          sortable: true,
        },
        {
          key: 'tokenAmount',
          label: 'Tokens',
          sortable: true,
        },
        {
          key: 'tokenValue',
          label: 'Value',
          sortable: true,
        },
        {
          key: 'changes',
          label: 'Change (24h)',
          sortable: true,
        },
      ],
      // Watchlist
      watchlist: null,
      watchlistFields: [
        {
          key: 'fullName',
          label: 'PLAYER/CLUB',
          sortable: true,
        },
        {
          key: 'tokenValue',
          label: 'Value',
          sortable: true,
        },
        {
          key: 'changes',
          label: 'Change (24h)',
          sortable: true,
        },
      ],
    };
  },
  methods: {
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      this.handleSubmit();
      this.comprado = true;
      setTimeout(() => {
        window.location.href = '../';
      }, 1000);
    },
    handleSubmit() {
      this.names.push(this.name);
      return homeServ.putFunds(this.userName, this.funds, this.tokenData.token.authorization);
    },
    validate1(evt) {
      this.loading = true;
      evt.preventDefault();
      homeServ.validateUser(this.userName, this.tokenData.token.authorization, 1)
        .then(() => this.getOverview(this.userName))
        .then(() => {
          this.loading = false;
          this.showModal1 = false;
        })
        .catch((/* err */) => {
          // console.error(err.message);
          this.loading = false;
          this.showModal1 = false;
        });
    },
    validate2(evt) {
      this.loading = true;
      evt.preventDefault();
      homeServ.validateUser(this.userName, this.tokenData.token.authorization, 2)
        .then(() => this.getOverview(this.userName))
        .then(() => {
          this.loading = false;
          this.showModal2 = false;
        })
        .catch((/* err */) => {
          // console.error(err.message);
          this.loading = false;
          this.showModal2 = false;
        });
    },
    verifyForm1() {
      this.form1 = true;
    },
    verifyForm3() {
      this.form3 = true;
    },
    unverifyForm3() {
      this.form3 = false;
    },
    verifyForm4() {
      this.form4 = true;
    },
    verifyForm5() {
      this.form5 = true;
    },
    unverifyForm5() {
      this.form5 = false;
    },
    getOverview(username) {
      return homeServ.getOverview(username, this.tokenData.token.authorization)
        .then((res) => {
          this.overview = res.data.overview;
          this.isValidated = res.data.overview.validate1;
          this.datacollection.labels = res.data.overview.chart.labels;
          this.datacollection.datasets[0] = {
            pointBackgroundColor: 'white',
            borderWidth: 1,
            hoverBorderWidth: 5,
            data: res.data.overview.chart.datasets,
            backgroundColor: this.chartBgColors,
            borderColor: this.chartBorderColors,
          };
        })
        .catch((/* err */) => {
          // console.error(err);
        });
    },
    getInvestments(username) {
      return homeServ.getInvestments(username, this.tokenData.token.authorization)
        .then((res) => {
          this.investments = res.data.investments;
          console.log(res.data.investments);
        })
        .catch((/* err */) => {
          // console.error(err);
        });
    },
    getWatchlist(username) {
      return homeServ.getWatchlist(username, this.tokenData.token.authorization)
        .then((res) => {
          this.watchlist = res.data.watchlist;
        })
        .catch((/* err */) => {
          // console.error(err);
        });
    },
    putFunds() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isButtonLoading = true;
          return homeServ.putFunds(this.userName, this.funds, this.tokenData.token.authorization)
            .then(() => {
              this.isButtonLoading = false;
            })
            .catch((err) => {
              this.excededInvestment = true;
              this.investmentMessage = err.response.data.message;
              this.isButtonLoading = false;
              // console.debug(err);
            });
        }
        return 0;
      });
    },
  },
    prueboBoton(){
      var myCallBack = 'http://localhost:8081/#/market'
      var signedRequestLink = 'https://app.request.network/#/pay-with-request/'
      var qs = JSON.stringify({signedRequest: signedRequestLink, callbackUrl: signedRequestLink , networkId: 4})
      var qsBase64 = btoa(qs)
      var qsb64Encoded = encodeURIComponent(qsBase64)
      document.location.href = 'https://app.request.network/#/pay-with-request/' + qsb64Encoded
    },
  computed: {
    userName() {
      return this.tokenData.sub.username;
    },
    formCompleted() {
      return !(this.form1 && this.selectedCountry != null && this.form3);
    },
    form2Completed() {
      return !(this.form4 && this.selectedSecurityQuestion != null && this.form5);
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/colors.styl'
  white-text = #e5e5e5

  .tab-pane.card-body
    padding 20px !important
    background-color #36404a
    border-radius 5px
  .bg-block
    background-color #36404a
    border-radius 5px
    color white-text
  .overview-block-1
  .overview-block-2
    padding 20px
  .overview-block-1
    .block
      display grid
      grid-template-columns 3fr 5fr
      grid-gap 40px
      .item-left
        text-align center
      .block-data
        .title
          margin-bottom 0
          margin-top 30px
  .overview-block-2
    height 100%
    text-align center
  .button-style
    background-color rgb(51, 90, 161)
    border-color rgb(51, 90, 161)
  .button-style2
    background-color #9fd0f4
    border-color #9fd0f4s
  .csv
    width  20%
  .tarjetaC
    width 45%
    float  left
    margin-right  5%
  .info
    color red
    margin-top  4%
  .failAlert
    color red
  .a
    color rgb(51, 90, 161)
  .pay-with-button
    height 60px
    min-width 200px
    display flex
    align-items center
    background-color #103b56
    font-size 16px
    font-weight normal
    color white
    border none
    border-radius 2px
    border-bottom 3px solid #6CFDCC
    padding 0 16px
  .a
    color red

</style>
