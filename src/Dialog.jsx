import { useRef, useState } from "react"

export default function Dialog({ setUsername }) {
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false)
  const username = useRef()

  function ifValid(){
    if(username.current.value){
      setUsername(username.current.value)
    } else {
      setIsUsernameInvalid(true)
    }
  }

  return (
    <div className="dialog flex">
      <input type="text" placeholder='username' ref={username} className={isUsernameInvalid && 'invalid'} onFocus={()=>{setIsUsernameInvalid(false)}}/>
      <button onClick={ifValid}>
        <img src="enter.svg" width={50} />
      </button>
    </div>
  )
}