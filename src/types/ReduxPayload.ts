import { ProjectType, QuotationType } from './Project';

export interface CreateProjectPayload {
  project: ProjectType;
}

export interface UpdateProjectPayload {
  uuid: string;
  changes: Partial<ProjectType>;
}

export interface DeleteProjectPayload {
  uuid: string;
}

export interface CreateQuoationPayload {
  projectId: string;
  quotation: QuotationType;
}
