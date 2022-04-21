import { useEffect } from 'react'

export function useESC(cancelFn, edit_maskOpen, confirmEdit) {
  useEffect(() => {
    const listener = (e) =>{
      if(e.keyCode === 27){
        cancelFn();
      }
    }
    document.addEventListener('keyup', listener);
    return ()=>{
      document.removeEventListener('keyup', listener);
    }
  }, [])
}

