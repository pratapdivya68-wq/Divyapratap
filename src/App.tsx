import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, MessageCircle, Truck, Star, Award, ChevronRight, X, CheckCircle2, Building2, ShoppingCart, Percent, Menu, Navigation, Edit, Download, Camera } from 'lucide-react';

// --- Data ---
const PRODUCTS = [
  {
    id: 'standard-lock',
    name: 'Type 1: Standard Lock Brick',
    specs: [
      { label: 'Size', value: '12x6x4 Inch' },
      { label: 'Use', value: 'Normal Wall Use' },
      { label: 'Strength', value: 'High Strength' }
    ],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'heavy-duty-lock',
    name: 'Type 2: Heavy Duty Lock Brick',
    specs: [
      { label: 'Size', value: '12x6x6 Inch' },
      { label: 'Use', value: 'Petrol Pump Use' },
      { label: 'Strength', value: 'Extra Strong' }
    ],
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    highlight: 'Petrol Pump Use'
  },
  {
    id: 'hollow-lock',
    name: 'Type 3: Hollow Lock Brick',
    specs: [
      { label: 'Size', value: '12x6x4 Inch' },
      { label: 'Feature', value: 'Lightweight' },
      { label: 'Benefit', value: 'Cement Saving' }
    ],
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'solid-lock',
    name: 'Type 4: Solid Lock Brick',
    specs: [
      { label: 'Size', value: '12x6x4 Inch' },
      { label: 'Use', value: 'Foundation Use' },
      { label: 'Strength', value: 'Maximum Strength' }
    ],
    image: 'https://images.unsplash.com/photo-1587155841336-33989ed157be?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'zigzag-lock',
    name: 'Type 5: Zig-Zag Lock Brick',
    specs: [
      { label: 'Use', value: 'For Parking' },
      { label: 'Design', value: 'Stylish Design' }
    ],
    image: 'https://images.unsplash.com/photo-1584844850882-70146313b2c6?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'paver-lock',
    name: 'Type 6: Paver Lock Brick',
    specs: [
      { label: 'Use', value: 'Road & Petrol Pump' },
      { label: 'Strength', value: 'Heavy Duty' }
    ],
    image: 'https://images.unsplash.com/photo-1580226998634-192518e31298?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    highlight: 'Petrol Pump Use'
  },
  {
    id: 'color-lock',
    name: 'Type 7: Color Lock Brick',
    specs: [
      { label: 'Colors', value: 'Red / Yellow / Grey' },
      { label: 'Use', value: 'Decorative Pathway' }
    ],
    image: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'custom-lock',
    name: 'Type 8: Custom Lock Brick',
    specs: [
      { label: 'Size', value: 'Any Size' },
      { label: 'Order', value: 'Bulk Orders' },
      { label: 'Type', value: 'Made to Order' }
    ],
    image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'sand',
    name: 'Sand',
    specs: [
      { label: 'Size', value: 'Fine / Medium' },
      { label: 'Use', value: 'Plaster, construction' },
      { label: 'Quality', value: 'Clean river sand' }
    ],
    image: 'https://images.unsplash.com/photo-1578664182354-93f2cb5c8c60?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'gitti',
    name: 'Gitti (Aggregate)',
    specs: [
      { label: 'Size', value: '10mm / 20mm' },
      { label: 'Use', value: 'RCC work' },
      { label: 'Quality', value: 'Hard stone' }
    ],
    image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  },
  {
    id: 'cement',
    name: 'Cement',
    specs: [
      { label: 'Brands', value: 'UltraTech, ACC, Ambuja' },
      { label: 'Use', value: 'All construction work' },
      { label: 'Quality', value: 'Premium Grade' }
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    highlight: ''
  }
];

const REVIEWS = [
  {
    name: 'Ramesh Kumar',
    rating: 5,
    text: 'Best quality bricks, strong and durable. Ghar banane ke liye perfect hai.'
  },
  {
    name: 'Suresh Singh',
    rating: 5,
    text: 'Delivery fast hai aur rate bhi sahi hai. Samastipur me sabse best supplier.'
  }
];

const GALLERY = [
  { url: 'https://picsum.photos/seed/factory/600/600', title: 'Brick Factory' },
  { url: 'https://picsum.photos/seed/stacks/600/600', title: 'Brick Stacks' },
  { url: 'https://picsum.photos/seed/loading/600/600', title: 'Truck Loading' },
  { url: 'https://picsum.photos/seed/petrolpump/600/600', title: 'Petrol Pump Work' }
];

const OFFERS = [
  "1000 bricks par special discount!",
  "Bulk order par kam rate ki guarantee.",
  "Regular customer ke liye exclusive offers."
];

// --- Components ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [dealerModalOpen, setDealerModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Customizable Prices State
  const [prices, setPrices] = useState<Record<string, string>>({
    'standard-lock': 'Contact for rate',
    'heavy-duty-lock': 'Contact for rate',
    'hollow-lock': 'Contact for rate',
    'solid-lock': 'Contact for rate',
    'zigzag-lock': 'Contact for rate',
    'paver-lock': 'Contact for rate',
    'color-lock': 'Contact for rate',
    'custom-lock': 'Contact for rate',
    'sand': '₹ 4500 / tractor',
    'gitti': '₹ 5500 / tractor',
    'cement': '₹ 390 / bag'
  });
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [newPriceInput, setNewPriceInput] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Custom Images State
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [editingImageProductId, setEditingImageProductId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingImageProductId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImages(prev => ({ ...prev, [editingImageProductId]: reader.result as string }));
        setEditingImageProductId(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPriceInput.trim() && editingProductId) {
      setPrices(prev => ({ ...prev, [editingProductId]: newPriceInput }));
      setPriceModalOpen(false);
      setNewPriceInput('');
      setEditingProductId(null);
    }
  };

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quantity, setQuantity] = useState('1000');
  const [customRate, setCustomRate] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [billData, setBillData] = useState<any>(null);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate final price based on custom rate
    const numericRate = parseFloat(customRate) || 0;
    const numericQty = parseInt(quantity, 10) || 0;
    const totalAmount = numericRate * numericQty;

    setBillData({
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customerName,
      customerPhone,
      address,
      productName: selectedProduct.name,
      quantity,
      unitPrice: `₹ ${numericRate}`,
      totalAmount,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'
    });

    setOrderSuccess(true);
  };

  const closeOrderModal = () => {
    setOrderSuccess(false);
    setOrderModalOpen(false);
    setQuantity('1000');
    setCustomRate('');
    setAddress('');
    setCustomerName('');
    setCustomerPhone('');
    setBillData(null);
  };

  const handlePrintBill = () => {
    window.print();
  };

  const handleDealerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration successful! Our team will contact you soon.");
    setDealerModalOpen(false);
  };

  const openOrderModal = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    const numericPrice = parseInt(prices[product.id].replace(/\D/g, ''), 10);
    setCustomRate(isNaN(numericPrice) ? '' : numericPrice.toString());
    setOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-orange-600" />
              <span className="font-bold text-xl tracking-tight">Rudra Industry</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">About</a>
              <a href="#products" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Products</a>
              <a href="#delivery" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Delivery</a>
              <a href="#gallery" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Gallery</a>
              <a href="tel:+917004793354" className="bg-orange-600 text-white px-4 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-md">About</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-md">Products</a>
            <a href="#delivery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-md">Delivery</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-md">Gallery</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/construction/1920/1080" alt="Construction Background" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-medium text-sm mb-6 border border-orange-500/30">
              <Award className="w-4 h-4" />
              Trusted Construction Material Supplier
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Strong Materials for <span className="text-orange-500">Strong Foundations</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Rudra Industry provides high-quality cement bricks, soil bricks, sand, and building materials. Perfect for houses, buildings, and heavy projects like petrol pumps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition-colors text-center flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                View Products
              </a>
              <a href="https://wa.me/917004793354" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Price Update Banner */}
      <div className="bg-orange-100 border-b border-orange-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-orange-800 font-medium text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span>
              Daily Price Update: Today's Cement Rate is <strong>{prices['cement']}</strong>
            </span>
          </div>
          <button 
            onClick={() => {
              setEditingProductId('cement');
              setNewPriceInput(prices['cement']);
              setPriceModalOpen(true);
            }} 
            className="flex items-center gap-1.5 text-xs bg-orange-200 hover:bg-orange-300 text-orange-900 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap font-bold"
          >
            <Edit className="w-3.5 h-3.5" />
            Update Price
          </button>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🧱 Cement Lock Bricks & Materials</h2>
            <p className="text-slate-600 text-lg mb-6">High-quality interlocking cement bricks jo bina zyada cement ke fit ho jaate hain. Strong, durable aur fast construction ke liye best.</p>
            <div className="inline-block bg-orange-100 text-orange-800 font-medium px-4 py-3 rounded-lg border border-orange-200 shadow-sm">
              💰 <strong>Pricing Note:</strong> Price depends on quantity and size. Contact for best rate.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col relative">
                {product.isBestSeller && (
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Best Seller
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img src={customImages[product.id] || product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm flex items-center gap-2 z-10">
                    {prices[product.id]}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProductId(product.id);
                        setNewPriceInput(prices[product.id]);
                        setPriceModalOpen(true);
                      }}
                      className="text-orange-600 hover:text-orange-800 bg-orange-100 p-1 rounded-full transition-colors"
                      title="Edit Price"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingImageProductId(product.id);
                      fileInputRef.current?.click();
                    }}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-700 hover:text-orange-600 shadow-sm transition-colors z-10"
                    title="Change Image"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                  
                  {product.highlight && (
                    <div className="mb-4 inline-block bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded border border-orange-200 self-start">
                      🔥 {product.highlight}
                    </div>
                  )}

                  <div className="space-y-2 mb-6 flex-1">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="font-semibold text-slate-900 min-w-[70px]">{spec.label}:</span>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    <button 
                      onClick={() => openOrderModal(product)}
                      className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Get Price
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <a 
                      href={`https://wa.me/917004793354?text=Hi, I want to order ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Percent className="w-8 h-8" />
                Special Offers
              </h2>
              <p className="text-orange-100">Get the best deals on bulk orders and regular purchases.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {OFFERS.map((offer, idx) => (
                <div key={idx} className="bg-orange-700/50 backdrop-blur-sm p-6 rounded-xl border border-orange-500/50 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-300 shrink-0" />
                  <p className="font-medium">{offer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery & Location */}
      <section id="delivery" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Delivery Info */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Delivery Area: <strong>Samastipur & Nearby Villages</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Delivery Charges: <strong>₹ per km / fixed (Call to confirm)</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700"><strong>Fast Delivery Available 🚛</strong></span>
                </li>
              </ul>
              <button 
                onClick={() => setDealerModalOpen(true)}
                className="w-full border-2 border-slate-900 text-slate-900 py-3 rounded-lg font-bold hover:bg-slate-900 hover:text-white transition-colors"
              >
                Dealer Registration
              </button>
            </div>

            {/* Location */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div className="mb-8">
                <p className="text-lg font-medium text-slate-900 mb-1">Rudra Industry</p>
                <p className="text-slate-600">Musapur, Samastipur</p>
                <p className="text-slate-600">Bihar – 848101</p>
              </div>
              <a 
                href="https://maps.google.com/?q=Musapur,Samastipur,Bihar-848101" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
            <p className="text-slate-600 text-lg">Glimpses of our factory and work.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((img, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-medium">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Reviews</h2>
            <p className="text-slate-600 text-lg">What our clients say about us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg italic mb-6">"{review.text}"</p>
                <p className="font-bold text-slate-900">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-8 w-8 text-orange-500" />
                <span className="font-bold text-2xl text-white tracking-tight">Rudra Industry</span>
              </div>
              <p className="text-slate-400 mb-6">
                Trusted construction material supplier providing high-quality cement bricks, soil bricks, sand, and building materials.
              </p>
              <p className="text-sm text-slate-500">© {new Date().getFullYear()} Rudra Industry. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>Musapur, Samastipur, Bihar – 848101</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>+91 70047 93354</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>+91 70047 93354</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <a href="tel:+917004793354" className="w-full bg-slate-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 border border-slate-700">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a href="https://wa.me/917004793354" target="_blank" rel="noopener noreferrer" className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 print:hidden">
              <h3 className="text-xl font-bold">{orderSuccess ? 'Order Invoice' : 'Place Order'}</h3>
              <button onClick={closeOrderModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {orderSuccess && billData ? (
                <div className="bg-white">
                  <div className="text-center mb-6 print:mb-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 print:hidden">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-1">Rudra Industry</h4>
                    <p className="text-slate-500 text-sm">Musapur, Samastipur, Bihar - 848101</p>
                    <p className="text-slate-500 text-sm">Ph: +91 70047 93354</p>
                  </div>

                  <div className="border-t border-b border-slate-200 py-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Order ID:</span>
                      <span className="font-semibold text-slate-900">{billData.orderId}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Date:</span>
                      <span className="font-semibold text-slate-900">{billData.date}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Customer:</span>
                      <span className="font-semibold text-slate-900">{billData.customerName}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Phone:</span>
                      <span className="font-semibold text-slate-900">{billData.customerPhone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Address:</span>
                      <span className="font-semibold text-slate-900 text-right max-w-[200px]">{billData.address}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="text-left pb-2 font-medium">Item</th>
                          <th className="text-center pb-2 font-medium">Qty</th>
                          <th className="text-right pb-2 font-medium">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 font-medium text-slate-900">{billData.productName}</td>
                          <td className="py-3 text-center text-slate-700">{billData.quantity}</td>
                          <td className="py-3 text-right text-slate-700">{billData.unitPrice.split('/')[0]}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Payment Method:</span>
                      <span className="font-semibold text-slate-900">
                        {billData.paymentMethod}
                        {billData.paymentMethod === 'UPI' && ' (+91 70047 93354)'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-slate-900">Total Amount:</span>
                      <span className="text-orange-600">₹ {billData.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 print:hidden">
                    <button onClick={handlePrintBill} className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Print / Save
                    </button>
                    <button onClick={closeOrderModal} className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-5">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                    <p className="text-sm text-slate-500 mb-1">Selected Product</p>
                    <p className="font-bold text-slate-900">{selectedProduct.name}</p>
                    <p className="text-sm text-orange-600 font-medium">{prices[selectedProduct.id]}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                      <input 
                        type="number" 
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                        placeholder="e.g. 1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Rate (₹)</label>
                      <input 
                        type="number" 
                        required
                        value={customRate}
                        onChange={(e) => setCustomRate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                        placeholder="Enter rate per piece/unit"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Address</label>
                    <textarea 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow resize-none h-24"
                      placeholder="Enter full address in Samastipur or nearby..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Payment Option</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`border rounded-lg p-3 flex items-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-orange-500' : 'border-slate-300'}`}>
                          {paymentMethod === 'cod' && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                        </div>
                        <span className="font-medium text-sm">Cash on Delivery</span>
                      </label>
                      <label className={`border rounded-lg p-3 flex items-center gap-2 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden" />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-orange-500' : 'border-slate-300'}`}>
                          {paymentMethod === 'upi' && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                        </div>
                        <span className="font-medium text-sm">UPI (PhonePe/GPay)</span>
                      </label>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold">Pay via UPI / PhonePe / GPay</p>
                          <p className="text-lg font-mono mt-1 font-bold">+91 70047 93354</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="w-full bg-orange-600 text-white py-3.5 rounded-lg font-bold hover:bg-orange-700 transition-colors mt-4">
                    Confirm Order
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dealer Registration Modal */}
      {dealerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold">Dealer Registration</h3>
              <button onClick={() => setDealerModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleDealerSubmit} className="space-y-4">
                <p className="text-slate-600 text-sm mb-4">Join Rudra Industry as a dealer and get exclusive bulk rates.</p>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your name" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="10-digit mobile number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Business Name / Shop Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Optional" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location / Area</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. Musapur, Samastipur" />
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-colors mt-4">
                  Submit Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Admin Price Update Modal */}
      {priceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold">Update Price</h3>
              <button onClick={() => setPriceModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handlePriceUpdate}>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Price</label>
                <input 
                  type="text" 
                  required 
                  value={newPriceInput} 
                  onChange={(e) => setNewPriceInput(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none mb-4" 
                  placeholder="e.g. ₹ 400 / bag" 
                />
                <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">
                  Update Price
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
