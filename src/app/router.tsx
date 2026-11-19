import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { AuthLayout } from '@/modules/auth/components/AuthLayout';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';

// Auth Pages
import { LoginPage } from '@/modules/auth/pages/LoginPage';
import { RegisterPage } from '@/modules/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '@/modules/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/modules/auth/pages/ResetPasswordPage';
import { VerifyEmailPage } from '@/modules/auth/pages/VerifyEmailPage';
import { AuthCallbackPage } from '@/modules/auth/pages/AuthCallbackPage';

// Main App Pages
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage';
import { StudentsPage } from '@/modules/students/pages/StudentsPage';
import { BatchesPage } from '@/modules/batches/pages/BatchesPage';
import { AttendancePage } from '@/modules/attendance/pages/AttendancePage';
import { FeesPage } from '@/modules/fees/pages/FeesPage';
import { ExpensesPage } from '@/modules/expenses/pages/ExpensesPage';
import { AcademicsPage } from '@/modules/academics/pages/AcademicsPage';
import { TimetablePage } from '@/modules/academics/pages/TimetablePage';
import { ReportsPage } from '@/modules/reports/pages/ReportsPage';
import { NotificationsPage } from '@/modules/notifications/pages/NotificationsPage';

// Settings Pages
import { SettingsPage } from '@/modules/settings/pages/SettingsPage';
import { ProfilePage } from '@/modules/settings/pages/ProfilePage';
import { PreferencesPage } from '@/modules/settings/pages/PreferencesPage';
import { AccountSettingsPage } from '@/modules/settings/pages/AccountSettingsPage';

// Common
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: 'callback',
        element: <AuthCallbackPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <AppShell />
        </ErrorBoundary>
      </AuthGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'students',
        element: <StudentsPage />,
      },
      {
        path: 'batches',
        element: <BatchesPage />,
      },
      {
        path: 'attendance',
        element: <AttendancePage />,
      },
      {
        path: 'fees',
        element: <FeesPage />,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
      },
      {
        path: 'academics',
        element: <AcademicsPage />,
      },
      {
        path: 'timetable',
        element: <TimetablePage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'notifications',
        element: <NotificationsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'settings/profile',
        element: <ProfilePage />,
      },
      {
        path: 'settings/preferences',
        element: <PreferencesPage />,
      },
      {
        path: 'settings/account',
        element: <AccountSettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex h-screen w-screen flex-col items-center justify-center p-6 text-center bg-background text-foreground">
        <h1 className="text-6xl font-bold text-brand-soft">404</h1>
        <h2 className="text-lg font-semibold mt-2">Page Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          The requested route does not exist in TATIS.
        </p>
        <a
          href="/dashboard"
          className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
        >
          Return to Dashboard
        </a>
      </div>
    ),
  },
]);
