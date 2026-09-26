import { NextResponse } from 'next/server';
export async function POST(){return NextResponse.json({error:'The legacy scored audit has been retired. Please use the visibility review page.'},{status:410});}
