import {useEffect,useState} from 'react'

export function useDebounce(value, delay=300){
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() =>{
    const timer = window.setTimeout(()=>{
      setDebounceValue(value);
    },delay);
    return ()=>{
      window.clearTimeout(timer);
    }
  },[value,delay]);
  return debounceValue;
}

