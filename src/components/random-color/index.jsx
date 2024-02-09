import { useEffect, useState } from "react";


export default function RandomColor(){

   const[typeOfColor, setTypeOfColor] = useState('rgb');
   const[color, setColor] = useState('0, 0, 0');
   
    function randomUtility(length){
        return Math.floor(Math.random() * length);
    }
   
    function handleRandomHex(){
        const hex = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
        let hexColor = "#";

        for(let i=0; i<6; i++){
           hexColor += hex[randomUtility(hex.length)];
        }

        setColor(hexColor);
    }
    
    function handleRandomRgb(){
        const r = randomUtility(256);
        const g = randomUtility(256);
        const b = randomUtility(256);

        setColor(`rgb(${r},${g},${b})`)
    }

    useEffect(()=>{
        if(typeOfColor === 'hex'){
            handleRandomHex();
        }else{
            handleRandomRgb();
        }
    },[typeOfColor])


    return(
        <div style={{
            width: '100vw',
            height: '100vh',
            background: color
        }}>
            <button onClick={()=> setTypeOfColor('hex')}>Create Hex</button>
            <button onClick={()=> setTypeOfColor('rgb')}>Create RGB</button>
            <button onClick=
            {
                typeOfColor === 'hex'
                ? handleRandomHex
                : handleRandomRgb
            }>Create Random Color</button>
            <div>
                <h1>{typeOfColor === 'hex' ? 'Hex Color' : 'RGB Color'}</h1>
                <h3>{color}</h3>
            </div>
        </div>
    );

    
}