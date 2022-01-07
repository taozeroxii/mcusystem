<template>
  <div>
    <v-container class="grey lighten-5">
      <v-alert text  prominent type="error"  icon="mdi-cloud-alert"  v-if="ck_connect" > ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้</v-alert >

      <v-row v-if="!ck_connect">
        <v-col  order="first"   class="col-12 col-md-6 col-lg-3" v-for="(item, index) in dataforcard" :key="index"  :class="item === 1 ? 'mb-6' : ''">
          <Cardtem :dataforcard="dataforcard[index]" />
        </v-col> 
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Cardtem from "../components/Cardtem";
import axios from "axios";
import moment from "moment";

export default {
  name: "Home",
  data() {
    return {
      ck_connect: false,
      timeinterval: new Date().toLocaleString(),
      myInterval: null,
      dataforcard: [],
    };
  },
  components: {
    Cardtem,
  },
  created() {
    axios.get("http://localhost:3015/api/mcusystem").then((response) => {
        this.ck_connect = false ;
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
      })
      .catch(() => {
        // console.log(error);
        this.ck_connect = true;
      });
  },

  mounted() {
    this.update_temp_interva();
  },

  methods: {
    update_temp_interva() {
      this.myInterval = setInterval(() => {
        axios .get("http://localhost:3015/api/mcusystem").then((response) => {
            // this.dataforcard.temnow = response.data.mcu_temp;
            // this.dataforcard.moisture_now = response.data.mcu_moisture;
            // this.dataforcard.updatetime = moment(  response.data.mcu_update_time ).format("DD/MM/YYYY HH:mm:ss");
            this.ck_connect = false ;
            this.dataforcard = [];
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
          })
          .catch(() => {
            // console.log(error);
            this.ck_connect = true;
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
