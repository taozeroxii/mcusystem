<template>
  <v-card color="" class="mx-auto loading rounded-xl" max-width="100%" >
    <v-card-title>
      <h3> {{ this.$props.dataforcard.mcu_addr }}</h3>    
      <v-spacer></v-spacer>
      <div v-if="this.$props.dataforcard.status == 'เชื่อมต่อ'"><v-icon class="green--text form-control" > mdi-checkbox-marked-circle-outline</v-icon><small>เชื่อมต่อ</small> </div>
      <div v-if="this.$props.dataforcard.status != 'เชื่อมต่อ'"> <v-icon class="red--text form-control" > mdi-close-circle-outline</v-icon><small>ขาดการเชื่อมต่อ</small>  </div>
      <!-- <h3 :class="this.$props.dataforcard.status == 'เชื่อมต่อ'  ? 'green--text form-control'  : 'red--text form-control' "> {{ "&nbsp;" + this.$props.dataforcard.status }}</h3> -->
    </v-card-title>
  
    <v-card-subtitle class="justify-center" > 
      <p>  Mcu Id room : {{ this.$props.dataforcard.id }}</p>  
      <hr class="mb-5">
      <h3 :class="this.$props.dataforcard.elect > 200 ? 'green--text' : 'red--text' "> กระแสไฟ &nbsp;: {{ this.$props.dataforcard.elect }} V </h3>
      <br />
      <h3  :class="this.$props.dataforcard.temnow < 22 ? 'green--text' : 'red--text' " > อุณหภูมิ &nbsp;: {{ this.$props.dataforcard.temnow }} °C</h3>
      <br />
      <h3> ความชื้น &nbsp;: {{ this.$props.dataforcard.moisture_now }} % </h3></v-card-subtitle
    >
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
          หากไม่มีการอัพเดทข้อมูล >= 3 นาที ขาดการเชื่อมต่อ
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
