<template>
    <div class="text-left">
        <!-- Header -->
        <b-jumbotron header="CS3219 Task B" lead="Basically Addressbook"
                     bg-variant="info" text-variant="white">
            <hr class="my-4" />
        </b-jumbotron>

        <!-- Main Stuff -->
        <b-container>
            <div v-if="msg" class="my-4">
                <b-card>
                    {{ msg }}
                </b-card>
            </div>

            <b-tabs content-class="mt-3">

                <b-tab title="Get All" active>
                    <b-button v-on:click="getAll" variant="primary">
                        Get All Persons
                    </b-button>
                </b-tab>

                <b-tab title="Get One">
                    <UserNameForm @submit="getOne" />
                </b-tab>

                <b-tab title="Insert">
                    <PersonForm @submit="add"/>
                </b-tab>

                <b-tab title="Update">
                    <PersonForm @submit="update" />
                </b-tab>

                <b-tab title="Delete">
                    <UserNameForm @submit="remove" />
                </b-tab>
            </b-tabs>

            <hr class="my-4">

            <!-- Table showing data -->
            <b-table small bordered hover ref="table" :items="persons"></b-table>
        </b-container>
    </div>
</template>


<script>
import axios from "axios";
import PersonForm from "../components/PersonForm"
import UserNameForm from "../components/UserNameForm"

const LOCALHOST = "http://localhost:8081"
const ROUTE_API = "/api"
const ROUTE_PERSONS = "/persons"

export default {
    name: "FrontPage",
    components: {
        PersonForm,
        UserNameForm
    },
    data() {
        return {
            persons: [],
            msg: ""
        };
    },

    methods: {
        getAll() {
            axios.get(LOCALHOST + ROUTE_API + ROUTE_PERSONS)
                .then((res) => {
                    if (res.data.data) {
                        // remove some columns
                        res.data.data.forEach((o) => {
                            delete o["_id"]
                            delete o["__v"]
                        });
                        this.persons = res.data.data;
                    } else {
                        this.msg = "Sorry, no persons were found";
                    }
                    this.$refs.table.refresh();
                    this.msg = "Got all persons";
                })
                .catch((err) => {
                    err;
                    this.msg = "Sorry, no persons were found";
                });
        },

        getOne(form) {
            let userName = form.userName;
            axios.get(LOCALHOST + ROUTE_API + ROUTE_PERSONS + "/" + userName)
                .then((res) => {
                    if (res.data.data) {
                        delete res.data.data["_id"];
                        delete res.data.data["__v"];
                        this.persons = [res.data.data];
                        this.msg = `Found user "${userName}"`
                    } else {
                        this.msg = `No person ${userName} was found with that username`;
                    }
                })
                .catch((err) => {
                    err;
                    this.msg = `No person ${userName} was found with that username`;
                });
        },

        add(form) {
            let newPerson = {
                userName: form.userName,
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                email: form.email
            }
            axios.post(LOCALHOST + ROUTE_API + ROUTE_PERSONS, newPerson)
                .then((res) => {
                    if (res.status == 200) {
                        this.msg = `Added new user ${newPerson.userName}`
                    } else {
                        this.msg = `This user already exists`
                    }
                })
                .catch((err) => {
                    err;
                    this.msg = `This user already exists`
                });
        },

        update(form) {
            let newPerson = {
                userName: form.userName,
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                email: form.email
            }
            axios.put(LOCALHOST + ROUTE_API + ROUTE_PERSONS + "/" + newPerson.userName, newPerson)
                .then((res) => {
                    if (res.status == 200) {
                        this.msg = `Updated user ${newPerson.userName}`
                    } else {
                        this.msg = `No person ${newPerson.userName} was found with that username`;
                    }
                })
                .catch((err) => {
                    err;
                    this.msg = `No person ${newPerson.userName} was found with that username`;
                });
        },

        remove(form) {
            let userName = form.userName;
            axios.delete(LOCALHOST + ROUTE_API + ROUTE_PERSONS + "/" + userName)
                .then((res) => {
                    if (res.status == 200) {
                        this.msg = `Deleted ${userName}`
                    } else {
                        this.msg = `No person ${userName} was found with that username`;
                    }
                })
                .catch((err) => {
                    err;
                    this.msg = `No person ${userName} was found with that username`;
                });
        }
    }
};
</script>
