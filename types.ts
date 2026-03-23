
export interface Task {
  title: string;
  description: string;
  technologies: string[];
}

export interface Category {
  category: string;
  tasks: Task[];
}

export type ProjectPlan = Category[];
