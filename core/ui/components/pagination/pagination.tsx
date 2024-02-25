import {
  BasePagination,
  I_PaginationProps,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./base-pagination";

const Pagination = ({ variant }: I_PaginationProps) => {
  return (
    <BasePagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious variant={variant} href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink variant={variant} href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink variant={variant} href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink variant={variant} href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink variant={variant} href="#">
            <PaginationEllipsis />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink variant={variant} href="#">
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext variant={variant} href="#" />
        </PaginationItem>
      </PaginationContent>
    </BasePagination>
  );
};
export default Pagination;
