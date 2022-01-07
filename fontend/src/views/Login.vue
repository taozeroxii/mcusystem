<template>
  <v-container>
    <form>
      <v-text-field
        :counter="10"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        label="E-mail"
        required

      ></v-text-field>


      <v-btn class="mr-4" > submit </v-btn>
      <v-btn > clear </v-btn>
    </form></v-container
  >
</template>

<script>
export default {
  name: "login",
};
</script>

<style></style>
