import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PaymentInformation } from "@/lib/types/invoice";
import { formatToTwoDecimals } from "@/lib/utils";
const styles = StyleSheet.create({
  summary: {
    marginTop: 20,
    marginLeft: "auto",
    width: "40%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    paddingVertical: 4,
  },
  label: {
    fontSize: 10,
    color: "#4B5563",
    flex: 1,
  },
  value: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
    flex: 1,
  },
  total: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    flex: 1,
  },

});

interface PDFInvoiceSummaryProps {
  paymentInfo: PaymentInformation;
  appliedTaxes?: { taxName: string; appliedValue: string; amount: number }[];
  currency: string;
}

export const PDFInvoiceSummary: React.FC<PDFInvoiceSummaryProps> = ({
  paymentInfo,
  appliedTaxes,
  currency,
}) => {
  return (
    <View style={styles.summary}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal:</Text>
        <Text style={styles.value}>
          {currency} {formatToTwoDecimals(paymentInfo.subtotal)}
        </Text>
      </View>

      {appliedTaxes?.map((tax, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.label}>
            {tax.taxName} ({formatToTwoDecimals(tax.appliedValue)})%:
          </Text>
          <Text style={styles.value}>
            {currency} {formatToTwoDecimals(tax.amount)}
          </Text>
        </View>
      ))}

      {/* <View style={styles.row}>
      {paymentInfo.appl}
      <Text style={styles.label}>Tax:</Text>
      <Text style={styles.value}>Rs {paymentInfo.taxAmount}</Text>
    </View> */}
      {parseFloat(paymentInfo.discountAmount) > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Discount:</Text>
          <Text style={styles.value}>
            {currency} {formatToTwoDecimals(paymentInfo.discountAmount)}
          </Text>
        </View>
      )}
      <View style={[styles.row, styles.total]}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>
          {currency} {formatToTwoDecimals(paymentInfo.totalAmount)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.value}>
          {currency} {formatToTwoDecimals(paymentInfo.amountPaid)}
        </Text>
      </View>
      {/* <View style={[styles.row, styles.total]}>
        <Text style={styles.totalLabel}>Balance Due:</Text>
        <Text style={styles.totalValue}>
          {currency} {paymentInfo.balanceDue}
        </Text>
      </View> */}
    </View>
  );
};
