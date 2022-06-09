import cheerio from "cheerio";
import { useState } from "react";
import React from 'react'
interface Bookmark {
    url: '';
    title:'';
}
export const useBookMarkParser = (
    buffer:string | ArrayBuffer
  ): Bookmark[] => {
    const [bookMarkJson,setJson] = useState<Bookmark[] | []>([])
    React.useEffect(() => {
        let result:Bookmark[]  = [];
        const $ = cheerio.load(buffer);
        const anchor = $('body').find('a');
        anchor.each((idx, a) => {
        result.push({
            url: a.attribs.href,
            title: a.children[0].data
          });
        });
        setJson(result)
    }, [buffer]);
    return { bookMarkJson };
  };