import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  TrendingDown, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  Clock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const inventory = [
  { id: 1, name: 'Structural Steel (HEB 200)', stock: '12 tons', status: 'Low', price: '€1,250/t', change: '+5%', trend: 'up' },
  { id: 2, name: 'Cement (Portland)', stock: '450 bags', status: 'Optimal', price: '€8.50/bag', change: '-2%', trend: 'down' },
  { id: 3, name: 'Electrical Cables (3x1.5)', stock: '2,500m', status: 'Optimal', price: '€0.85/m', change: '0%', trend: 'stable' },
  { id: 4, name: 'Insulation Panels (Rockwool)', stock: '80 sqm', status: 'Critical', price: '€15.20/sqm', change: '+12%', trend: 'up' },
  { id: 5, name: 'Roofing Tiles (Black)', stock: '0 units', status: 'Out of Stock', price: '€1.10/unit', change: '+3%', trend: 'up' },
];

const orders = [
  { id: 'ORD-2024-001', supplier: 'Stahlbau GmbH', item: 'Structural Steel', amount: '5 tons', status: 'In Transit', delivery: 'Oct 18' },
  { id: 'ORD-2024-002', supplier: 'Dach & Fach', item: 'Roofing Tiles', amount: '2,000 units', status: 'Processing', delivery: 'Oct 22' },
  { id: 'ORD-2024-003', supplier: 'Innenausbau KG', item: 'Drywall Panels', amount: '150 units', status: 'Delivered', delivery: 'Oct 12' },
];

export function MaterialHub() {
  return (
    <div className="p-8 space-y-8 bg-[#F5F5F5] min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-sans font-bold tracking-tight text-[#141414]">Material Hub</h1>
          <p className="text-[#141414]/60 mt-2 font-sans">AI-driven procurement and inventory digitalization.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#141414]/10 rounded-lg text-sm font-medium hover:bg-[#141414]/5 transition-colors">
            <Search className="w-4 h-4" /> Search Inventory
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] text-white rounded-lg text-sm font-medium hover:bg-[#141414]/90 transition-colors">
            <ShoppingCart className="w-4 h-4" /> Create Order
          </button>
        </div>
      </header>

      {/* Inventory Table */}
      <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#141414]/5">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-[#141414]">Inventory Status</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-[#F27D26] hover:text-[#F27D26]/80 transition-colors">
            <Filter className="w-4 h-4" /> Filter by Status
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-[#141414]/40 uppercase tracking-wider border-b border-[#141414]/5">
                <th className="pb-4">Material Name</th>
                <th className="pb-4">Current Stock</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Current Price</th>
                <th className="pb-4">Market Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/5">
              {inventory.map((item) => (
                <tr key={item.id} className="group hover:bg-[#F5F5F5] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F27D26]/10 rounded-xl text-[#F27D26]">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#141414]">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-[#141414]">{item.stock}</td>
                  <td className="py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      item.status === 'Optimal' ? "bg-green-100 text-green-700" : 
                      item.status === 'Low' ? "bg-orange-100 text-orange-700" : 
                      "bg-red-100 text-red-700"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-[#141414]">{item.price}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {item.trend === 'up' ? <TrendingUp className="w-4 h-4 text-red-500" /> : 
                       item.trend === 'down' ? <TrendingDown className="w-4 h-4 text-green-500" /> : 
                       <div className="w-4 h-4 bg-gray-300 rounded-full" />}
                      <span className={cn(
                        "text-xs font-bold",
                        item.trend === 'up' ? "text-red-500" : 
                        item.trend === 'down' ? "text-green-500" : 
                        "text-[#141414]/40"
                      )}>
                        {item.change}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Procurement & Active Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-[#141414] rounded-3xl text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#F27D26]" /> Active Procurement Orders
          </h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{order.id}</p>
                    <h4 className="text-lg font-bold mt-1">{order.item}</h4>
                    <p className="text-sm text-white/60">{order.supplier} • {order.amount}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    order.status === 'Delivered' ? "bg-green-500/20 text-green-400" : 
                    order.status === 'In Transit' ? "bg-[#F27D26]/20 text-[#F27D26]" : 
                    "bg-white/10 text-white/60"
                  )}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-white/40">
                  <Clock className="w-3 h-3" /> Expected Delivery: {order.delivery}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-[#141414]/5">
          <div className="p-3 bg-[#F27D26]/10 rounded-2xl w-fit mb-6">
            <TrendingDown className="w-8 h-8 text-[#F27D26]" />
          </div>
          <h3 className="text-2xl font-bold text-[#141414] mb-4">AI Cost Optimizer</h3>
          <p className="text-[#141414]/60 text-sm leading-relaxed mb-6">
            "I've detected a 15% price drop for structural steel from a new supplier in Poland. Ordering now could save €12,500 on the next phase."
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-[#F5F5F5] rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-[#141414]">Potential Savings</span>
              </div>
              <span className="text-lg font-black text-green-500">€12,500</span>
            </div>
            <button className="w-full py-3 bg-[#F27D26] text-white rounded-xl font-bold hover:bg-[#F27D26]/90 transition-colors shadow-lg shadow-[#F27D26]/20">
              Execute AI Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
