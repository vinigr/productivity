export interface IActivity {
  id: number;
  description: string;
  initial_date?: Date | string | null;
  final_date?: Date | string | null;
  status: string;
  alert_date?: Date | string | null;
  priority: string;
  project?: string;
}

export interface IProject {
  id: number;
  user_id: number;
  name: string;
  scope: string;
  description?: string;
  initial_date: string | Date;
  final_date?: string | Date | null;
  active: number;
  created_at: string | Date;
  updated_at: string | Date;
}
