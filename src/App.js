import React from 'react'
import Nav from './Components/Nav/Nav'
import routes from './routes'


 function App() {
  return (
    <div>
      <Nav/>
      {routes}
    </div>
  )
}

export default App