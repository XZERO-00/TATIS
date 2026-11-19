import * as React from 'react';
import { isSupabaseConfigured } from '@/services/supabase/config';
import { AlertCircle, Key, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';

export const ConfigBanner: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  if (isSupabaseConfigured) return null;

  const exampleEnv = `VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exampleEnv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/25 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Supabase is not configured yet.</strong> Add your{' '}
            <code className="px-1 py-0.5 rounded bg-amber-500/20 font-mono text-[11px]">
              VITE_SUPABASE_URL
            </code>{' '}
            and{' '}
            <code className="px-1 py-0.5 rounded bg-amber-500/20 font-mono text-[11px]">
              VITE_SUPABASE_ANON_KEY
            </code>{' '}
            to <code className="font-mono text-[11px]">.env</code> to activate live Supabase Auth and Database.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-7 text-xs text-amber-800 dark:text-amber-300 hover:bg-amber-500/15"
          >
            <Key className="h-3 w-3 mr-1" />
            {expanded ? 'Hide instructions' : 'Setup instructions'}
            {expanded ? (
              <ChevronUp className="h-3 w-3 ml-1" />
            ) : (
              <ChevronDown className="h-3 w-3 ml-1" />
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-amber-500/20 max-w-7xl mx-auto text-xs space-y-2">
          <p className="font-medium">How to connect Supabase:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground dark:text-amber-200/80">
            <li>Create a project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="underline font-semibold text-primary">supabase.com</a>.</li>
            <li>Run the SQL migration in <code className="font-mono text-[11px]">supabase/migrations/20250101000000_foundation_schema.sql</code> in the Supabase SQL Editor.</li>
            <li>Copy your Project URL and Publishable anon key from Project Settings → API.</li>
            <li>Update your local <code className="font-mono text-[11px]">.env</code> file:</li>
          </ol>
          <div className="relative mt-2 rounded bg-neutral-900 text-neutral-100 p-2.5 font-mono text-[11px]">
            <pre className="overflow-x-auto">{exampleEnv}</pre>
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-2 p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
              title="Copy snippet"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
