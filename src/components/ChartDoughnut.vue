<script>
// CommitChart.js
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  name: 'ChartDoughnut',
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>
