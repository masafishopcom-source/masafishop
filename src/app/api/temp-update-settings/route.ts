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

    // Mongoose by default pluralizes the model name: GlobalSettings -> globalsettings
    // Let's use the model directly as it's already connected
    let result = await GlobalSettings.findOne().sort({ updatedAt: -1 });
    
    if (result) {
        // Update existing
        result.uiTemplates = ui_templates;
        result.updatedAt = new Date();
        // Use markModified if it's a mixed type or nested
        result.markModified('uiTemplates');
        await result.save({ validateBeforeSave: false });
    } else {
        // Create new
        result = await GlobalSettings.create({
            brandName: "Masafishop",
            uiTemplates: ui_templates,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    return NextResponse.json({ 
        message: "Successfully updated uiTemplates", 
        settings: result 
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
