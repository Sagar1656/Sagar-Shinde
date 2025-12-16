import { Course, Year, Semester, ResourceType, Resource } from './types';

export const COURSES = [Course.CS, Course.IT];
export const YEARS = [Year.FY, Year.SY, Year.TY];

export const SEMESTERS: Record<Year, Semester[]> = {
  [Year.FY]: [Semester.Sem1, Semester.Sem2],
  [Year.SY]: [Semester.Sem3, Semester.Sem4],
  [Year.TY]: [Semester.Sem5, Semester.Sem6]
};

export const SUBJECTS: Record<Course, Record<Semester, string[]>> = {
  [Course.CS]: {
    [Semester.Sem1]: ['Computer Organization', 'Python Programming', 'Calculus', 'Statistics'],
    [Semester.Sem2]: ['C Programming', 'Linux', 'Data Structures', 'Green Computing'],
    [Semester.Sem3]: ['Theory of Computation', 'Core Java', 'Operating Systems'],
    [Semester.Sem4]: ['Algorithms', 'Advanced Java', 'Computer Networks'],
    [Semester.Sem5]: ['AI', 'Software Testing', 'Web Services'],
    [Semester.Sem6]: ['Data Science', 'Cloud Computing', 'Information Retrieval']
  },
  [Course.IT]: {
    [Semester.Sem1]: ['Imperative Programming', 'Digital Electronics', 'Communication Skills'],
    [Semester.Sem2]: ['Object Oriented Programming', 'Microprocessor Architecture', 'Web Programming'],
    [Semester.Sem3]: ['Python', 'Data Structures', 'Computer Networks'],
    [Semester.Sem4]: ['Core Java', 'Embedded Systems', 'Software Engineering'],
    [Semester.Sem5]: ['Network Security', 'ASP.NET', 'Linux Administration'],
    [Semester.Sem6]: ['Quality Assurance', 'Security in Computing', 'Business Intelligence']
  }
};

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms Complete Notes',
    subject: 'Data Structures',
    course: Course.CS,
    year: Year.FY,
    semester: Semester.Sem2,
    type: ResourceType.Note,
    uploadedBy: 'Rahul Verma',
    uploadDate: '2023-10-15',
    downloadCount: 124,
    approved: true,
    fileUrl: '#'
  },
  {
    id: '2',
    title: 'Operating Systems Silberschatz',
    subject: 'Operating Systems',
    course: Course.CS,
    year: Year.SY,
    semester: Semester.Sem3,
    type: ResourceType.Book,
    uploadedBy: 'Admin',
    uploadDate: '2023-08-20',
    downloadCount: 543,
    approved: true,
    fileUrl: '#'
  },
  {
    id: '3',
    title: 'Winter 2023 Question Paper',
    subject: 'Core Java',
    course: Course.IT,
    year: Year.SY,
    semester: Semester.Sem4,
    type: ResourceType.Paper,
    uploadedBy: 'Priya Singh',
    uploadDate: '2024-01-10',
    downloadCount: 89,
    approved: true,
    fileUrl: '#'
  },
  {
    id: '4',
    title: 'Pending AI Notes',
    subject: 'AI',
    course: Course.CS,
    year: Year.TY,
    semester: Semester.Sem5,
    type: ResourceType.Note,
    uploadedBy: 'New Student',
    uploadDate: '2024-05-20',
    downloadCount: 0,
    approved: false,
    fileUrl: '#'
  }
];

export const ADMIN_CONTACT = {
  name: "Sagar Shinde",
  mobile: "9359179510",
  email: "sagarshinde3657@gmail.com"
};