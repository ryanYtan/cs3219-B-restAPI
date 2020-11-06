<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="User Name"
        label-for="input-1"
        description="Username must only contain alphanumeric characters and no spaces"
      >
        <b-form-input
          id="input-1"
          v-model="form.userName"
          required
          placeholder="Enter user name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="First Name" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.firstName"
          required
          placeholder="Enter first name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Last Name" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.lastName"
          required
          placeholder="Enter last name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Email" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Phone Number" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.phone"
          required
          placeholder="Enter phone number"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
export default {
    name: "PersonForm",

    data() {
        return {
            form: {
                userName: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            },
            show: true
        }
    },

    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.$emit("submit", this.form);
        },
        onReset(evt) {
            evt.preventDefault()

            // Reset our form values
            this.form.userName = "";
            this.form.firstName = "";
            this.form.lastName = "";
            this.form.email = "";
            this.form.phone = "";

            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true
            });
        }
    }
}
</script>
