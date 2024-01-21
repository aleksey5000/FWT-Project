import axios from 'axios'

class Queries {
  getAuthor = () => axios.get('https://test-front.framework.team/authors')

  getLocation = () => axios.get('https://test-front.framework.team/locations')
}

export default new Queries