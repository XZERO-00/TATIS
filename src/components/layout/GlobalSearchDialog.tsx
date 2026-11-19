import * as React from 'react';
import { Search, X, Command, BookOpen, Users, CreditCard, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface GlobalSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchDialog: React.FC<GlobalSearchDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Dashboard', path: '/dashboard', icon: Command, category: 'Overview' },
    { title: 'Students Administration', path: '/students', icon: Users, category: 'Academic' },
    { title: 'Batches & Classes', path: '/batches', icon: BookOpen, category: 'Academic' },
    { title: 'Fees & Invoicing', path: '/fees', icon: CreditCard, category: 'Finance' },
    { title: 'Attendance Log', path: '/attendance', icon: Calendar, category: 'Operations' },
  ];

  const filtered = quickLinks.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-card p-4 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border/80 pb-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search students, batches, fees, or navigate..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1 max-h-72 overflow-y-auto">
          <div className="text-[10px] uppercase font-semibold text-muted-foreground px-2 py-1">
            Navigation Jump
          </div>
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No matching modules or records found.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
          <span>Search shortcut: <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border">Ctrl</kbd> + <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border">K</kbd></span>
          <span>Press <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
