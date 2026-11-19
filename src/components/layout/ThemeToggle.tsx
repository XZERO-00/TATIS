import * as React from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useThemeStore, type ThemeMode } from '@/store/themeStore';
import { Button } from '../ui/button';

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: 'light', label: 'Light', icon: Sun },
    { mode: 'dark', label: 'Dark', icon: Moon },
    { mode: 'system', label: 'System', icon: Laptop },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg border border-border bg-card p-1 shadow-lg ring-1 ring-black/5 z-50 animate-fade-in text-xs">
          <div className="px-2 py-1.5 font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">
            Theme
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setTheme(opt.mode);
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-brand-neon" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
