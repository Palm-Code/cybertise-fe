import Typography, { TypographyProps } from "../typography/typography";

interface I_TableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TypographyProps {
  children: React.ReactNode;
}

export const BaseTable = ({ children, ...props }: I_TableProps) => {
  return (
    <div className="_flexbox__col__start w-full gap-4" {...props}>
      {children}
    </div>
  );
};

export const TableHeader = ({ children, ...props }: I_TableProps) => {
  return (
    <div
      className="w-full rounded-2xl bg-neutral-light-80 px-9 py-6 dark:bg-neutral-dark-80"
      {...props}
    >
      {children}
    </div>
  );
};

export const TableRow = ({ children, ...props }: I_TableProps) => {
  return (
    <div className="_flexbox__row__between w-full gap-[42px]" {...props}>
      {children}
    </div>
  );
};

export const TableHead = ({ children, ...props }: I_TableProps) => {
  return (
    <Typography variant="p" affects="normal" weight="semibold" {...props}>
      {children}
    </Typography>
  );
};

export const TableBody = ({ children, ...props }: I_TableProps) => {
  return (
    <div className="_flexbox__col__start__start w-full gap-4" {...props}>
      {children}
    </div>
  );
};

export const TableBodyRow = ({ children, ...props }: I_TableProps) => {
  return (
    <div
      className="w-full rounded-2xl bg-background-main-light px-9 py-6 dark:bg-background-main-dark"
      {...props}
    >
      {children}
    </div>
  );
};

export const TableData = ({ children, ...props }: I_TableProps) => {
  return <div {...props}>{children}</div>;
};
