<template lang="pug">
  v-layout
    b-row.line
      template(v-if="loading")
        .loading-block
          p Loading...
      template(v-else)
        template(v-if="overview.validate1 === false")
          b-col(sm="12")
            b-alert.d-flex.align-items-center(show, dismissible, variant="warning")
              i.fa.fa-exclamation-circle.fa-2x(aria-hidden='true')
              | &nbsp {{ validateMsg }}

        b-col(sm="8")
          .overview-block-1.bg-block
            .block
              .item-left
                p.lead.text-uppercase Investment Overview
                .block-data
                  .item.top
                    p.title
                      span.currency €
                      span.h2 {{ overview.totalFounds }}
                      span.decimal ,00
                    span.lead.text-muted Portfolio value
                  .item.bottom
                    p.title
                      span.currency +
                      span.h4 14,5
                      span.decimal %
                    span.lead.text-muted Total Net Return
              .item-right
                p graficassshh
        b-col(sm="4")
          .overview-block-2.bg-block.mb-5
            .block.block-top
              p
                span.currency €
                span.h2 {{ overview.totalFounds }}
                span.decimal ,00
              span.lead.text-muted Available to invest
              .clearfix
              br
              b-button(variant="primary") Add tokens
            .block.block-bottom
              .item.item-1
                p
                  span.currency €
                  span.h3 {{ overview.cashFounds }}
                  span ,00
                span.lead.text-muted Cash
              .item.item-2
                p
                  span.currency €
                  span.h3 {{ overview.tokenFounds }}
                  span ,00
                span.lead.text-muted Tokens
        b-col(md='12')
          .performance-block
            p grafica bottom


</template>

<script>
import VLayout from '@/layouts/Default.vue';
import mixinToken from '@/mixins/token';
import homeServ from '@/services/home';

export default {
  name: 'Home',
  components: {
    VLayout,
  },
  mixins: [
    mixinToken,
  ],
  async created() {
    this.loading = true;
    this.tokenData = this.getToken();
    await this.getOverview(this.userName);
    this.loading = false;
  },
  data() {
    return {
      route: '',
      tokenData: null,
      loading: null,
      overview: null,
      validateMsg: 'You must validate your account before to continue',
    };
  },
  methods: {
    getOverview(username) {
      return homeServ.getOverview(username, this.tokenData.token.authorization)
        .then((res) => {
          console.debug(res);
          this.overview = res.data.overview;
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
  white-text = #e5e5e5
  .line
    border-top 1px solid #4f555d
    padding-top 22px
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
    text-align center
  .block
    &.block-top
      padding-bottom 25px
      border-bottom: 1px solid #4f555d;
    &.block-bottom
      padding-top 25px
      display grid
      grid-template-columns 1fr 1fr

</style>
