import axios from "axios"

export const axiosInstance=axios.create({
baseURL:"https://trackers-app.herokuapp.com/"
})