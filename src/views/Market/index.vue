<template lang="pug">
  v-layout
    template(v-if="isLoading")
      loading
    template(v-else)
      .bg-block
        b-table(:fields="table.fields", :items="table.items", striped, hover, dark, fixed)
          template(slot='changes', slot-scope='data',)
            span.clase(style='color:lightgreen', v-if='data.item.changes > 0') {{ data.item.changes }} %
            span.clase(style='color:red', v-else='data.item.changes < 0') {{ data.item.changes }} %
          template(slot="completeName", slot-scope="data")
            b-link.completeNameStyle(:to="{ name: 'Sportsmen', params: { sportsmenid: data.item.sportsmanID }}")
              | {{ data.item.completeName }}
</template>

<script>
import VLayout from '@/layouts/Default.vue';
import Loading from '@/components/Loading.vue';
import mixinToken from '@/mixins/token';
import marketServ from '@/services/market';

export default {
  name: 'Overview',
  components: {
    VLayout,
    Loading,
  },
  mixins: [
    mixinToken,
  ],
  async created() {
    this.isLoading = true;
    this.tokenData = this.getToken();
    await this.getMarket();
    this.isLoading = false;
  },
  data() {
    return {
      isPositive: null,
      isLoading: null,
      tableData: null,
      table: {
        items: [],
        fields: [],
      },
      tokenData: null,
      // Old <<
      chartOptions: {
        legend: {
          position: 'bottom',
          labels: {
            fontColor: '#fafafa',
          },
        },
      },
      datacollection: {
        labels: [],
        datasets: [],
      },
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
          key: 'sportsman',
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
          key: 'sportsman',
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
    getMarket() {
      marketServ.getMarket()
        .then((res) => {
          this.tableData = res.data;
          this.table.items = this.tableData;
          this.table.fields = [
            { key: 'completeName', label: 'Name', sortable: true },
            { key: 'sport', label: 'Sport', sortable: true },
            { key: 'country', label: 'Country', sortable: true },
            { key: 'totalSupply', label: 'Total Tokens', sortable: true },
            { key: 'currentSupply', label: 'Available', sortable: true },
            { key: 'tokenValue', label: 'Value', sortable: true },
            { key: 'changes', label: 'Change', sortable: true },
          ];
        })
        .catch((/* err */) => {
          // console.debug(err);
        });
    },
  },
  computed: {},
};
</script>

<style lang="stylus" scoped>
  .bg-block
    padding 20px !important
    background-color #36404a
    border-radius 5px
    margin-bottom 15px
  .completeNameStyle
    color rgb(51, 90, 161)
</style>
