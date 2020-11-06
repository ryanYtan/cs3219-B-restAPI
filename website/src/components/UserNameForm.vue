<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="User Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.userName"
          required
          placeholder="Enter user name"
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
                userName: ""
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

            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true
            });
        }
    }
}
</script>
