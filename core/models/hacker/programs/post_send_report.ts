export interface I_PostSendReportRequest {
  payload: {
    title: string;
    description: string;
    impact: string;
    poc: string;
    target_asset_id: string;
    vulnerability_type_id: string;
    risk_level: number;
    ticket_type: string;
    program_id?: string;
    "attachment[0]"?: string;
    "attachment[1]"?: string;
    custom_ta_asset_type_id?: string;
    custom_ta_value?: string;
  };
}
