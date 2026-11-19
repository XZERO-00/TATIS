import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNames: Record<string, string> = {
  dashboard: 'Dashboard',
  students: 'Students',
  batches: 'Batches',
  attendance: 'Attendance',
  fees: 'Fees & Payments',
  expenses: 'Expenses',
  academics: 'Academics',
  timetable: 'Timetable',
  reports: 'Reports',
  notifications: 'Notifications',
  settings: 'Settings',
  profile: 'My Profile',
  preferences: 'Preferences',
  account: 'Account Settings',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null;

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center hover:text-foreground transition-colors p-1 rounded"
        title="Dashboard"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {pathSegments.map((segment, index) => {
        const routeTo = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const displayName = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60 shrink-0" />
            {isLast ? (
              <span className="font-medium text-foreground truncate max-w-[150px]">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-foreground transition-colors truncate max-w-[150px]"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
