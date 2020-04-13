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
        <v-row>
          <v-col cols="12">
            <v-row dense>
              <v-col cols="4" v-for="(item, index) in repos" :key="index">
                <v-card 
                  outlined 
                  tile 
                  class="m-3 pa-6" 
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
          </v-col>
        </v-row>
      </v-container>
    </v-app>
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
      let repo = {
        username: this.username,
        readme: name
      }

      this.$store.dispatch('getRepo', repo)

      this.$router.push({
        name: 'Readme',
        params: {
          username: this.username,
          readme: name
        }
      }),
      this.$store.dispatch('isLoaded', true)
    },
    backToIndex() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>