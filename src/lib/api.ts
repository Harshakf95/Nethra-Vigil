const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

type ApiResponse<T = unknown> = {
  data?: T;
  error?: string;
  success: boolean;
};

interface UploadResponse {
  url: string;
  path: string;
  filename: string;
}

export const api = {
  /**
   * Upload a file to the server
   * @param file The file to upload
   * @param path The path where the file should be stored (e.g., 'profile-pictures/user123')
   */
  async uploadFile(
    file: File, 
    path: string
  ): Promise<ApiResponse<UploadResponse>> {
    try {
      // In a real app, you would upload to a storage service like Firebase Storage, AWS S3, or your own server
      // This is a mock implementation that simulates a successful upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would get this URL from your storage service
      const mockFileUrl = `https://storage.example.com/${path}/${file.name}`;
      
      return {
        success: true,
        data: {
          url: mockFileUrl,
          path: `${path}/${file.name}`,
          filename: file.name
        }
      };
      
      // For a real implementation, you would use something like:
      /*
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', path);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload file');
      }

      return await response.json();
      */
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload file',
      };
    }
  },

  /**
   * Delete a file from the server
   * @param url The URL of the file to delete
   */
  async deleteFile(url: string): Promise<ApiResponse<void>> {
    try {
      // In a real app, you would make an API call to delete the file
      // This is a mock implementation that simulates a successful deletion
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
      
      // For a real implementation, you would use something like:
      /*
      const response = await fetch(`${API_BASE_URL}/files`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete file');
      }

      return { success: true };
      */
    } catch (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete file',
      };
    }
  },
};
