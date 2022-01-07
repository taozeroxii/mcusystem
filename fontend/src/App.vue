<template>
  <v-app>
    <v-app-bar app >
      <v-toolbar-title>Mcu System temperature</v-toolbar-title>
      <v-spacer></v-spacer>
      TIME :{{ timeinterval }}
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-link to="/"><v-btn color="blue-grey" class="ma-2 white--text"> HOME &nbsp;<v-icon small>home </v-icon></v-btn ></router-link>
      <router-link to="/about"><v-btn class="ma-2 " > About   &nbsp; <v-icon small>info</v-icon></v-btn></router-link>
      <router-link to="/"><v-btn  class="ma-2 " > Login &nbsp;<v-icon small> mdi-wrench </v-icon></v-btn></router-link> 
      <router-view />
      
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      timeinterval: new Date().toLocaleString(),
    };
  },

  mounted() {
    setInterval(() => {
      this.timeinterval = new Date().toLocaleString();
    }, 1000);
  },
};
</script>

<style>
A:link {
  text-decoration: none;
}
</style>
