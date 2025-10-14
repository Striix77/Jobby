import { create } from "zustand";
import Job from "../types/jobs";

interface JobStore {
  jobs: Job[];

  addJob: (job: Omit<Job, "id">) => void;
  updateJob: (id: string, updatedJob: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
  getJobsByStatus: (status: Job["status"]) => Job[];
}

const logJobs = (jobs: Job[]) => {
  console.log("\nCurrent Jobs in Store:");
  jobs.forEach((job) => {
    console.log(`- ${job.title} at ${job.company} (${job.status})`);
  });
  console.log("\n");
};

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],

  addJob: (job: Omit<Job, "id">) => {
    const newJob = { ...job, id: Date.now().toString() };
    set((state) => ({ jobs: [...state.jobs, newJob] }));
    logJobs(get().jobs);
  },
  updateJob: (id: string, updatedJob: Partial<Job>) => {
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, ...updatedJob } : job
      ),
    }));
  },
  deleteJob: (id: string) => {
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    }));
  },
  getJobById: (id: string) => {
    return get().jobs.find((job) => job.id === id);
  },
  getJobsByStatus: (status: Job["status"]) => {
    return get().jobs.filter((job) => job.status === status);
  },
}));
