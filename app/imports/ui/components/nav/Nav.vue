<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />
    <b-navbar type="dark" variant="dark" class="" fixed="top">
      <!-- <nav-sidebar class="d-block d-sm-none"></nav-sidebar> -->
      <b-navbar-brand id="brand" href="/"> No-Limit Planner </b-navbar-brand>
      <!-- <b-navbar-toggle target="nav-collapse">
        <template v-slot:default="{ expanded }">
          <span v-if="expanded">
            <i class="fas fa-chevron-circle-down"></i
          ></span>
          <span v-else> <i class="fas fa-chevron-circle-up"></i></span>
        </template>
      </b-navbar-toggle> -->
      {{ updateAppStreak() }}
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div v-for="(link, i) in links" :key="i">
          <b-nav-item
            v-if="
              (link.title !== 'Login' || !currentUser) &&
              (currentUser || !link.loginReq) &&
              checkAdmin(link)
            "
            right
            ><router-link :to="link.url" custom v-slot="{ navigate }">
              <span class="active-link" v-if="$route.name === link.routeName">{{
                link.title
              }}</span>
              <span
                v-else
                @click="navigate"
                @keypress.enter="navigate"
                role="link"
                >{{ link.title }}</span
              >
            </router-link></b-nav-item
          >
        </div>
        <b-nav-item-dropdown v-if="currentUser" :text="getUsername()" right>
          <router-link
            :to="{ name: 'Profile', params: { id: getUserId() } }"
            custom
            v-slot="{ navigate }"
          >
            <b-dropdown-item
              @click="navigate"
              @keypress.enter="navigate"
              class="navItem"
              variant="info"
            >
              Profile
            </b-dropdown-item>
          </router-link>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item
            @click="modalShow = !modalShow"
            class="navItem"
            variant="danger"
          >
            Reset Password
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logout()" class="navItem" variant="warning">
            Logout
          </b-dropdown-item>
          <b-modal
            v-model="modalShow"
            title="Password Reset"
            header-bg-variant="secondary"
            header-text-variant="light"
            body-bg-variant="light"
            body-text-variant="dark"
            footer-bg-variant="dark"
            backdrop
          >
            <b-form @submit="onResetPass" v-if="!success">
              <div role="group">
                <label for="input-current">Current Password:</label>
                <b-form-input
                  id="input-current"
                  v-model="form.currentPass"
                  type="password"
                  required
                  trim
                ></b-form-input>
              </div>
              <br />
              <div role="group">
                <label for="input-password">New Password:</label>
                <b-form-input
                  id="input-password"
                  v-model="form.password"
                  type="password"
                  required
                  trim
                ></b-form-input>
              </div>
              <br />
              <div role="group">
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
                <span><i class="icon-sign"></i>{{ form.errorMessage }}</span>
              </div>
              <br />
              <b-button type="submit" variant="outline-danger"
                >Reset Password</b-button
              >
              <br />
            </b-form>
            <p v-if="success">Password successfully reset!</p>
            <template v-slot:modal-footer="{ close }" v-if="!success">
              <!-- Button with custom close trigger value -->
              <div class="w-100">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button
                  id="danger"
                  size="md"
                  variant="light"
                  class="float-right"
                  @click="close()"
                >
                  Cancel
                </b-button>
              </div>
            </template>
          </b-modal>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
// import NavSidebar from "./NavSidebar.vue";
import Links from "../json/page-links.json";

export default {
  name: "Nav",
  components: {
    // NavSidebar,
  },

  directives: {},
  computed: {
    passState() {
      return this.form.password2 == this.form.password ? true : false;
    },
  },
  data() {
    return {
      form: {
        email: "",
        username: "",
        currentPass: "",
        password: "",
        password2: "",
        errorMessage: "",
      },
      admin: ["abspence"],
      links: Links,
      modalShow: false,
      success: false,
      showModal: false,
    };
  },

  mounted() {},

  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },

  methods: {
    checkAdmin(link) {
      if (link.adminReq) {
        if (this.admin.includes(this.getUsername())) {
          return true;
        }
        return false;
      }
      return true;
    },
    getListUrl() {
      let url = null;
      if (this.currentUser) {
        url = "/full-list/" + this.getUsername();
      }
      return url;
    },
    getUsername() {
      return this.currentUser?.username;
    },
    getUserId() {
      return this.currentUser?._id;
    },
    logout() {
      Meteor.logout();
      location.href = "/";
    },
    onResetPass(evt) {
      evt.preventDefault();

      const self = this;

      Accounts.changePassword(
        self.form.currentPass,
        self.form.password,
        function (err) {
          if (err) {
            self.form.errorMessage = err.message;
          } else {
            self.success = true;
          }
        }
      );
    },
    updateAppStreak() {
      const self = this;
      if (self.currentUser) {
        Meteor.call("appStreak", (error, _res) => {
          if (error) {
            console.log(error.error);
            if (error.error == "no-rewards") {
              Meteor.call(
                "Rewards.initializeUser",
                self.getUsername(),
                (error, _res) => {
                  if (error) {
                    console.log(error.error);
                  } else {
                    console.log("Successfully added rewards to user");
                    Meteor.call("appStreak", (error, _res) => {
                      if (error) {
                        console.log(error.error);
                      } else {
                        console.log("Successfully updated app streak");
                      }
                    });
                  }
                }
              );
            }
          } else {
            console.log("Successfully updated app streak");
          }
        });
      }
    },
  },
};
</script>

<style>
.active-link {
  color: white;
}
.active-link:hover {
  cursor: not-allowed !important;
}
</style>
