<template>
  <div id="listRepos">
    <v-app>
      <loader></loader>
      <div>
        <v-app-bar dense dark>
          <v-toolbar-title>{{username}} Repos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                target="_blank"
                v-on="on"
                @click="backToIndex()"
              >
                <v-icon>keyboard_backspace</v-icon>
              </v-btn>
            </template>
            <span>Back to index</span>
          </v-tooltip>
        </v-app-bar>
      </div>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="(item, index) in repos"
            :key="index"
            cols="12"
            sm="4"
          >
            <v-card
              class="pa-6 m-3"
              outlined
              tile
              height="100%"
              hover
              @click="getReadme(item.name)"
            >
              <v-card-title>{{item.name}}</v-card-title>
              <v-card-subtitle>{{item.full_name}}</v-card-subtitle>
              <v-card-text>{{item.description}}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GithubService from '@/services/GithubService.js'

export default {
  name: 'ListRepos',
  data() {
    return {
      username: this.$router.currentRoute.params.username
    }
  },
  created() {
    GithubService.getRepos(this.username)
      .then(res => { 
        this.$store.dispatch('getAllRepos', res.data) 
      })
      .catch(err => { console.log(err) })
  },
  computed: {
    ...mapState(['repos'])
  },
  methods: {
    getReadme(name) {
      GithubService.getReadme(this.username+'/'+name)
        .then(res => this.decodeContent(res.data.content))
        .catch(err => { console.log(err) })

      this.$router.push({
        name: 'Readme',
        params: {
          username: this.username,
          repo: name
        }
      })
      this.$store.dispatch('isLoaded', true)
    },

    backToIndex() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
