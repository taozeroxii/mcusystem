<template>
  <div>
    <hello-world /><v-container class="grey lighten-5">
      <v-row>
        <v-col
          order="first"
          class="col-12 col-md-6 col-lg-3"
          v-for="(item, index) in dataforcard"
          :key="index"
          :class="item === 1 ? 'mb-6' : ''"
        >
          <Cardtem :dataforcard="dataforcard[index]" />
        </v-col> </v-row
    ></v-container>
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
      timeinterval: new Date().toLocaleString(),
      myInterval: null,
      dataforcard: [],
    };
  },
  components: {
    HelloWorld,
    Cardtem,
  },
  created() {
    axios.get("http://localhost:3015/api/mcusystem").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.dataforcard.push({
          id: response.data[i].mcu_id,
          mcu_addr: response.data[i].mcu_addr,
          temnow: response.data[i].mcu_temp,
          moisture_now: response.data[i].mcu_moisture,
          updatetime: moment(response.data[i].mcu_update_time).format(
            "DD/MM/YYYY HH:mm:ss"
          ),
        });
      }
    });
  },

  mounted() {
    this.update_temp_interva();
  },

  methods: {
    update_temp_interva() {
      this.myInterval = setInterval(() => {
        axios.get("http://localhost:3015/api/mcusystem").then((response) => {
          // this.dataforcard.temnow = response.data.mcu_temp;
          // this.dataforcard.moisture_now = response.data.mcu_moisture;
          // this.dataforcard.updatetime = moment(  response.data.mcu_update_time ).format("DD/MM/YYYY HH:mm:ss");
          this.dataforcard = [];
          for (var i = 0; i < response.data.length; i++) {
            this.dataforcard.push({
              id: response.data[i].mcu_id,
              mcu_addr: response.data[i].mcu_addr,
              temnow: response.data[i].mcu_temp,
              moisture_now: response.data[i].mcu_moisture,
              updatetime: moment(response.data[i].mcu_update_time).format("DD/MM/YYYY HH:mm:ss" ),
            });
          }
        });
      }, 3000);
      
    },
  },

  destroyed() {
    this.dataforcard = [];
    clearInterval(this.myInterval); // เครียค่า interval เมื่อทำการเปลี่ยนหน้า
  },
};
</script>
