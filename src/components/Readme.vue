<template>
    <div>
        <h1>README MD of {{username}}/{{reponame}}</h1>

        <button @click="backToRepos(username)">Back to repos</button>
        <div v-if="readmeObj.isLoaded == true">
            <vue-markdown>{{readmeObj.content}}</vue-markdown>
        </div>
        <br>
    </div>
</template>

<script>
import axios from 'axios'
import GITHUB_API from './../api/api'

export default {
    name: 'Readme',
    data() {
        return {
            username: this.$router.currentRoute.params.username,
            reponame: this.$router.currentRoute.params.readme,
            readmeObj: {
                content: '',
                isLoaded: false
            }
        }
    },
    created() {
        let full_name = this.username+'/'+this.$router.currentRoute.params.readme
        // console.log(`${GITHUB_API.userReadme}${full_name}/readme`)
        axios.get(`${GITHUB_API.userReadme}${full_name}/readme`)
        .then(res => {
            this.decodeContent(res.data.content)
        })
        .catch(err => {
            this.readmeNotFound(err.response.data.message, err.response.status)
        })
    },
    methods: {
        backToRepos(username) {
            this.$router.push({
                name: 'ListRepos',
                params: {
                    username: username
                }
            })
        },
        decodeContent(content) {
            if(content == '') {
                this.readmeObj.content = "README is empty"
                this.readmeObj.isLoaded = true
            } else {
                this.readmeObj.content = atob(content)
                this.readmeObj.isLoaded = true
            }
        },
        readmeNotFound(message, status) {
            if (status == 404) {
                this.readmeObj.content = `README ${message}`
                this.readmeObj.isLoaded = true
            }
        }
    },
}
</script>