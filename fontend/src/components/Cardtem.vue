<template>
  <v-card color="#385F73" dark class="mx-auto" max-width="344">
    <v-card-title> อุณหภูมิห้องศูนย์คอมพิวเตอร์ MCU 1</v-card-title><br />
    <v-card-subtitle class="justify-center"
      ><h1>อุณหภูมิ &nbsp;: {{ this.$props.dataforcard.temnow}} °C</h1>
      <br />
      <h1>ความชื้น &nbsp;: {{ this.$props.dataforcard.moisture_now }} %</h1></v-card-subtitle
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
          ข้อมูลอุณหภูมิจะถูกอัพเดทในทุกๆ 30 วินาที <br />ข้อมูลอัพเดทล่าสุด ณ
         {{ this.$props.dataforcard.updatetime }} น. <br />สถานะ : {{ status }}
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
  },mounted() {
    //   console.log(this.dataforcard)
  },

  
};
</script>

<style></style>
