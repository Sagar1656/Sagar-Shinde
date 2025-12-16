import React, { useState, useMemo } from 'react';
import { Course, Year, Semester, ResourceType } from '../types';
import { COURSES, YEARS, SEMESTERS, SUBJECTS } from '../constants';
import { mockBackend } from '../services/mockBackend';
import ResourceCard from '../components/ResourceCard';
import { Filter, X } from 'lucide-react';

const Browse: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | ''>('');
  const [selectedYear, setSelectedYear] = useState<Year | ''>('');
  const [selectedSemester, setSelectedSemester] = useState<Semester | ''>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset logic for dependent dropdowns
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value as Course);
    setSelectedYear('');
    setSelectedSemester('');
    setSelectedSubject('');
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value as Year);
    setSelectedSemester('');
    setSelectedSubject('');
  };

  const availableSemesters = useMemo(() => {
    return selectedYear ? SEMESTERS[selectedYear] : [];
  }, [selectedYear]);

  const availableSubjects = useMemo(() => {
    if (selectedCourse && selectedSemester) {
      return SUBJECTS[selectedCourse][selectedSemester] || [];
    }
    return [];
  }, [selectedCourse, selectedSemester]);

  const allResources = mockBackend.getResources().filter(r => r.approved);

  const filteredResources = useMemo(() => {
    return allResources.filter(r => {
      const matchCourse = selectedCourse ? r.course === selectedCourse : true;
      const matchYear = selectedYear ? r.year === selectedYear : true;
      const matchSemester = selectedSemester ? r.semester === selectedSemester : true;
      const matchSubject = selectedSubject ? r.subject === selectedSubject : true;
      const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCourse && matchYear && matchSemester && matchSubject && matchSearch;
    });
  }, [selectedCourse, selectedYear, selectedSemester, selectedSubject, searchQuery, allResources]);

  const clearFilters = () => {
    setSelectedCourse('');
    setSelectedYear('');
    setSelectedSemester('');
    setSelectedSubject('');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Browse Content</h1>
          <p className="text-slate-500 mt-1">Filter by course to find exactly what you need.</p>
        </div>
        <button 
          onClick={clearFilters}
          className="text-sm text-slate-500 hover:text-red-600 flex items-center gap-1"
        >
          <X className="w-4 h-4" /> Clear filters
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Step 1: Course */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Course</label>
            <select 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">All Courses</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Step 2: Year */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Year</label>
            <select 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={selectedYear}
              onChange={handleYearChange}
              disabled={!selectedCourse}
            >
              <option value="">All Years</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Step 3: Semester */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Semester</label>
            <select 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value as Semester);
                setSelectedSubject('');
              }}
              disabled={!selectedYear}
            >
              <option value="">All Semesters</option>
              {availableSemesters.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Step 4: Subject */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Subject</label>
            <select 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedSemester}
            >
              <option value="">All Subjects</option>
              {availableSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>

          {/* Search */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Search</label>
            <input 
              type="text"
              placeholder="Title or keywords..."
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <Filter className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No resources found</h3>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or search terms.</p>
          <button onClick={clearFilters} className="mt-6 text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Browse;
