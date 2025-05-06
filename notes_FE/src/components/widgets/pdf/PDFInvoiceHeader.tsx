import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Store, User } from '@/lib/types/invoice';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storeInfo: {
    fontSize: 10,
    color: '#4B5563',
  },
  invoiceInfo: {
    fontSize: 12,
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  billTo: {
    marginTop: 30,
  },
  billToTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  billToInfo: {
    fontSize: 10,
    color: '#4B5563',
  },
});

interface PDFInvoiceHeaderProps {
  store: Store;
  user: User;
  invoiceNo: string;
  invoiceDate: string;
}

export const PDFInvoiceHeader: React.FC<PDFInvoiceHeaderProps> = ({
  store,
  user,
  invoiceNo,
  invoiceDate,
}) => (
  <View>
    <View style={styles.header}>
      <View style={styles.leftColumn}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeInfo}>{store.address.streetAddress}</Text>
        <Text style={styles.storeInfo}>
          {store.address.city}, {store.address.area}
        </Text>
        <Text style={styles.storeInfo}>
          {store.address.postalCode}, {store.address.country}
        </Text>
        <Text style={styles.storeInfo}>Phone: {store.phone}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.invoiceTitle}>Invoice #{invoiceNo}</Text>
        <Text style={styles.invoiceInfo}>Date: {invoiceDate}</Text>
      </View>
    </View>
    <View style={styles.billTo}>
      <Text style={styles.billToTitle}>Bill To:</Text>
      <Text style={styles.billToInfo}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={styles.billToInfo}>{user.email}</Text>
      <Text style={styles.billToInfo}>Phone: {user.profile.phoneNo}</Text>
    </View>
  </View>
);