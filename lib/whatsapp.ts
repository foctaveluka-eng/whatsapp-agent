import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode';
import fs from 'fs';
import path from 'path';

let sock: any = null;
let currentQr: string | null = null;
let status = 'disconnected'; // 'disconnected', 'connecting', 'connected'

export async function connectToWhatsApp() {
  const authFolder = path.join(process.cwd(), '.auth_info_baileys');
  if (!fs.existsSync(authFolder)) {
    fs.mkdirSync(authFolder, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(authFolder);

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update: any) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      status = 'connecting';
      // Generate base64 QR
      currentQr = await qrcode.toDataURL(qr);
      console.log('Nouveau QR Code généré');
    }

    if (connection === 'close') {
      status = 'disconnected';
      currentQr = null;
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connexion fermée. Reconnexion:', shouldReconnect);
      if (shouldReconnect) {
        connectToWhatsApp();
      } else {
        // Supprimer le dossier auth si déconnecté volontairement
        if (fs.existsSync(authFolder)) {
          fs.rmSync(authFolder, { recursive: true, force: true });
        }
      }
    } else if (connection === 'open') {
      console.log('Connecté à WhatsApp !');
      status = 'connected';
      currentQr = null;
    }
  });

  sock.ev.on('messages.upsert', async (m: any) => {
    console.log('Nouveau message reçu:', JSON.stringify(m, undefined, 2));
    // Ici nous ajouterons la logique pour interagir avec Supabase et l'IA
  });
}

export function getWhatsAppStatus() {
  return {
    status,
    qr: currentQr
  };
}

export async function disconnectWhatsApp() {
  if (sock) {
    sock.logout();
    status = 'disconnected';
    currentQr = null;
  }
}
