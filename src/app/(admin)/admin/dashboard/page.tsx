import {
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  Package,
  Clock,
  Boxes,
  Receipt,
  UserPlus,
  PackagePlus,
  CheckCircle2,
  FileCheck,
  CreditCard,
  Plus,
  Download,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, OrderStatus } from '@/components/ui/badge';
import { PageHeader } from '@/components/ui/page-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Timeline, TimelineEventItem } from '@/components/ui/timeline';

const kpis = [
  {
    title: 'Total Sales',
    value: '$2,845,920.00',
    icon: DollarSign,
  },
  {
    title: "Today's Sales",
    value: '$48,210.50',
    icon: TrendingUp,
  },
  {
    title: 'Monthly Sales',
    value: '$612,400.00',
    icon: Calendar,
  },
  {
    title: 'Total Customers',
    value: '1,284',
    icon: Users,
  },
  {
    title: 'Total Products',
    value: '4,520',
    icon: Package,
  },
  {
    title: 'Pending Orders',
    value: '38',
    icon: Clock,
  },
  {
    title: 'Inventory Value',
    value: '$1,450,800.00',
    icon: Boxes,
  },
  {
    title: 'Outstanding Receivables',
    value: '$184,230.00',
    icon: Receipt,
  },
];

const recentOrders: {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: OrderStatus;
}[] = [
  {
    id: 'ORD-2026-901',
    customer: 'Apex Logistics Ltd',
    date: 'Jul 26, 2026',
    amount: '$14,250.00',
    status: 'Delivered',
  },
  {
    id: 'ORD-2026-902',
    customer: 'PharmaCare Wholesalers',
    date: 'Jul 26, 2026',
    amount: '$8,920.50',
    status: 'Dispatched',
  },
  {
    id: 'ORD-2026-903',
    customer: 'Global Retail Outlets',
    date: 'Jul 25, 2026',
    amount: '$22,400.00',
    status: 'Packed',
  },
  {
    id: 'ORD-2026-904',
    customer: 'Metro Distribution Network',
    date: 'Jul 25, 2026',
    amount: '$5,110.00',
    status: 'Approved',
  },
  {
    id: 'ORD-2026-905',
    customer: 'Sunrise Consumer Goods',
    date: 'Jul 24, 2026',
    amount: '$11,840.00',
    status: 'Pending',
  },
  {
    id: 'ORD-2026-906',
    customer: 'Crestwood Traders',
    date: 'Jul 24, 2026',
    amount: '$3,400.00',
    status: 'Cancelled',
  },
];

const lowStockProducts: {
  product: string;
  qty: string;
  warehouse: string;
  status: OrderStatus;
}[] = [
  {
    product: 'Amoxicillin 500mg (Box of 100)',
    qty: '12 Boxes',
    warehouse: 'Central Fulfillment Hub',
    status: 'Critical',
  },
  {
    product: 'Paracetamol Syrup 120mg/5ml',
    qty: '45 Bottles',
    warehouse: 'North Cold-Storage Depot',
    status: 'Low Stock',
  },
  {
    product: 'Surgical Gloves - Medium',
    qty: '28 Boxes',
    warehouse: 'South Regional Depot',
    status: 'Low Stock',
  },
  {
    product: 'Vitamin C 1000mg Effervescent',
    qty: '0 Boxes',
    warehouse: 'Central Fulfillment Hub',
    status: 'Critical',
  },
];

const activityTimeline: TimelineEventItem[] = [
  {
    id: '1',
    title: 'Customer Registered',
    description: 'MedPlus Pharmacy was onboarded as a Tier-1 distributor.',
    timestamp: '10 mins ago',
    icon: <UserPlus className="h-3 w-3" />,
  },
  {
    id: '2',
    title: 'Product Added',
    description: 'Manufacturer GlaxoSmithKline added 4 new SKUs.',
    timestamp: '42 mins ago',
    icon: <PackagePlus className="h-3 w-3" />,
  },
  {
    id: '3',
    title: 'Order Approved',
    description: 'Order #ORD-2026-904 approved by Sales Manager.',
    timestamp: '2 hours ago',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  {
    id: '4',
    title: 'Invoice Generated',
    description: 'Tax Invoice #INV-8812 generated for Apex Logistics.',
    timestamp: '3 hours ago',
    icon: <FileCheck className="h-3 w-3" />,
  },
  {
    id: '5',
    title: 'Payment Received',
    description: 'Received $14,250.00 via Bank Wire Transfer from Apex Logistics.',
    timestamp: '5 hours ago',
    icon: <CreditCard className="h-3 w-3" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Distribution Overview"
        description="Real-time operational summary across all active distribution hubs."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
            <Button variant="primary" size="sm">
              <Plus className="mr-2 h-4 w-4" /> New Order
            </Button>
          </>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5a6478] dark:text-[#a0aec0]">
                  {kpi.title}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-[#f0f2f7] dark:bg-[#0a2d6b] text-[#001F5B] dark:text-white">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-2xl font-bold text-[#001F5B] dark:text-white">
                  {kpi.value}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Real-time status updates on incoming and active fulfillment orders.
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[#00BFFF]">
                View All
              </Button>
            </div>
          </CardHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-[#001F5B] dark:text-white">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-[#5a6478] dark:text-[#a0aec0]">{order.date}</TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={order.status}>{order.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System events and audit logs.</CardDescription>
          </CardHeader>
          <Timeline events={activityTimeline} />
        </Card>
      </div>

      {/* Low Stock Products Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Low Stock Products</CardTitle>
              <CardDescription>
                Inventory items requiring immediate reorder or replenishment.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Create Purchase Order
            </Button>
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Available Qty</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockProducts.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-semibold text-[#001F5B] dark:text-white">
                  {item.product}
                </TableCell>
                <TableCell className="font-medium text-rose-600 dark:text-rose-400">
                  {item.qty}
                </TableCell>
                <TableCell className="text-[#5a6478] dark:text-[#a0aec0]">
                  {item.warehouse}
                </TableCell>
                <TableCell>
                  <Badge variant={item.status}>{item.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}