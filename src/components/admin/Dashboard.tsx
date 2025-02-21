import { Users, Package, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Users', stat: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
  { name: 'Services', stat: '12', icon: Package, change: '+3%', changeType: 'increase' },
  { name: 'Revenue', stat: '$12,345', icon: DollarSign, change: '+8%', changeType: 'increase' },
  { name: 'Growth', stat: '24.57%', icon: TrendingUp, change: '+2.5%', changeType: 'increase' },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white dark:bg-dark-900 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-primary-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-dark-900 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-800">
            {[1, 2, 3].map((item) => (
              <li key={item} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-primary-500">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    New service request #{item}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium
                    praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}