import { useState } from 'react'
import ChatWidget from './components/ChatWidget'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatWidget />
    </>
  )
}

export default App
