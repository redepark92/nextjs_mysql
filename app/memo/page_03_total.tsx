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
// 두개의 값을 리턴하기에, 리턴되는 값에 대한 type를 지정한다. 
// function getMemo(obj:Page) { 
function getMemo(obj:Page): [Memo[], number] {
  //console.log("getMemo Start");

  const [memo, setMemo] = useState<Memo[]>([]);
  //const memodata = [];

  // Total 을 처리할 수 있나?
  const [totalPage, setTotalPages] = useState<number>(0);  


  try {

    //console.log("getMemo try Start");

    const fetchData = async () => {
      // const response = await fetch('/api/memo');
      const baseurl = '/api/memo';
      
      const setpage = obj.page ?? 1;
      //console.log("obj.page : ", obj.page);
      const set_start = (setpage - 1) * itemsPerPage;
      const set_scale = itemsPerPage;
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

      const responseData = await response.json();
      //console.log("responseData.total :",responseData.total);        

      //console.log("response type :",typeof responseData.scale);
      // total page 전달하기 전에 계산부터 하자. ceil 는 올림이다. floor 은 내림이다. 
      const totalpage_exe = Math.ceil(responseData.total/responseData.scale);
      //console.log("totalpage_exe :", totalpage_exe);        

      setTotalPages(totalpage_exe);

      // 목록 값을 처리한다. 
      setMemo(responseData.data);

    };
    
    //의존성 배열을 빈 배열([])로 설정하면, 컴포넌트가 처음 마운트될 때만 실행됩니다.
    useEffect(() => {    
      fetchData();
    }, [obj.page]);



    // 여기서 처리해야 할지는 모르지만, 페이지 네이게이션에 total을 넘겨서 처리하는 방법이 필요하다. 
    // 페이지 네비게이션은 별도의 파일을 만들고, component 에 등록하여, 불러오도록 하자. 

    //console.log("try");
    return [memo, totalPage];


  } catch (error) {
    console.log('Memo 목록 가져오기 실패:');
    console.error('Memo 목록 가져오기 실패:', error);
    // 두개의 값을 리턴하기에, 에러에서도 처리한다. 
    //return [];
    return [[], 0];
  }

}

export default function Memo() {

  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log("currentPage: ", currentPage);
  const pageparam: Page = { page: currentPage };
  
 
  // 여기서 값을 나눠버리는게, 이후에 확장을 하는데도 유리할 것 같다... 다만 메모리 효율은 조금 떨어진다. 
  //return [memo, totalPage]; 이렇게 반환 할 때는... 
  // 두개의 값을 리턴으로 받는다... 
  
  // 각각의 값을 정의하지 않고, 한번에 한다. 
  //const getmemos = getMemo(pageparam);
  //const memos = getmemos[0];
  //const totalpage = getmemos[1];

  const [memos, totalpage] = getMemo(pageparam);

  //return {memo, totalPage}; 이렇게 반환 할 때는....  이건 안되네... 
  //const memos = getMemo().memo;
  //const totalpage = getMemo().totalPage;


  // parseInt()
  console.log("totalpage type :",typeof {totalpage});

  // 위에서 값을 나누지 않고, 처리를 한다면, 이렇게 memo[0]로 처리하여야 한다.. 
  // <li key={memo[0].pri_no}> {memo[0].pri_no} {memo[0].fw_date}님</li>
  
  //const totalpageparam: TotalPage = { total_page: totalPages };
  //const totalPages = 14;

//  useEffect(() => {
//    console.log("Effect ran: currentPage is", currentPage);
//  });
  

  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />


      <h1>memo List</h1>
      <ul>
        {memos.map((memo) => (
          <li key={memo.pri_no}> {memo.pri_no} {memo.fw_date}님</li>
        ))}
      </ul>
      <div>데이터는 아직 없음</div>

      <div>
      <Pagenation
        currentPage={currentPage}
        totalPages={totalpage}
        onPageChange={setCurrentPage}
      />
 
      </div>

      <Footer />
    </div>
  );

}