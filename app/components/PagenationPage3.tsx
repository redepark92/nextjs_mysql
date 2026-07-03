import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useState } from 'react';
import Link from 'next/link';

type UrlParam = {
  page: string;
  status: string;
  searchtext?: string;
};

type PaginationProps = {
  nowPage: number;
  totalPages: number;
  limit: number;
//  urlparam: UrlParam;
  onPageChange: (page: number) => void
}

// page 값을 넘기는 관계로, onPageChange 를 사용하지 않게 되네...  문제는 왼쪽, 오른쪽인데, 이건 다시 보도록 하자. 
//export default function Pagination ({nowPage, totalPages, limit, urlparam}: PaginationProps) { 
export default function Pagination ({nowPage, totalPages, limit, onPageChange}: PaginationProps) { 
  const handlePageChange = (page: number) => {
    console.log("handlePageChange :", page)  ;
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }
  // 마지막 페이지 확인. 
  const lastPages = totalPages;

  let firstNum = Math.floor((nowPage - 1) / limit) * limit + 1;
  let lastNum = Math.floor((nowPage - 1) / limit) * limit + limit;

//  console.log({"nowPage is" : nowPage, "limit is" : limit, "lastPages is":lastPages, "firsNum is" : firstNum,  "lastNum is" : lastNum  });

  // 페이지 Navigation 상의 목록보다, TotalPage 가 적을 경우 대응하는 로직이다. 
  let pagelimit = limit;
  // lastPages 가 0 인데, lastNum 을 조정하면, 오류가 발생하여, lastPages > 0 조건을 추가하였다. 
  if (lastPages < lastNum && lastPages > 0) {
    lastNum = lastPages;
    pagelimit = lastPages - firstNum + 1;
  } 

  console.log({"nowPage is" : nowPage, "limit is" : limit, "lastPages is":lastPages, "firsNum is" : firstNum,  "lastNum is" : lastNum ,  "pagelimit is" : pagelimit });
  //console.log({"urlparam.page is" : urlparam.page, "urlparam.status is" : urlparam.status });


  const pageparams = {
    // 260703
    //  status: urlparam.status,
  }
  const PageUrlString = new URLSearchParams(pageparams).toString();

  // 원본에는 아래처럼 하여야 된다고 하는데, 오류로 계속 나타나서 아래처럼 처리하였다. 
  // {Array(5).fill().map((_, i) =>{  
  // {Array(5).fill(firstNum).map((_, i) =>{  firstNum 대신에 lastNum, 1, 0 등을 넣어도 상관이 없다... 

  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button 
          onClick={() => {handlePageChange(firstNum-limit); }} 
          disabled={firstNum < limit}
          className="flex size-10 items-center justify-center rounded-full bg-gray-200 p-2 disabled:cursor-not-allowed">
            <FiChevronLeft />
      </button>
      
      {Array(pagelimit).fill(0).map((_, i) =>{
        return (
          <button
            key={i} 
            onClick={() => {handlePageChange(firstNum+i)}}
            className={`flex size-10 items-center justify-center rounded-full ${
              nowPage === firstNum + i ? 'bg-blue-300 text-white' : 'bg-gray-200'
            }`}>
            {firstNum+i}
          </button>
        )
      })}

      <button 
          onClick={() => {handlePageChange(firstNum+limit); }} 
          disabled={firstNum+limit > lastPages}
          className="flex size-10 items-center justify-center rounded-full bg-gray-200 p-2 disabled:cursor-not-allowed">
            <FiChevronRight />
      </button>

    </div>
  )
} 
