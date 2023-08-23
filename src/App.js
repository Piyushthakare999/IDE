import axios from 'axios'
import './App.css';
import react, { useState } from 'react';
function App() {
  const [code, setCode] = useState('');
  const [language,setLanguage]= useState("cpp");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language,
      code
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    }catch({response}){
      if(response){
        const errMsg=response.data.err.stderr;
        console.log(response);
      }
      else{
        window.alert("error connecting server!")
      }
      // console.log(err.response)
    }

  }
  return (
    <div className="App">
      <h1>online code compiler</h1>
      <div>
        <label htmlFor="">Language: </label>
      <select name="" id="" value={language}
      onChange={(e)=>{
        setLanguage(e.target.value);
        console.log(e.target.value);
      }}>
        <option value="cpp">C++</option>
        <option value="py">Python</option>
      </select>
      </div>
      <br />
      <textarea name="" id="" cols="80" rows="20" value={code} onChange={(e) => {
        setCode(e.target.value);
      }}></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
