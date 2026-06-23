import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { connectToWhatsApp, getWhatsAppStatus, disconnectWhatsApp } from '@/lib/whatsapp'

export async function GET(req: Request) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const status = getWhatsAppStatus()
  return NextResponse.json(status)
}

export async function POST(req: Request) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()

  if (body.action === 'connect') {
    await connectToWhatsApp()
    return NextResponse.json({ success: true, message: 'Connexion initiée' })
  }

  if (body.action === 'disconnect') {
    await disconnectWhatsApp()
    return NextResponse.json({ success: true, message: 'Déconnecté' })
  }

  return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
}
