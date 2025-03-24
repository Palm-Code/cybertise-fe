import { Card, Tiptap, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { UpdateType } from "@/types/admin/programs";
import {
  formatDateToAgo2,
  formatTimestamp,
} from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import ModalAddUpdates from "../../_modals/ModalAddUpdates";
import { useState } from "react";
import { ModalForbidden } from "@/core/ui/container";

interface I_Update extends UpdateType {}

const Update = ({ title, created_at, content }: I_Update) => {
  return (
    <AnimationWrapper>
      <Card className="xl:px-6 xl:py-12">
        <div className="_flexbox__col__start__start w-full gap-6">
          <div className="_flexbox__col__start__start w-full gap-2">
            <Typography
              variant="p"
              affects="extralarge"
              weight="bold"
            >
              {title}
            </Typography>
            <Typography
              variant="p"
              affects="small"
              className="text-neutral-light-50 dark:text-neutral-dark-50"
            >
              {`${formatTimestamp(created_at ?? "")} (${formatDateToAgo2(created_at ?? "")})`}
            </Typography>
          </div>
          <article>
            <Tiptap
              showing
              description={sanitize(content as string)}
            />
          </article>
        </div>
      </Card>
    </AnimationWrapper>
  );
};

interface I_UpdateList {
  data: UpdateType[];
  id: string;
}

const UpdateList = ({ data, id }: I_UpdateList) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  if (!data.length)
    return (
      <>
        <Mobile>
          <EmptyState
            type="update"
            variant="company"
            buttonText="Add New Update"
            onClickButton={() => setOpenModal(true)}
          />
          <ModalForbidden
            variant="company"
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            title="Update on Mobile"
            subtitle="Update only available on Desktop"
          />
        </Mobile>
        <Desktop>
          <EmptyState
            type="update"
            variant="company"
            buttonText="Add New Update"
            onClickButton={() => setOpenModal(true)}
          />
          <ModalAddUpdates
            id={id}
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
        </Desktop>
      </>
    );

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start mt-4 w-full gap-8">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="w-full rounded-md border border-brand-neutral px-4 py-6 text-center dark:border-white"
          >
            + Add New Update
          </button>
          {data.map((item, idx) => (
            <Update
              key={`update-${idx}`}
              {...item}
            />
          ))}
        </div>
        <ModalForbidden
          variant="company"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Update on Mobile"
          subtitle="Update only available on Desktop"
        />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start mt-4 w-full gap-8">
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="w-full rounded-md border border-brand-neutral px-4 py-6 text-center dark:border-white"
          >
            + Add New Update
          </button>
          {data.map((item, idx) => (
            <Update
              key={`update-${idx}`}
              {...item}
            />
          ))}
        </div>
        <ModalAddUpdates
          id={id}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </Desktop>
    </>
  );
};

export default UpdateList;
