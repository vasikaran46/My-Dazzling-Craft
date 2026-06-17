export const WA_NUMBER = '919952727677'; // Replace with your WhatsApp number (country code + number)
export const SITE_URL = 'https://mydazzlingcrafts.com'; // Replace with your actual domain
export const INSTAGRAM = '@MyDazzlingCrafts';
export const EMAIL = 'hello@mydazzlingcrafts.com';

export const openWhatsApp = (message) => {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank');
};

export const enquireAboutProduct = (product) => {
  const message = `Hello, I am interested in this product.

Product Name: ${product.name}
Price: ₹${product.price.toLocaleString()}
Category: ${product.category}
Product Link: ${SITE_URL}/product/${product.id}

Please provide more details.`;
  openWhatsApp(message);
};

export const enquireAboutCart = (items, total) => {
  const itemLines = items.map((item, index) => {
    const lineTotal = item.price * item.quantity;
    return `${index + 1}. ${item.name}
   Category: ${item.category}
   Qty: ${item.quantity}
   Price: Rs.${item.price.toLocaleString()}
   Total: Rs.${lineTotal.toLocaleString()}`;
  }).join('\n\n');

  const message = `Hello, I would like to place an order.

Cart Items:
${itemLines}

Order Total: Rs.${total.toLocaleString()}

Please confirm availability, delivery charges, and payment details.`;

  openWhatsApp(message);
};

export const shareProduct = (product) => {
  const url = `${SITE_URL}/product/${product.id}`;
  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: product.desc,
      url,
    }).catch(() => copyToClipboard(url));
  } else {
    copyToClipboard(url);
  }
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    // Handled by caller with toast
  }).catch(() => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });
};
