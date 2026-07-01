// app/api/memoContent/route.ts  
// 메모 상세정보를 제공 

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const pri_no = searchParams.get('pri_no');

        // user 테이블의 모든 데이터를 조회 
        //console.log("Memo_Detail_query, Start");
        //console.log("Memo_Detail_query, pri_no : ", pri_no); 

        // 여기서 내용을 구한다. 
        const query = `
        select pri_no, fw_date, bg_color, state_info, memo from ahn_memo 
        where pri_no = '${pri_no}'
        `;
        const [rows] = await pool.query(query);
        //console.log("Memo_Detail_query, rows :", rows);
        //console.log(rows[0]);

        //return NextResponse.json(rows);
        return NextResponse.json(rows[0]);

//        return NextResponse.json({
//            headers: {"Content-Type": "application/json",},  
//            data: rows,
//        });
        
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}