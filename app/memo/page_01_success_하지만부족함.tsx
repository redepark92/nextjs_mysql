// src/pages/index.tsx

"use client"; 
import { useEffect, useState } from 'react';
import React from 'react';

interface Memo {
  pri_no: string;
  fw_date: string;
}

// 데이터를 가져오는 함수 (예시 - 실제로는 Supabase에서 가져옴)
// async 함수로 선언하여 비동기 작업을 처리합니다
function getMemo() {
  console.log("getMemo Start");

  const [mem, setMemo] = useState<Memo[]>([]);
  const memodata = [];

  try {

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/memo');
        console.log("response",response);        
        console.log("data type",typeof {response});

        const data = await response.json();
        console.log("data",data);        
        console.log("data type",typeof {data});
        // data 가 object 로 들어온다... 
        setMemo(data);
//        console.log("memo",mem);
      };
      fetchData();
    }, []);
  
    // 프론트엔드 구조로 변환
    return Array.from(mem.values()).map(item => ({
      pri_no: item.pri_no,
      fw_date: item.fw_date
    }));
    

  } catch (error) {
    console.error('Memo 목록 가져오기 실패:', error);
    return [];
  }
}

export default function Memo() {
/*
  const [memo, setMemo] = useState<Memo[]>([]);

  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/memo');
        const data = await response.json();
        setMemo(data);
        console.log("mem",memo);
      };
      fetchData();
    }, []);
  } catch (error) {
    console.error('Memo 목록 가져오기 실패:', error);
    return [];
  }
*/

  const memos = getMemo();

  
  return (
    <div>
      <h1>memo List</h1>
      <ul>
        {memos.map((memo) => (
          <li key={memo.pri_no}> {memo.pri_no} {memo.fw_date}님</li>
        ))}
      </ul>
      <div>데이터는 아직 없음</div>
    </div>
  );

}