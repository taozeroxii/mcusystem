<template>
  <div>
    <hello-world />
    <v-card  color="#385F73" dark class="mx-auto" max-width="344">
      <v-card-title> อุณหภูมิห้องศูนย์คอมพิวเตอร์ MCU 1</v-card-title><br>
      <v-card-subtitle class="justify-center" v-if="temnow" ><h1>อุณหภูมิ  &nbsp;: {{ temnow }} °C</h1> <br><h1>ความชื้น &nbsp;: {{ moisture_now }} % </h1></v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show" >
          <v-divider></v-divider>
          <v-card-text v-if="temnow" > ข้อมูลอุณหภูมิจะถูกอัพเดทในทุกๆ 30 วินาที 
            <br />ข้อมูลอัพเดทล่าสุด ณ {{updatetime}} น.
            <br />สถานะ : {{status}}  
          </v-card-text>
          
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import axios from "axios";
import moment from "moment"

export default {
  name: "Home",
  data: () => ({
    status:'เชื่อมต่อ',
    show: false,
    temnow: null,
    moisture_now:null,
    updatetime: null,
    timeinterval: new Date().toLocaleString(),
    myInterval:null
  }),
  components: {
    HelloWorld,
  },

  created() {
    axios.get("http://localhost:3015/api/mcusystem").then((response) => {
      this.temnow = response.data.mcu_temp; 
      this.moisture_now= response.data.mcu_moisture; 
      this.updatetime = moment(response.data.mcu_update_time).format('DD/MM/YYYY HH:mm:ss');
      // console.log(this.updatetime)
      // if(this.timeinterval -  this.updatetime ){ this.status = 'เชื่อมต่อ';}else { this.status = 'ขาดการเชื่อมต่อ'; }
      console.log(this.updatetime)

    });
  },

  mounted() {
    this.update_temp_interva();
  },



  methods: {
    update_temp_interva(){
     this.myInterval =  setInterval(() => {
          axios.get("http://localhost:3015/api/mcusystem").then((response) => {
            // console.log(response.data.mcu_temp);
            this.temnow = response.data.mcu_temp;
            this.moisture_now= response.data.mcu_moisture; 
            this.updatetime = moment(response.data.mcu_update_time).format('DD/MM/YYYY HH:mm:ss');
          });
        }, 30000);
    },
  },

destroyed() {
  clearInterval(this.myInterval);// เครียค่า interval เมื่อทำการเปลี่ยนหน้า
},
 
};
</script>
