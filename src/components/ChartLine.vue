<script>
// CommitChart.js
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  name: 'ChartLine',
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>
