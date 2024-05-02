import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { UpdateType } from "@/types/admin/programs";
import { formatDateToAgo2 } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import ModalAddUpdates from "../../_modals/ModalAddUpdates";
import { useState } from "react";

interface I_Update extends UpdateType {}

const Update = ({ title, created_at, content }: I_Update) => {
  return (
    <AnimationWrapper>
      <Card className="px-6 py-12">
        <div className="_flexbox__col__start__start w-full gap-6">
          <div className="_flexbox__col__start__start w-full gap-2">
            <Typography variant="p" affects="extralarge" weight="bold">
              {title}
            </Typography>
            <Typography
              variant="p"
              affects="small"
              className="!dark:text-neutral-dark-50 text-neutral-light-50"
            >
              {formatDateToAgo2(created_at ?? "")}
            </Typography>
          </div>
          <article
            dangerouslySetInnerHTML={{
              __html: sanitize(content ?? ""),
            }}
          ></article>
        </div>
      </Card>
    </AnimationWrapper>
  );
};

interface I_UpdateList {
  data: UpdateType[];
}

const UpdateList = ({ data }: I_UpdateList) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  if (!data.length)
    return (
      <>
        <EmptyState
          type="update"
          variant="company"
          buttonText="Add New Update"
          onClickButton={() => setOpenModal(true)}
        />
        <ModalAddUpdates
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </>
    );

  return (
    <>
      <div className="_flexbox__col__start__start mt-4 w-full gap-8">
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="w-full rounded-md border border-white px-4 py-6 text-center"
        >
          + Add New VRP
        </button>
        {data.map((item, idx) => (
          <Update key={`update-${idx}`} {...item} />
        ))}
      </div>
      <ModalAddUpdates isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default UpdateList;
