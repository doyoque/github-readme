<template>
    <div>
        <h1>README MD</h1>

        <div v-if="readmeObj.isFound == true">
            <vue-markdown>{{readmeObj.content}}</vue-markdown>
        </div>

        <!-- <div v-if="readmeObj.isFound == false">
            <vue-markdown>{{readmeObj.content}}</vue-markdown>
        </div> -->
        <br>
        <button @click="backToRepos(username)">Back to repos</button>
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
            readmeObj: {
                content: '',
                isFound: false
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
                this.readmeObj.isFound = true
            } else {
                this.readmeObj.content = atob(content)
                this.readmeObj.isFound = true
            }
        },
        readmeNotFound(message, status) {
            if (status == 404) {
                this.readmeObj.content = `README ${message}`
            }
        }
    },
}
</script>