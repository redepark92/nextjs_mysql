import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useState } from 'react';

type PaginationProps = {
  nowPage: number
  totalPages: number
  limit: number
  onPageChange: (page: number) => void
}


export default function Pagination ({nowPage, totalPages, limit, onPageChange}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }
  // 마지막 페이지 확인. 
  //const lastPages = Math.ceil(totalPages/limit)
  const lastPages = totalPages;

  const [currPage, setCurrPage] = useState(nowPage);

//  let firstNum = currPage - (currPage % 5) + 1
//  let lastNum = currPage - (currPage % 5) + limit
  let firstNum = Math.floor((nowPage - 1) / limit) * limit + 1;
  let lastNum = Math.floor((nowPage - 1) / limit) * limit + limit;

//  console.log({"nowPage is" : nowPage, "limit is" : limit, "lastPages is":lastPages, "firsNum is" : firstNum,  "lastNum is" : lastNum });

  // 원본에는 아래처럼 하여야 된다고 하는데, 오류로 계속 나타나서 아래처럼 처리하였다. 
  // {Array(5).fill().map((_, i) =>{  
  // {Array(5).fill(firstNum).map((_, i) =>{  firstNum 대신에 lastNum, 1, 0 등을 넣어도 상관이 없다... 

  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button 
          onClick={() => {handlePageChange(nowPage-1); }} 
          disabled={nowPage===1}
          className="flex size-10 items-center justify-center rounded-full bg-gray-200 p-2 disabled:cursor-not-allowed">
            <FiChevronLeft />
      </button>

      
      {Array(limit).fill(0).map((_, i) =>{
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
          onClick={() => {handlePageChange(nowPage+1); }} 
          disabled={nowPage===lastPages}
          className="flex size-10 items-center justify-center rounded-full bg-gray-200 p-2 disabled:cursor-not-allowed">
          <FiChevronRight />
      </button>
    </div>
  )
}
