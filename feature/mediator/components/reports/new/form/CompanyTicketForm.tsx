"use client";
import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import {
  I_Data,
  sendReportFormSchema,
  SendReportRequestType,
} from "@/core/models/common";
import {
  useGetDownloadFiles,
  useGetVulnerabilityType,
} from "@/core/react-query/client";
import {
  Button,
  Card,
  Input,
  Separator,
  TextArea,
  Tiptap,
  Tooltip,
} from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import Review from "@/feature/hacker/components/programs/send-report/steps/Review";
import { ChatBubble } from "@/feature/mediator/containers";
import { usePostCreateCompanyTicket } from "@/feature/mediator/query/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Eye, File, Info, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface I_CompanyTicketFormProps {
  initialData: I_Data[];
  id: string;
}

const CompanyTicketForm = ({ initialData, id }: I_CompanyTicketFormProps) => {
  const [activeInitialCard, setActiveInitialCard] = useState<boolean>(true);
  const [activeChatCard, setActiveChatCard] = useState<boolean>(false);
  const { mutate, isPending, isSuccess } = usePostCreateCompanyTicket(id);
  const { data: vulnerabilityType } = useGetVulnerabilityType();
  const { mutate: mutateDownload, isPending: isPendingDownload } =
    useGetDownloadFiles();
  const chatRef = useRef<HTMLDivElement>(null);
  const initialPreviewData = initialData.filter(
    (item) => item.sender === "Summary"
  )[0];

  const methods = useForm<SendReportRequestType>({
    resolver: zodResolver(sendReportFormSchema),
    defaultValues: {
      title: initialPreviewData?.chat_ticket?.title || "",
      description: initialPreviewData?.chat_ticket?.description || "",
      poc: initialPreviewData?.chat_ticket?.poc || "",
      impact: initialPreviewData?.chat_ticket?.impact || "",
    },
  });

  const forms = methods.watch();

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "instant" });
  }, [initialData, activeChatCard]);

  const handleCardClick = (category: "initial" | "chat") => {
    switch (category) {
      case "initial":
        setActiveInitialCard(!activeInitialCard);
        break;
      case "chat":
        setActiveChatCard(!activeChatCard);
        break;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="wrapper__desktop">
        <div className="_flexbox__col__start__start min-h-full w-full gap-0 rounded-2xl">
          <div
            className={cn(
              "_flexbox__col__start__start sticky top-0 z-30",
              "h-fit w-full gap-3 bg-background-page-light pt-12 dark:bg-background-page-dark"
            )}
          >
            <Card className="rounded-2xl rounded-b-none xl:px-8 xl:py-6">
              <div
                className={cn(
                  typographyVariants({ variant: "h5", weight: "bold" }),
                  "inline-flex items-center gap-5"
                )}
              >
                <Button
                  asLink
                  href="/reports"
                  variant="tertiary-mediator"
                  prefixIcon={<X />}
                  className="p-0"
                />
                Create Company Ticket
              </div>
            </Card>
            <div
              className={cn(
                "sticky top-[8.15rem] z-30 h-4 w-full rounded-t-xl",
                "bg-background-main-light pt-0 dark:bg-background-main-dark"
              )}
            ></div>
          </div>
          <div className="_flexbox__row__start__start relative h-full w-full gap-6">
            <div className="h-full w-full overflow-y-auto">
              <Card
                className={cn(
                  "_flexbox__col__start__start h-full gap-6",
                  "overflow-y-auto rounded-b-xl rounded-t-none xl:px-8 xl:pb-12 xl:pt-8"
                )}
              >
                <Typography variant="h5" weight="bold">
                  {`#${initialPreviewData.chat_ticket?.code}: ${initialPreviewData.chat_ticket?.title}`}
                </Typography>
                <div className="w-full">
                  <Card
                    isButton
                    className="_flexbox__col__start rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100"
                    onClick={() => handleCardClick("initial")}
                  >
                    <div
                      className={cn(
                        "_flexbox__row__center__between w-full gap-6 focus:outline-none active:outline-none",
                        "text-neutral-light-30 dark:text-neutral-dark-30"
                      )}
                    >
                      <Typography variant="p" affects="normal">
                        Hacker Ticket: Initial
                      </Typography>
                      <ChevronDown
                        className={cn(
                          "cursor-pointer transition-transform duration-300",
                          activeInitialCard ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </div>
                  </Card>
                  <AnimatePresence>
                    {activeInitialCard && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, marginTop: "0px" }}
                        animate={{ height: "auto", marginTop: "24px" }}
                        exit={{ height: 0, marginTop: "0" }}
                        transition={{ duration: 0.3 }}
                        className="w-full overflow-hidden"
                      >
                        <Card className="_flexbox__col__start gap-8 rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100">
                          <div className="grid w-full grid-cols-[auto_1fr] gap-4 rounded-md bg-neutral-light-90 p-4 dark:bg-neutral-dark-90">
                            <Info />
                            <Typography variant="p" affects="normal">
                              All information here are prefilled based on
                              initial ticket from Hacker report.
                            </Typography>
                          </div>
                          <div className="_flexbox__col__start__start w-full gap-4">
                            <Typography variant="h6" weight="bold">
                              Ticket Details
                            </Typography>
                            <Input
                              type="text"
                              label="Title"
                              defaultValue={forms.title}
                              value={forms.title}
                              onChange={(e) => {
                                methods.setValue("title", e.target.value, {
                                  shouldValidate: true,
                                });
                              }}
                              isError={!!methods.formState.errors.title}
                              maxLength={255}
                            />
                            <TextArea
                              label="Short Description"
                              defaultValue={forms.description}
                              value={forms.description}
                              onChange={(e) => {
                                methods.setValue(
                                  "description",
                                  e.target.value,
                                  {
                                    shouldValidate: true,
                                  }
                                );
                              }}
                              isError={!!methods.formState.errors.description}
                              maxLength={5000}
                            />
                          </div>
                          <Separator orientation="horizontal" />
                          <div className="_flexbox__col__start__start w-full gap-4">
                            <Typography variant="h6" weight="bold">
                              Problem and Causes
                            </Typography>
                            <Tiptap
                              description={forms.impact}
                              label="Impact"
                              onChangeValue={(v) =>
                                methods.setValue("impact", v, {
                                  shouldValidate: true,
                                })
                              }
                              onClearInput={() =>
                                methods.setValue("impact", "")
                              }
                              variant="mediator"
                              isError={!!methods.formState.errors.impact}
                              withTooltip
                            />
                            <Tiptap
                              description={forms.poc}
                              label="Proof of Concept"
                              onChangeValue={(v) =>
                                methods.setValue("poc", v, {
                                  shouldValidate: true,
                                })
                              }
                              onClearInput={() => methods.setValue("poc", "")}
                              variant="mediator"
                              isError={!!methods.formState.errors.poc}
                              withTooltip
                            />
                            {initialPreviewData.media &&
                              initialPreviewData.media?.length > 0 && (
                                <>
                                  <Typography
                                    variant="p"
                                    affects="normal"
                                    className="text-neutral-light-40 dark:text-neutral-dark-40"
                                  >
                                    Attachments
                                  </Typography>
                                  <div
                                    className={cn(
                                      "grid w-full gap-4 overflow-y-auto",
                                      initialPreviewData.media &&
                                        initialPreviewData.media.length > 1
                                        ? "grid-cols-2"
                                        : "grid-cols-1"
                                    )}
                                  >
                                    {initialPreviewData.media?.map(
                                      (file, index) => (
                                        <Card
                                          className="_flexbox__row__center__start h-fit w-full gap-4 p-4 xl:p-4"
                                          key={`file-${index}`}
                                        >
                                          <div className="h-10 w-10">
                                            <File
                                              width={40}
                                              height={40}
                                              className={cn(
                                                "h-10 w-10 rounded-full bg-neutral-light-90 p-2 dark:bg-neutral-dark-90",
                                                iconColor["mediator"]
                                              )}
                                            />
                                          </div>
                                          <div
                                            className={cn(
                                              "_flexbox__col__start__between h-full gap-1.5",
                                              "w-full"
                                            )}
                                          >
                                            <Tooltip
                                              content={file.collection_name}
                                            >
                                              <Typography
                                                variant="p"
                                                affects="small"
                                                weight="semibold"
                                              >
                                                {initialPreviewData.files &&
                                                initialPreviewData.files
                                                  ?.length > 1
                                                  ? `${file.collection_name.substring(0, 15)}.${file.file_name.split(".")[1]}` +
                                                    "..."
                                                  : `${file.collection_name}.${file.file_name.split(".")[1]}`}
                                              </Typography>
                                            </Tooltip>
                                            <Typography
                                              variant="p"
                                              affects="tiny"
                                              className="text-neutral-light-40 dark:text-neutral-dark-40"
                                            >
                                              {(file.size / 1024).toFixed(1)}
                                              KB
                                            </Typography>
                                          </div>
                                          <div className="_flexbox__row__center ml-auto gap-4">
                                            {file.mime_type.includes(
                                              "image"
                                            ) ? (
                                              <Button
                                                asLink
                                                href={file.original_url}
                                                target="_blank"
                                                variant="ghost-hacker"
                                                className="p-0"
                                                prefixIcon={
                                                  <Eye
                                                    className={cn(
                                                      "h-6 w-6",
                                                      iconColor["mediator"]
                                                    )}
                                                  />
                                                }
                                              />
                                            ) : (
                                              <Button
                                                variant="ghost-hacker"
                                                disabled={isPendingDownload}
                                                className="p-0"
                                                onClick={() =>
                                                  mutateDownload({
                                                    id: file.uuid,
                                                    filename: file.file_name,
                                                  })
                                                }
                                                prefixIcon={
                                                  <Download
                                                    className={cn(
                                                      "h-6 w-6",
                                                      iconColor["mediator"]
                                                    )}
                                                  />
                                                }
                                              />
                                            )}
                                          </div>
                                        </Card>
                                      )
                                    )}
                                  </div>
                                </>
                              )}
                          </div>
                          <Separator orientation="horizontal" />
                          <div className="_flexbox__col__start__start w-full gap-4">
                            <Typography variant="h6" weight="bold">
                              Bug Target
                            </Typography>
                            <Review
                              data={initialPreviewData.chat_ticket}
                              variant="mediator"
                              defaultData={{
                                vulnerabilityType: vulnerabilityType,
                              }}
                              isCompanyTicketPreview
                            />
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-full">
                  <Card
                    isButton
                    className="_flexbox__col__start rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100"
                    onClick={() => {
                      handleCardClick("chat");
                      chatRef.current?.scrollIntoView({
                        behavior: "instant",
                      });
                    }}
                  >
                    <div
                      className={cn(
                        "_flexbox__row__center__between w-full gap-6 focus:outline-none active:outline-none",
                        "text-neutral-light-30 dark:text-neutral-dark-30"
                      )}
                    >
                      <Typography variant="p" affects="normal">
                        Hacker Ticket: Chat
                      </Typography>
                      <ChevronDown
                        className={cn(
                          "cursor-pointer transition-transform duration-300",
                          activeChatCard ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </div>
                  </Card>
                  <AnimatePresence>
                    {activeChatCard && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, marginTop: "0px" }}
                        animate={{ height: "auto", marginTop: "24px" }}
                        exit={{ height: 0, marginTop: "0" }}
                        transition={{ duration: 0.3 }}
                        className="w-full overflow-hidden"
                      >
                        <Card className="_flexbox__col__start__start max-h-96 overflow-auto rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100">
                          <ChatBubble data={initialData ?? []} />
                          <div ref={chatRef}></div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  variant="primary-mediator"
                  isLoading={isPending}
                  disabled={
                    isSuccess ||
                    isPending ||
                    !forms.title ||
                    !forms.description ||
                    !forms.impact ||
                    !forms.poc
                  }
                  onClick={() => mutate(forms)}
                >
                  Create Company Ticket
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
export default CompanyTicketForm;
