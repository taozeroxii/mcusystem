<template>
  <v-app>
    <v-app-bar app dark src="https://picsum.photos/1920/1080?random">
      <v-toolbar-title>Mcu System temperature</v-toolbar-title>
      <v-spacer></v-spacer>
      {{ timeinterval }}
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-menu bottom left> </v-menu>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/"> HOME &nbsp;<v-icon small>home </v-icon></v-tab>
          <v-tab to="/Chart"
            >Chart &nbsp; <v-icon small>analytics</v-icon></v-tab
          >
          <v-tab to="/about">About &nbsp; <v-icon small>info</v-icon></v-tab>
          <v-tab to="/Login">
            Login &nbsp;<v-icon small>mdi-login</v-icon></v-tab
          >
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main class="mt-3">
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
