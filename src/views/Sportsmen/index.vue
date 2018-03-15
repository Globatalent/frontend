<template lang="pug">
  v-layout
    template(v-if="loading")
      loading
    template(v-else)
      b-col(sm="12")
        .user-header-block.d-flex.justify-content-center
          .cont-center.d-flex.flex-column
            .item
              template(v-if="image")
                b-img(:src='image',
                  alt='img',
                  rounded="circle",
                  width="100px", height="100px")
              template(v-else)
                img(src="/assets/img/default-avatar.png", width="100px", height="100px")
            .item
              h2 {{ completeName }}
                small.heart(@click="likeSportsmen")
                  i.fa.fa-heart(v-if='supporterSportsmen')
                  template(v-if='!supporterSportsmen')
                    i.fa.fa-heart-o
                    small.text-muted &nbsp Follow
              h4 {{ noOfLikes }}
                b &nbsp Likes
        p.text-center {{ about }}
      b-col(sm="12")
        b-tabs.nav-fill()
          b-tab(title='Stock', active='').pt-4
            .overview-block-2.bg-block.mb-5
              .block.block-bottom
                .item.item-1
                  p.mb-0.h3
                    vue-numeric(currency='',
                    separator='.',
                    v-model='totalSupply',
                    :read-only="true")
                    | &nbsp {{ tokenName }}
                  span.lead.text-muted Total Supply
                .item.item-2
                  p.mb-0.h3
                    vue-numeric(currency='',
                    separator='.',
                    v-model='currentSupply',
                    :read-only="true")
                    | &nbsp {{ tokenName }}
                  span.lead.text-muted Current Supply
              .block
                .item.item-1
                  p
                    span.h3 1 {{ tokenName }} = USD {{ tokenValue }}
                  hr
                  template(v-if="addTokensResult")
                    b-alert(show, dismissible, :variant="addTokensResult.result == 'success' ? 'success' : 'danger'")
                      | {{ addTokensResult.message }}
                  .super-input.d-flex.justify-content-center
                    .cont
                      b-form-group(label='Token Amount')
                        b-form-input.mb-3(@input="calculateTotalTokenAmount",
                        v-model='tokensToBuy',
                        type='number',
                        placeholder='Amount of tokens',
                        name='Amount of tokens',
                        v-validate="'numeric|max:8'",
                        :class="{'input': true, 'is-danger': errors.has('tokensToBuy') }")
                        span.help.is-danger(v-show="errors.has('Amount of tokens')").failAlert {{ errors.first('Amount of tokens') }}
                      b-form-group(label='Price')
                        b-form-input.mb-3(v-model='priceAmountToken',
                        type='number',
                        disabled)
                      b-button.button-style(variant="primary", @click.prevent="checkAmount") Buy Tokens &nbsp
                        i.fa.fa-credit-card
            b-modal(centered='',
            v-model="amountCorrect",
            title="Purchase Confirmation",
            header-bg-variant="dark",
            body-bg-variant="secondary",
            footer-bg-variant="dark",
            body-text-variant="light")
              b-container(fluid='')
                b-row.mb-1
                  h5.my-4
                    | Confirm purchase of &nbsp;
                    span
                      b
                        ins {{ tokensToBuy }}
                    | &nbsp {{ tokenName }} for &nbsp
                    span
                      b
                        ins {{ priceAmountToken }}
                    | &nbsp USD
              .w-100(slot='modal-footer')
                b-btn.float-right(size='sm',
                variant='primary',
                @click='buyTokens',
                block).button-style
                  | Confirm purchase

            .overview-block-2.bg-block.mb-5(v-if='investorSportsmen')
              .block.block-bottom
                .item.item-1
                  p.mb-0.h3
                    vue-numeric(separator='.', v-model='tokenAmount',
                    :read-only="true", :precision="2")
                  span.lead.text-muted Token Amount
                .item.item-2
                  p.mb-0
                    span.h3 USD {{ tokenValue }}
                  span.lead.text-muted Token Value
              .block
                .item.item-1
                  p
                    span.h3 Capitalization = &nbsp;
                      vue-numeric(currency='USD',
                      separator='.',
                      v-model='tokenCapitalization',
                      :read-only="true",
                      :precision="2")
            .overview-block-2.bg-block.mb-5(v-if='investorSportsmen')
              h1 Price Graph (7d)
              .block.block-bottom
                chart-line(:data="chartData", :options="chartOptions")
          b-tab(title='Information').pt-4
            b-row
              b-col(sm="4")
                .gg
                  b-button.button-style(v-if='facebookLink',
                  :href='facebookLink',
                  block,
                  target="_blank")
                    b Facebook
                  b-button.button-style(v-if='linkedinLink',
                  :href='linkedinLink',
                  block,
                  target="_blank")
                    b LinkedIn
                  b-button.button-style(v-if='youtubeLink',
                  :href='youtubeLink',
                  block,
                  target="_blank")
                    b YouTube
                  b-button.button-style(v-if='twitterLink',
                  :href='twitterLink',
                  block,
                  target="_blank")
                    b Twitter
                  b-button.button-style(v-if='vimeoLink',
                  :href='vimeoLink',
                  block,
                  target="_blank")
                    b Vimeo
                  b-button.button-style(v-if='instagramLink',
                  :href='instagramLink',
                  block,
                  target="_blank")
                    b Instagram
                b-jumbotron.jumbotron-profile
                  ul.list-unstyled(v-if='sport')
                    li
                      h3 Sport
                      p {{ this.sport }}
                  ul.list-unstyled(v-if='country')
                    li
                      h3 Country (Sports)
                      p {{ this.country }}
                  ul.list-unstyled(v-if='residence')
                    li
                      h3 Residence
                      p {{ this.residence }}
                  ul.list-unstyled(v-if='born')
                    li
                      h3 Born
                      p {{ this.born }}
                  ul.list-unstyled(v-if='born')
                    li
                      h3 Birth Place
                      p {{ this.birthPlace }}
                  ul.list-unstyled(v-if='height')
                    li
                      h3 Height
                      p {{ this.height }}
                  ul.list-unstyled(v-if='weight')
                    li
                      h3 Weight
                      p {{ this.weight }}
                  ul.list-unstyled(v-if='coach')
                    li
                      h3 Coach
                      p {{ this.coach }}
                  ul.list-unstyled(v-if='team')
                    li
                      h3 Team
                      p {{ this.team }}
                  ul.list-unstyled(v-if='proDate')
                    li
                      h3 ProDate
                      p {{ this.proDate }}
                  ul.list-unstyled(v-if='skills')
                    li
                      h3 Skills
                      p {{ this.skills }}
              b-col(sm="8")
                .gg
                  b-embed(type='iframe', aspect='16by9', :src='videos', allowfullscreen='')
                  br
                  hr
                  p {{ this.descriptionText }}
          b-tab.gg.mt-4.tab-bold(title='Milestones')
            b-table(striped, hover, :items='itemsMilestones', :fields='fieldsMilestones', dark)
          b-tab.gg.mt-4(title='Expenses')
            b-table(striped, hover, :items='itemsExpenses', :fields='fieldsExpenses', dark)


</template>

<script>
import VLayout from '@/layouts/Default.vue';
import ChartLine from '@/components/ChartLine.vue';
import Loading from '@/components/Loading.vue';
import mixinToken from '@/mixins/token';
import sportsMenServ from '@/services/sportsmen';
import homeServ from '@/services/home';

export default {
  name: 'Sportsmen',
  components: {
    VLayout,
    ChartLine,
    Loading,
  },
  mixins: [
    mixinToken,
  ],
  async created() {
    this.loading = true;
    this.tokenData = this.getToken();
    this.sportsmenName = this.$route.params.sportsmenid;
    this.image = sportsMenServ.getSportsmenPicturePath(this.sportsmenName);
    await Promise.all([
      this.getSportsInfo(this.sportsmenName),
      this.getUserInfo(this.sportsmenName),
      this.getSportsMilestones(this.sportsmenName),
      this.getSportsExpenses(this.sportsmenName),
      this.getSportsTokens(this.sportsmenName),
      this.getInvestorInfo(this.sportsmenName),
    ]);
    this.loading = false;
  },
  data() {
    return {
      addTokensResult: null,
      tokensToBuy: null,
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: '#fafafa',
          },
        },
      },
      priceAmountToken: null,
      tokenAmount: '',
      supporterSportsmen: false,
      investorSportsmen: false,
      image: '',
      sportsmenName: '',
      tokenData: null,
      loading: null,
      overview: null,
      completeName: '',
      noOfLikes: null,
      country: '',
      residence: '',
      born: '',
      birthPlace: '',
      height: '',
      weight: '',
      videos: '',
      coach: '',
      proDate: '',
      team: '',
      skills: '',
      about: '',
      sport: '',
      descriptionText: '',
      facebookLink: '',
      linkedinLink: '',
      twitterLink: '',
      youtubeLink: '',
      vimeoLink: '',
      instagramLink: '',
      currentSupply: '',
      tokenValue: '',
      totalSupply: '',
      tokenName: '',
      tokenCapitalization: null,
      amountCorrect: false,
      fieldsExpenses: [
        {
          key: 'progress',
          label: 'Progress',
          sortable: true,
        },
        {
          key: 'expenses',
          label: 'Expenses',
          sortable: true,
        },
        {
          key: 'event',
          label: 'Event',
          sortable: true,
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
        },
      ],
      itemsExpenses: [],
      fieldsMilestones: [
        {
          key: 'accomplishment',
          label: 'Accomplishment',
          sortable: true,
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
        },
        {
          key: 'event',
          label: 'Event',
          sortable: true,
        },
      ],
      itemsMilestones: null,
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    };
  },
  methods: {
    checkAmount() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.amountCorrect = true;
        } else {
          this.amountCorrect = false;
        }
        return 0;
      });
    },
    calculateTotalTokenAmount() {
      this.priceAmountToken = this.tokensToBuy * this.tokenValue;
    },
    buyTokens() {
      this.amountCorrect = false;
      this.loading = true;
      const token = this.tokenData.token.authorization;
      return sportsMenServ.buyTokens(this.userName, this.tokensToBuy, this.sportsmenName, token)
        .then((res) => {
          this.addTokensResult = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.debug(err);
        });
    },
    getInvestorInfo(sportsmenName) {
      return homeServ
        .getInvesting(this.userName, sportsmenName, this.tokenData.token.authorization)
        .then((res) => {
          if (res.data.type === 'investor') {
            this.supporterSportsmen = true;
            this.investorSportsmen = true;
          } else if (res.data.type === 'follower') {
            this.supporterSportsmen = true;
          } else {
            this.supporterSportsmen = false;
            this.investorSportsmen = false;
          }
          Object.assign(this, res.data.investments);
          this.tokenCapitalization = (this.tokenAmount * this.tokenValue);
          this.chartData.labels = this.days;
          this.chartData.datasets[0] = {
            label: 'Change last week',
            backgroundColor: '#6aa5dc',
            data: res.data.changes,
          };
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    getSportsInfo(sportsmenName) {
      return sportsMenServ.getSportsmenInformation(sportsmenName)
        .then((res) => {
          Object.assign(this, res.data);
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    getUserInfo(sportsmenName) {
      return sportsMenServ.getSportsmen(sportsmenName)
        .then((res) => {
          Object.assign(this, res.data);
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    getSportsMilestones(sportsmenName) {
      return sportsMenServ.getSportsmenMilestones(sportsmenName)
        .then((res) => {
          this.itemsMilestones = res.data;
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    getSportsExpenses(sportsmenName) {
      return sportsMenServ.getSportsmenExpenses(sportsmenName)
        .then((res) => {
          this.itemsExpenses = res.data;
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    getSportsTokens(sportsmenName) {
      return sportsMenServ.getSportsmenTokens(sportsmenName)
        .then((res) => {
          Object.assign(this, res.data.tokens);
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    followSportsmen(sportsmenName) {
      const token = this.tokenData.token.authorization;
      return homeServ
        .followSportsmen(this.userName, sportsmenName, this.completeName, this.tokenValue, token)
        .then(() => {
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    unFollowSportsmen(sportsmenName) {
      const token = this.tokenData.token.authorization;
      return homeServ
        .unFollowSportsmen(this.userName, sportsmenName, token)
        .then(() => {
        })
        .catch((err) => {
          console.debug(err);
        });
    },
    likeSportsmen() {
      if (this.supporterSportsmen === true) {
        this.supporterSportsmen = false;
        this.noOfLikes -= 1;
        this.unFollowSportsmen(this.sportsmenName);
      } else {
        this.supporterSportsmen = true;
        this.noOfLikes += 1;
        this.followSportsmen(this.sportsmenName);
      }
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
  white-text = #e5e5e5
  .tab-pane.card-body,
  .gg
    padding 20px !important
    background-color #36404a
    border-radius 5px
    margin-bottom 15px
  .bg-block
    background-color #36404a
    color white-text
  .overview-block-1
    .content
      display grid
      grid-template-columns 3fr 4fr
  .overview-block-2
    text-align center
    padding 10px
  .block
    &.block-top
      padding-bottom 25px
      border-bottom: 1px solid #4f555d;
    &.block-bottom
      padding-top 25px
      display grid
      grid-template-columns 1fr 1fr
  .jumbotron-profile
    background-color #36404a
    ul
      li
        h3
          margin-bottom 0
          font-size 20px
          color #a4aaaf
          font-weight: bold;
        p
          font-size 15px
  .user-header-block
    width 100%
    .item
      text-align center
    .heart
      color red
      cursor pointer
      margin-left 10px
  .super-input
    .cont
      width 300px
  .button-style
    background-color #335aa1
    border-color #335aa1
  .failAlert
    color red

</style>
