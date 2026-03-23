
import React, { useState } from 'react';
import { Task } from '../types';
import { CheckIcon, TagIcon } from './icons/Icons';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="flex items-start space-x-4 py-5 border-b border-slate-700/50 last:border-b-0 print:border-slate-200 print:py-4 no-break-inside">
      <div className="no-print">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all duration-200 ${
            isCompleted
              ? 'bg-indigo-500 border-indigo-500'
              : 'bg-slate-700 border-slate-600 hover:border-indigo-500'
          }`}
        >
          {isCompleted && <CheckIcon className="w-4 h-4 text-white" />}
        </button>
      </div>
      <div className="hidden print:block mt-1">
        <div className="w-4 h-4 border border-slate-400 rounded-sm"></div>
      </div>
      <div className="flex-1">
        <h4
          className={`font-semibold text-slate-100 transition-colors duration-200 print:text-slate-900 ${
            isCompleted ? 'line-through text-slate-500 print:text-slate-400' : ''
          }`}
        >
          {task.title}
        </h4>
        <p className={`mt-1 text-sm text-slate-400 print:text-slate-600 ${isCompleted ? 'text-slate-600' : ''}`}>
          {task.description}
        </p>
        {task.technologies && task.technologies.length > 0 && (
          <div className="mt-3 flex items-center flex-wrap gap-2">
            <TagIcon className="h-4 w-4 text-slate-500 print:text-slate-400" />
            {task.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-block bg-blue-900/50 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-800 print:bg-slate-100 print:text-slate-700 print:border-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
