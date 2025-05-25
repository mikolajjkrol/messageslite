import { useState, useEffect } from 'react'

import { fetchData, sendData } from './scripts/http.js'
import Dialog from './Dialog'

function App() {
  const [ username, setUsername ] = useState('') 
  const [ messageValue, setMessageValue ] = useState('')
  const [ messages, setMessages ] = useState([{}])
  const [ fullscreen, setFullscreen ] = useState(false)

  useEffect(() => {
    scroll()
  }, [username])

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await fetchData()
        if (data.length > messages.length) {
        setMessages(data);
        scroll();
        scroll();
      } else {
        setMessages(data);
      }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    fetchMessages()
    
    const interval = setInterval(() => {
      fetchMessages()
    }
    , 3000)
    return () => clearInterval(interval)
  }, [messages])

  function updateMessages(){
    if(messageValue != ''){ 
    setMessages((prev)=>{
      return [...prev, {content: messageValue, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) , owner: username}]
    })

    sendData({content: messageValue, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) , owner: username})
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

    setMessageValue('')
    }
    else {
    setMessages((prev)=>{
      return [...prev, {content: "💖", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) , owner: username}]
    })

    sendData({content: "💖", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) , owner: username})
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

    setMessageValue('')
    }
    scroll()
  }

  function scroll() {
    const chatBox = document.getElementById("content");

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  return (
    <>
      <div className='container'>
        <div className={`screen flex ${username == '' ? 'blur' : ''} ${fullscreen ? 'fs' : ''}`}>
          <div className="header flex">
            <div className='flex logo'>
              <img src="vite2.svg" width={60} /> 
              <span>Chat</span>
            </div>
            <div className='fullscreen'>
              <img src="fullscreen.svg" width={40} onClick={()=>{setFullscreen(prev => !prev)}}/>
            </div>
          </div>

          <div className="content flex" id='content'> 

            {
              messages.map((message, index)=>{
                return (
                <div key={index} className={message.owner == username ? 'message' : 'message other'} style={index == messages.length-1 ? {marginBottom: '50px'} : {}}>
                  {message.owner !== username && (index === 0 || messages[index - 1].owner !== message.owner) && 
                  <div className="message-time owner">
                    {message.owner}
                  </div>
                  }
                  <div className={message.content=='💖' ? 'message-content heart' : 'message-content'}>
                    <p>{message.content}</p>
                  </div>
                  {(index === messages.length - 1 || messages[index + 1].owner !== message.owner) && (message.content != '💖') &&
                  <div className="message-time">
                    {message.time}
                  </div>
                  }
                </div>
                )
              })
            }
          </div>

          <div className="footer flex">
            <input type="text" value={messageValue} onChange={e => {setMessageValue(e.target.value)}} onClick={() => {setIsInvalid(false)}}/>
            <button onClick={updateMessages}>
              {messageValue == '' ? <img src="heart.svg" className='send' /> : <img src="send.svg" className='send'/>}
            </button>
          </div>
        </div>

        {username == '' && <Dialog setUsername={setUsername}/>}
      </div>
    </>
  )
}

export default App