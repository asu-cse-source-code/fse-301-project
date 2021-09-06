<template>
  <div class="mb-4">
    <b-row align-h="end" class="mb-2">
      <b-col cols="8"></b-col>
      <b-col cols="4">
        <b-button
          block
          @click="visible = !visible"
          aria-controls="collapse-1"
          variant="primary"
          >Add New Task</b-button
        >
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
                    :state="
                      form.description.length >= 1 &&
                      form.description.length < 200
                    "
                    placeholder="Brief description of this task"
                    required
                    trim
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="6">
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
              <b-col sm="12" md="6">
                <b-form-group
                  id="input-group-5"
                  label="Priority:"
                  label-for="input-5"
                >
                  <b-form-select
                    id="input-5"
                    v-model="form.priority"
                    :options="priorities"
                    required
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="6">
                <b-form-group id="input-group-4">
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="form.completed"
                    name="checkbox-1"
                    :value="true"
                    :unchecked-value="false"
                  >
                    Already Completed?
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-button class="mr-2" type="submit" variant="primary"
                >Submit</b-button
              >
              <b-button class="ml-2" type="reset" variant="danger"
                >Reset</b-button
              >
            </b-row>
          </b-form>
        </b-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        title: "",
        description: "",
        url: "",
        priority: 1,
        dueDate: null,
        completed: false,
      },
      priorities: [
        { text: "Basic", value: 1 },
        { text: "Important", value: 2 },
        { text: "Urgent", value: 3 },
      ],
      show: true,
      fields: ["title", "description", "date"],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const self = this;
      Meteor.call("createTodo", self.form, (error, res) => {
        if (error) {
          alert(error.error);
        } else {
          self.resetForm();
          self.visible = false;
          console.log(res);
        }
      });
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
      this.form.title = "";
      this.form.description = "";
      this.form.priority = 1;
      this.form.completed = false;
    },
  },
};
</script>

<style scoped></style>
