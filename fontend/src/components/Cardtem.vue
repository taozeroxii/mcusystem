<template>
  <v-card color="white" class="mx-auto loading rounded-xl" max-width="100%" >
    <v-card-title>
      <h3> {{ this.$props.dataforcard.mcu_addr }}</h3>    
      <v-spacer></v-spacer>
      <div v-if="this.$props.dataforcard.status == 'เชื่อมต่อ'"><v-icon class="green--text form-control" > mdi-checkbox-marked-circle-outline</v-icon> </div>
      <div v-if="this.$props.dataforcard.status != 'เชื่อมต่อ'"> <v-icon class="red--text form-control" >  mdi-filter-remove-outline</v-icon>  </div>
      <!-- <h3 :class="this.$props.dataforcard.status == 'เชื่อมต่อ'  ? 'green--text form-control'  : 'red--text form-control' "> {{ "&nbsp;" + this.$props.dataforcard.status }}</h3> -->
    </v-card-title>
  
    <v-card-subtitle class="justify-center" > 
      <p >  Mcu Id : {{ this.$props.dataforcard.id }}&nbsp; status :<small :class="this.$props.dataforcard.status  =='เชื่อมต่อ' ?'green--text font-italic': 'red--text font-italic'"> {{this.$props.dataforcard.status}}</small></p>  
      <hr class="mb-5">

      <v-card-text>
        <v-row align="center">
          <v-col :class="this.$props.dataforcard.temnow < 26 ? 'green--text text-h6' : 'red--text text-h6' " cols="4" ><sup class="font-italic">อุณหภูมิ</sup><br> {{ this.$props.dataforcard.temnow }}&deg;C</v-col>
          <v-col class="text-h6" cols="4"> <sup class="font-italic">ความชื้น</sup> <br> {{ this.$props.dataforcard.moisture_now }} %   </v-col>
          <v-col class="text-h6"  cols="4"><sup class="font-italic">กำลังไฟ</sup><br> {{ this.$props.dataforcard.elect }} V. </v-col>
        </v-row>
      </v-card-text>
    </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text v-if="this.$props.dataforcard.temnow">
          <b>ข้อมูลอัพเดทล่าสุด ณ {{ this.$props.dataforcard.updatetime }} น. </b> <br>
          ข้อมูลอุณหภูมิจะถูกอัพเดทในทุกๆ 30 วินาที <br />
          หากไม่มีการอัพเดทข้อมูล >= 3 นาที  = ขาดการเชื่อมต่อ
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "cardtem",
  data() {
    return {
      status: "เชื่อมต่อ",
      show: false,
    };
  },
  props: {
    dataforcard: {
      required: true,
    },
  },
  mounted() {
    //   console.log(this.dataforcard)
  },
};
</script>

<style>

</style>
