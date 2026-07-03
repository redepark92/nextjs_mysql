// app/memo/[pri_no]/page.tsx

"use client"; 
import { useEffect, useState } from 'react';
import React from 'react';

import Link from "next/link";

//import Header from '@/app/components/Header';
//import Footer from '@/app/components/Footer';
import { useParams, useSearchParams } from "next/navigation";


//interface MemoDetail {
// type MemoDetail = {
interface Memo {
  pri_no: string;
  fw_date: string;
  memo: string;
  bg_color: string;
  state_info: string;
}

type Id = {
  id: string;
}

  // 가격 히스토리를 가져오는 함수
// 같은 product_id를 가진 모든 레코드를 collected_at 기준으로 정렬
async function getMemoHistory(obj: string) {
    try {
      // Supabase 쿼리: product_id로 필터링하여 가격 히스토리 조회
      // eq('product_id', productId): 같은 product_id를 가진 모든 레코드
      // order('collected_at', { ascending: true }): 수집 시간 순으로 정렬
      return [];
    } catch (error) {
      console.error('가격 히스토리 가져오기 실패:', error);
      return [];
    }
  }


// 서버 컴포넌트: async 함수로 선언하여 데이터를 가져옵니다
export default function MemoDetailPage() {

//  const param: Id = useParams();
//  const id = param.id;
// 아래처럼 처리해서, 오류 표시가 없어진다. 
  const param = useParams<Id>();
  const id = param?.id ?? ''; 


  // page=? 으로 넘겨받은 값을 처리한다.. 
  const searchParams  = useSearchParams();
  const page = searchParams?.get("page") ?? "1";
  const status = searchParams?.get("status") ?? "ING";
  const searchtext = searchParams?.get("searchtext") ?? "";

  const backurlparams = {
    page: page,
    status: status,
    searchtext: searchtext,
  }
  const backUrlString = new URLSearchParams(backurlparams).toString();
  const backurl = `/memopage3?${backUrlString}`;

  const [memoDetail, setMemo] = useState<Memo | null>(null);

  useEffect(() => {    
    const fetchData = async () => {
      const baseurl = '/api/memoContent';
      //console.log('Memo baseurl :', baseurl);

      const params = {
        pri_no: id,
      }

      const queryString = new URLSearchParams(params).toString();
      const requesturl = `${baseurl}?${queryString}`;
      const response = await fetch(requesturl);
      const responseData = await response.json();
      // 목록 값을 처리한다. 
      setMemo(responseData);
    }
  //의존성 배열을 빈 배열([])로 설정하면, 컴포넌트가 처음 마운트될 때만 실행됩니다.
    fetchData();
  }, [id]);



  // 상품 정보가 없으면 에러 페이지 표시
  if (!memoDetail) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600">Memo를 찾을 수 없습니다.</p>
            <Link
              href={`${backurl}`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-700"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
    );
  }

    
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 최대 너비와 반응형 패딩 설정             href={`/memopage2?${backUrlString}`}  */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 뒤로가기 버튼 - Link 컴포넌트로 클라이언트 사이드 네비게이션 */}
        <div className="mb-6">
          <Link
            href={backurl}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            {/* SVG 아이콘 - 화살표 모양 */}
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로 돌아가기  
          </Link>
        </div>



        {/* 기본 정보 카드 */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          {/* 상품명과 카테고리 섹션 */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {memoDetail.fw_date}
            </h1>
            {/* 카테고리 배지 */}
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {memoDetail.state_info}
            </span>
          </div>
          {/* 가격 표시 섹션 */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-bold text-blue-600">
                {memoDetail.bg_color}
              </p>
            </div>
          </div>
        </div>


        <div className="mb-6">
        <p>{memoDetail.memo?.split("\n").map((it, idx)=>(
                        <span key={idx}>
                            {it}
                            <br/>
                        </span>
                    ))}</p>

        {/* 사용 가능 
          { memoDetail.memo != undefined ?
            memoDetail.memo.split('\n').map( content => {
              return (
                <span>{content}<br/></span>
              )
              }) :null
          }
        */}
        </div>


      </div>
      
    </div>

  );
}
