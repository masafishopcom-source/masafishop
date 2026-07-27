/**
 * Utility for uploading images via the local API route.
 * The API route handles the actual upload to Cloudinary.
 */
export async function uploadImage(file: File | string): Promise<string> {
  const formData = new FormData();
  
  if (typeof file === 'string') {
    // If it's a base64 string, remove the data:image/xxx;base64, prefix if present
    const base64Data = file.split(',')[1] || file;
    formData.append('image', base64Data);
  } else {
    // If it's a File object
    formData.append('image', file);
  }

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Image upload failed: Unexpected response from server. Status: ${response.status} (Details: ${text || 'empty response'})`);
    }

    if (response.ok && data.url) {
      return data.url;
    } else {
      throw new Error(data.message || `Upload failed with status ${response.status}`);
    }
  } catch (error: any) {
    console.error('Error during image upload:', error);
    throw error;
  }
}

// Keep the old name for backward compatibility if needed elsewhere
export const uploadToImgBB = uploadImage;
