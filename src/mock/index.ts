import { Server } from 'miragejs'
import data from './mock.json'

function serve() {
  new Server({
    seeds(server) {
      server.db.loadData(data)
    },
    routes() {
      this.namespace = "api"

      this.get("/user", (scheme, r) => {
        // return new Response(500)
        return scheme.db.user
      }, {
        timing: 200
      })
      this.get("/user/:id", (scheme, r) => {
        return scheme.db.user.find(r.params.id)
      })
    }
  })
}

export default serve
