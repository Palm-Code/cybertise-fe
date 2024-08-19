"use client";
import { Loader } from "@/core/ui/components";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useGetChatListItem } from "@/feature/mediator/query/client/useGetChatListItem";
import { useReportDetailsParamStore } from "@/feature/mediator/zustand/store/reports";
import { useSearchParams } from "next/navigation";
import CompanyTicketForm from "./form/CompanyTicketForm";

const NewCompanyReport = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("ticket_id");
  const store = useReportDetailsParamStore();

  const {
    data: chatData,
    isLoading,
    isFetching,
    isError,
  } = useGetChatListItem(store.payload, id as string, true);

  const initialData =
    chatData && chatData.pages.flatMap((item) => item.data.map((item) => item));

  if (isLoading || isFetching) return <Loader variant="mediator" />;

  if (isError || chatData?.pages.length === 0)
    return (
      <EmptyState
        variant="mediator"
        type="default"
        titleText="Chat Ticket not Found"
      />
    );

  return (
    <>
      <div className="wrapper__mobile">
        <EmptyState variant="mediator" type="default" />
      </div>
      <CompanyTicketForm initialData={initialData || []} id={id as string} />
    </>
  );
};
export default NewCompanyReport;
