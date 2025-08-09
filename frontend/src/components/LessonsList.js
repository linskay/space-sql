import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from './ui';

export default function LessonsList({ lessons }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lessons.map((lesson, index) => (
        <motion.div key={lesson.id} variants={itemVariants}>
          <Link 
            to={`/lessons/${lesson.id}`}
            className="block h-full"
          >
            <Card 
              hover={true} 
              glow={true}
              className="h-full flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-cosmic-blue text-sm font-space">
                    Урок {index + 1}
                  </span>
                  <span className="text-2xl">
                    {index % 4 === 0 ? '🚀' : index % 4 === 1 ? '⭐' : index % 4 === 2 ? '🌌' : '💫'}
                  </span>
                </div>
                
                <h3 className="text-xl font-space text-white mb-3 group-hover:text-cosmic-purple transition-colors duration-300">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {lesson.description}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-cosmic-purple border-opacity-20">
                <div className="flex items-center justify-between text-xs text-cosmic-green">
                  <span className="flex items-center space-x-1">
                    <span>📊</span>
                    <span>Сложность: ★☆☆</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
