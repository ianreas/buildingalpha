import React, { useState, useEffect, useRef } from "react";
import { db } from "../lib/firebase";
import { setDoc, doc, onSnapshot } from "firebase/firestore";

export default function AI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [messages, setMessages] = useState([]);

  const [count, setCount] = useState(0);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await setDoc(doc(db, "text_documents", "1"), {
      prompt: `${input} in 2-3 sentences. Financial Context.`,
    });

    const newMessageUser = { user: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessageUser]);
    setInput("");
    setCount((prevCount) => prevCount + 1);
  };

  function setInitialResponse() {
    setDoc(doc(db, "text_documents", "1"), {
      response: "",
    });
  }
  useEffect(() => {
    setInitialResponse();
    const unsub = onSnapshot(doc(db, "text_documents", "1"), (doc) => {
      setOutput(doc.data().response);
      console.log(doc.data().response);
      const newMessageAI = { user: "Mara", text: doc.data().response };
      setMessages((prevMessages) => [...prevMessages, newMessageAI]);
    });

    return () => unsub();
  }, []);

  const buttonRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      buttonRef.current.click();
    }
  };

  return (
    <div className="ai_component_div">
      <div className="ai-component-text" style={{ textAlign: "center" }}>
        <h1>Hi. I am Mara. Ask Me Anything</h1>
        <h3>
          I was developed by Muhammed Makhambet to answer your questions.
          <br></br>I was trained on financial data and archives.
        </h3>
      </div>
      <div className="ai_wrapper_div">
        <div className="message-list">
          {messages.map(
            (message, index) =>
              message.text && (
                <div
                  key={index}
                  className={`message ${
                    message.user === "Mara" ? "ai-style" : "user-style"
                  }`}
                >
                  <p style={{ marginLeft: "5px" }}>
                    {message.user}: {message.text}
                  </p>
                </div>
              )
          )}
        </div>
        <div className="ai_input_wrapper">
          <input
            type="text"
            placeholder="Enter your input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSubmit}
            className="button-ai"
            ref={buttonRef}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
          >
            <img src="/buttonarrow.png" style={{}}></img>
          </button>
        </div>
        <div>{/* output */}</div>
      </div>
    </div>
  );
}
