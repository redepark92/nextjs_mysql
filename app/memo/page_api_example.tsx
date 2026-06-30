// src/pages/index.tsx

//"use client"; 
//import { useEffect, useState } from 'react';
import React from 'react';

interface Memo {
    pri_no: string;
    fw_date: string;
}

// 데이터를 가져오는 함수 (예시 - 실제로는 Supabase에서 가져옴)
// async 함수로 선언하여 비동기 작업을 처리합니다
function getMemo() {
//  const [mem, setMemo] = useState<Memo[]>([]);

  try {
  /*
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/memo');
        const data = await response.json();
        setMemo(data);
        console.log("mem",mem);
      };
      fetchData();
    }, []);

    return mem;
*/

  return [
    { pri_no: '1', fw_date: '무선 블루투스 이어폰', price: 29900, category: 'digital' },
    { pri_no: '2', fw_date: '스마트워치 프로', price: 199000, category: 'digital' },
    { pri_no: '3', fw_date: '노트북 울트라', price: 1299000, category: 'digital' },
    { pri_no: '4', fw_date: '태블릿 프로', price: 899000, category: 'digital' },
    { pri_no: '5', fw_date: '무선 마우스', price: 39000, category: 'digital' },
    { pri_no: '6', fw_date: '키보드 기계식', price: 129000, category: 'digital' }
  ];


  } catch (error) {
    console.error('Memo 목록 가져오기 실패:', error);
    return [];
  }
}

export default async function Memo() {
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

  const memos = await getMemo();

  
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