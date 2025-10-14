export default interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: "applied" | "interview" | "offer" | "rejected";
  date: string;
  description?: string;
  notes?: string;
}
