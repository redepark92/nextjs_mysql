// app/components/MemoList.tsx
'use client';  // useState와 useRouter를 사용하므로 클라이언트 컴포넌트 필요

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MemoCard from '@/app/components/styled/memo/MemoCardPage';

// 상품 타입 정의
type Memo = {
    pri_no: string;
    fw_date: string;
    memo_text: string;
    bg_color: string;
};

type UrlParam = {
  page: string;
  status: string;
  searchtext?: string;
};

// Props 타입 정의: 서버 컴포넌트에서 받은 필터링된 상품 목록과 검색어
type Props = {
  memolist: Memo[];
  urlparam: UrlParam;
};

export default function MomoList({ memolist, urlparam }: Props) {

//  console.log("urlparam : ", urlparam);

  return (
    <>
      {/* 검색 결과 개수 */}
      <p className="text-gray-600 mb-4">
        {memolist.length}개의 메모를 찾았습니다.
      </p>

      {/* 메모 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {memolist.map(memo => (
          <MemoCard
            key={memo.pri_no}
            memo={memo}
            urlparam={urlparam}
          />
        ))}
      </div>

      {/* 검색 결과가 없을 때 */}
      {memolist.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {`검색 결과가 없습니다.`}
          </p>
        </div>
      )}
    </>
  );
}