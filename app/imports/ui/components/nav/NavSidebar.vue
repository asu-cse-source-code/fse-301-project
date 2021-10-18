<template>
  <div>
    <b-navbar-nav>
      <span class="px-3"
        ><i class="fas fa-bars fa-lg white" v-b-toggle.sidebar-1></i>
      </span>
      <b-sidebar
        id="sidebar-1"
        title="Menu"
        bg-variant="dark"
        text-variant="light"
        backdrop
        backdrop-variant="transparent"
        v-model="showSidebar"
      >
        <template #default>
          <div class="mb-5">
            <hr />
            <div class="mb-4">
              <b-dropdown
                class="px-4 py-2 title"
                v-if="currentUser"
                :text="getUsername()"
                block
                variant="outline-primary"
              >
                <b-dropdown-item
                  @click="modalShow = !modalShow"
                  class="navItem"
                  variant="danger"
                >
                  Reset Password
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item
                  @click="logout()"
                  class="navItem"
                  variant="warning"
                >
                  Logout
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div v-for="(link, i) in links" :key="i">
              <router-link :to="link.url" custom v-slot="{ navigate }">
                <b-nav-item
                  v-if="
                    (link.title !== 'Login' || !currentUser) &&
                    (currentUser || !link.loginReq)
                  "
                  @click="navigate"
                  @keypress.enter="navigate"
                  role="link"
                >
                  <span
                    class="active-link px-2"
                    v-if="$route.name === link.routeName"
                    >{{ link.title }}</span
                  >
                  <span class="inactive-link px-2" v-else>{{
                    link.title
                  }}</span>
                </b-nav-item>
              </router-link>
            </div>
          </div>
        </template>
        <!-- <template #footer="{ hide }">
          <b-button block @click="hide">Close</b-button>
        </template> -->
      </b-sidebar>
    </b-navbar-nav>
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
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Links from "../json/page-links.json";

export default {
  name: "Nav",
  components: {},

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
      links: Links,
      modalShow: false,
      success: false,
      hide: true,
      showSidebar: false,
    };
  },

  mounted() {},

  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },

  methods: {
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
  },
};
</script>

<style scoped>
.active-link {
  color: white;
}
.active-link:hover {
  cursor: not-allowed !important;
}
a.nav-link:hover {
  background: grey;
}
.inactive-link {
  color: grey;
}
.nav-link-custom {
  color: white;
}
</style>
