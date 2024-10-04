import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Button, Card, Input, Typography } from "@/core/ui/components";
import { ModalForbidden } from "@/core/ui/container";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { FilePenLine, UserPlus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Staffs = ({
  data,
}: {
  data?: I_GetUserProfileSuccessResponse["data"]["staff"];
}) => {
  const t = useTranslations("ManageCompany.CompanyStaff");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start gap-6">
          <Typography variant="h5" weight="semibold">
            {t("title")}
          </Typography>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 p-0"
            )}
          >
            {data?.length === 0 && (
              <EmptyState variant="company" titleText={t("not_found")} />
            )}
            {data?.map((item, idx) => (
              <Card
                className={cn(
                  "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-md px-4 py-0 pb-1",
                  "border border-transparent transition-colors duration-100"
                )}
                key={`staff-${idx}`}
              >
                <Input
                  label={`${t("staff")} ${idx + 1}`}
                  value={item.name}
                  className="w-full"
                  transparentBg
                  readOnly
                />
                {/* <div className="_flexbox__row__center gap-4">
                <Button
                  variant="tertiary-company"
                  prefixIcon={<FilePenLine />}
                  className="p-0"
                />
                <Button
                  variant="tertiary-company"
                  prefixIcon={<X />}
                  className="p-0"
                />
              </div> */}
              </Card>
            ))}
            <Button
              variant="secondary-company"
              prefixIcon={<UserPlus />}
              fullWidth
              onClick={() => setIsModalOpen(true)}
            >
              {t("button_add_new")}
            </Button>
          </Card>
        </div>
        <ModalForbidden
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          variant="company"
          title={t("button_add_new")}
          subtitle={t("forbidden.add_new")}
        />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="bold">
              {t("title")}
            </Typography>
            <Button
              asLink
              href="/manage-company?edit=add_staff"
              variant="tertiary-company"
              prefixIcon={<UserPlus />}
            >
              {t("button_add_new")}
            </Button>
          </div>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 xl:p-7.5"
            )}
          >
            <Typography variant="h6" weight="bold">
              {t("staff")}
            </Typography>
            {data?.length === 0 && (
              <EmptyState
                variant="company"
                titleText={t("not_found")}
                className="mt-0"
              />
            )}
            {data?.map((item, idx) => (
              <Card
                className={cn(
                  "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-md xl:px-4 xl:py-0 xl:pb-1",
                  "border border-transparent transition-colors duration-100",
                  "bg-neutral-light-100 dark:bg-neutral-dark-100"
                )}
                key={`staff-${idx}`}
              >
                <Input
                  label={`${t("staff")} ${idx + 1}`}
                  value={item.name}
                  className="w-full"
                  transparentBg
                  readOnly
                />
                <div className="_flexbox__row__center gap-4">
                  <Button
                    asLink
                    href={`/manage-company?edit=staffs&staff_id=${item.id}`}
                    variant="tertiary-company"
                    prefixIcon={<FilePenLine />}
                    className="p-0"
                  />
                  {/* <Button
                    variant="tertiary-company"
                    prefixIcon={<X />}
                    className="p-0"
                  /> */}
                </div>
              </Card>
            ))}
          </Card>
        </div>
      </Desktop>
    </>
  );
};
export default Staffs;
