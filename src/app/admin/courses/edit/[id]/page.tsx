'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Save, Trash2, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function AdminCourseEditPage() {
  const params = useParams();
  const courseId = params.id;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/courses"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Courses
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Course</h1>
              <p className="text-gray-400 mt-1">Course ID: {courseId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Course Edit Form */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold">Course Details</h2>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  defaultValue="Introduction to Blockchain"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Instructor
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400">
                  <option>Dr. Sarah Johnson</option>
                  <option>Prof. Michael Chen</option>
                  <option>Dr. Emily Davis</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                defaultValue="A comprehensive introduction to blockchain technology, covering fundamentals, consensus mechanisms, and practical applications."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Course Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400">
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (hours)
                </label>
                <input
                  type="number"
                  defaultValue="24"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Course Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">247</div>
              <div className="text-sm text-gray-400">Enrolled Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">89%</div>
              <div className="text-sm text-gray-400">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">4.8</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">156</div>
              <div className="text-sm text-gray-400">Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}