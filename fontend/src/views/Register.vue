<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="12" md="12" lg="8" xl="6">
        <form @submit.prevent="onSubmit()">
          <v-text-field
            autocomplete="off"
            label="Username"
            :rules="[rules.required]"
            v-model="form.username"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showpass ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            required
            @click:append="showpass = !showpass"
          ></v-text-field>

          <v-row>
            <v-col class="d-flex" cols="12" sm="2">
              <v-select
                autocomplete="off"
                :items="items"
                item-text="label"
                item-value="val"
                label="คำนำหน้า"
                required
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

          <v-btn type="submit" color="success" class="mr-4 mb-6">
            submit
          </v-btn>
          <v-row
            ><v-spacer></v-spacer>
            <v-alert v-if="this.errorAlert" elevation="6" shaped type="error">
              Token หมดอายุ กรุณาล็อคอินใหม่อีกครั้ง
              <v-btn to="/Login">login</v-btn>
            </v-alert>
          </v-row>
        </form>
      </v-col></v-row
    ></v-container
  >
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      showpass: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      errorAlert: false,
      items: [
        { label: "นาย", val: "นาย" },
        { label: "นาง", val: "นาง" },
        { label: "นางสาว", val: "นางสาว" },
      ],
      form: {
        username: "nullllll",
        password: "nullllll",
        fname: "nullllll",
        lname: "nullllll",
        token: localStorage.getItem("token"),
      },
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      axios
        .post("api/managerUser/register", this.form)
        .then((res) => {
          // this.errorAlert = false;
          if (res.status == 200) {
            (this.form.username = ""),
              (this.form.password = ""),
              (this.form.fname = ""),
              (this.form.lname = ""),
              (this.form.pname = "");
          } else {
            this.errorAlert = true;
          }

          // const data = response.data;
          // localStorage.setItem("token", data.token);
          // localStorage.setItem("fname", data.fname);
          // localStorage.setItem("lname", data.lname);
          // localStorage.setItem("pname", data.pname);
          // localStorage.setItem("username", data.username);
          // this.$router.push("/Login");
        })
        .catch(() => {
          this.errorAlert = true;
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

