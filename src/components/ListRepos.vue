<style scoped>
table {
    width: 100%;
}

table, tr, th, td {
    border: 1px solid #000;
}

th {
    background-color: aquamarine;
}
</style>

<template>
    <div>
        <h1>List repos {{username}}</h1>
        <table>
            <tr>
                <th>Repo name</th>
            </tr>
            <tr v-for="(item, index) in repos" :key="index">
                <td @click="getReadme(item.name)" style="cursor: pointer;">{{item.full_name}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ListRepos',
    data() {
        return {
            username: this.$router.currentRoute.params.username
        }
    },
    created() {
        let dataThis = this
        this.$store.dispatch('getAllRepos', dataThis.username)
    },
    computed: {
        ...mapState(['repos'])
    },
    methods: {
        getReadme(name) {
            this.$router.push({
                name: 'Readme',
                params: {
                    username: this.username,
                    readme: name
                }
            })
        }
    }
}
</script>