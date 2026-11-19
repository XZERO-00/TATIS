import { useOrganizationStore } from '@/store/organizationStore';

export function useOrganization() {
  const { currentOrg, userOrgs, membership, isLoadingOrg, setCurrentOrg } =
    useOrganizationStore();

  return {
    organization: currentOrg,
    organizations: userOrgs,
    membership,
    isLoading: isLoadingOrg,
    switchOrganization: setCurrentOrg,
  };
}
