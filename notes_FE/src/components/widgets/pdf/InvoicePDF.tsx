import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { InvoiceHeader } from "./InvoiceHeader";
import { BillingInfo } from "./BillingInfo";
import { InvoiceTable } from "./InvoiceTable";
import { InvoiceFooter } from "./InvoiceFooter";
import type { Invoice } from "@/lib/types/invoice";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "column",
    minHeight: "100%",
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
  currency: string;
}

export const InvoicePDF = ({ invoice, currency }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <InvoiceHeader invoice={invoice} />
      <BillingInfo customerInfo={invoice.customerInfo} />
      <InvoiceTable items={invoice.items} currency={currency} />
      <InvoiceFooter
        notes={invoice.notes}
        paymentTerms={invoice.paymentTerms}
      />
    </Page>
  </Document>
);
