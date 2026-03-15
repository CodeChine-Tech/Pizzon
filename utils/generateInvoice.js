const PDFDocument = require('pdfkit');

const generateInvoice = (order, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // PDF ko response mein bhejo
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=invoice-${order._id.toString().slice(-6).toUpperCase()}.pdf`
  );
  doc.pipe(res);

  // ── HEADER ──────────────────────────────────────
  doc
    .fillColor('#C0392B')
    .fontSize(28)
    .font('Helvetica-Bold')
    .text('Smart Pizza Café', { align: 'center' });

  doc
    .fillColor('#666666')
    .fontSize(12)
    .font('Helvetica')
    .text('Delicious Pizza Delivered to Your Door 🍕', { align: 'center' });

  doc.moveDown(0.5);

  // Divider line
  doc
    .strokeColor('#C0392B')
    .lineWidth(2)
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown(1);

  // ── INVOICE INFO ────────────────────────────────
  doc
    .fillColor('#1A1A2E')
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('INVOICE', { align: 'center' });

  doc.moveDown(0.5);

  // Order ID & Date
  const orderId = order._id.toString().slice(-6).toUpperCase();
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  doc
    .fontSize(11)
    .font('Helvetica')
    .fillColor('#333333');

  doc.text(`Order ID:`, 50, doc.y, { continued: true, width: 150 });
  doc.font('Helvetica-Bold').text(`  #${orderId}`);

  doc.font('Helvetica').text(`Date:`, 50, doc.y, { continued: true, width: 150 });
  doc.font('Helvetica-Bold').text(`  ${orderDate}`);

  doc.font('Helvetica').text(`Status:`, 50, doc.y, { continued: true, width: 150 });
  doc.font('Helvetica-Bold').fillColor('#27AE60').text(`  ${order.status} ✅`);

  doc.moveDown(1);

  // ── CUSTOMER INFO ───────────────────────────────
  doc
    .fillColor('#C0392B')
    .fontSize(13)
    .font('Helvetica-Bold')
    .text('Customer Details');

  doc
    .strokeColor('#EEEEEE')
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown(0.3);

  doc
    .fontSize(11)
    .font('Helvetica')
    .fillColor('#333333');

  doc.text(`Name:     ${order.customer.name}`);
  doc.text(`Phone:    ${order.customer.phone}`);
  doc.text(`Address:  ${order.customer.address}`);

  doc.moveDown(1);

  // ── ORDER ITEMS ─────────────────────────────────
  doc
    .fillColor('#C0392B')
    .fontSize(13)
    .font('Helvetica-Bold')
    .text('Order Items');

  doc
    .strokeColor('#EEEEEE')
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown(0.3);

  // Table header
  const tableTop = doc.y;
  doc
    .fillColor('#FFFFFF')
    .rect(50, tableTop, 500, 22)
    .fill('#1A1A2E');

  doc
    .fillColor('#FFFFFF')
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Item', 60, tableTop + 6)
    .text('Size', 230, tableTop + 6)
    .text('Qty', 310, tableTop + 6)
    .text('Price', 370, tableTop + 6)
    .text('Total', 460, tableTop + 6);

  // Table rows
  let rowY = tableTop + 25;
  order.items.forEach((item, i) => {
    const bgColor = i % 2 === 0 ? '#FFF5F5' : '#FFFFFF';
    doc.fillColor(bgColor).rect(50, rowY, 500, 22).fill();

    const productName = item.product?.name || 'Pizza';
    const itemTotal = (item.price * item.quantity).toFixed(2);

    doc
      .fillColor('#333333')
      .fontSize(10)
      .font('Helvetica')
      .text(productName, 60, rowY + 6)
      .text(item.size, 230, rowY + 6)
      .text(String(item.quantity), 310, rowY + 6)
      .text(`$${item.price.toFixed(2)}`, 370, rowY + 6)
      .text(`$${itemTotal}`, 460, rowY + 6);

    rowY += 25;
  });

  // Toppings
  if (order.toppings && order.toppings.length > 0) {
    order.toppings.forEach((topping, i) => {
      const bgColor = (order.items.length + i) % 2 === 0 ? '#FFF5F5' : '#FFFFFF';
      doc.fillColor(bgColor).rect(50, rowY, 500, 22).fill();

      doc
        .fillColor('#E67E22')
        .fontSize(10)
        .font('Helvetica')
        .text(`+ ${topping.name || 'Topping'}`, 60, rowY + 6)
        .text('-', 230, rowY + 6)
        .text('1', 310, rowY + 6)
        .text(`$${topping.price?.toFixed(2) || '0.00'}`, 370, rowY + 6)
        .text(`$${topping.price?.toFixed(2) || '0.00'}`, 460, rowY + 6);

      rowY += 25;
    });
  }

  doc.moveDown(0.5);
  rowY += 10;

  // ── PRICE SUMMARY ───────────────────────────────
  doc
    .strokeColor('#EEEEEE')
    .lineWidth(1)
    .moveTo(350, rowY)
    .lineTo(550, rowY)
    .stroke();

  rowY += 10;

  doc
    .fontSize(11)
    .font('Helvetica')
    .fillColor('#333333')
    .text('Total Amount:', 360, rowY)
    .font('Helvetica-Bold')
    .fillColor('#C0392B')
    .fontSize(13)
    .text(`$${order.totalPrice.toFixed(2)}`, 460, rowY);

  rowY += 30;

  // ── FOOTER ──────────────────────────────────────
  doc
    .strokeColor('#C0392B')
    .lineWidth(2)
    .moveTo(50, rowY)
    .lineTo(550, rowY)
    .stroke();

  rowY += 15;

  doc
    .fontSize(10)
    .font('Helvetica')
    .fillColor('#666666')
    .text('Thank you for ordering from Smart Pizza Café! 🍕', 50, rowY, { align: 'center' })
    .text('For support: jatoirehman36@gmail.com', { align: 'center' });

  doc.end();
};

module.exports = generateInvoice;