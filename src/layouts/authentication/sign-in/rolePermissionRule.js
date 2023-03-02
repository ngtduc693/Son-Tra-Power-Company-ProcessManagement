const rule = [
  {
    roleName: 'qtht',
    canAccess: 'all',
  },
  {
    roleName: 'dienluc',
    canAccess: [
      'CreateDocument',
      'FullRecordsDateStep',
      'TransferDocumentsToCompany',
      'ConfirmReceiptOfConnectionAgreementStep',
      'ProposalForAcceptanceStep',
      'CompleteTheAcceptanceTestStep',
    ],
  },
  {
    roleName: 'pkt',
    canAccess: ['ElectricalConnectionAgreementStep'],
  },
  {
    roleName: 'pkd',
    canAccess: 'all',
  },
];
export const rolePermissionRule = (role, moduleName) => {
  const filteredRole = rule.filter((item) => item.roleName === role);
  if (filteredRole.length === 0) {
    return false;
  }
  const canAccess = filteredRole[0].canAccess;
  if (canAccess === 'all') {
    return true;
  }
  return filteredRole[0].canAccess.includes(moduleName);
};
