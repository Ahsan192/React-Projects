import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length , setLength] = useState(8);
  const [numAll, setnumAll] = useState(false);
  const[chrAll, setchrAll] = useState(false);
  const[passWor,setpassWor] = useState("");
  const refVar = useRef(null)
  const passGen =useCallback(()=>{
    let pass ="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numAll) str += "0123456789"
      if(chrAll) str += "~!@#$%^&*()_+"
      for (let i = 1; i<length; i++){
      let char = Math.floor(Math.random()*str.length)
      pass+=str.charAt(char)
    }
    setpassWor(pass)
  },[length,numAll,chrAll,setpassWor])
  const copyClip = useCallback(()=>{
    refVar.current?.select()
    
    window.navigator.clipboard.writeText(passWor)

  },[passWor])
  useEffect(()=>{
    passGen()

  },[length,numAll,chrAll,passGen])

  return (
    
      <div className=' w-full max-w-md mx-100 shadow-md rounded-lg px-4 py-6 mx-8 my-8 bg-gray-800 text-orange-700'>
        <h3 className='text-white text-center'>Password Generator</h3>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" 
        ref={refVar}
        value={passWor} 
        className='outline-none w-full py-1 px-3 text-white' 
        placeholder='password'
        readOnly/>
        <button className='outline-none bg-blue-700  px-3 py-0.5 shrink-0 mb-2'
        onClick={copyClip}>Copy</button>

        </div>
        <div className='flex text-sm gap-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) =>{setLength(e.target.value)}}
            />
            <label className='text-white' >Length:{length}</label>


          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox"
            defaultChecked={numAll}
            id="numberInput"
            onChange={()=>{
              setnumAll((prev)=>!prev)
            }} />
            <label className='text-white'>Number</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox" 
            defaultChecked={chrAll}
            id="charInput"
            onChange={()=>{
              setchrAll((prev)=>!prev)
            }}
            />
            <label className='text-white'>Charecter</label>
          </div>
           </div>
        
        
      </div>
     
        
   
  )
}

export default App
