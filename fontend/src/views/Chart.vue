<template>
  <div>
    <AreaChart />
    <!-- <PieChart /> -->
    <BarChart />
    <!-- <RadarChart />
    <LineChart /> -->
  </div>
</template>

<script>
import AreaChart from "../components/Chart/AreaChart.vue";
// import PieChart from "../components/Chart/PieChart.vue";
import BarChart from "../components/Chart/BarChart.vue";
// import RadarChart from "../components/Chart/RadarChart.vue";
// import LineChart from "../components/Chart/LineChart.vue";

export default {
  name: "Char",
  components: {
    AreaChart,
    // PieChart,
    BarChart,
    // RadarChart,
    // LineChart,
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10,
      },
    };
  },
};
</script>

<style>
#AreaChart {
  margin-top: 60px;
}
</style>
