import { useState } from "react";
import React from 'react'
interface Bookmark {
  href?: string;
  title?: string;
  icon?:string;
}
// use buffer to parse json
export const useBookMarkParser = (
    buffer:string | ArrayBuffer
  ): {
    bookMarkJson: Bookmark[];
    setBuffer:React.Dispatch<React.SetStateAction<string | ArrayBuffer>>;
  } => {
    const [bookMarkJson,setJson] = useState<Bookmark[] | []>([])
    const [_buffer,setBuffer] = useState<string | ArrayBuffer>(buffer)
    React.useEffect(() => {
        if (!_buffer) return;
        let result:Bookmark[]  = [];
        let $ = document.createElement('div');
        $.innerHTML = _buffer.toString();        
        let $links = $.querySelectorAll('a');
        for (let i = 0; i < $links.length; i++) {
            let $link = $links[i];
            let href = $link.getAttribute('href')||'' ;
            let title = $link.innerText;
            let icon = $link.getAttribute('icon')||'';
            result.push({href,title,icon:icon})
        }
        setJson(result)
    }, [_buffer]);
    return { bookMarkJson,setBuffer };
  };