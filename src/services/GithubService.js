import axios from 'axios'
import GITHUB_API from './../api/api'

const apiClient = axios.create({
	baseURL: GITHUB_API.uri,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-type': 'application/json'
	}
})

export default {
	getRepos(username) {
		return apiClient.get(`/users/${username}/repos`)
	},
	getReadme(ownerRepo) {
		return apiClient.get(`/repos/${ownerRepo}/readme`)
	}
}