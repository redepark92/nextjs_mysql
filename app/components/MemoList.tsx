// app/components/MemoList.tsx
'use client';  // useState와 useRouter를 사용하므로 클라이언트 컴포넌트 필요

import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import MemoCard from '@/app/components/MemoCard';
import MemoCard from '@/app/components/styled/memo/MemoCard';

// 상품 타입 정의
type Memo = {
    pri_no: string;
    fw_date: string;
    memo_text: string;
    bg_color: string;
};

// Props 타입 정의: 서버 컴포넌트에서 받은 필터링된 상품 목록과 검색어
type Props = {
  memolist: Memo[];
  searchQuery: string;
};

export default function MomoList({ memolist }: Props) {
  // useState: 검색어 상태 (입력창용)
  // [상태값, 상태를 변경하는 함수] = useState(초기값)
//  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  // useRouter: URL을 업데이트하기 위한 훅
//  const router = useRouter();

  // 검색어 입력 시 URL 업데이트
//  const handleSearch = (query: string) => {
//    if (query.trim() === '') {
      // 검색어가 비어있으면 파라미터 제거
//      router.push('/products');
//    } else {
      // 검색어가 있으면 URL에 추가
//      router.push(`/products?q=${encodeURIComponent(query)}`);
//    }
//  };

  // Enter 키 입력 시 검색 실행
//  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//    if (e.key === 'Enter') {
//      handleSearch(searchQuery);
//    }
//  };

  return (
    <>
      {/* 검색 입력창
      <div className="mb-6">
        <input
          type="text"
          placeholder="상품명을 입력하세요..."
          // value: 입력창의 값 (상태와 연결)
          // onChange: 입력값이 변경될 때마다 setSearchQuery 호출
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSearch(searchQuery)}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          검색
        </button>
      </div>
    */}

      {/* 검색 결과 개수 */}
      <p className="text-gray-600 mb-4">
        {memolist.length}개의 메모를 찾았습니다.
      </p>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {memolist.map(memo => (
          <MemoCard
            key={memo.pri_no}
            memo={memo}
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