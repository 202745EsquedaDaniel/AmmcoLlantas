import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Registrar una fuente personalizada para mejorar la apariencia
Font.register({
  family: 'OpenSans',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

// Definimos los estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'OpenSans',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 10,
    color: '#7f8c8d',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '16.67%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f3f3f3',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '16.67%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 12,
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 14,
  },
});

// Definimos el componente del documento PDF
const OrderTicket = ({ order, subtotal, iva, total }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Nombre del Local</Text>
        <Text style={styles.subtitle}>Dirección del Local</Text>
        <Text style={styles.subtitle}>Teléfono del Local</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Folio:</Text>
          <Text style={styles.value}>{order.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{new Date(order.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Cliente ID:</Text>
          <Text style={styles.value}>{order.customer_ID}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Detalles de la Orden:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Llanta ID</Text>
            <Text style={styles.tableColHeader}>Nombre</Text>
            <Text style={styles.tableColHeader}>Modelo</Text>
            <Text style={styles.tableColHeader}>Cantidad</Text>
            <Text style={styles.tableColHeader}>Precio Unitario</Text>
            <Text style={styles.tableColHeader}>Total</Text>
          </View>
          {order.orderDetails.map((detail) => (
            <View key={detail.tire_ID} style={styles.tableRow}>
              <Text style={styles.tableCol}>{detail.tire_ID}</Text>
              <Text style={styles.tableCol}>{detail.name}</Text>
              <Text style={styles.tableCol}>{detail.model}</Text>
              <Text style={styles.tableCol}>{detail.quantity}</Text>
              <Text style={styles.tableCol}>${detail.unitPrice.toFixed(2)}</Text>
              <Text style={styles.tableCol}>${(detail.quantity * detail.unitPrice).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}>Alineación</Text>
            <Text style={styles.tableCol}>${order.alineacion.toFixed(2)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}>Balanceo</Text>
            <Text style={styles.tableCol}>${order.balanceo.toFixed(2)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}>Pivotes</Text>
            <Text style={styles.tableCol}>{order.pivotes} x $30 = ${(order.pivotes * 30).toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>IVA (6%):</Text>
          <Text style={styles.totalValue}>${iva.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const downloadPdf = async (order, subtotal, iva, total) => {
  const blob = await pdf(<OrderTicket order={order} subtotal={subtotal} iva={iva} total={total} />).toBlob();
  saveAs(blob, `ticket_order_${order.id}.pdf`);
};

export { OrderTicket, downloadPdf };
