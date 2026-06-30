// src/pages/index.tsx
"use client"
import { useEffect, useState } from 'react';
import React from 'react';

interface Memo {
    pri_no: string;
    fw_date: string;
}

export default function Memo() {
  const [memo, setMemo] = useState<Memo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/memo');
      const data = await response.json();
      setMemo(data);
      console.log("memo",memo);
    };
    fetchData();
  }, []);


//  const memo = await getMemo();


  return (
    <div>
      <h1>memo List</h1>
      <ul>
        {memo.map((memo) => (
          <li key={memo.pri_no}> {memo.pri_no} {memo.fw_date}님</li>
        ))}
      </ul>
      <div>데이터는 아직 없음</div>
      </div>
  );
}