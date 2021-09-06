<template>
  <div class="mt-5">
    <br /><br />
    <b-container fluid>
      <b-row align-h="center">
        <b-col sm="9">
          <!-- <b-card class="pt-5 pb-5"> -->
          <b-row align-h="center">
            <b-col sm="8">
              <template class="signedIn" v-if="currentUser">
                <b-card
                  border-variant="dark"
                  header-bg-variant="light"
                  header-border-variant="success"
                  header-tag="header"
                  footer-tag="footer"
                >
                  <template #header>
                    <h3 class="mb-0 text-center">Signed in</h3>
                  </template>
                  <b-card-body>
                    <b-card-text
                      >You are currently signed in as
                      <strong>{{ getUsername() }}</strong>
                    </b-card-text>
                  </b-card-body>
                  <template v-slot:footer>
                    <div class="w-100">
                      <router-link to="/home" custom v-slot="{ navigate }">
                        <b-button
                          @click="navigate"
                          @keypress.enter="navigate"
                          role="link"
                          size="md"
                          variant="outline-info"
                          class="float-left"
                        >
                          Home
                        </b-button>
                      </router-link>
                      <b-button
                        :pressed.sync="logout.state"
                        class="float-right"
                        variant="outline-danger"
                        >Logout</b-button
                      >
                      <div v-if="logout.state">{{ logOut() }}</div>
                    </div>
                  </template>
                  <br />

                  <br />
                  <br />
                </b-card>
              </template>
              <template class="signIn createAct" v-if="!currentUser">
                <b-card header-tag="header">
                  <template #header>
                    <h3 class="mb-0 text-center">
                      Please sign in or create an account.
                    </h3>
                  </template>

                  <b-form
                    @submit="onLogin"
                    @reset="onReset"
                    v-if="!create.state"
                  >
                    <b-form-group id="input-group-1" label-for="input-1">
                      <div role="group">
                        <label for="input-username">Username:</label>
                        <b-form-input
                          id="input-username"
                          v-model="form.username"
                          type="text"
                          required
                          trim
                        ></b-form-input>
                      </div>
                      <br />
                      <div role="group">
                        <label for="input-password">Password:</label>
                        <b-form-input
                          id="input-password"
                          v-model="form.password"
                          type="password"
                          required
                          trim
                        ></b-form-input>
                      </div>
                      <div class="alert-container" v-if="form.errorMessage">
                        <div class="alert">
                          <span
                            ><i class="icon-sign"></i
                            >{{ form.errorMessage }}</span
                          >
                        </div>
                      </div>
                      <br />
                    </b-form-group>

                    <b-button type="submit" variant="success">Sign in</b-button>
                    <b-button
                      :pressed.sync="create.state"
                      @click="resetErr()"
                      variant="primary"
                      >Create Account</b-button
                    >
                    <b-button type="reset" variant="danger">Reset</b-button>
                  </b-form>
                  <b-form
                    @submit="onCreate"
                    @reset="onReset"
                    v-if="create.state"
                  >
                    <div role="group">
                      <label for="input-email">Email:</label>
                      <b-form-input
                        id="input-email"
                        v-model="form.email"
                        type="email"
                        :state="validate"
                        aria-describedby="input-live-help validate"
                        required
                        placeholder="john.doe@site.com"
                      ></b-form-input>
                      <b-form-invalid-feedback id="validate">
                        Please enter a valid email address!
                      </b-form-invalid-feedback>
                    </div>
                    <br />
                    <div role="group">
                      <label for="input-username">Username:</label>
                      <b-form-input
                        id="input-username"
                        v-model="form.username"
                        type="text"
                        :state="usernameRegex"
                        aria-describedby="input-live-help user-validate"
                        required
                        trim
                      ></b-form-input>
                      <b-form-invalid-feedback id="user-validate">
                        {{ usernameFeedback }}
                      </b-form-invalid-feedback>
                    </div>
                    <br />
                    <div role="group">
                      <label for="input-password">Password:</label>
                      <b-form-input
                        id="input-password"
                        v-model="form.password"
                        @input="p_len"
                        type="password"
                        :state="passwordStrength"
                        :required="valid_password"
                        aria-describedby="live-strength"
                        trim
                      ></b-form-input>
                      <div class="lnu_container">
                        <p v-bind:class="{ length_valid: password_length }">
                          Length 8-30
                        </p>
                        <p
                          v-bind:class="{ lovercase_valid: contains_lowercase }"
                        >
                          Lowercase
                        </p>
                        <p v-bind:class="{ number_valid: contains_number }">
                          Number
                        </p>
                        <p
                          v-bind:class="{ uppercase_valid: contains_uppercase }"
                        >
                          Uppercase
                        </p>
                      </div>

                      <div
                        class="valid_password_container"
                        v-bind:class="{
                          show_valid_password_container: valid_password,
                        }"
                      >
                        <svg width="100%" height="100%" viewBox="0 0 140 100">
                          <path
                            class="tick"
                            v-bind:class="{ checked: valid_password }"
                            d="M10,50 l25,40 l95,-70"
                          />
                        </svg>
                      </div>
                    </div>
                    <div v-show="showPass2" role="group">
                      <!-- <label for="input-live">Password (again):</label> -->
                      <b-form-input
                        id="input-live"
                        v-model="form.password2"
                        :state="passState"
                        placeholder="Password (again)"
                        type="password"
                        required
                        aria-describedby="input-live-feedback"
                        trim
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-live-feedback">
                        Password fields must match.
                      </b-form-invalid-feedback>
                    </div>
                    <div class="alert">
                      <span
                        ><i class="icon-sign"></i>{{ form.errorMessage }}</span
                      >
                    </div>
                    <br />
                    <b-button type="submit" variant="success"
                      >Create Account</b-button
                    >
                    <b-button type="reset" variant="danger">Reset</b-button>
                  </b-form>
                  <br />
                  <br />
                  <b-spinner v-if="spinner" label="Spinning"></b-spinner>
                </b-card>
              </template>
            </b-col>
          </b-row>
          <!-- </b-card> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import validator from "validator";

export default {
  computed: {
    passState() {
      return this.form.password2 == this.form.password ? true : false;
    },
    validate() {
      return validator.isEmail(this.form.email);
    },
    usernameRegex() {
      const regex = /^\s*\S+\s*$/;
      let valid = regex.test(this.form.username);
      if (!valid) {
        this.usernameFeedback = "No spaces are allowed in username";
        return false;
      }

      const urlFriendly = /^[a-zA-Z0-9_-]*$/;
      valid = urlFriendly.test(this.form.username);
      if (!valid) {
        this.usernameFeedback =
          "The only allowed special characters are underscore ( _ ) and hyphen ( - )";
        return false;
      }

      const len = this.form.username.length;
      if (len <= 7) {
        this.usernameFeedback = "Username must be at least 8 characters long";
        return false;
      }
      if (len > 20) {
        this.usernameFeedback = "Please limit your username to 20 characters";
        return false;
      }

      return true;
    },
    passwordStrength() {
      return this.p_len();
    },
  },
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
        password2: null,
        errorMessage: "",
      },
      show: true,
      create: {
        state: false,
      },
      logout: {
        state: false,
      },
      success: false,
      spinner: false,
      name: "",
      password_length: 0,
      typed: false,
      contains_lowercase: false,
      contains_number: false,
      contains_uppercase: false,
      password_length: false,
      valid_password: false,
      showPass2: false,
      usernameFeedback: "",
    };
  },
  methods: {
    resetErr() {
      this.form.errorMessage = "";
    },
    async onLogin(evt) {
      evt.preventDefault();
      this.spinner = true;

      const self = this;

      Meteor.loginWithPassword(
        this.form.username,
        this.form.password,
        function (err) {
          if (err) {
            self.form.errorMessage = err.message;
          }
        }
      );

      this.spinner = false;
    },
    async onCreate(evt) {
      evt.preventDefault();
      this.spinner = true;

      const self = this;

      Accounts.createUser(
        {
          email: this.form.email,
          username: this.form.username,
          password: this.form.password,
        },
        function (err) {
          if (err) {
            self.form.errorMessage = err.message;
          } else {
            // Could add a call here that will create default tasks
            // Meteor.call("userStats.create", function (error) {
            //   if (error) {
            //     alert(`${error}`);
            //   } else {
            //     console.log("Successfully created user stats");
            //   }
            // });
          }
        }
      );

      this.spinner = false;
    },
    async logOut() {
      this.spinner = true;

      Meteor.logout();

      this.spinner = false;
    },
    onReset(evt) {
      evt.preventDefault();

      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.password2 = "";
      this.form.username = "";
      this.contains_lowercase = false;
      this.contains_number = false;
      this.contains_uppercase = false;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getUsername() {
      return this.currentUser?.username;
    },
    p_len: function () {
      if (this.form.password.length > 0) {
        this.typed = true;
      } else {
        this.typed = false;
        this.showPass2 = false;
        return false;
      }

      this.contains_lowercase = /[a-z]/.test(this.form.password);
      this.contains_number = /\d/.test(this.form.password);
      this.contains_uppercase = /[A-Z]/.test(this.form.password);
      this.password_length =
        this.form.password.length > 7 && this.form.password.length < 31;

      // Check if the password is valid
      if (
        this.contains_lowercase == true &&
        this.contains_number == true &&
        this.contains_uppercase == true &&
        this.password_length == true
      ) {
        this.valid_password = true;
        this.showPass2 = true;
        return true;
      } else {
        this.valid_password = false;
      }
      return false;
    },
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style scoped>
input[type="password"]::-webkit-input-placeholder {
  color: rgba(71, 87, 98, 0.8);
}

input[type="password"]::input-placeholder {
  color: rgba(71, 87, 98, 0.8);
}

.password_length {
  padding: 2px 10px;
  position: absolute;
  top: 50%;
  right: 10px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: #fbd490;
  color: rgba(71, 87, 98, 0.8);
  border-radius: 4px;
  font-size: 13px;
  display: none;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
}

.valid_password_length {
  background: #00ad7c;
  color: rgba(255, 255, 255, 0.9);
}

.show_password_length {
  display: block;
}

.lnu_container {
  display: block;
  margin: 10px auto;
  width: 320px;
  height: auto;
  display: flex;
  justify-content: space-between;
}

.lnu_container p {
  width: 100px;
  height: auto;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
  border-radius: 2px;
  color: rgba(71, 87, 98, 0.8);
  background: linear-gradient(to right, #00ad7c 50%, #eee 50%);
  background-size: 201% 100%;
  background-position: right;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
}

.length_valid,
.lovercase_valid,
.number_valid,
.uppercase_valid {
  background-position: left !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

.valid_password_container {
  display: block;
  margin: 10px auto;
  border-radius: 4px;
  position: relative;
  background: #00ad7c;
  width: 20px;
  height: 20px;
  visibility: hidden;
  opacity: 0;
}

.show_valid_password_container {
  visibility: visible;
  opacity: 1;
}

.tick {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 25;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  -webkit-animation: draw 0.5s ease forwards;
  animation: draw 0.5s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
