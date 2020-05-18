export interface IActivity {
  id?: number;
  description: string;
  initial_date?: Date | string | null;
  final_date?: Date | string | null;
  status: string;
}
