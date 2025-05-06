import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PaymentInformation } from '@/lib/types/invoice';

const styles = StyleSheet.create({
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: '#4B5563',
  },
  thankYou: {
    marginTop: 20,
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
});

interface PDFInvoiceFooterProps {
  paymentInfo: PaymentInformation;
}

export const PDFInvoiceFooter: React.FC<PDFInvoiceFooterProps> = ({
  paymentInfo,
}) => (
  <View style={styles.footer}>
    <View style={styles.section}>
      <Text style={styles.label}>Payment Terms:</Text>
      <Text style={styles.value}>{paymentInfo.paymentTerms}</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.label}>Payment Status:</Text>
      <Text style={styles.value}>{paymentInfo.paymentStatus}</Text>
    </View>
    <Text style={styles.thankYou}>
      Thank you for your business! For any questions about this invoice, please
      contact our customer service.
    </Text>
  </View>
);