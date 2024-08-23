import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Button, Card, Input, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import EditNavBar from "../../components/manage-company/_cards/EditNavBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostUpdateEmergencyContact } from "../../query/client/usePostUpdateEmergencyContact";
import {
  createCompanyStaffSchema,
  I_StaffRequestType,
} from "@/core/models/company/manage-company";

const EditEmergencyContact = ({
  data,
}: {
  data?: I_GetUserProfileSuccessResponse["data"];
}) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useForm<I_StaffRequestType>({
    resolver: zodResolver(createCompanyStaffSchema),
    defaultValues: {
      name: data?.emergency_contact_person ?? "",
      email: data?.emergency_email ?? "",
      phone: data?.emergency_phone ?? "",
    },
  });
  const { mutateAsync, isPending } = usePostUpdateEmergencyContact();
  const forms = watch();

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
          <EditNavBar title="Edit Emergency Contact" />
          <Card
            className={cn(
              "rounded-xl xl:px-8 xl:py-12",
              "_flexbox__col__start__start w-full gap-8"
            )}
          >
            <div className="_flexbox__col__start__start w-full gap-6">
              <Typography variant="h6" weight="bold">
                Emergency Contact Details
              </Typography>
              <div className="_flexbox__col__start__start w-full gap-2.5">
                <Input
                  type="text"
                  label="Contact Person"
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
                  label="Email"
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
                  maxLength={25}
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
        </div>
      </Desktop>
    </>
  );
};
export default EditEmergencyContact;
