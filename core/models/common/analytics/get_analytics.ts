export interface I_GetAnalyticsSuccessResponse {
  data: I_GetAnalyticsResponse;
}

export interface I_GetAnalyticsResponse {
  user_id: string;
  snapshot_date: string;
  interval: string;
  total_bounty: number;
  total_active_tickets: number;
  highest_bounty: number;
  total_bounty_changes: number;
  total_active_tickets_changes: number;
  active_programs: number;
  active_programs_changes: number;
  highest_bounty_changes: number;
  updated_at: string;
  created_at: string;
  id: number;
  overall_risk_reported: OverallRiskReported[];
  ticket_reports: TicketReport[];
  ytd_bar_chart?: YtdBarChart[];
  published_vrp: number;
  published_vrp_changes: number;
  total_valid_tickets: number;
  total_valid_tickets_changes: number;
  unpublished_vrp: number;
  unpublished_vrp_changes: number;
}

export interface OverallRiskReported {
  id: number;
  user_id: string;
  snapshot_date: string;
  name: string;
  color_key: string;
  value: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}

export interface TicketReport {
  date: string;
  value: number;
}

export interface YtdBarChart {
  name: string;
  hacker: number;
  company: number;
}

export interface I_GetAnalyticsParamsPayload {
  ticket_status: string;
  interval: number;
}
