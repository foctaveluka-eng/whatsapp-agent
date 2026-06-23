import { NextResponse } from 'next/server';
import { connectToWhatsApp, getWhatsAppStatus, disconnectWhatsApp } from '@/lib/whatsapp';

export async function GET() {
  const status = getWhatsAppStatus();
  return NextResponse.json(status);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.action === 'connect') {
    await connectToWhatsApp();
    return NextResponse.json({ success: true, message: 'Connection initiated' });
  }

  if (body.action === 'disconnect') {
    await disconnectWhatsApp();
    return NextResponse.json({ success: true, message: 'Disconnected' });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
