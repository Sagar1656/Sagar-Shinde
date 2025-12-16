import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course, Year, Semester, ResourceType } from '../types';
import { COURSES, YEARS, SEMESTERS, SUBJECTS } from '../constants';
import { mockBackend } from '../services/mockBackend';
import Button from '../components/Button';
import { Upload as UploadIcon, CheckCircle } from 'lucide-react';

interface UploadProps {
  user: any;
}

const Upload: React.FC<UploadProps> = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    course: '' as Course | '',
    year: '' as Year | '',
    semester: '' as Semester | '',
    subject: '',
    type: ResourceType.Note,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Dependent dropdown logic
  const availableSemesters = useMemo(() => {
    return formData.year ? SEMESTERS[formData.year] : [];
  }, [formData.year]);

  const availableSubjects = useMemo(() => {
    if (formData.course && formData.semester) {
      return SUBJECTS[formData.course][formData.semester] || [];
    }
    return [];
  }, [formData.course, formData.semester]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset dependents
      ...(name === 'course' ? { year: '', semester: '', subject: '' } : {}),
      ...(name === 'year' ? { semester: '', subject: '' } : {}),
      ...(name === 'semester' ? { subject: '' } : {})
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        alert('Only PDF files are allowed');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course || !formData.year || !formData.semester || !formData.subject || !file) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    mockBackend.addResource({
      title: formData.title,
      course: formData.course,
      year: formData.year,
      semester: formData.semester,
      subject: formData.subject,
      type: formData.type,
      uploadedBy: user?.name || 'Student',
      fileUrl: '#' // In real app, this would be the S3/Firebase URL
    });

    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Successful!</h2>
        <p className="text-slate-600 mb-8">
          Your file has been uploaded and sent for admin approval. It will be visible once approved.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/browse')}>Browse Content</Button>
          <Button variant="outline" onClick={() => {
            setSuccess(false);
            setFormData({
              title: '',
              course: '',
              year: '',
              semester: '',
              subject: '',
              type: ResourceType.Note,
            });
            setFile(null);
          }}>Upload Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Upload Content</h1>
        <p className="text-slate-500 mt-2">Share your notes and help the community grow.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Data Structures Unit 1 Notes"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
            <select
              name="course"
              required
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
            <select
              name="year"
              required
              disabled={!formData.course}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Semester</label>
            <select
              name="semester"
              required
              disabled={!formData.year}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.semester}
              onChange={handleChange}
            >
              <option value="">Select Semester</option>
              {availableSemesters.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <select
              name="subject"
              required
              disabled={!formData.semester}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">Select Subject</option>
              {availableSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Resource Type</label>
          <div className="flex gap-4">
            {[ResourceType.Note, ResourceType.Book, ResourceType.Paper].map(type => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-slate-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50">
          <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
          <div className="mt-4 flex text-sm text-slate-600 justify-center">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload a file</span>
              <input type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-slate-500 mt-2">PDF up to 10MB</p>
          {file && (
            <div className="mt-4 text-sm font-medium text-slate-900 bg-white p-2 rounded border border-slate-200 inline-block">
              {file.name}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" loading={isSubmitting} disabled={!file}>
          Submit for Approval
        </Button>
      </form>
    </div>
  );
};

export default Upload;
