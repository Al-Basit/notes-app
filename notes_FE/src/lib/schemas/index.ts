import BusinessTurnover from "@/components/modules/distributor/business-turnover";
import { z } from "zod";
import { ComplaintTypeEnum } from "../enums";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const productFormSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name cannot be empty.")
    .max(50, "Product name cannot exceed 50 characters."),
  sku: z
    .string()
    .refine(
      (val) => val?.length === 0 || val,
      "SKU cannot be empty if provided."
    ),

  productDescription: z
    .string()
    .min(1, "Product description cannot be empty.")
    .max(500, "Product description cannot exceed 500 characters."),
  countryCode: z
    .string()
    .min(1, "Country code cannot be empty.")
    .refine((val) => val !== undefined, "Country code is required."),

  manufacturerCode: z
    .string()
    .min(1, "Manufacturer code cannot be empty.")
    .refine((val) => val !== undefined, "Manufacturer code is required."),

  productCode: z
    .string()
    .min(1, "Product code cannot be empty.")
    .refine((val) => val !== undefined, "Product code is required."),

  image: z
    .any()
    .refine((file) => file !== undefined, "Product image is required."),
  price: z.number().min(0.01, "Price must be greater than 0."),
  categoryId: z.string().min(1, "Category ID cannot be empty."),
});

export const batchFormSchema = z
  .object({
    batchCode: z.string().optional(),
    batchName: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    expiryDate: z.string(),
    items: z.array(z.object({ productId: z.number(), quantity: z.number() })),
    codeGenPrefs: z.object({
      qrcode: z.boolean().optional().default(true),
      code128: z.boolean().optional().default(false),
      datamatrix: z.boolean().optional().default(false),
      ean13: z.boolean().optional().default(false),
      "gs1-128": z.boolean().optional().default(false),
      azteccode: z.boolean().optional().default(false),
      pdf417: z.boolean().optional().default(false),
    }),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "Start date must be less than end date",
    path: ["startDate"], // Path to the field where the error occurred
  })
  .refine((data) => new Date(data.startDate) < new Date(data.expiryDate), {
    message: "Start date must be less than expiry date",
    path: ["startDate"], // Path to the field where the error occurred
  });

export const warehouseFormSchema = z.object({
  name: z.string(),
  address: z
    .object({
      streetAddress: z
        .string()
        .min(2, "Street address must be at least 2 characters")
        .optional(),
      city: z.string().optional(),
      area: z.string().min(2, "Area must be at least 2 characters").optional(),
      postalCode: z
        .string()
        .min(2, "Postal code must be at least 2 characters")
        .optional(),
      country: z
        .string()
        .min(2, "Country must be at least 2 characters")
        .optional(),
      longitude: z.string().optional(),
      latitude: z.string().optional(),
    })
    .optional(),
  capacity: z.number(),
  operatingRegion: z.string().min(2, "operating-region is required"),
  operatingUnit: z.string().min(2, "operating-unit is required"),
});

// General Information Schema
export const generalInformationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
    address: z
    .object({
      streetAddress: z
        .string()
        .min(2, "Street address must be at least 2 characters")
        .optional(),
      city: z.string().min(2, "City is required"),
      area: z.string().optional(),
      postalCode: z
        .string()
        .min(2, "Postal code must be at least 2 characters")
        .optional(),
      country: z.string().min(2, "Country must be at least 2 characters").optional(),
      longitude: z.string().optional(),
      latitude: z.string().optional(),
    })
    .optional(),
  contactNumber: z.string().min(1, "Contact Number is required"),
  ntn: z
    .string()
    .regex(/^[0-9]{7}-[0-9]{1}$/, "NTN must be in the format 4174941-3")
    .min(1, "NTN is required"),
  email: z.string().email("Please enter a valid email address"),
  annualTurnover: z.string().nullable().optional(),
  vehicleDetails: z.string().max(300).nullable().optional(),
});

// Business Turnover Schema
export const businessTurnoverSchema = z.object({
  businessTurnovers: z.array(
    z.object({
      id: z.number().optional(),
      productName: z
        .string()
        .min(1, "Product name is required")
        .max(50, "Product name cannot exceed 50 characters"),
      productAnnualTurnover: z
        .number()
        .min(0, "Annual turnover must be at least 0"),
    })
  ),
});

// Vehicles Information Schema
export const vehiclesInformationSchema = z.object({
  vehiclesInformation: z.array(
    z.object({
      id: z.number().optional(),
      vehicleType: z.string().min(1, "Vehicle type is required"),
      numberOfVehicles: z.number().min(1, "Must have at least 1 vehicle"),
    })
  ),
});

// Bank Details Schema
export const bankDetailsSchema = z.object({
  bankDetails: z.array(
    z.object({
      id: z.number().optional(),
      bankName: z
        .string()
        .min(1, "Bank name is required")
        .max(50, "Bank name cannot exceed 50 characters"),
      accountNumber: z
        .string()
        .min(1, "Account number is required")
        .max(30, "Account number cannot exceed 30 characters")
        .regex(/^\d+$/, "Account number must contain only digits"),
      accountHolderName: z
        .string()
        .min(1, "Account holder name is required")
        .max(50, "Account holder name cannot exceed 50 characters"),
      ibanOrSwiftCode: z
        .string()
        .regex(
          /^PK[0-9]{2}[A-Z]{4}[0-9]{16}$/,
          "IBAN must be in a valid format (e.g., PK36SCBL0000001123456702)"
        ),
    })
  ),
});

// Staff Details Schema
export const staffDetailsSchema = z.object({
  staffDetails: z.array(
    z.object({
      id: z.number().optional(),
      numberOfEmployees: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
          message: "Number of employees is required",
        }),
      additionalComments: z
        .string()
        .max(500, "Comments cannot exceed 500 characters")
        .optional(),
    })
  ),
});

export const distributorFormSchema = z.object({
  ...generalInformationSchema.shape,
  ...businessTurnoverSchema.shape,
  ...vehiclesInformationSchema.shape,
  ...bankDetailsSchema.shape,
  ...staffDetailsSchema.shape,
});

export const complaintFormSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(100, "Subject cannot exceed 100 characters"),
  reference: z
    .string()
    .max(50, "Reference cannot exceed 50 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),
  customerId: z.string().regex(/^\d+$/, "Select a customer").optional(),
  assignedTo: z
    .string()
    .regex(/^\d+$/, "Assign the complaint to an admin")
    .optional(),
  type: z.nativeEnum(ComplaintTypeEnum),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
});

export const complaintAdminFormSchema = z.object({
  status: z.string().max(50, "Subject cannot exceed 100 characters").optional(),
  resolutionDetail: z
    .string()
    .max(1000, "Resolution Detail cannot exceed 1000 characters")
    .optional()
    .nullable(),
});
export type StepperFormType = z.infer<typeof distributorFormSchema>;

export const fileUploadFormSchema = z.object({
  file: z.any().refine((file) => file !== undefined, "Image file is required."),
});

export const customerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "First name must be less than 50 characters"),
  // image: z
  //   .any()
  //   .refine((file) => file !== undefined, "Customer image is required."),
  phone: z.string().min(1, "Phone number must be valid (e.g, +92 3312253155)"),
  alternatePhone: z.string().optional(),
  company: z
    .string()
    .max(20, "company should be less than 20 characters")
    .optional(),
  position: z
    .string()
    .max(20, "company should be less than 20 characters")
    .optional(),
  preferredContactMethod: z.enum(["Email", "Phone", "SMS"]),
  colorCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color code"),
  // leadId: z.number().int().positive("Lead ID must be a positive integer"),
  tier: z.enum(["Gold", "Silver", "Bronze"]),
  address: z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    area: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
  }),
  billingAddress: z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    area: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
  }),
});

export const meetingFormSchema = z.object({
  title: z
    .string()
    .min(2, "Meeting title must be at least 2 characters")
    .max(255, "Meeting title must be less than 255 characters"),
  agenda: z
    .string()
    .min(5, "Agenda must be at least 5 characters")
    .max(1000, "Agenda must be less than 1000 characters"),
  scheduledAt: z.date({
    required_error: "A date and time is required.",
  }),
  duration: z.string().optional(),
  platform: z
    .enum(["Zoom", "Google Meet", "Microsoft Teams", "Other"])
    .optional(),
  link: z.string().optional().nullable(),
  color: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Color must be a valid hex code (e.g., #FF5733)"
    )
    .optional(),
  userIds: z
    .array(z.number().int().positive("User ID must be a positive integer"))
    .optional(),
});

export const supplierFormSchema = z.object({
  name: z
    .string()
    .min(2, "Supplier name must be at least 2 characters")
    .max(150, "Supplier name must be less than 150 characters"),
  address: z
    .string()
    .min(2, "Supplier address must be at least 2 characters")
    .max(1000, "Supplier address must be less than 1000 characters"),
  primaryContactName: z
    .string()
    .min(2, "Primary contact name must be at least 2 characters")
    .max(150, "Primary contact name must be less than 150 characters")
    .optional(),
  primaryContactPosition: z
    .string()
    .max(150, "Primary contact position must be less than 150 characters")
    .optional(),
  businessRegistrationNumber: z
    .string()
    .regex(/^\d{7}$/, "Business registration number must be exactly 7 digits")
    .optional(),
  taxIdentificationNumber: z
    .string()
    .regex(/^[0-9]{7}-[0-9]{1}$/, "NTN must be in the format 4174941-3")
    .min(1, "NTN is required"),
  phone: z.string().min(1, "Phone number must be valid (e.g, +92 3312253155)"),
  email: z
    .string()
    .email("Invalid email address")
    .min(2, "Email must be at least 2 characters")
    .max(150, "Email must be less than 150 characters"),
  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .optional(),
  isActive: z.boolean().optional(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});
