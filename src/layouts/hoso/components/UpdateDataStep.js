import {useState, useEffect, useMemo} from 'react';
import FullRecordsDateStep from 'components/DateTimePickerModal/FullRecordsDateStep.js';
import TransferDocumentsToCompany from 'components/DateTimePickerModal/TransferDocumentsToCompany.js';
import ElectricalConnectionAgreementStep from 'components/DateTimePickerModal/ElectricalConnectionAgreementStep.js';
import ConfirmReceiptOfConnectionAgreementStep from 'components/DateTimePickerModal/ConfirmReceiptOfConnectionAgreementStep.js';
import {ToastContainer, toast} from 'react-toastify';
import MDButton from 'components/MDButton';
import ProposalForAcceptanceStep from 'components/DateTimePickerModal/ProposalForAcceptanceStep.js';
import CompleteTheAcceptanceTestStep from 'components/DateTimePickerModal/CompleteTheAcceptanceTestStep.js';
import {useAuthUser, useSignIn} from 'react-auth-kit';
import {rolePermissionRule} from '../../authentication/sign-in/rolePermissionRule.js';
import UpdateDataModal from 'components/UpdateDataModal/UpdateDataModal.js';
import MDBox from 'components/MDBox';

function UpdateDataStep({currentStep, documentId, documentData, refreshData, role}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (methodName) => {
    if (rolePermissionRule(role, methodName)) setOpen(true);
    else {
      toast.warning('Bạn không đủ quyền', {
        autoClose: 3000,
        closeOnClick: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <MDBox mb={2}>
      <MDButton
        style={{width: '220px'}}
        variant="contained"
        color="warning"
        onClick={() => handleOpen('UpdateDataModal')}
      >
        Sửa
      </MDButton>
      <UpdateDataModal
        key = "UpdateDataModal"
        open={open}
        handleClose={handleClose}
        documentId={documentId}
        documentData={documentData}
        refresh={refreshData}
      />
    </MDBox>
  );
}
export default UpdateDataStep;
