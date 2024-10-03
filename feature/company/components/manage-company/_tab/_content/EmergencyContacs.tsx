import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Button, Card, Typography } from "@/core/ui/components";
import ModalForbiddden from "@/core/ui/container/modals/ModalForbidden";
import { Desktop, Mobile } from "@/core/ui/layout";
import { FilePenLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const EmergencyContacs = ({
  data,
}: {
  data?: I_GetUserProfileSuccessResponse["data"];
}) => {
  const t = useTranslations("ManageCompany.EmergencyContact");
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="semibold">
              {t("title")}
            </Typography>
            <Button
              variant="tertiary-company"
              prefixIcon={<FilePenLine />}
              className="p-0"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <Card
            className={cn(
              "rounded-[10px]",
              "_flexbox__col__start__start gap-6 px-4"
            )}
          >
            <div className="grid w-full grid-cols-1 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("contact_person")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.emergency_contact_person}
                </Typography>
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("email")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.emergency_email}
                </Typography>
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("phone")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.emergency_phone}
                </Typography>
              </div>
            </div>
          </Card>
        </div>
        <ModalForbiddden
          variant="company"
          title={t("forbidden.title")}
          subtitle={t("forbidden.subtitle")}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
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
              href="/manage-company?edit=emergency_contact"
              variant="tertiary-company"
              prefixIcon={<FilePenLine />}
            >
              {t("button_edit")}
            </Button>
          </div>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 xl:p-7.5"
            )}
          >
            <div className="grid w-full grid-cols-2 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("contact_person")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.emergency_contact_person}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("email")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.emergency_email}
                </Typography>
              </div>
            </div>
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("phone")}
            </Typography>
            <Typography variant="p" affects="normal">
              {data?.emergency_phone}
            </Typography>
          </Card>
        </div>
      </Desktop>
    </>
  );
};
export default EmergencyContacs;
