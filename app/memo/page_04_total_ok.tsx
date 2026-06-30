// src/pages/index.tsx

"use client"; 
import { useEffect, useState } from 'react';
import React from 'react';

import { useRouter } from 'next/navigation';
import Link from "next/link";

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Pagenation from '@/app/components/Pagenation';


interface Memo {
  pri_no: string;
  fw_date: string;
  memo_text: string;
}

interface Page {
  page?: number;
};

interface TotalPage {
  total_page?: number;
};


// 여기에 상수를 넣는게 맞는지는 모르겠지만.... 
const itemsPerPage = 10; 
//const totalPages = 0;


// 데이터를 가져오는 함수 (예시 - 실제로는 Supabase에서 가져옴)
// async 함수로 선언하여 비동기 작업을 처리합니다
function getMemo(obj:Page): [Memo[], number] {

  const [memo, setMemo] = useState<Memo[]>([]);
  const [totalPage, setTotalPages] = useState<number>(0);  

  try {
    const fetchData = async () => {
      const baseurl = '/api/memo';
      const setpage = obj.page ?? 1;

      // limit 에 필요한 것을 정리하는데, start 대신에 page 를 넘기는 것도 고민하자, 
      // 공통으로 사용하는 API라면, page를 받아서 값을 넘겨주는 것이 어떨지 고민이 된지.. 
      const set_start = (setpage - 1) * itemsPerPage;
      const set_scale = itemsPerPage;
      const params = {
        start: String(set_start),
        scale: String(set_scale),
      }

      const queryString = new URLSearchParams(params).toString();
      const requesturl = `${baseurl}?${queryString}`;
      
      const response = await fetch(requesturl);
      const responseData = await response.json();
      // total page 전달하기 전에 계산부터 하자. ceil 는 올림이다. floor 은 내림이다. 
      const totalpage_exe = Math.ceil(responseData.total/responseData.scale);
      // total Count 로 처리하는 것도 방법이다. 이는 고민하도록 하자... 

      // Total 을 처리한다. 
      setTotalPages(totalpage_exe);
      // 목록 값을 처리한다. 
      setMemo(responseData.data);

    };
    
    //의존성 배열을 빈 배열([])로 설정하면, 컴포넌트가 처음 마운트될 때만 실행됩니다.
    useEffect(() => {    
      fetchData();
    }, [obj.page]);

    return [memo, totalPage];

  } catch (error) {
    console.log('Memo 목록 가져오기 실패:');
    console.error('Memo 목록 가져오기 실패:', error);
    return [[], 0];
  }

}

export default function Memo() {

  const [nowpage, setCurrentPage] = useState<number>(1);
  const pageparam: Page = { page: nowpage };
 
  // 두개의 값을 리턴으로 받는다... 
  const [memos, totalpage] = getMemo(pageparam);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <h1>memo List</h1>
      <ul>
        {memos.map((memo) => (
          <li key={memo.pri_no}> {memo.memo_text} {memo.fw_date}님</li>
        ))}
      </ul>
      <div>데이터는 아직 없음</div>


      <div>
      <Pagenation
        nowPage={nowpage}
        totalPages={totalpage}
        limit={5}
        onPageChange={setCurrentPage}
      />
       </div>



      <Footer />
    </div>
  );

}