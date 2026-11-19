import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Alert } from '@/components/feedback/Alert';
import { authService } from '@/services/auth/authService';
import { useAuthStore } from '@/store/authStore';
import { Shield, KeyRound, Smartphone, LogOut } from 'lucide-react';

export const AccountSettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setStatusMessage(null);

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setIsUpdating(true);
    try {
      await authService.updatePassword(newPassword);
      setStatusMessage({
        type: 'success',
        text: 'Security password changed successfully.',
      });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const error = err as Error;
      setStatusMessage({
        type: 'error',
        text: error.message || 'Failed to update password.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <PageHeader
        title="Account & Security"
        description="Manage your security credentials, active sessions, and authentication security."
      />

      {statusMessage && (
        <Alert
          variant={statusMessage.type === 'success' ? 'success' : 'destructive'}
          title={statusMessage.type === 'success' ? 'Success' : 'Error'}
        >
          {statusMessage.text}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Change Password Card */}
        <Card className="border-border/80">
          <CardHeader>
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-brand-soft" />
              <CardTitle className="text-sm">Change Security Password</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Update your account password. Must contain at least 8 characters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              {passwordError && (
                <p className="text-xs text-destructive font-medium">{passwordError}</p>
              )}

              <FormField label="New Password" required>
                <PasswordInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </FormField>

              <FormField label="Confirm New Password" required>
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                />
              </FormField>

              <Button
                type="submit"
                size="sm"
                className="w-full text-xs font-medium"
                isLoading={isUpdating}
              >
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Active Session & Security Details */}
        <div className="space-y-6">
          <Card className="border-border/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand-soft" />
                <CardTitle className="text-sm">Active Session</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Current browser authorization status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/60">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-emerald-600" />
                  <div>
                    <span className="font-semibold text-foreground block">
                      This Device (Web Browser)
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      ID: {user?.id?.slice(0, 8) || 'Active'} • Authenticated
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-600 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Current
                </span>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs text-destructive hover:bg-destructive/10 border-destructive/20"
                  onClick={() => authService.signOut()}
                >
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  Terminate Session & Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
