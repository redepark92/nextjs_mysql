// src/pages/index.tsx

"use client"; 
import { useEffect, useState } from 'react';
import React from 'react';

import { useRouter } from 'next/navigation';
import Link from "next/link";

// useParams 로 변경도 고민해보자. 
import { useSearchParams } from "next/navigation";

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Pagenation from '@/app/components/PagenationPage';
import MemoList from '@/app/components/MemoListPage';  // 클라이언트 컴포넌트


interface Memo {
  pri_no: string;
  fw_date: string;
  memo_text: string;
  bg_color: string;
}

interface Page {
  page?: number;
};

interface TotalPage {
  total_page?: number;
};


// page 를 string 으로 하는 이유는, Card 에서 Url 처리할 때, 오류가 발생한다. 이를 방지하기 위해서 string 로 설정한다. 
interface UrlParam {
  page: string;
  status: string;
  searchtext?: string;
}



// 여기에 상수를 넣는게 맞는지는 모르겠지만.... 
const itemsPerPage = 12; 
const PageNum = 5; 
//const totalPages = 0;
//let set_page = parseInt(sessionStorage.getItem('PrePage') || '1');  


// 데이터를 가져오는 함수 (예시 - 실제로는 Supabase에서 가져옴)
// async 함수로 선언하여 비동기 작업을 처리합니다
function getMemo(obj:UrlParam): [Memo[], number] {

  const [memo, setMemo] = useState<Memo[]>([]);
  const [totalPage, setTotalPages] = useState<number>(0);  

  try {
    const fetchData = async () => {
      const baseurl = '/api/memoList';
      const setpage = obj.page ?? 1;
      const setpageNum = Number(setpage);
      const setstatus = obj.status ?? 'ING';

      // 여기서 세션을 만드는것을 테스트 한다. 
      //sessionStorage.setItem("PrePage", setpage.toString());

      // limit 에 필요한 것을 정리하는데, start 대신에 page 를 넘기는 것도 고민하자, 
      // 공통으로 사용하는 API라면, page를 받아서 값을 넘겨주는 것이 어떨지 고민이 된지.. 
      const set_start = (setpageNum - 1) * itemsPerPage;
      const set_scale = itemsPerPage;
      const params = {
        start: String(set_start),
        scale: String(set_scale),
        status: setstatus,
      }

      const queryString = new URLSearchParams(params).toString();
      const requesturl = `${baseurl}?${queryString}`;
      
      const response = await fetch(requesturl);
      const responseData = await response.json();
      // total page 전달하기 전에 계산부터 하자. ceil 는 올림이다. floor 은 내림이다. 
      const totalpage_exe = Math.ceil(responseData.total/responseData.scale);
      // total Count 로 처리하는 것도 방법이다. 이는 고민하도록 하자... 

      console.log("responseData.total : ", responseData.total);

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

  // 상세조회 후 다시 목록으로 올때, 위치 파악을 위해서... 

//  let set_page = parseInt(sessionStorage.getItem('PrePage') || '1');  
  //console.log("set_page : ", set_page);
  //console.log("set_page type :", typeof {set_page});

  // 클라이언트 사이드에서만 실행될 코드
//  let set_page = typeof window !== 'undefined' ? sessionStorage.getItem('PrePage') : null;
  //let set_page = getSession('PrePage');
//  if (!set_page) {
//    set_page = '1';
//  }

  // 여기서 page에 대해서 param 으로 처리를 해본다. 
  //const param = useParams<Id>();
  //const id = param?.id ?? '';  
  const searchParams  = useSearchParams();
  const page = searchParams?.get("page") ?? "1";
  const pageNum = Number(page);
  const status = searchParams?.get("status") ?? "ING";

  // UrlParam 을 처리.. 
  // page 를 string 으로 하는 이유는, Card 에서 Url 처리할 때, 오류가 발생한다. 이를 방지하기 위해서 string 로 설정한다. 
  // searchtext 가 있을 경우, 추가 하면 된다. 
  const urlparam: UrlParam = { page: page.toString(), status: 'ING' };


//  const [nowpage, setCurrentPage] = useState<number>(parseInt(set_page));
// useState 를 사용하지 않게 되네, page 값을 넘기고 그 값을 사용하는 것이 맞다. 
//  const [nowpage, setCurrentPage] = useState<number>(page);

//  const [searchParam, setSearchParams] = useSearchParams();  
//  setSearchParams({page: page});

  // 여기서도 동작하는지 궁금하다... 안되면 getMemo 에서 처리하여야 한다. 
  // sessionStorage 는 string 이기에, 변환해준다. 
//  sessionStorage.setItem("PrePage", nowpage.toString());
// sessionStorage 는 클라이언트 사이드에서만 실행될 코드이므로, 서버 사이드에서는 실행되지 않는다.
// 이는 클라이언트 사이드에서만 실행될 코드이므로, 서버 사이드에서는 실행되지 않는다.
// 그리고, 세션은 사용자 정보 등에서만 사용하는 것이 확장성을 고려해서 사용하는 것이 좋다.

//  const pageparam: Page = { page: page };
  const pageparam: UrlParam = { page: page, status: status };

  // 두개의 값을 리턴으로 받는다... 
  const [memos, totalpage] = getMemo(pageparam);
  

  return (
    <html>
    <body>
    <div className="min-h-screen bg-gray-50">
      <Header />

    {/* 메모 그리드 */}
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Memo 목록
        </h1>

        {/* 데이터가 없을 때 빈 상태 표시 */}
        {memos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {'등록된 메모가 없습니다.'}
            </p>
          </div>
        ) : (
          // 클라이언트 컴포넌트에 필터링된 상품 목록 전달
          <MemoList memolist={memos} urlparam={urlparam} />
        )}

      </main>


      <div>
      <Pagenation
        nowPage={pageNum}
        totalPages={totalpage}
        limit={PageNum}
        urlparam={urlparam}
      />
       </div>

      <Footer />
    </div>
    </body>
    </html>
  );

}