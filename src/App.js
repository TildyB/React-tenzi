import DoboKocka from './components/Dobokocka';
import './App.css';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  // szam = [1,2,3,4,5,6]
  const[szam,setSzam] =useState(veletlenSzamGenerator)
  const [gyozelem,setGyozelem] = useState(false)
  const[lepes,setLepes] = useState(0)

  useEffect(()=>{
      const mindMegtartva = szam.every(szam => szam.megTartva == true)
      const probaSzam = szam[0].value
      const mindUgyanaz = szam.every(szam => szam.value == probaSzam)
      if(mindMegtartva && mindUgyanaz){
        setGyozelem(true)
      }
  },[szam])

  function veletlenSzamGenerator(){
    let szamTomb = [];
    for (let index = 0; index < 10; index++) {
            szamTomb.push(
              {value: Math.floor(Math.random()*6)+1,
              megTartva:false,
              id:nanoid()
              }
            )      
    }   
    return szamTomb
  }
  const gombKattintas = () =>{
    setLepes(prevLepes => prevLepes+1)
    console.log(lepes)
    if(!gyozelem){
      setSzam(prevSzam => prevSzam.map(szam =>{
        return szam.megTartva ? szam :
          {value: Math.floor(Math.random()*6)+1,
            megTartva:false,
            id:nanoid()
          }
      }))
    }else{
      setSzam(veletlenSzamGenerator)
      setGyozelem(false)
    }

  }
  const kockaMegtartas = (id) =>{
    setSzam(prevSzam => prevSzam.map(szam=>{
          return szam.id == id ? {...szam,megTartva: !szam.megTartva}
          : szam
    }))
  }
    return (
      <div className='foDiv'>
          <div className='alDiv'>
            {gyozelem && <Confetti></Confetti>}
            <h1 style={{marginTop:"-10px"}}>{gyozelem? "Gratulálunk győztél" :"Tenzi kocka alapú társasjáték"}</h1>
            {gyozelem && <h6><span className='lepes'>{lepes}</span> lépésből</h6>}
            <p className='leiroSzoveg'>Ebben a játékban nincs más dolgod, csak dobnod kell a 10 kockát! S aztán újra, és újra, és újra!<br/> Egészen addig, míg 10 ugyanolyan szám nem áll előtted a 6 oldalú kockákon.</p>
            <div className='dice-container'>
                {szam.map(data => <DoboKocka kockaMegtartas={kockaMegtartas} key={data.id} id={data.id} data ={data.value}  megTartva={data.megTartva}/> )}
            </div>
              <button onClick={gombKattintas} className='dobasButton'>{gyozelem? "Új játek" :"Dobás"}</button>
          </div>
      </div>

    )
}

export default App;
