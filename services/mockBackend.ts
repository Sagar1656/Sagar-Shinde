import { Resource, User } from '../types';
import { MOCK_RESOURCES } from '../constants';

const STORAGE_KEYS = {
  RESOURCES: 'bsc_hub_resources',
  USER: 'bsc_hub_user'
};

// Initialize Mock Data
if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(MOCK_RESOURCES));
}

export const mockBackend = {
  getResources: (): Resource[] => {
    const data = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    return data ? JSON.parse(data) : [];
  },

  addResource: (resource: Omit<Resource, 'id' | 'uploadDate' | 'downloadCount' | 'approved'>) => {
    const resources = mockBackend.getResources();
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      approved: false, // Default to false, requires admin approval
      fileUrl: '#'
    };
    resources.unshift(newResource); // Add to top
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    return newResource;
  },

  approveResource: (id: string) => {
    const resources = mockBackend.getResources();
    const updated = resources.map(r => r.id === id ? { ...r, approved: true } : r);
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(updated));
  },

  rejectResource: (id: string) => {
    const resources = mockBackend.getResources();
    const updated = resources.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(updated));
  },

  login: async (type: 'student' | 'admin', credentials: any): Promise<User> => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user: User = {
      id: type === 'admin' ? 'admin_1' : 'student_1',
      name: type === 'admin' ? 'Sagar Shinde' : 'Student User',
      email: type === 'admin' ? 'sagarshinde3657@gmail.com' : 'student@bsc.com',
      role: type
    };
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  }
};
