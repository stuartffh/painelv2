import { EvolutionInstance } from '@/types/evolution';

const BASE_URL = process.env.EVOLUTION_API_URL;
const API_KEY = process.env.EVOLUTION_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY,
};

export async function sendMessage(instance: string, to: string, message: string) {
  const response = await fetch(`${BASE_URL}/message/sendText/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      number: to,
      options: {
        delay: 1200,
      },
      textMessage: {
        text: message,
      },
    }),
  });
  return response.json();
}

export async function sendFile(
  instance: string, 
  to: string, 
  file: string, 
  caption?: string
) {
  const response = await fetch(`${BASE_URL}/message/sendMedia/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      number: to,
      options: {
        delay: 1200,
        presence: "composing",
      },
      mediaMessage: {
        mediatype: "document",
        media: file,
        caption,
      },
    }),
  });
  return response.json();
}

export async function sendAudio(instance: string, to: string, audio: string) {
  const response = await fetch(`${BASE_URL}/message/sendWhatsAppAudio/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      number: to,
      options: {
        delay: 1200,
        presence: "recording",
      },
      audioMessage: {
        audio: audio,
      },
    }),
  });
  return response.json();
}

export async function sendLocation(
  instance: string, 
  to: string, 
  lat: number, 
  long: number, 
  name?: string
) {
  const response = await fetch(`${BASE_URL}/message/sendLocation/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      number: to,
      options: {
        delay: 1200,
      },
      locationMessage: {
        latitude: lat,
        longitude: long,
        name,
      },
    }),
  });
  return response.json();
}

export async function sendButton(
  instance: string,
  to: string,
  text: string,
  buttons: Array<{ buttonText: string, buttonId: string }>
) {
  const response = await fetch(`${BASE_URL}/message/sendButton/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      number: to,
      options: {
        delay: 1200,
      },
      buttonMessage: {
        text,
        buttons: buttons.map((button, index) => ({
          buttonId: button.buttonId,
          buttonText: { displayText: button.buttonText },
          type: 1,
        })),
      },
    }),
  });
  return response.json();
}

export async function sendTemplate(
  instance: string,
  to: string,
  template: {
    text: string,
    footer: string,
    buttons: Array<{
      index: number,
      urlButton?: { displayText: string, url: string },
      callButton?: { displayText: string, phoneNumber: string },
      quickReplyButton?: { displayText: string, id: string },
    }>,
  }
) {
  const response = await fetch(`${BASE_URL}/message/sendTemplate/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      number: to,
      options: {
        delay: 1200,
      },
      templateMessage: {
        text: template.text,
        footer: template.footer,
        templateButtons: template.buttons,
      },
    }),
  });
  return response.json();
}

// Funções para gerenciamento de instâncias
export async function createInstance(instanceName: string): Promise<EvolutionInstance> {
  const response = await fetch(`${BASE_URL}/instance/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ instanceName }),
  });
  return response.json();
}

export async function deleteInstance(instanceName: string) {
  const response = await fetch(`${BASE_URL}/instance/delete/${instanceName}`, {
    method: 'DELETE',
    headers,
  });
  return response.json();
}

export async function getInstanceQR(instanceName: string) {
  const response = await fetch(`${BASE_URL}/instance/qr/${instanceName}`, {
    headers,
  });
  return response.json();
}

export async function logoutInstance(instanceName: string) {
  const response = await fetch(`${BASE_URL}/instance/logout/${instanceName}`, {
    method: 'POST',
    headers,
  });
  return response.json();
}

export async function restartInstance(instanceName: string) {
  const response = await fetch(`${BASE_URL}/instance/restart/${instanceName}`, {
    method: 'POST',
    headers,
  });
  return response.json();
}

// Funções para webhooks
export async function setInstanceWebhook(
  instanceName: string, 
  url: string, 
  events: string[]
) {
  const response = await fetch(`${BASE_URL}/webhook/set/${instanceName}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      url,
      webhook_by_events: true,
      events,
    }),
  });
  return response.json();
}

// Funções para grupos
export async function createGroup(
  instance: string,
  name: string,
  participants: string[]
) {
  const response = await fetch(`${BASE_URL}/group/create/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      participants,
    }),
  });
  return response.json();
}

export async function addParticipant(
  instance: string,
  groupId: string,
  participant: string
) {
  const response = await fetch(`${BASE_URL}/group/addParticipant/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      groupId,
      participant,
    }),
  });
  return response.json();
}

// Funções para status
export async function sendTextStatus(instance: string, text: string) {
  const response = await fetch(`${BASE_URL}/status/sendTextStatus/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      text,
    }),
  });
  return response.json();
}

export async function sendMediaStatus(
  instance: string,
  media: string,
  caption?: string
) {
  const response = await fetch(`${BASE_URL}/status/sendMediaStatus/${instance}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      media,
      caption,
    }),
  });
  return response.json();
}