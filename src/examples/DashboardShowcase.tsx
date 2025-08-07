import { useState } from 'preact/hooks';
import { 
  Card, 
  Button, 
  Progress, 
  Avatar, 
  Badge
} from '../../nebula';

interface DashboardData {
  users: number;
  revenue: number;
  orders: number;
  conversion: number;
}

const mockData: DashboardData = {
  users: 12584,
  revenue: 87542,
  orders: 1247,
  conversion: 3.2
};

type OrderStatus = 'completed' | 'pending' | 'shipped' | 'processing';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
}

const recentOrders: Order[] = [
  { id: '001', customer: 'John Doe', amount: 129.99, status: 'completed' },
  { id: '002', customer: 'Jane Smith', amount: 89.50, status: 'pending' },
  { id: '003', customer: 'Bob Wilson', amount: 245.00, status: 'shipped' },
  { id: '004', customer: 'Alice Brown', amount: 67.25, status: 'completed' },
  { id: '005', customer: 'Tom Davis', amount: 198.75, status: 'processing' }
];

export const DashboardShowcase = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      completed: 'success' as const,
      pending: 'warning' as const,
      shipped: 'info' as const,
      processing: 'default' as const
    };
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);

  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-US').format(num);

  const handleTimeRangeChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (target) {
      setTimeRange(target.value);
    }
  };

  return (
    <div class="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        
        <div class="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={handleTimeRangeChange}
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button variant="primary">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 font-medium text-sm">
                Total Users
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatNumber(mockData.users)}
              </p>
            </div>
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-green-600 dark:text-green-400 font-medium text-sm">
              ↗ +12.5% from last month
            </span>
          </div>
        </Card>

        <Card class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 font-medium text-sm">
                Revenue
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatCurrency(mockData.revenue)}
              </p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-green-600 dark:text-green-400 font-medium text-sm">
              ↗ +8.2% from last month
            </span>
          </div>
        </Card>

        <Card class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 font-medium text-sm">
                Orders
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatNumber(mockData.orders)}
              </p>
            </div>
            <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-red-600 dark:text-red-400 font-medium text-sm">
              ↘ -3.1% from last month
            </span>
          </div>
        </Card>

        <Card class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 font-medium text-sm">
                Conversion Rate
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {mockData.conversion}%
              </p>
            </div>
            <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-green-600 dark:text-green-400 font-medium text-sm">
              ↗ +0.8% from last month
            </span>
          </div>
        </Card>
      </div>

      {/* Recent Orders and Progress */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <Card class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Orders
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Order ID</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Customer</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Amount</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-3 px-4 text-gray-900 dark:text-white">{order.id}</td>
                      <td class="py-3 px-4 text-gray-900 dark:text-white">{order.customer}</td>
                      <td class="py-3 px-4 text-gray-900 dark:text-white">{formatCurrency(order.amount)}</td>
                      <td class="py-3 px-4">{getStatusBadge(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div class="space-y-6">
          {/* Progress Card */}
          <Card class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Goal Progress
            </h3>
            
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600 dark:text-gray-400 text-sm">
                    Monthly Target
                  </span>
                  <span class="text-gray-900 dark:text-white font-medium text-sm">
                    78%
                  </span>
                </div>
                <Progress value={78} class="mb-2" />
              </div>
              
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600 dark:text-gray-400 text-sm">
                    Quarterly Goal
                  </span>
                  <span class="text-gray-900 dark:text-white font-medium text-sm">
                    45%
                  </span>
                </div>
                <Progress value={45} class="mb-2" />
              </div>
              
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600 dark:text-gray-400 text-sm">
                    Annual Target
                  </span>
                  <span class="text-gray-900 dark:text-white font-medium text-sm">
                    23%
                  </span>
                </div>
                <Progress value={23} />
              </div>
            </div>
          </Card>

          {/* Team Activity */}
          <Card class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Team Activity
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Avatar size="sm" />
                <div class="flex-1">
                  <p class="text-gray-900 dark:text-white font-medium text-sm">
                    John Doe
                  </p>
                  <p class="text-gray-500 dark:text-gray-400 text-xs">
                    Completed 5 tasks
                  </p>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              
              <div class="flex items-center space-x-3">
                <Avatar size="sm" />
                <div class="flex-1">
                  <p class="text-gray-900 dark:text-white font-medium text-sm">
                    Jane Smith
                  </p>
                  <p class="text-gray-500 dark:text-gray-400 text-xs">
                    Updated 3 projects
                  </p>
                </div>
                <Badge variant="warning" size="sm">Busy</Badge>
              </div>
              
              <div class="flex items-center space-x-3">
                <Avatar size="sm" />
                <div class="flex-1">
                  <p class="text-gray-900 dark:text-white font-medium text-sm">
                    Bob Wilson
                  </p>
                  <p class="text-gray-500 dark:text-gray-400 text-xs">
                    Reviewed 8 items
                  </p>
                </div>
                <Badge variant="default" size="sm">Away</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
};
