// src/pages/index.tsx

"use client"; 
import { useEffect, useState } from 'react';
import React from 'react';

import { useRouter } from 'next/navigation';
import Link from "next/link";


interface Memo {
  pri_no: string;
  fw_date: string;
}

interface Page {
    page?: number;
};


// 데이터를 가져오는 함수 (예시 - 실제로는 Supabase에서 가져옴)
// async 함수로 선언하여 비동기 작업을 처리합니다
function getMemo(obj:Page) {
  //console.log("getMemo Start");

  const [memo, setMemo] = useState<Memo[]>([]);
  //const memodata = [];

  try {

    //console.log("getMemo try Start");

    const fetchData = async () => {
      // const response = await fetch('/api/memo');
      const baseurl = '/api/memo';
      
      const setpage = obj.page ?? 0;
      //console.log("obj.page : ", obj.page);
      const set_start = setpage * 10;
      const set_scale = 10;
      const params = {
        start: String(set_start),
        scale: String(set_scale),
      }

      const queryString = new URLSearchParams(params).toString();
      const requesturl = `${baseurl}?${queryString}`;
      //const requesturl = '/api/memo?start=10&scale=10'

      console.log("requesturl :",requesturl);        
      
      const response = await fetch(requesturl);
      //console.log("response",response);        
      //console.log("response type",typeof {response});

      const data = await response.json();
      //console.log("data",data);        
      //console.log("data type",typeof data);
      // data 가 object 로 들어온다... 
      //setMemo(data);
//        console.log("memo",mem);

//        const count = Object.keys(data).length;
//        console.log("count:", count);
//        for(let i = 0; i< count; i++) {
        //memodata.push(data[i]);
//        }
//        console.log("memodata:", memodata);
      setMemo(data);

    };
    
    //의존성 배열을 빈 배열([])로 설정하면, 컴포넌트가 처음 마운트될 때만 실행됩니다.
    useEffect(() => {    
      fetchData();
    }, [obj.page]);

    //console.log("try");
    return memo;


  } catch (error) {
    console.log('Memo 목록 가져오기 실패:');
    console.error('Memo 목록 가져오기 실패:', error);
    return [];
  }

}

export default function Memo() {

  const [currentPage, setCurrentPage] = useState<number>(0);
  console.log("currentPage: ", currentPage);
  const pageparam: Page = { page: currentPage };
  const memos = getMemo(pageparam);

//  useEffect(() => {
//    console.log("Effect ran: currentPage is", currentPage);
//  });
  

  
  return (
    <div>
      <h1>memo List</h1>
      <ul>
        {memos.map((memo) => (
          <li key={memo.pri_no}> {memo.pri_no} {memo.fw_date}님</li>
        ))}
      </ul>
      <div>데이터는 아직 없음</div>

      <div>
        <button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage((previousPage) => previousPage - 1);
            }}
          >
            Previous page
          </button>
          <span>Page {currentPage}</span>
          <button
            disabled={currentPage >= 10}
            onClick={() => {
              setCurrentPage((previousPage) => previousPage + 1);
            }}
          >
            Next page
        </button>
      </div>

    </div>
  );

}