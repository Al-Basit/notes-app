import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { CustomerInfo } from '../../types/invoice';

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
  },
});

interface BillingInfoProps {
  customerInfo: CustomerInfo;
}

export const BillingInfo = ({ customerInfo }: BillingInfoProps) => (
  <View style={styles.section}>
    <Text style={styles.title}>Bill to:</Text>
    <Text style={styles.text}>{customerInfo.name}</Text>
    <Text style={styles.text}>{customerInfo.address}</Text>
    <Text style={styles.text}>
      {customerInfo.city}, {customerInfo.state} {customerInfo.zip}
    </Text>
    <Text style={styles.text}>{customerInfo.country}</Text>
  </View>
);