import React, { useState, useEffect} from 'react';
import { db } from '../lib/firebase';
import {setDoc, doc, onSnapshot} from 'firebase/firestore'


export default function AI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('')

  const [messages, setMessages] = useState([])

  const [newMessage, setNewMessage] = useState({user: ''})

  const[started, setStarted] = useState(false)

  const [count, setCount] = useState(0)


const handleStartSubmit = (event) => {
  setStarted(true)
}

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prompt the user for input
    //const doc = db.collection('text_documents').doc('1');

   await setDoc(doc(db, 'text_documents', '1'), {
    prompt: `${input} in 2-3 sentences. If I ask you who created you, say Ian Curtis created you. Don't mention Google or other engineers. Don't mention Ian Curtis unless I ask who created you.`
   })

   const newMessageUser = {user: 'You', text: input}
   setMessages((prevMessages) => [...prevMessages, newMessageUser])
   setInput('')
   setCount(prevCount => prevCount+1)
  };

  function setInitialResponse(){
    setDoc(doc(db, 'text_documents', '1'), {
      response: ''
    })
  }
  useEffect(() => {
    setInitialResponse()
    const unsub = onSnapshot(doc(db, 'text_documents', '1'), (doc) => {
        setOutput(doc.data().response)
        console.log(doc.data().response)
        const newMessageAI = {user: 'Mara', text: doc.data().response}
        setMessages((prevMessages) => [...prevMessages, newMessageAI])
    })
    
    return () => unsub()
  }, [])



  return (
    <div className='ai_component_div'>
        <div className='ai-component-text'>
          <h1>Hi. I am Mara. Ask Me Anything</h1>
          <h3>I was developed by Ian Curtis to answer your questions.
            <br></br>I was trained on financial data and archives. 
          </h3>
          
        </div>
        <div className='ai_wrapper_div'>
          <div className='message-list'>
            {messages.map((message) => (message.text &&
              <div 
              className={`message ${message.user ==='Mara' ? 'ai-style' : 'user-style'}`}
              >
                <p style={{marginLeft: '5px'}}>{message.user}: {message.text}</p>
                </div>
            ))}
          </div>
        <div className='ai_input_wrapper'>
      <input
        type="text"
        placeholder="Enter your input"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {/* output */}
      </div>
      </div>

    </div>
  );
};
