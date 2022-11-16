import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as np from 'numjs';
import { useRef, useState } from 'react';
function App() {
  
  const temp=useRef();
  const hum=useRef();
  const mois=useRef();
  const soil=useRef();
  const crop=useRef();
  const nit=useRef();
  const pot=useRef();
  const ph=useRef();
  const out=['Urea', 'DAP', '14-35-14', '28-28', '17-17-17', '20-20','10-26-26'];
  const [val,changeVal]=useState('');
  const  Modelpred=async ()=>
  {
    const model=await tf.loadLayersModel('https://raw.githubusercontent.com/AndroBen/Nalaya-Thiran/main/fert_model/model.json');
    const inp=[parseInt(temp.current.value),parseInt(hum.current.value),parseInt(mois.current.value),parseInt(soil.current.value),parseInt(crop.current.value),parseInt(nit.current.value),parseInt(pot.current.value),parseInt(ph.current.value)];
    console.log(inp);
    const prediction=model.predict(tf.tensor([inp]));
    const data=await prediction.data();
    console.log(data);
    console.log(Math.max(...data));
    const index=data.indexOf(Math.max(...data));
    console.log(index);
    console.log(out[index]);
    changeVal(out[index]);
  }
  return (
    <div className="App">
      <h2>Enter Temperature Value</h2>
      <input type="text" id="t1" ref={temp}/>
      <h2>Enter Humidity Value</h2>
      <input type="text" id="h1" ref={hum}/>
      <h2>Enter Moisture Value</h2>
      <input type="text" id="m1" ref={mois}/>
      
      <h2>Enter Soil type</h2>
      <select id="s1" ref={soil}>
        <option value="1">Sandy</option>
        <option value="2">Loamy</option>
        <option value="3">Black</option>
        <option value="4">Red</option>
        <option value="5">Clayey</option>
      </select>
      <h2>Enter Crop type</h2>
      <select id="c1" ref={crop}>
        <option value="1">Maize</option>
        <option value="2">Sugarcane</option>
        <option value="3">Cotton</option>
        <option value="4">Tobacco</option>
        <option value="5">Paddy</option>
        <option value="6">Barley</option>
        <option value="7">Wheat</option>
        <option value="8">Millets</option>
        <option value="9">Oil seeds</option>
        <option value="10">Pulses</option>
        <option value="11">Ground Nuts</option>
      </select>
      <h2>Enter Nitrogen Value</h2>
      <input type="text" id="n1" ref={nit}/>
      <h2>Enter Potassium Value</h2>
      <input type="text" id="p1" ref={pot}/>
      <h2>Enter Phosporous Value</h2>
      <input type="text" id="ph1" ref={ph}/><br/>
      <input type="submit" onClick={Modelpred}/>
      <h1>{`The Fertilizer Recommended is ${val}`}</h1>
    </div>
  );
}

export default App;
