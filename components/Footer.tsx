import React from 'react';
import { ADMIN_CONTACT } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">BSc Study Hub</h3>
            <p className="text-sm text-slate-400">
              The ultimate resource platform for BSc Computer Science and IT students. 
              Access notes, books, and papers anytime, anywhere.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#/browse" className="hover:text-white transition-colors">Browse Notes</a></li>
              <li><a href="#/upload" className="hover:text-white transition-colors">Upload Content</a></li>
              <li><a href="#/ai-assistant" className="hover:text-white transition-colors">AI Assistant</a></li>
              <li><a href="#/contact" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Admin</h3>
            <ul className="space-y-2 text-sm">
              <li>{ADMIN_CONTACT.name}</li>
              <li>{ADMIN_CONTACT.mobile}</li>
              <li>{ADMIN_CONTACT.email}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} BSc Study Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
