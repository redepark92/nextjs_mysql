import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const start = parseInt(searchParams.get('start') || '0');
        const scale = parseInt(searchParams.get('scale') || '10');

        // user 테이블의 모든 데이터를 조회
        console.log("Memo_query, Start");
        console.log("Memo_query, Start : ", start); 
        console.log("Memo_query, scale : ", scale); 

        const query = `select pri_no, fw_date from ahn_memo order by fw_date limit ${start}, ${scale}`;
               
        const [rows] = await pool.query(query);
        return NextResponse.json(rows);
        
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}