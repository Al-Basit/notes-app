import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const TablePagination: React.FC<CustomPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
  }) => {
    const renderPaginationItems = () => {
      const items = [];
      const maxVisiblePages = 5;
  
      const ellipsis = (
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
  
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          items.push(
            <PaginationItem key={i} className="cursor-pointer">
              <PaginationLink
                isActive={currentPage === i}
                onClick={() => onPageChange(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        items.push(
          <PaginationItem key={1} className="cursor-pointer">
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => onPageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
  
        if (currentPage > 3) {
          items.push(ellipsis);
        }
  
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
  
        for (let i = start; i <= end; i++) {
          items.push(
            <PaginationItem key={i} className="cursor-pointer">
              <PaginationLink
                isActive={currentPage === i}
                onClick={() => onPageChange(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
  
        if (currentPage < totalPages - 2) {
          items.push(ellipsis);
        }
  
        items.push(
          <PaginationItem key={totalPages} className="cursor-pointer">
            <PaginationLink
              isActive={currentPage === totalPages}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
  
      return items;
    };
  
    return (
      <Pagination>
        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
        <PaginationContent>{renderPaginationItems()}</PaginationContent>
        <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
      </Pagination>
    );
  };
  
  export default TablePagination;
  