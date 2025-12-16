import React from 'react';
import { ADMIN_CONTACT } from '../constants';
import Button from '../components/Button';
import { Mail, Phone, User, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-slate-900">Get in Touch</h1>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
          Have questions, suggestions, or facing issues? Reach out to the admin or send us a message directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-indigo-700 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Admin Name</p>
                <p className="font-semibold text-lg">{ADMIN_CONTACT.name}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Mobile Number</p>
                <p className="font-semibold text-lg">{ADMIN_CONTACT.mobile}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Email Address</p>
                <p className="font-semibold text-lg">{ADMIN_CONTACT.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-indigo-600">
            <p className="text-indigo-200 text-sm">
              We usually respond within 24 hours. For urgent queries, please call between 10 AM - 6 PM.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
