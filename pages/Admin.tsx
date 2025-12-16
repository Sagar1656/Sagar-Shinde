import React, { useState, useEffect } from 'react';
import { mockBackend } from '../services/mockBackend';
import { Resource } from '../types';
import Button from '../components/Button';
import { Check, X, Trash2, FileText, User } from 'lucide-react';

const Admin: React.FC = () => {
  const [pendingResources, setPendingResources] = useState<Resource[]>([]);
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');

  const refreshData = () => {
    const data = mockBackend.getResources();
    setPendingResources(data.filter(r => !r.approved));
    setAllResources(data.filter(r => r.approved));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleApprove = (id: string) => {
    mockBackend.approveResource(id);
    refreshData();
  };

  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject/delete this resource?')) {
      mockBackend.rejectResource(id);
      refreshData();
    }
  };

  const ResourceItem: React.FC<{ resource: Resource; isPending: boolean }> = ({ resource, isPending }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-slate-100 rounded-lg hidden sm:block">
          <FileText className="h-6 w-6 text-slate-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{resource.title}</h3>
          <div className="text-sm text-slate-500 flex flex-wrap gap-2 mt-1">
            <span className="bg-slate-100 px-2 py-0.5 rounded">{resource.course}</span>
            <span>•</span>
            <span>{resource.year} - {resource.semester}</span>
            <span>•</span>
            <span>{resource.subject}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
            <User className="w-3 h-3" /> Uploaded by {resource.uploadedBy} on {resource.uploadDate}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 self-end sm:self-center">
        {isPending ? (
          <>
            <Button size="sm" variant="primary" onClick={() => handleApprove(resource.id)} className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleReject(resource.id)}>
              <X className="w-4 h-4 mr-1" /> Reject
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleReject(resource.id)}>
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">Manage uploads and content moderation.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Pending Approvals</div>
          <div className="text-3xl font-bold text-amber-500">{pendingResources.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Total Active Files</div>
          <div className="text-3xl font-bold text-indigo-600">{allResources.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Total Downloads</div>
          <div className="text-3xl font-bold text-emerald-600">
            {allResources.reduce((acc, r) => acc + r.downloadCount, 0)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'pending' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Requests
          {activeTab === 'pending' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>}
        </button>
        <button
          className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'all' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('all')}
        >
          All Content
          {activeTab === 'all' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>}
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'pending' ? (
          pendingResources.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg text-slate-500">
              No pending approvals.
            </div>
          ) : (
            pendingResources.map(r => <ResourceItem key={r.id} resource={r} isPending={true} />)
          )
        ) : (
          allResources.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg text-slate-500">
              No approved content yet.
            </div>
          ) : (
            allResources.map(r => <ResourceItem key={r.id} resource={r} isPending={false} />)
          )
        )}
      </div>
    </div>
  );
};

export default Admin;