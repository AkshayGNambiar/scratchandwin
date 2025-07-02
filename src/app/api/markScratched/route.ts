// app/api/markScratched/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebaseAdmin';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    // Update the "scratched" field to true
    await db.collection('submissions').doc(id).update({
      scratched: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking as scratched:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
