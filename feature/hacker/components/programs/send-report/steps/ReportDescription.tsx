import { Input, TextArea, Typography } from "@/core/ui/components";

const ReportDescription = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-4">
      <Input type="text" label="Title" />
      <TextArea label="Short Description" />
      <Typography
        variant="p"
        affects="tiny"
        className="-mt-3 text-neutral-light-50 dark:text-neutral-dark-50"
      >
        Maximum 200characters
      </Typography>
    </div>
  );
};
export default ReportDescription;
