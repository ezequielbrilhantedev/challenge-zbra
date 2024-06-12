import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('Received POST request');
  try {
    const body = await req.json();
    const response = await fetch(
      'https://zbra-frontend-challenge.azurewebsites.net/api/PasswordValidation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao enviar requisição');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
