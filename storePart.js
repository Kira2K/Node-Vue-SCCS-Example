import axios from 'axios'

export default {

  actions: {
    async axiosAllProfiles(ctx, id) {
      const res = await axios({
        url: '/profiles/allProfiles', data: { id: id }, method: 'POST'
      })
      .then(response => {
        console.log(response.data)
        ctx.commit('allProfiles', response.data.blogger)
      })
      .catch(error => {
        console.log(error)
      });
  },

    async deleteProfile(ctx, id) {
      const res = await fetch(
        '/profiles/deleteProfile', 
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ id: id })
        }
      );
      const response = await res.json()
      console.log(response)
      if (response.success) ctx.commit('updateProfiles', id)
    }
  },

  mutations: {
    allProfiles(state, response) {
      state.allProfiles = response
    },

    updateProfiles(state, id) {
      console.log(state.allProfiles.filter(elem => elem._id !== id))
      state.allProfiles = state.allProfiles.filter(elem => elem._id !== id)
    }
  },
  state: {
    allProfiles: []
  },

  getters: {
    getAllProfiles(state) {
      return state.allProfiles
    },
  },
}