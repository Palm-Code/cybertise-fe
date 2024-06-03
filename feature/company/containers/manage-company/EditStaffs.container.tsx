import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Button, Card, Input, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import EditNavBar from "../../components/manage-company/_cards/EditNavBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usePostCreateStaff,
  usePostDeleteStaff,
  useUpdateStaff,
} from "../../query/client";
import { useSearchParams } from "next/navigation";
import ModalDeleteStaff from "../../components/manage-company/_dialog/ModalDeleteStaff";
import { useState } from "react";
import {
  createCompanyStaffSchema,
  I_StaffRequestType,
} from "@/core/models/company/manage-company";

const EditStaffs = ({
  data,
  isEdit = false,
}: {
  data?: I_GetUserProfileSuccessResponse["data"];
  isEdit?: boolean;
}) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("staff_id");
  const staffData =
    data && data.staff && data.staff.find((item) => item.id === id);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useForm<I_StaffRequestType>({
    resolver: zodResolver(createCompanyStaffSchema),
    defaultValues: {
      name: staffData?.name ?? "",
      email: staffData?.email ?? "",
      phone: staffData?.phone ?? "",
    },
  });
  const { mutateAsync, isPending } = isEdit
    ? useUpdateStaff(staffData?.id as string)
    : usePostCreateStaff();
  const {
    mutateAsync: mutateDelete,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = usePostDeleteStaff();
  const forms = watch();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const handleSubmitForm = () => {
    if (Object.values(errors).length === 0) {
      mutateAsync(forms);
    }
  };

  return (
    <>
      <Mobile>
        <EmptyState variant="company" type="default" />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8">
          <EditNavBar title={isEdit ? "Edit Staff" : "Add New Staff"} />
          <Card
            className={cn(
              "rounded-xl xl:px-8 xl:py-12",
              "_flexbox__col__start__start w-full gap-8"
            )}
          >
            <div className="_flexbox__col__start__start w-full gap-6">
              <Typography variant="h6" weight="bold">
                Staff Account Details
              </Typography>
              <div className="_flexbox__col__start__start w-full gap-2.5">
                <Input
                  type="text"
                  label="Staff Name"
                  value={forms.name}
                  onChange={(e) =>
                    setValue("name", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("name", "", { shouldValidate: true });
                  }}
                  isError={!!errors.name}
                />
                <Input
                  type="email"
                  label="Work Email"
                  value={forms.email}
                  onChange={(e) =>
                    setValue("email", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("email", "", { shouldValidate: true });
                  }}
                  isError={!!errors.email}
                />
                <Input
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  label="Phone Number"
                  value={forms.phone}
                  onChange={(e) =>
                    setValue("phone", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("phone", "", { shouldValidate: true });
                  }}
                  isError={!!errors.phone}
                />
              </div>
              <div className="_flexbox__row__center gap-6">
                <Button
                  asLink
                  href="/manage-company"
                  variant="secondary-company"
                >
                  Discard
                </Button>
                <Button
                  variant="primary-company"
                  disabled={
                    isPending || !forms.name || !forms.email || !forms.phone
                  }
                  isLoading={isPending}
                  onClick={handleSubmitForm}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
          {isEdit && (
            <Card
              className={cn(
                "rounded-xl xl:px-8 xl:py-12",
                "_flexbox__col__start__start w-full gap-8"
              )}
            >
              <div className="_flexbox__col__start__start w-full gap-4">
                <Typography variant="h6" weight="bold">
                  Delete Staff
                </Typography>
                <ul className="list-disc pl-4">
                  <li>
                    Disables the employee&apos;s login credentials, preventing
                    further access to company systems and data.{" "}
                  </li>
                  <li>
                    Deactivated accounts can be reactivated if needed, allowing
                    for a smoother off-boarding process.
                  </li>
                  <li>
                    Completely removes the employee's profile and associated
                    data from the system after <strong>30 days</strong>.
                  </li>
                </ul>
                <Button
                  type="button"
                  variant="alert"
                  onClick={() => setShowModalDelete(true)}
                >
                  Delete Staff
                </Button>
              </div>
            </Card>
          )}
        </div>
        <ModalDeleteStaff
          isOpen={showModalDelete}
          name={staffData?.name ?? ""}
          handleDeleteStaff={() => {
            mutateDelete(staffData?.id as string);
          }}
          onClose={() => {
            setShowModalDelete(false);
          }}
          isLoading={isPendingDelete || isSuccessDelete}
        />
      </Desktop>
    </>
  );
};
export default EditStaffs;
