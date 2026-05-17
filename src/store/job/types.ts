// src/store/job/types.ts

// Union types بدل strings مفتوحة — أي قيمة خارجهم هي compile error
export type JobStatus = "interview" | "declined" | "pending";
export type JobType = "full-time" | "part-time" | "remote" | "internship";
export type SortOption = "latest" | "oldest" | "a-z" | "z-a";
export type SearchStatus = JobStatus | "all";
export type SearchType = JobType | "all";

// Job object كما يأتي من الـ API
export interface Job {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: JobType;
  status: JobStatus;
  createdAt: string;
}

// Response من GET /jobs
export interface JobsResponse {
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
}

// Response من GET /jobs/stats
export interface StatsResponse {
  defaultStats: Record<JobStatus, number>;
  monthlyApplications: MonthlyApplication[];
}

export interface MonthlyApplication {
  date: string;
  count: number;
}

// Payload لـ editJob thunk
export interface EditJobPayload {
  jobId: string;
  job: Partial<Omit<Job, "_id" | "createdAt">>;
}
