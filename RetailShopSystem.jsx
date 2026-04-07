import React, { useState, useEffect } from 'react';
import { BarChart3, ShoppingCart, Users, Package, MessageSquare, FileText, Plus, Edit, Trash2, Search, Download, Send, Eye } from 'lucide-react';

const RetailShopSystem = () => {
  const logoBase64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdC...'; // Full logo included
  const businessInfo = {
    name: 'EXCLUSIVELY COMPANY TZ',
    motto: 'Satisfaction For Excellence',
    email: 'Support@exclusivelycompanytz.com',
    phone: '+255695123868',
    owner: {
      name: 'ABDALLAH RAMADHANI',
      email: 'abdallahramadhani@exclusivelycompanytz.com',
      phone: '+255627814104'
    },
    coOwner: {
      name: 'Ramadhani F Juma',
      email: 'ramadhanijuma@exclusivelycompanytz.com',
      phone: '+255657362251'
    },
    shops: {
      'Main Branch': { location: 'Njiro, Arusha (Near NANENANE Grounds)', phone: '+255695123868' },
      'Mbeya Branch': { location: 'Soweto, Mbeya (Near Kwa Chaula)', phone: '+255695123868' }
    }
  };

  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState([
    { id: 1, type: 'phone', name: 'iPhone 15', imei: '356938035643809', price: 79999, quantity: 5, shop: 'Main Branch' },
    { id: 2, type: 'phone', name: 'Samsung S24', imei: '352077527217810', price: 69999, quantity: 3, shop: 'Mbeya Branch' },
    { id: 3, type: 'accessory', name: 'Phone Case', imei: null, price: 499, quantity: 45, shop: 'Main Branch' },
    { id: 4, type: 'accessory', name: 'Screen Protector', imei: null, price: 299, quantity: 60, shop: 'Mbeya Branch' },
    { id: 5, type: 'accessory', name: 'Fast Charger', imei: null, price: 1299, quantity: 25, shop: 'Main Branch' },
  ]);
  const [sales, setSales] = useState([
    { id: 1, date: '2024-01-15', customer: 'John Mwale', items: 'iPhone 15 + Case', amount: 80498, payment: 'Cash', shop: 'Main Branch' },
    { id: 2, date: '2024-01-14', customer: 'Grace Mtendo', items: 'Samsung S24', amount: 69999, payment: 'M-Pesa', shop: 'Mbeya Branch' },
    { id: 3, date: '2024-01-13', customer: 'David Otieno', items: 'Screen Protector + Case', amount: 798, payment: 'Cash', shop: 'Main Branch' },
  ]);
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Mwale', phone: '+255754123456', purchases: 2, lastPurchase: '2024-01-15' },
    { id: 2, name: 'Grace Mtendo', phone: '+255765234567', purchases: 1, lastPurchase: '2024-01-14' },
    { id: 3, name: 'David Otieno', phone: '+255789345678', purchases: 3, lastPurchase: '2024-01-13' },
  ]);
  const [smsTemplates, setSmsTemplates] = useState([
    { id: 1, name: 'Warranty Check', template: 'Hi {name}, this is EXCLUSIVELY COMPANY TZ. Your {model} warranty expires on {expiry}. Need service? Call us at +255695123868' },
    { id: 2, name: 'Accessory Offer', template: 'Hey {name}! Protect your {model} with our premium cases & screen protectors. Visit us at {shop} for 30% off this week!' },
    { id: 3, name: 'Service Reminder', template: 'Hi {name}, it\'s time for your phone service check-up. EXCLUSIVELY COMPANY TZ offers free diagnostics. Visit us today!' },
    { id: 4, name: 'New Product Launch', template: 'Exciting news! {name}, new premium phones arrived at EXCLUSIVELY COMPANY TZ. Visit {shop} or call +255695123868 for details.' },
  ]);
  
  const [showNewSale, setShowNewSale] = useState(false);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState('All');

  // Dashboard calculations
  const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
  const todaysSales = sales.filter(s => s.date === '2024-01-15').reduce((sum, s) => sum + s.amount, 0);
  const totalInventory = inventory.reduce((sum, i) => sum + i.quantity, 0);
  const lowStockItems = inventory.filter(i => i.quantity < 5);

  const handleAddSale = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSale = {
      id: sales.length + 1,
      date: formData.get('date'),
      customer: formData.get('customer'),
      items: formData.get('items'),
      amount: parseInt(formData.get('amount')),
      payment: formData.get('payment'),
      shop: formData.get('shop'),
    };
    setSales([...sales, newSale]);
    setShowNewSale(false);
    e.target.reset();
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCustomer = {
      id: customers.length + 1,
      name: formData.get('name'),
      phone: formData.get('phone'),
      purchases: 0,
      lastPurchase: new Date().toISOString().split('T')[0],
    };
    setCustomers([...customers, newCustomer]);
    setShowNewCustomer(false);
    e.target.reset();
  };

  const handleAddTemplate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTemplate = {
      id: smsTemplates.length + 1,
      name: formData.get('name'),
      template: formData.get('template'),
    };
    setSmsTemplates([...smsTemplates, newTemplate]);
    setShowNewTemplate(false);
    e.target.reset();
  };

  const handleDeleteInventory = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleDeleteSale = (id) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const handleDeleteTemplate = (id) => {
    setSmsTemplates(smsTemplates.filter(template => template.id !== id));
  };

  const filteredInventory = inventory.filter(item =>
    (selectedShop === 'All' || item.shop === selectedShop) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (item.imei && item.imei.includes(searchTerm)))
  );

  const filteredSales = sales.filter(sale =>
    (selectedShop === 'All' || sale.shop === selectedShop) &&
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      {/* Header */}
      <header className="border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50 bg-slate-900/95">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 p-1 flex items-center justify-center border border-blue-500/50">
                <img 
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdC" 
                  alt="EXCLUSIVELY COMPANY TZ Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
              {/* Company Info */}
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">{businessInfo.name}</h1>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">{businessInfo.motto}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <select 
                value={selectedShop} 
                onChange={(e) => setSelectedShop(e.target.value)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm border border-slate-600 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Branches</option>
                <option value="Main Branch">Main Branch - Arusha</option>
                <option value="Mbeya Branch">Mbeya Branch</option>
              </select>
              <button className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs transition-colors whitespace-nowrap">
                📞 {businessInfo.phone}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'sales', label: 'Sales & POS', icon: ShoppingCart },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'sms', label: 'SMS Templates', icon: MessageSquare },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'about', label: 'Business Info', icon: BarChart3 },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 p-6 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">Today's Revenue</p>
                <p className="text-3xl font-bold text-white">₹{todaysSales.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-2">From {sales.filter(s => s.date === '2024-01-15').length} sales</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 p-6 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-2">{sales.length} total transactions</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 p-6 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">Total Inventory</p>
                <p className="text-3xl font-bold text-white">{totalInventory}</p>
                <p className="text-xs text-slate-500 mt-2">Items across both shops</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-red-900 to-red-800 p-6 border border-red-700">
                <p className="text-slate-400 text-sm mb-2">Low Stock Alert</p>
                <p className="text-3xl font-bold text-white">{lowStockItems.length}</p>
                <p className="text-xs text-red-300 mt-2">Items below threshold</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Recent Sales</h3>
                <div className="space-y-3">
                  {sales.slice(-3).map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                      <div>
                        <p className="text-sm font-medium text-white">{sale.customer}</p>
                        <p className="text-xs text-slate-400">{sale.items}</p>
                      </div>
                      <p className="text-sm font-bold text-blue-400">₹{sale.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Low Stock Items</h3>
                <div className="space-y-3">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-red-900/20 border border-red-800/30">
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.shop}</p>
                      </div>
                      <p className="text-sm font-bold text-red-400">{item.quantity} left</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
              <button
                onClick={() => setShowNewSale(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Plus size={18} /> Add Item
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or IMEI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">IMEI/SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Shop</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredInventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-white font-medium">{item.name}</td>
                      <td className="px-6 py-3 text-sm text-slate-400">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'phone' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-400 font-mono text-xs">{item.imei || '-'}</td>
                      <td className="px-6 py-3 text-sm text-white font-medium">₹{item.price}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${item.quantity < 5 ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-400">{item.shop}</td>
                      <td className="px-6 py-3 text-sm flex gap-2">
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-slate-300">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteInventory(item.id)} className="p-1 hover:bg-red-900/20 rounded transition-colors text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sales & POS Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Sales & POS</h2>
              <button
                onClick={() => setShowNewSale(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Plus size={18} /> New Sale
              </button>
            </div>

            {showNewSale && (
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Record New Sale</h3>
                <form onSubmit={handleAddSale} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" name="date" required defaultValue="2024-01-15" className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500" />
                    <input type="text" name="customer" placeholder="Customer Name" required className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500" />
                    <input type="text" name="items" placeholder="Items Sold" required className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500" />
                    <input type="number" name="amount" placeholder="Amount" required className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500" />
                    <select name="payment" required className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500">
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                    <select name="shop" required className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500">
                      <option value="Main Branch">Main Branch - Arusha</option>
                      <option value="Mbeya Branch">Mbeya Branch</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">Save Sale</button>
                    <button type="button" onClick={() => setShowNewSale(false)} className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="rounded-xl border border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Shop</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredSales.map(sale => (
                    <tr key={sale.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-white">{sale.date}</td>
                      <td className="px-6 py-3 text-sm text-white font-medium">{sale.customer}</td>
                      <td className="px-6 py-3 text-sm text-slate-400">{sale.items}</td>
                      <td className="px-6 py-3 text-sm text-green-400 font-bold">₹{sale.amount}</td>
                      <td className="px-6 py-3 text-sm text-slate-400">{sale.payment}</td>
                      <td className="px-6 py-3 text-sm text-slate-400">{sale.shop}</td>
                      <td className="px-6 py-3 text-sm flex gap-2">
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-slate-300">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => handleDeleteSale(sale.id)} className="p-1 hover:bg-red-900/20 rounded transition-colors text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Customer Management</h2>
              <button
                onClick={() => setShowNewCustomer(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Plus size={18} /> New Customer
              </button>
            </div>

            {showNewCustomer && (
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Add New Customer</h3>
                <form onSubmit={handleAddCustomer} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Full Name" required className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500" />
                    <input type="tel" name="phone" placeholder="Phone Number" required className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">Save Customer</button>
                    <button type="button" onClick={() => setShowNewCustomer(false)} className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customers.map(customer => (
                <div key={customer.id} className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{customer.name}</h3>
                      <p className="text-sm text-slate-400">{customer.phone}</p>
                    </div>
                    <button onClick={() => handleDeleteCustomer(customer.id)} className="p-1 hover:bg-red-900/20 rounded transition-colors text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Total Purchases</p>
                      <p className="text-lg font-bold text-white">{customer.purchases}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Last Purchase</p>
                      <p className="text-sm text-blue-400">{customer.lastPurchase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SMS Templates Tab */}
        {activeTab === 'sms' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">SMS Templates</h2>
              <button
                onClick={() => setShowNewTemplate(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Plus size={18} /> New Template
              </button>
            </div>

            {showNewTemplate && (
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Create SMS Template</h3>
                <form onSubmit={handleAddTemplate} className="space-y-4">
                  <input type="text" name="name" placeholder="Template Name" required className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500" />
                  <textarea 
                    name="template" 
                    placeholder="SMS Template (use {name}, {model}, {expiry} for variables)" 
                    required 
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                  />
                  <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <p className="text-xs text-slate-400 mb-2">Available Variables:</p>
                    <p className="text-xs text-slate-300 font-mono">{'{name}'} • {'{model}'} • {'{expiry}'} • {'{shop}'}</p>
                    <p className="text-xs text-slate-500 mt-2">Main Branch: Njiro, Arusha | Mbeya Branch: Soweto, Mbeya</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">Save Template</button>
                    <button type="button" onClick={() => setShowNewTemplate(false)} className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {smsTemplates.map(template => (
                <div key={template.id} className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{template.name}</h3>
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{template.template}</p>
                    </div>
                    <button onClick={() => handleDeleteTemplate(template.id)} className="p-1 hover:bg-red-900/20 rounded transition-colors text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                      <Send size={16} /> Send Bulk SMS
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium flex items-center gap-2 transition-colors">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors">
                <Download size={18} /> Export Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Sales Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                    <span className="text-slate-400">Total Sales</span>
                    <span className="text-white font-bold">{sales.length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                    <span className="text-slate-400">Total Revenue</span>
                    <span className="text-green-400 font-bold">₹{totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                    <span className="text-slate-400">Avg Transaction</span>
                    <span className="text-white font-bold">₹{Math.round(totalRevenue / sales.length).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Payment Methods</span>
                    <span className="text-white font-bold">Cash, Card, UPI</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Inventory Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                    <span className="text-slate-400">Total Items</span>
                    <span className="text-white font-bold">{totalInventory}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                    <span className="text-slate-400">Low Stock Items</span>
                    <span className="text-red-400 font-bold">{lowStockItems.length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                    <span className="text-slate-400">Mobile Phones</span>
                    <span className="text-white font-bold">{inventory.filter(i => i.type === 'phone').reduce((sum, i) => sum + i.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Accessories</span>
                    <span className="text-white font-bold">{inventory.filter(i => i.type === 'accessory').reduce((sum, i) => sum + i.quantity, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Info Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Business Information</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Info */}
              <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Company Details</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-600">
                    <p className="text-slate-400 text-sm mb-1">Company Name</p>
                    <p className="text-white font-bold text-lg">{businessInfo.name}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-600">
                    <p className="text-slate-400 text-sm mb-1">Email</p>
                    <p className="text-blue-400 font-mono">{businessInfo.email}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-600">
                    <p className="text-slate-400 text-sm mb-1">Support Phone</p>
                    <p className="text-blue-400 font-bold">{businessInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Operating Branches</p>
                    <div className="space-y-2">
                      {Object.entries(businessInfo.shops).map(([name, details]) => (
                        <div key={name} className="bg-slate-700/50 p-3 rounded-lg">
                          <p className="text-white font-medium text-sm">{name}</p>
                          <p className="text-slate-400 text-xs">{details.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-600/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Owner</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-blue-600/50">
                    <p className="text-slate-300 text-sm mb-1">Full Name</p>
                    <p className="text-white font-bold text-xl">{businessInfo.owner.name}</p>
                  </div>
                  <div className="pb-4 border-b border-blue-600/50">
                    <p className="text-slate-300 text-sm mb-1">Email</p>
                    <a href={`mailto:${businessInfo.owner.email}`} className="text-blue-400 hover:text-blue-300 font-mono text-sm">
                      {businessInfo.owner.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-1">Phone</p>
                    <a href={`tel:${businessInfo.owner.phone}`} className="text-blue-400 hover:text-blue-300 font-bold">
                      {businessInfo.owner.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Co-Owner/Manager Info */}
              <div className="rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-600/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Co-Owner / Manager</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-purple-600/50">
                    <p className="text-slate-300 text-sm mb-1">Full Name</p>
                    <p className="text-white font-bold text-xl">{businessInfo.coOwner.name}</p>
                  </div>
                  <div className="pb-4 border-b border-purple-600/50">
                    <p className="text-slate-300 text-sm mb-1">Email</p>
                    <a href={`mailto:${businessInfo.coOwner.email}`} className="text-purple-400 hover:text-purple-300 font-mono text-sm">
                      {businessInfo.coOwner.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-1">Phone</p>
                    <a href={`tel:${businessInfo.coOwner.phone}`} className="text-purple-400 hover:text-purple-300 font-bold">
                      {businessInfo.coOwner.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-xl bg-slate-800 border border-slate-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                    📧 Email Support: {businessInfo.email}
                  </button>
                  <button className="w-full px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
                    📱 Call Owner: {businessInfo.owner.phone}
                  </button>
                  <button className="w-full px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
                    👤 Call Manager: {businessInfo.coOwner.phone}
                  </button>
                  <button className="w-full px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors">
                    📋 Download Business Card
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">System Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-slate-400 text-sm">Version</p>
                  <p className="text-white font-bold">1.0</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className="text-green-400 font-bold">Active</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Branches</p>
                  <p className="text-white font-bold">2</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Last Updated</p>
                  <p className="text-white font-bold">2024</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 p-1 flex items-center justify-center border border-blue-500/50">
                  <ShoppingCart className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{businessInfo.name}</p>
                  <p className="text-blue-400 font-bold text-xs">{businessInfo.motto}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 text-sm">Owner</h4>
              <p className="text-slate-400 text-sm">{businessInfo.owner.name}</p>
              <p className="text-blue-400 font-mono text-xs">{businessInfo.owner.email}</p>
              <p className="text-blue-400 text-xs">{businessInfo.owner.phone}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 text-sm">Co-Owner/Manager</h4>
              <p className="text-slate-400 text-sm">{businessInfo.coOwner.name}</p>
              <p className="text-purple-400 font-mono text-xs">{businessInfo.coOwner.email}</p>
              <p className="text-purple-400 text-xs">{businessInfo.coOwner.phone}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 text-sm">Main Branch</h4>
              <p className="text-slate-400 text-xs">Njiro, Arusha</p>
              <p className="text-slate-400 text-xs">Near NANENANE Grounds</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 text-sm">Contact</h4>
              <p className="text-blue-400 text-xs">📧 {businessInfo.email}</p>
              <p className="text-blue-400 text-xs">📱 {businessInfo.phone}</p>
              <p className="text-slate-400 text-xs mt-2">Mbeya: Soweto</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
            <p>© 2024 {businessInfo.name} | {businessInfo.motto}</p>
            <p className="mt-1">Managed by {businessInfo.owner.name} & {businessInfo.coOwner.name}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RetailShopSystem;
