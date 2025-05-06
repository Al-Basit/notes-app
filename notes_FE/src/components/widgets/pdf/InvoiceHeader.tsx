import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import type { Invoice } from '@/lib//types/invoice';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  leftColumn: {
    flexDirection: 'column',
  },
  rightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 12,
    color: '#4B5563',
  },
  logo: {
    width: 120,
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 10,
    textAlign: 'right',
  },
});

interface InvoiceHeaderProps {
  invoice: Invoice;
}

export const InvoiceHeader = ({ invoice }: InvoiceHeaderProps) => (
  <View style={styles.header}>
    <View style={styles.leftColumn}>
      <Text style={styles.invoiceTitle}>Invoice #{invoice.id}</Text>
      <Text style={styles.invoiceDate}>{format(invoice.date, 'MMMM d, yyyy')}</Text>
    </View>
    <View style={styles.rightColumn}>
      <Text style={styles.companyInfo}>{invoice.companyInfo.name}</Text>
      <Text style={styles.companyInfo}>{invoice.companyInfo.address}</Text>
      <Text style={styles.companyInfo}>
        {invoice.companyInfo.city}, {invoice.companyInfo.state} {invoice.companyInfo.zip}
      </Text>
      <Text style={styles.companyInfo}>{invoice.companyInfo.country}</Text>
    </View>
  </View>
);