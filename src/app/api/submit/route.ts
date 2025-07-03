import { db } from '@/app/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const name=body.data.name
  const phone=body.data.phone
  const address=body.data.address
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
 console.log(name);
  // 🔎 Check if this IP already submitted
  const existing = await db
    .collection('submissions')
    .where('ip', '==', ip)
    .limit(1)
    .get();

  if (!existing.empty) {
    const prizeDoc = existing.docs[0].data();
    return NextResponse.json({
      message: 'You have already played.',
      played: true,
      prize: prizeDoc.prize,
    });
  }

  // Updated Prize Logic
  const prizePool = ['Carrot Cake', 'Banana Cake', 'Jack Fruit Cake'];
  let prize = 'No Prize';

  // 1 in 10 chance
  if (Math.floor(Math.random() * 10) === 0) {
    const randomIndex = Math.floor(Math.random() * prizePool.length);
    prize = prizePool[randomIndex];
  }

  // Save to Firestore
  const docRef = await db.collection('submissions').add({
    name,
    phone,
    address,
    prize,
    ip,
    scratched: false,
    createdAt: new Date(),
  });
  return NextResponse.json({ id: docRef.id, prize });
}

