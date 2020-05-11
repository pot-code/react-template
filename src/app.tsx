import * as React from 'react'
import axois from 'axios'
import { hot } from 'react-hot-loader/root'

import './app.less'
import serve from './mock/'

if (process.env.NODE_ENV === 'development') {
  serve()
}

interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: 'Male' | 'Female'
  ip_address: string
}

function App() {
  const [users, setUsers] = React.useState<IUser[]>([])

  React.useEffect(() => {
    axois.get('/api/user').then((res) => {
      setUsers(res.data)
    })
  }, [])

  return (
    <div>
      <ul className="flex flex-row flex-wrap text-gray-700">
        {users.map((user) => (
          <li
            key={user.id}
            className="block whitespace-no-wrap border-solid border-blue-400 border rounded px-2 py-1 mx-2 my-1 hover:bg-blue-300 hover:text-white transition-colors duration-150 cursor-pointer"
          >
            {user.first_name}-{user.last_name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default hot(App)
