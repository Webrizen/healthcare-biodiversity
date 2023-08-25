import { NextResponse } from 'next/server';
import { fetchCategories } from '@/firebase/firestore/fetchCategories';

export async function GET(request) {
  try {
    const categories = await fetchCategories();

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
