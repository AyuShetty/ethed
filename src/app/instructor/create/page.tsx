'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X, BookOpen, FileText, Video, Clock } from 'lucide-react';
import Link from 'next/link';

export default function InstructorCreateCoursePage() {
  const [lessons, setLessons] = useState([
    { id: 1, title: 'Introduction', type: 'video', duration: '10 min' }
  ]);

  const addLesson = () => {
    const newLesson = {
      id: lessons.length + 1,
      title: `Lesson ${lessons.length + 1}`,
      type: 'video',
      duration: '10 min'
    };
    setLessons([...lessons, newLesson]);
  };

  const removeLesson = (id: number) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/instructor"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Course</h1>
              <p className="text-gray-400 mt-1">Build an engaging learning experience</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors">
            <Save className="w-5 h-5" />
            Save Course
          </button>
        </div>

        {/* Course Basic Information */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold">Course Information</h2>
          </div>

          <div className="space-y-6">
            {/* Title and Description */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what students will learn in this course"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Course Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400">
                  <option>Blockchain Fundamentals</option>
                  <option>Smart Contracts</option>
                  <option>DeFi</option>
                  <option>NFTs</option>
                  <option>Web3 Development</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 4 weeks"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Course Content</h2>
            </div>
            <button
              onClick={addLesson}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Lesson
            </button>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Lesson {index + 1}</span>
                    {lesson.type === 'video' ? (
                      <Video className="w-4 h-4 text-blue-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  {lessons.length > 1 && (
                    <button
                      onClick={() => removeLesson(lesson.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      defaultValue={lesson.title}
                      placeholder="Lesson title"
                      className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
                      <option value="video">Video</option>
                      <option value="text">Reading</option>
                      <option value="quiz">Quiz</option>
                    </select>
                    <div className="flex items-center gap-1 bg-gray-600 border border-gray-500 rounded px-3 py-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        defaultValue={lesson.duration}
                        className="w-16 bg-transparent text-white text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Preview */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Course Preview</h3>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
            <p className="text-gray-400 text-center">
              Upload a course preview video or image to help students understand what they&apos;ll learn
            </p>
            <div className="mt-4 flex justify-center">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                Upload Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}