import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      headers: {
        'Accept': '*/*',
      },
      cache: 'no-store' // Disable caching for debugging
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text(); // Get response as text first
    try {
      const data = JSON.parse(text); // Try to parse as JSON
      return NextResponse.json(data);
    } catch (e) {
      console.error('Failed to parse response as JSON:', text.substring(0, 200)); // Log first 200 chars
      throw new Error('Invalid JSON response from API');
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu data' },
      { status: 500 }
    );
  }
} 