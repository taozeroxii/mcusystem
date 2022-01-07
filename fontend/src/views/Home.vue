<template>
  <div>
    <hello-world />

    <v-row no-gutters>
      <v-col order="first">
        <v-card class="pa-2" outlined tile>
          <Cardtem :dataforcard="dataforcard" />
        </v-card>
      </v-col>
      <v-col order="last">
        <v-card class="pa-2" outlined tile> last </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile> Second, but unordered </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import Cardtem from "../components/Cardtem";
import axios from "axios";
import moment from "moment";

export default {
  name: "Home",
  data() {
    return {
      dataforcard: 
        {
          status: "เชื่อมต่อ",
          show: false,
          temnow: null,
          moisture_now: null,
          updatetime: null,
          timeinterval: new Date().toLocaleString(),
          myInterval: null,
        },
    };
  },
  components: {
    HelloWorld,
    Cardtem,
  },
  created() {
    axios.get("http://localhost:3015/api/mcusystem").then((response) => {
      this.dataforcard.temnow = response.data.mcu_temp;
      this.dataforcard.moisture_now = response.data.mcu_moisture;
      this.dataforcard.updatetime = moment(response.data.mcu_update_time).format("DD/MM/YYYY HH:mm:ss");
      // if(this.timeinterval -  this.updatetime ){ this.status = 'เชื่อมต่อ';}else { this.status = 'ขาดการเชื่อมต่อ'; }
      // console.log(this.dataforcard.updatetime);
    });
  },

  mounted() {
    this.update_temp_interva();
  },

  methods: {
    update_temp_interva() {
      this.myInterval = setInterval(() => {
        axios.get("http://localhost:3015/api/mcusystem").then((response) => {
          this.dataforcard.temnow = response.data.mcu_temp;
          this.dataforcard.moisture_now = response.data.mcu_moisture;
          this.dataforcard.updatetime = moment( response.data.mcu_update_time ).format("DD/MM/YYYY HH:mm:ss");
        });
      }, 10000);
    },
  },

  destroyed() {
    clearInterval(this.myInterval); // เครียค่า interval เมื่อทำการเปลี่ยนหน้า
  },
};
</script>
