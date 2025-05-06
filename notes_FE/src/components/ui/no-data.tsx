import * as React from "react";
import { cn } from "@/lib/utils";

interface NoDataProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  title?: string;
}

const NoData: React.FC<NoDataProps> = ({
  imageSrc = "/no-data.png",
  title = "No Data Found",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 text-center space-y-4",
        className
      )}
      {...props}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="No data"
          className="object-contain w-32 h-32"
        />
      )}
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
    </div>
  );
};

export default NoData;
