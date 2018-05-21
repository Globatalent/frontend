<template lang="pug">
  v-layout
    template(v-if="loading")
      loading
    template(v-else)
      b-container
        b-row
          b-col(md="6", offset-md="3")
            b-jumbotron.reg-cont
              h3.title Search Player
              b-form.sign-up-form(@submit='onSubmit')
                b-form-group(label='Player Name')
                  model-select(:options="form.filteredPlayerOptions",
                    v-model="form.selectedPlayer",
                    placeholder="Player Name")
                b-form-group(label='Sport')
                  b-form-select.select(:options='form.sports',
                  v-model='form.selectedSport',
                  @change='selectedSport',
                  required)
                b-form-group(label='Citizen')
                  b-form-select.select(:options='form.citizen',
                  v-model='form.selectedCitizien',
                  @change='selectedCitizien',
                  required)
                b-form-group
                  b-button.button-style(type='submit',
                  block,
                  @click="goSportsmen",
                  :disabled="form.selectedPlayer === null") View Player Profile

</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["$_", "_id"] }] */
import VLayout from '@/layouts/Default.vue';
import Loading from '@/components/Loading.vue';
import mixinToken from '@/mixins/token';
import sportsMenServ from '@/services/sportsmen';
import { ModelSelect } from 'vue-search-select';

export default {
  name: 'Search',
  components: {
    VLayout,
    Loading,
    ModelSelect,
  },
  mixins: [
    mixinToken,
  ],
  async created() {
    this.loading = true;
    this.tokenData = this.getToken();
    await Promise.all([
      this.getSportsman(),
    ]);
    this.loading = false;
  },
  data() {
    return {
      form: {
        selectedPlayer: null,
        selectedSport: null,
        selectedCitizien: null,
        sports: [],
        citizen: [],
        playerNames: [],
        filters: {},
      },
      loading: null,
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
      tokenData: null,
      validateMsg: 'You must validate your account before to continue',
      overview: null,
      NOFILTER: 'All',
    };
  },
  methods: {
    goSportsmen() {
      this.$router.push({ name: 'Sportsmen', params: { sportsmenid: this.form.selectedPlayer } });
    },
    changedFilters() {
      this.form.filteredPlayerOptions = this.form.playerOptions;
      Object.keys(this.form.filters).forEach((filterKey) => {
        this.form.filteredPlayerOptions = this.form.filteredPlayerOptions
          .filter(this.form.filters[filterKey]);
      });
    },
    selectedSport(sport) {
      this.form.filters.filter1 = sport === this.NOFILTER ?
        () => true :
        playerInfo => playerInfo.sport === sport;
      this.changedFilters();
    },
    selectedCitizien(citizen) {
      this.form.filters.filter2 = citizen === this.NOFILTER ?
        () => true :
        playerInfo => playerInfo.citizen === citizen;
      this.changedFilters();
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
    getSportsman() {
      return sportsMenServ.getSportsman()
        .then((res) => {
          this.form.sports = this.$_.uniqBy(res.data, 'sport').map(elem => elem.sport);
          this.form.sports.unshift(this.NOFILTER);
          this.form.citizen = this.$_.uniqBy(res.data, 'country').map(elem => elem.country);
          this.form.citizen.unshift(this.NOFILTER);
          this.form.playerOptions = res.data.map((elem) => {
            const returnValue = {
              text: elem.completeName,
              value: elem.sportsmanID,
              sport: elem.sport,
              citizen: elem.country,
            };
            return returnValue;
          });
          this.form.filteredPlayerOptions = this.form.playerOptions;
          [this.form.selectedSport] = this.form.sports;
          [this.form.selectedCitizien] = this.form.citizen;
        })
        .catch((err) => {
          console.debug(err);
        });
    },
  },
  computed: {
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
    color rgb(51, 90, 161)
    display flex
    justify-content center
  .sign-up-form
    fieldset
      color #aaa
      font-size 13px
      font-weight bold
  .button-style
    margin-top 10px
    background-color  rgb(51, 90, 161)
    border  rgb(51, 90, 161)

</style>
