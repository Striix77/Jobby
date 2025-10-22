export default interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: "applied" | "interviewing" | "offered" | "rejected" | "withdrawn";
  date: string;
  interviewDate?: string;
  description?: string;
  notes?: string;
}
