import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  notes: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
  },
  notesText: {
    fontSize: 10,
    color: '#4B5563',
  },
  terms: {
    fontSize: 8,
    color: '#6B7280',
  },
});

interface InvoiceFooterProps {
  notes?: string;
  paymentTerms?: string;
}

export const InvoiceFooter = ({ notes, paymentTerms }: InvoiceFooterProps) => (
  <View style={styles.footer}>
    {notes && (
      <View style={styles.notes}>
        <Text style={styles.notesText}>{notes}</Text>
      </View>
    )}
    {paymentTerms && (
      <Text style={styles.terms}>
        1. {paymentTerms}
      </Text>
    )}
  </View>
);