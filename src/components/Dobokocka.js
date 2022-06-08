import React from 'react';
import './Dobokocka.css'

const DoboKocka = ({data,kockaMegtartas,id,megTartva}) =>{
    const hatter = {
        backgroundColor: megTartva ? "green" : "rgb(197, 194, 194)"
    }
    return (
        <div className='foKocka' onClick={()=>kockaMegtartas(id)} style={hatter}>
            {data}
        </div>

    )
}

export default DoboKocka;