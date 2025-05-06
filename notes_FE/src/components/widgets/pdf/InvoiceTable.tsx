import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { OrderItem } from "@/lib/types/invoice";
const styles = StyleSheet.create({
  table: {
    flexDirection: "column",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemColumn: {
    flex: 3,
  },
  centerColumn: {
    flex: 1,
    textAlign: "center",
  },
  rightColumn: {
    flex: 1,
    textAlign: "right",
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  text: {
    fontSize: 9,
    color: "#4B5563",
  },
  total: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#E5E7EB",
  },
  totalRow: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  totalText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  subtotalRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  subtotalText: {
    fontSize: 10,
    color: "#6B7280",
  },
});

interface InvoiceTableProps {
  items: OrderItem[];
  currency: string;
}

export const InvoiceTable = ({ items, currency }: InvoiceTableProps) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.itemColumn]}>Description</Text>
        <Text style={[styles.headerText, styles.centerColumn]}>Qty</Text>
        <Text style={[styles.headerText, styles.centerColumn]}>Unit Price</Text>
        <Text style={[styles.headerText, styles.rightColumn]}>Amount</Text>
      </View>

      {items.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.text, styles.itemColumn]}>
            {item.description}
          </Text>
          <Text style={[styles.text, styles.centerColumn]}>
            {item.quantity}
          </Text>
          <Text style={[styles.text, styles.centerColumn]}>
            {currency} {item.product.price.toFixed(2)}
          </Text>
          <Text style={[styles.text, styles.rightColumn]}>
            {currency} {Number(item.itemPrice).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.total}>
        <View style={styles.subtotalRow}>
          <Text style={[styles.subtotalText, { flex: 3 }]}>Subtotal</Text>
          <Text style={[styles.subtotalText, { flex: 1, textAlign: "right" }]}>
            {currency} {subtotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.subtotalRow}>
          <Text style={[styles.subtotalText, { flex: 3 }]}>Tax (10%)</Text>
          <Text style={[styles.subtotalText, { flex: 1, textAlign: "right" }]}>
            {currency} {tax.toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { flex: 3 }]}>Total</Text>
          <Text style={[styles.totalText, { flex: 1, textAlign: "right" }]}>
            {currency} {total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
