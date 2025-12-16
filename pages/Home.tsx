import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, FileQuestion, Upload, Search, Zap } from 'lucide-react';
import Button from '../components/Button';
import ResourceCard from '../components/ResourceCard';
import { mockBackend } from '../services/mockBackend';

const Home: React.FC = () => {
  const recentUploads = mockBackend.getResources().filter(r => r.approved).slice(0, 3);

  const CategoryCard = ({ icon: Icon, title, desc, colorClass, delayClass }: any) => (
    <Link to="/browse" className={`group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-fade-in-up ${delayClass}`}>
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${colorClass}`}>
        <Icon className="w-24 h-24" />
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass} bg-opacity-10 text-opacity-100`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </Link>
  );

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Your Ultimate <span className="text-indigo-200">Study Companion</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Access BSc Computer Science & IT notes, textbooks, and previous year question papers instantly. Enhanced with AI assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link to="/browse">
              <Button size="lg" className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-indigo-50 border-transparent shadow-lg hover:shadow-xl transition-all">
                <Search className="w-5 h-5 mr-2" /> Browse Content
              </Button>
            </Link>
            <Link to="/upload">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-600 border border-emerald-500 hover:bg-emerald-500 text-white shadow-lg hover:shadow-xl transition-all">
                <Upload className="w-5 h-5 mr-2" /> Upload Notes
              </Button>
            </Link>
            <Link to="/ai-assistant">
              <Button size="lg" className="w-full sm:w-auto bg-indigo-600 border border-indigo-400 hover:bg-indigo-500 shadow-lg hover:shadow-xl transition-all">
                <Zap className="w-5 h-5 mr-2" /> Ask AI Helper
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-slate-900">What are you looking for?</h2>
          <p className="text-slate-500 mt-2">Everything organized for your success</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard 
            icon={Book} 
            title="Text Books" 
            desc="Curated standard reference books for all subjects." 
            colorClass="bg-blue-500 text-blue-500"
            delayClass="animation-delay-200"
          />
          <CategoryCard 
            icon={FileText} 
            title="Lecture Notes" 
            desc="Simplified notes to help you grasp concepts quickly." 
            colorClass="bg-emerald-500 text-emerald-500"
            delayClass="animation-delay-400"
          />
          <CategoryCard 
            icon={FileQuestion} 
            title="Question Papers" 
            desc="Previous years' papers to master your exam pattern." 
            colorClass="bg-amber-500 text-amber-500"
            delayClass="animation-delay-600"
          />
        </div>
      </section>

      {/* Latest Uploads */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 animate-fade-in-up">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Latest Uploads</h2>
              <p className="text-slate-500">Fresh content added by the community</p>
            </div>
            <Link to="/browse" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
            {recentUploads.length > 0 ? (
              recentUploads.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400">
                No resources uploaded yet. Be the first!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-900 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center animate-fade-in-up">
          <div className="p-8 md:p-12 md:w-2/3">
            <h2 className="text-3xl font-bold text-white mb-4">Have useful notes? Share them!</h2>
            <p className="text-indigo-200 mb-8 text-lg">
              Help your juniors and peers by uploading your notes and question papers. 
              Knowledge grows when shared.
            </p>
            <Link to="/upload">
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 transform hover:scale-105 transition-transform duration-200">
                <Upload className="w-5 h-5 mr-2" /> Upload Now
              </Button>
            </Link>
          </div>
          <div className="md:w-1/3 bg-indigo-800 h-64 md:h-auto flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;