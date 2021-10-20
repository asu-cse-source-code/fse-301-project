<template>
  <div class="mb-4 mt-5">
    <!-- <b-row v-if="!editing" align-h="center" class="mb-2">
      <b-col cols="4">
        <b-button
          block
          @click="visible = !visible"
          aria-controls="collapse-1"
          variant="primary"
          >Add New Task</b-button
        >
      </b-col>
    </b-row> -->
    <b-row v-if="response" align-h="center" class="mb-2">
      <b-col cols="8">
        <span>{{ response }}</span>
      </b-col>
    </b-row>
    <b-row class="mb-2" align-h="end">
      <b-col>
        <b-collapse id="collapse-1" v-model="visible" class="mt-2">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-row>
              <b-col sm="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Title:"
                  label-for="input-1"
                  description="Title of this task"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.title"
                    type="text"
                    placeholder="Enter title"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="6">
                <b-form-group
                  id="input-group-2"
                  label="Description:"
                  label-for="input-2"
                >
                  <b-form-textarea
                    id="input-notes"
                    v-model="form.description"
                    type="text"
                    placeholder="Brief description of this task"
                    trim
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col sm="6" md="3">
                <b-form-group
                  id="input-group-3"
                  label="Due Date:"
                  label-for="input-3"
                  description="Date this task needs completed by"
                >
                  <b-form-datepicker
                    id="input-due-date"
                    v-model="form.dueDate"
                    :date-format-options="{
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }"
                    :min="new Date()"
                    locale="en"
                    dark
                    required
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col sm="6" md="3">
                <b-form-group
                  id="input-group-6"
                  label="Due Time:"
                  label-for="input-3"
                  description="Time this task needs completed by"
                >
                  <b-row>
                    <b-col cols="8">
                      <b-form-input
                        v-model="timeInput"
                        type="text"
                        lazy-formatter
                        :formatter="formatTime"
                        required
                      ></b-form-input>
                    </b-col>
                    <b-row>
                      <b-col cols="4">
                        <b-button
                          variant="warning"
                          class="ml-auto"
                          @click="switchAm"
                        >
                          {{ am ? "AM" : "PM" }}
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-row>
                  <b-row class="pt-2">
                    <b-col cols="12">
                      <b-button
                        size="sm"
                        variant="outline-primary"
                        class="ml-auto"
                        @click="setEOD"
                      >
                        End of Day
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-row>
                  <b-col cols="12">
                    <b-form-group id="input-group-8">
                      <b-form-group
                        id="input-group-8"
                        label="Link:"
                        label-for="input-8"
                        description="Helpful link or link to the task"
                      >
                        <b-form-input
                          id="input-8"
                          v-model="form.url"
                          type="text"
                          placeholder="https://www.youtube.com/"
                        ></b-form-input>
                      </b-form-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row align-h="center">
                  <b-col cols="12">
                    <b-button
                      class="mr-2"
                      type="submit"
                      variant="primary"
                      :disabled="changes()"
                      >{{ editing ? "Update" : "Submit" }}</b-button
                    >
                    <b-button class="ml-2" type="reset" variant="danger"
                      >Reset</b-button
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-form>
        </b-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  props: ["inputForm", "editing"],
  data() {
    const now = new Date();
    const value = now.toTimeString().slice(0, 8);
    let form = {
      title: "",
      description: "",
      url: "",
      priority: 1,
      dueDate: null,
      dueTime: value,
      completed: false,
    };

    let hours = parseInt(value.slice(0, 2));
    let minutes = parseInt(value.slice(3, 5));

    const am = hours < 12;
    hours = am ? hours : hours - 12;
    if (hours < 1) {
      hours = 12;
    }
    minutes = minutes < 10 ? "0" + minutes : minutes;
    am_pm = am ? "AM" : "PM";

    if (this.inputForm) {
      form = jQuery.extend(true, {}, this.inputForm);
    }
    let visible = true;
    if (this.editing) {
      visible = this.editing;
    }
    return {
      visible: visible,
      form: form,
      priorities: [
        { text: "Basic", value: 1 },
        { text: "Important", value: 2 },
        { text: "Urgent", value: 3 },
      ],
      show: true,
      fields: ["title", "description", "date"],
      response: null,
      timeInput: `${hours}:${minutes} ${am_pm}`,
      am: am,
    };
  },
  methods: {
    changes() {
      if (!this.inputForm) return false;

      for (const property in this.form) {
        if (this.inputForm[property] !== this.form[property]) {
          // console.log(
          //   `${property} --> form: ${this.form[property]} vs input: ${this.inputForm[property]}`
          // );
          return false;
        }
      }

      return true;
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.form.dueDate === null) {
        return alert("Please select a date!");
      }
      const self = this;
      if (this.inputForm) {
        Meteor.call("updateTodo", self.form, (error, _res) => {
          if (error) {
            self.response = error.error;
          } else {
            self.resetForm();
            self.visible = false;
            self.response = "Successfully updated your task!";
          }
        });
      } else {
        Meteor.call("createTodo", self.form, (error, _res) => {
          if (error) {
            self.response = error.error;
          } else {
            self.resetForm();
            self.visible = false;
            self.response = "Successfully created your task!";
          }
        });
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.resetForm();
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    resetForm() {
      if (!this.inputForm) {
        this.form.title = "";
        this.form.description = "";
        this.form.dueDate = null;
        this.form.priority = 1;
        this.form.completed = false;
        this.form.link = "";
      } else {
        this.form = jQuery.extend(true, {}, this.inputForm);
      }
    },
    setEOD() {
      // const now = new Date();
      // Grab the HH:mm:ss part of the time string
      // this.form.dueTime = now.toTimeString().slice(0, 8);
      this.form.dueTime = "23:59:00";
      this.timeInput = "11:59 PM";
      this.am = false;
    },
    validTime() {
      let newTime = this.timeInput;
      time = newTime.replace(/[^0-9]/g, "");
      if (time !== null && time < 1259 && time > 100) {
        return true;
      }
      return false;
    },
    switchAm() {
      this.am = !this.am;
      console.log(this.form.dueTime);
      let currTime = parseInt(this.form.dueTime.slice(0, 2));
      let currMin = this.form.dueTime.slice(3, 5);

      currTime = this.am ? currTime - 12 : currTime + 12;
      if (currTime < 10) {
        currTime = "0" + currTime.toString();
      } else {
        currTime = currTime.toString();
      }

      const newTime = `${currTime}:${currMin}:00`;
      console.log(newTime);
      this.form.dueTime = newTime;
    },
    formatTime() {
      //   if (!this.validTime) return;
      //   let newTime = this.timeInput;
      //
      let newTime = this.timeInput;
      newTime = newTime.replace(/[^0-9]/g, "");
      newTime = parseInt(newTime).toString();
      if (!this.validTime(parseInt(newTime))) {
        alert("Invalid time given");
        newTime = this.form.dueTime.slice(0, 8).replace(/[^0-9]/g, "");
      }
      console.log(newTime);
      let hours,
        minutes = 0;
      let addZero = false;
      if (parseInt(newTime) < 1000) {
        addZero = true;
        hours = parseInt(newTime.slice(0, 1));
        minutes = parseInt(newTime.slice(1, 3));
      } else {
        hours = parseInt(newTime.slice(0, 2));
        minutes = parseInt(newTime.slice(2, 4));
      }
      if (minutes > 59) {
        minutes = minutes - 60;
        hours = hours + 1;
      }
      if (hours > 12) {
        hours = hours - 12;
      }
      minutes = minutes < 10 ? "0" + minutes : minutes;
      newTime = `${hours}:${minutes}`;
      newTime = addZero ? "0" + newTime : newTime;
      this.form.dueTime = newTime + ":00";
      am_pm = this.am ? "AM" : "PM";
      return newTime + " " + am_pm;
    },
  },
};
</script>

<style>
.b-time {
  display: none !important;
}
.b-form-spinbutton {
  display: none !important;
}
.bi-circle-fill {
  display: none !important;
}
</style>
