export enum Course {
  CS = 'BSc Computer Science',
  IT = 'BSc Information Technology'
}

export enum Year {
  FY = 'First Year',
  SY = 'Second Year',
  TY = 'Third Year'
}

export enum Semester {
  Sem1 = 'Semester 1',
  Sem2 = 'Semester 2',
  Sem3 = 'Semester 3',
  Sem4 = 'Semester 4',
  Sem5 = 'Semester 5',
  Sem6 = 'Semester 6'
}

export enum ResourceType {
  Book = 'Book',
  Note = 'Note',
  Paper = 'Question Paper'
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  course: Course;
  year: Year;
  semester: Semester;
  type: ResourceType;
  uploadedBy: string;
  uploadDate: string;
  downloadCount: number;
  approved: boolean;
  fileUrl: string; // Mock URL
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
