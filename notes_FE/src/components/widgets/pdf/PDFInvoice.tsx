import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { Order } from "@/lib/types/invoice";
import { PDFInvoiceHeader } from "./PDFInvoiceHeader";
import { PDFInvoiceItems } from "./PDFInvoiceItems";
import { PDFInvoiceSummary } from "./PDFInvoiceSummary";
import { PDFInvoiceFooter } from "./PDFInvoiceFooter";
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
});

interface PDFInvoiceProps {
  order: Order;
  currency: string;
}

export const PDFInvoice: React.FC<PDFInvoiceProps> = ({ order, currency }) => {
  console.log(order, "Order Data in Invoice");
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFInvoiceHeader
          store={order.store}
          user={order.user}
          invoiceNo={order?.invoice?.invoiceNo}
          invoiceDate={order?.invoice?.invoiceDate}
        />{" "}
        <PDFInvoiceItems items={order?.orderItems} currency={currency} />
        <PDFInvoiceSummary
          paymentInfo={order?.invoice?.paymentInformation}
          appliedTaxes={order.appliedTaxes}
          currency={currency}
        />
        <PDFInvoiceFooter paymentInfo={order?.invoice?.paymentInformation} />
      </Page>
    </Document>
  );
};
