<template>
  <v-container>
    <form @submit.prevent="onSubmit()">
      <v-text-field
        autocomplete="off"
        label="Username"
        v-model="form.username"
        required
      ></v-text-field>
      <v-text-field
        autocomplete="off"
        :counter="6"
        v-model="form.password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-row>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            autocomplete="off"
            :items="items"
            item-text="label"
            item-value="val"
            label="โปรดระบุคำนำหน้า"
            v-model="form.pname"
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="5">
          <v-text-field
            autocomplete="off"
            label="ชื่อจริง"
            v-model="form.fname"
            required
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="5">
          <v-text-field
            autocomplete="off"
            label="นามสกุล"
            v-model="form.lname"
            required
          ></v-text-field></v-col
      ></v-row>

      <v-btn type="submit" color="success" class="mr-4"> submit </v-btn>
    </form></v-container
  >
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      items: [
        { label: "นาย", val: "นาย" },
        { label: "นาง", val: "นาง" },
        { label: "นางสาว", val: "นางสาว" },
      ],
      form: {
        username: "null",
        password: "null",
        fname: "null",
        lname: "null",
        token: localStorage.getItem("token"),
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      axios
        .post("api/managerUser/register", this.form)
        .then((response) => {
          console.log(response.data);
          // const data = response.data;
          // localStorage.setItem("token", data.token);
          // localStorage.setItem("fname", data.fname);
          // localStorage.setItem("lname", data.lname);
          // localStorage.setItem("pname", data.pname);
          // localStorage.setItem("username", data.username);
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
          this.ck_connect = true;
        });
    },
    clearform() {
      localStorage.clear();
      this.form.username = null;
      this.form.password = null;
    },
  },
};
</script>

<style></style>

