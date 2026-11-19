import { create } from 'zustand';
import type { Organization, OrganizationMember } from '@/database/types/database.types';

interface OrganizationState {
  currentOrg: Organization | null;
  userOrgs: Organization[];
  membership: OrganizationMember | null;
  isLoadingOrg: boolean;
  setCurrentOrg: (org: Organization | null) => void;
  setUserOrgs: (orgs: Organization[]) => void;
  setMembership: (membership: OrganizationMember | null) => void;
  setLoadingOrg: (isLoading: boolean) => void;
  reset: () => void;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  currentOrg: null,
  userOrgs: [],
  membership: null,
  isLoadingOrg: false,
  setCurrentOrg: (currentOrg) => set({ currentOrg }),
  setUserOrgs: (userOrgs) => set({ userOrgs }),
  setMembership: (membership) => set({ membership }),
  setLoadingOrg: (isLoadingOrg) => set({ isLoadingOrg }),
  reset: () =>
    set({
      currentOrg: null,
      userOrgs: [],
      membership: null,
      isLoadingOrg: false,
    }),
}));
