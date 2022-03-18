<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
// import moment from "moment";
export default {
  extends: Bar,
  data() {
    return {
      values: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [],
    };
  },

  async created() {
    // await this.checkLogin();
    this.loading = true;
    axios
      .get("api/mcusystem/datayear", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data.model);
        this.loading = false;
        this.ck_connect = false;
        for (var i = 0; i < 5; i++) {
          //   this.dataforcard.push({
          //     id: response.data.model[i].mcu_id,
          //     mcu_addr: response.data.model[i].mcu_addr,
          //     temnow: response.data.model[i].mcu_temp,
          //     elect:
          //       response.data.model[i].mcu_elect < 0
          //         ? 0
          //         : response.data.model[i].mcu_elect,
          //     moisture_now: response.data.model[i].mcu_moisture,
          //     updatetime: moment(response.data.model[i].mcu_update_time).format(
          //       "DD/MM/YYYY HH:mm:ss"
          //     ),
          //     status: this.alertErrorTime(
          //       moment(response.data.model[i].mcu_update_time).format(
          //         "YYYY-MM-DD HH:mm:ss"
          //       )
          //     ),
          //   });
        }
      })
      .catch(() => {
        this.loading = false;
        this.ck_connect = true;
      });
  },

  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor:
              "#" + Math.floor(Math.random() * 16777215).toString(16),
            data: [40, 20, 12, 39, 11, 40, 39, 60, 40, 20, 12, 11],
          },
          {
            label: "Data Two",
            backgroundColor:
              "#" + Math.floor(Math.random() * 16777215).toString(16),
            data: [40, 20, 12, 39, 11, 40, 39, 45, 40, 20, 12, 11],
          },
          {
            label: "Data Three",
            backgroundColor:
              "#" + Math.floor(Math.random() * 16777215).toString(16),
            data: [40, 20, 12, 39, 11, 40, 39, 55, 40, 20, 12, 11],
          },
          {
            label: "Data Four",
            backgroundColor:
              "#" + Math.floor(Math.random() * 16777215).toString(16),
            data: [40, 20, 12, 39, 11, 40, 39, 70, 40, 20, 12, 11],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false, onClick: this.handle }
    );
  },
  methods: {
    handle(point, event) {
      // console.log(event);
      // console.log(point);
      const item = event[0];
      // console.log(item);
      if (item) {
        console.log(item);
        console.log(item._index);
        console.log(item._view.backgroundColor);
        console.log(this.values[item._index]);
      }

      // this.$emit("on-receive", {
      //   index: item._index,
      //   backgroundColor: item._view.backgroundColor,
      //   value: this.values[item._index],
      // });
    },
    update(data) {
      console.log(data);
    },
  },
};
</script>
