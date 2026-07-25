import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import GlobalSettings from '@/models/GlobalSettings';

export async function GET() {
  try {
    await connectToDatabase();
    
    const ui_templates = {
        "layout": "v1",
        "navbar": "v1",
        "hero": "v2",
        "categories": "v1",
        "productCard": "v6",
        "productDetail": "v1",
        "blogDetail": "v1",
        "shopListing": "v1",
        "blogListing": "v1",
        "footer": "v1",
        "theme": "green",
        "logoFont": "orbitron",
        "bodyFont": "inter"
    };

    // Update the latest settings document
    const result = await GlobalSettings.findOneAndUpdate(
        {}, 
        { uiTemplates: ui_templates, updatedAt: new Date() },
        { sort: { updatedAt: -1 }, new: true, upsert: true }
    );

    return NextResponse.json({ 
        message: "Successfully updated uiTemplates", 
        settings: result 
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
