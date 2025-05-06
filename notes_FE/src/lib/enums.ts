export enum ORDER_STATUS {
  Dispatched = "Dispatched",
  Delivered = "Delivered",
  Pending = "Pending",
  InvoiceGenerated = "Invoice Generated",
  Paid = "Paid",
  Completed = "Completed",
}

export enum Platform {
  Zoom = "Zoom",
  MicrosoftTeams = "Microsoft Teams",
  Slack = "Slack",
  GoogleMeet = "Google Meet",
  WebEx = "WebEx",
  Other = "Other",
}

export enum ComplaintTypeEnum {
  Order = "Order",
  Shipment = "Shipment",
  Payment = "Payment",
  Product = "Product",
  GeneralService = "General Service",
}

export enum PriorityEnum {
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Critical = "Critical",
  Normal = "Normal",
  LowPriority = "Low Priority",
}
export enum ComplaintStatus {
  Pending = "Pending",
  Resolved = "Resolved",
  Rejected = "Rejected",
}
