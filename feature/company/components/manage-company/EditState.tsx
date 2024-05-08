"use client";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { manageCompanyTabsItemEnums } from "@/enums";
import {
  EditCompanyDetails,
  EditEmergencyContact,
  EditStaffs,
} from "../../containers";
import { editStaff } from "./ManageCompany.component";

interface I_EditStateProps {
  state: manageCompanyTabsItemEnums & editStaff;
  data?: I_GetUserProfileSuccessResponse["data"];
}

const EditState = ({ state, data }: I_EditStateProps) => {
  const tabs: { [key in manageCompanyTabsItemEnums & editStaff]: JSX.Element } =
    {
      company_details: <EditCompanyDetails data={data} />,
      add_staff: <EditStaffs data={data} />,
      staffs: <EditStaffs isEdit data={data} />,
      emergency_contact: <EditEmergencyContact data={data} />,
      activity_logs: <></>,
    };

  return (
    <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:gap-10 xl:pb-28 xl:pt-12">
      {tabs[state]}
    </div>
  );
};
export default EditState;
