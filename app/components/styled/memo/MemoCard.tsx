// app/components/styled/memo/MemoCard.tsx

import Link from 'next/link';

interface MemoCardProps {
    memo: {
        pri_no: string;
        fw_date: string;
        memo_text: string;
        bg_color: string;
    };
  }


export default function ProductCard({ memo }: MemoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 mb-5">
      {/* 헤더: 상품명과 추적중 태그 */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-gray-900 m-0 flex-1">
          {memo.fw_date}
        </h2>
        <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded ml-3 whitespace-nowrap">
          추적중
        </span>
      </div>

      {/* 가격과 카테고리 */}
      <div className="mt-2">
        <p className="text-2ml text-blue-800 mb-2 break-all">
          {memo.memo_text}
        </p>
        <p className="text-sm text-gray-500">
          카테고리: {memo.bg_color}
        </p>
      </div>

      {/* 버튼 영역 - Link로 감싸서 상세 페이지로 이동 */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link 
          href={`/products/${memo.pri_no}`}
          className="block w-full py-2 px-4 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          aria-label={`상세 보기`}
        >
          상세 보기
        </Link>
      </div>
    </div>
  );
}