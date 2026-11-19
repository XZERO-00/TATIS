import {
  LayoutDashboard,
  Users,
  Layers,
  CheckSquare,
  CreditCard,
  Receipt,
  GraduationCap,
  Calendar,
  BarChart3,
  Bell,
  Settings,
} from 'lucide-react';

export interface NavItem {
  title: string;
  path: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

export const navItems: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Students', path: '/students', icon: Users },
  { title: 'Batches', path: '/batches', icon: Layers },
  { title: 'Attendance', path: '/attendance', icon: CheckSquare },
  { title: 'Fees & Payments', path: '/fees', icon: CreditCard },
  { title: 'Expenses', path: '/expenses', icon: Receipt },
  { title: 'Academics', path: '/academics', icon: GraduationCap },
  { title: 'Timetable', path: '/timetable', icon: Calendar },
  { title: 'Reports', path: '/reports', icon: BarChart3 },
  { title: 'Notifications', path: '/notifications', icon: Bell },
  { title: 'Settings', path: '/settings', icon: Settings },
];
