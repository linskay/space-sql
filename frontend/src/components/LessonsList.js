import React from 'react';
import { Link } from 'react-router-dom';
import GlowingCard from './GlowingCard';

export default function LessonsList({ lessons }) {
  return (
    <div className="lessons-container">
      {lessons.map((lesson) => (
        <Link 
          key={lesson.id} 
          to={`/lessons/${lesson.id}`}
          className="lesson-link"
        >
          <GlowingCard>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
          </GlowingCard>
        </Link>
      ))}
    </div>
  );
}
