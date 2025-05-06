import { LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogsService from "@/services/logs.service";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,  
} from "@/components/ui/select";

export default function ActivityLogs() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [logsPage, setLogsPage] = useState<number>(1);
  const [inventoryPage, setInventoryPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sort] = useState('ASC');
  const [userId] = useState<number>()
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [verificationDate, setVerificationDate] = useState<
    DateRange | undefined
  >(undefined);
  const { t, i18n } = useTranslation();
  const { useFetchVerificationLogs, useFetchActivityLogs,useFetchInventoryTransferLogs } = LogsService();
  const { data: verificationLogsData, isPending: isVerificationLogsPending } =
    useFetchVerificationLogs(
      currentPage,
      limit,
      verificationDate?.from?.toISOString().split("T")[0],
      verificationDate?.to?.toISOString().split("T")[0]
    );
  const { data: activityLogs, isPending: isActivityLogsPending } =
    useFetchActivityLogs(
      logsPage,
      limit,
      date?.from?.toISOString().split("T")[0],
      date?.to?.toISOString().split("T")[0]
    );
    const { data: inventoryLogs, isPending: isInventoryLogsPending } =
    useFetchInventoryTransferLogs(
      inventoryPage,
      sort,
      limit,
      date?.from?.toISOString().split("T")[0],
      date?.to?.toISOString().split("T")[0]
    );

  const totalPages = Math.ceil((verificationLogsData?.total || 0) / limit);

  const totalLogsPages = Math.ceil((activityLogs?.total || 0) / limit);

  const totalInventoryPages = Math.ceil((inventoryLogs?.total || 0) / limit);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLogsPageChange = (page: number) => {
    if (page > 0 && page <= totalLogsPages) {
      setLogsPage(page);
    }
  };
  
  const handleInventoryLogsPageChange = (page: number) => {
    if (page > 0 && page <= totalInventoryPages) {
      setInventoryPage(page);
    }
  };
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
              onClick={() => handlePageChange(i)}
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
            onClick={() => handlePageChange(1)}
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
              onClick={() => handlePageChange(i)}
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
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const renderLogsPagination = () => {
    const items = [];
    const maxVisiblePages = 5;
    const ellipsis = (
      <PaginationItem key="ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );

    if (totalLogsPages <= maxVisiblePages) {
      for (let i = 1; i <= totalLogsPages; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={logsPage === i}
              onClick={() => handleLogsPageChange(i)}
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
            isActive={logsPage === 1}
            onClick={() => handleLogsPageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (logsPage > 3) {
        items.push(ellipsis);
      }

      const start = Math.max(2, logsPage - 1);
      const end = Math.min(totalLogsPages - 1, logsPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={logsPage === i}
              onClick={() => handleLogsPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (logsPage < totalLogsPages - 2) {
        items.push(ellipsis);
      }

      items.push(
        <PaginationItem key={totalLogsPages} className="cursor-pointer">
          <PaginationLink
            isActive={logsPage === totalLogsPages}
            onClick={() => handleLogsPageChange(totalLogsPages)}
          >
            {totalLogsPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const renderInventoryPagination = () => {
    const items = [];
    const maxVisiblePages = 5;
    const ellipsis = (
      <PaginationItem key="ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );

    if (totalInventoryPages <= maxVisiblePages) {
      for (let i = 1; i <= totalInventoryPages; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={inventoryPage === i}
              onClick={() => handleInventoryLogsPageChange(i)}
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
            isActive={inventoryPage === 1}
            onClick={() => handleInventoryLogsPageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (inventoryPage > 3) {
        items.push(ellipsis);
      }

      const start = Math.max(2, inventoryPage - 1);
      const end = Math.min(totalInventoryPages - 1, inventoryPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={inventoryPage === i}
              onClick={() => handleInventoryLogsPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (inventoryPage < totalInventoryPages - 2) {
        items.push(ellipsis);
      }

      items.push(
        <PaginationItem key={totalInventoryPages} className="cursor-pointer">
          <PaginationLink
            isActive={inventoryPage === totalInventoryPages}
            onClick={() => handleInventoryLogsPageChange(totalInventoryPages)}
          >
            {totalInventoryPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="activity">
        <div className="flex items-center">
          <div className="flex items-center justify-between w-full gap-2 ">
            <TabsList>
              <TabsTrigger value="activity">
                {t("logsPage.tab1.heading")}
              </TabsTrigger>
              <TabsTrigger value="verification">
                {t("logsPage.tab2.heading")}
              </TabsTrigger>
              <TabsTrigger value="inventory">
                Inventory Movements
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="verification">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className="w-full">
              <div className="flex justify-between w-full">
                <div className="w-full">
                  <CardTitle className="flex items-center justify-between w-full ">
                    <h2 className="text-lg font-semibold">
                      {t("logsPage.tab2.heading")}
                    </h2>
                    <div className="flex items-center gap-2">
                      <DatePickerWithRange
                        date={verificationDate}
                        setDate={setVerificationDate}
                      />
                    </div>
                  </CardTitle>{" "}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      {t("logsPage.tab2.table.User")}
                    </TableHead>
                    <TableHead> {t("logsPage.tab2.table.Email")}</TableHead>
                    <TableHead className="hidden md:table-cell">
                      {t("logsPage.tab2.table.IPAddress")}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      {t("logsPage.tab2.table.Geolocation")}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      {t("logsPage.tab2.table.VerificationAttempTime")}
                    </TableHead>
                    <TableHead>
                      {" "}
                      {t("logsPage.tab2.table.IsSuccessful")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isVerificationLogsPending ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500 py-10 font-[500]"
                      >
                        <LoaderCircle className="mx-auto animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : verificationLogsData?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500 py-10 font-[500]"
                      >
                        {t("logsPage.tab2.nologs")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    verificationLogsData?.data?.map((el, index) => (
                      <TableRow key={index}>
                        <TableCell width={150} className="font-medium">
                          {el.user.firstName} {el.user.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{el.user.email}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {el.ipAddress}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {el.geoLocation || "-"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {el.verificationAttemptTime.split("T")[0]}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {el.isSuccessful ? "Yes" : "No"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious
                      className={`${
                        currentPage === 1 &&
                        "pointer-events-none bg-gray-300 text-gray-600"
                      }`}
                      onClick={() => {
                        handlePageChange(currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem className="cursor-pointer">
                    <PaginationNext
                      className={`${
                        currentPage === totalPages &&
                        "pointer-events-none bg-gray-300 text-gray-600"
                      }`}
                      onClick={() => {
                        handlePageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="flex items-center gap-2">
                <p>Limit:</p>
                <Select
                  value={String(limit)}
                  onValueChange={(e) => setLimit(Number(e))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className="w-full">
              <div className="flex justify-between w-full">
                <div className="w-full">
                  <CardTitle className="flex items-center justify-between w-full ">
                    <h2 className="text-lg font-semibold">
                      {t("logsPage.tab1.heading")}
                    </h2>
                    <div className="flex items-center gap-2">
                      <DatePickerWithRange date={date} setDate={setDate} />
                    </div>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      {t("logsPage.tab1.table.User")}
                    </TableHead>
                    <TableHead> {t("logsPage.tab1.table.Email")}</TableHead>
                    <TableHead className="hidden md:table-cell">
                      {t("logsPage.tab1.table.Timestamp")}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      {t("logsPage.tab1.table.Activity")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isActivityLogsPending ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500 py-10 font-[500]"
                      >
                        <LoaderCircle className="mx-auto animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : activityLogs?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500 py-10 font-[500]"
                      >
                        {t("logsPage.tab1.nologs")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    activityLogs?.data?.map((el, index) => (
                      <TableRow key={index}>
                        <TableCell width={150} className="font-medium">
                          {el.user.firstName} {el.user.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{el.user.email}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {el.createdAt}
                        </TableCell>
                        <TableCell >
                          {el.message}
                         
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious
                      className={`${
                        logsPage === 1 &&
                        "pointer-events-none bg-gray-300 text-gray-600"
                      }`}
                      onClick={() => {
                        handleLogsPageChange(logsPage - 1);
                      }}
                    />
                  </PaginationItem>
                  {renderLogsPagination()}
                  <PaginationItem className="cursor-pointer">
                    <PaginationNext
                      className={`${
                        logsPage === totalLogsPages &&
                        "pointer-events-none bg-gray-300 text-gray-600"
                      }`}
                      onClick={() => {
                        handleLogsPageChange(logsPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="flex items-center gap-2">
                <p>Limit:</p>
                <Select
                  value={String(limit)}
                  onValueChange={(e) => setLimit(Number(e))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="inventory">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className="w-full">
              <div className="flex justify-between w-full">
                <div className="w-full">
                  <CardTitle className="flex items-center justify-between w-full ">
                    <h2 className="text-lg font-semibold">
                      Inventory Logs
                    </h2>
                    <div className="flex items-center gap-2">
                      <DatePickerWithRange date={date} setDate={setDate} />
                    </div>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                     Name
                    </TableHead>
                    <TableHead> Quantity</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                    Type
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                     Email
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isInventoryLogsPending ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500 py-10 font-[500]"
                      >
                        <LoaderCircle className="mx-auto animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : inventoryLogs?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500 py-10 font-[500]"
                      >
                       No Logs Found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    inventoryLogs?.data?.map((el, index) => (
                      <TableRow key={index}>
                        <TableCell width={150} className="font-medium">
                          {el.user.firstName} {el.user.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{el.quantity}</Badge>
                        </TableCell>
                        <TableCell >
                          {el.createdAt}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {el.type}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {el.user.email}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious
                      className={`${
                        inventoryPage === 1 &&
                        "pointer-events-none bg-gray-300 text-gray-600"
                      }`}
                      onClick={() => {
                        handleInventoryLogsPageChange(inventoryPage - 1);
                      }}
                    />
                  </PaginationItem>
                  {renderInventoryPagination()}
                  <PaginationItem className="cursor-pointer">
                    <PaginationNext
                      className={`${
                        inventoryPage === totalInventoryPages &&
                        "pointer-events-none bg-gray-300 text-gray-600"
                      }`}
                      onClick={() => {
                        handleInventoryLogsPageChange(inventoryPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="flex items-center gap-2">
                <p>Limit:</p>
                <Select
                  value={String(limit)}
                  onValueChange={(e) => setLimit(Number(e))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
