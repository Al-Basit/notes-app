import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { OrderItem } from "@/lib/types/invoice";

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  column: {
    fontSize: 10,
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  productColumn: {
    flex: 3,
  },
  skuColumn: {
    flex: 2,
    textAlign: "right",
  },
  quantityColumn: {
    flex: 1,
    textAlign: "right",
  },
  priceColumn: {
    flex: 2,
    textAlign: "right",
  },
  totalColumn: {
    flex: 2,
    textAlign: "right",
  },
});

interface PDFInvoiceItemsProps {
  items: OrderItem[];
  currency: string;
}

export const PDFInvoiceItems: React.FC<PDFInvoiceItemsProps> = ({
  items,
  currency,
}) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.productColumn]}>Product</Text>
        <Text style={[styles.headerText, styles.skuColumn]}>SKU</Text>
        <Text style={[styles.headerText, styles.quantityColumn]}>Qty</Text>
        <Text style={[styles.headerText, styles.priceColumn]}>Price</Text>
        <Text style={[styles.headerText, styles.totalColumn]}>Total</Text>
      </View>
      {items.map((item) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={[styles.column, styles.productColumn]}>
            {item.product.productName}
          </Text>
          <Text style={[styles.column, styles.skuColumn]}>
            {item.product.sku}
          </Text>
          <Text style={[styles.column, styles.quantityColumn]}>
            {item.itemQuantity}
          </Text>
          <Text style={[styles.column, styles.priceColumn]}>
            {item.itemQuantity > 0
              ? (Number(item.itemPrice) / Number(item.itemQuantity)).toFixed(2)
              : "0.00"}{" "}
          </Text>
          <Text style={[styles.column, styles.totalColumn]}>
            {parseFloat(item.itemPrice)}
          </Text>
        </View>
      ))}
    </View>
  );
};
