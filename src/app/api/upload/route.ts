import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'pqvdu6bo',
  api_key: process.env.CLOUDINARY_API_KEY || '472283955514275',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'e8BLOz-2YWdD3lyQEaLLyQ2WT3o',
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    // Auth check - any authenticated user can upload images
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ message: 'No image provided' }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'masafishop' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Error in /api/upload:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
