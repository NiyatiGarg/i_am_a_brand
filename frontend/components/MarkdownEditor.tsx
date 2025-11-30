'use client';

import React, { useState } from 'react';
import { Textarea } from './Textarea';
import { MarkdownRenderer } from './MarkdownRenderer';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your blog post in Markdown...',
  label,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-300">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'edit'
                ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'preview'
                ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Preview
          </button>
        </div>
        <div className="p-4">
          {activeTab === 'edit' ? (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={20}
              className="border-0 focus:ring-0 p-0"
            />
          ) : (
            <div className="min-h-[400px]">
              {value ? (
                <MarkdownRenderer content={value} />
              ) : (
                <p className="text-gray-400">Nothing to preview yet...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

