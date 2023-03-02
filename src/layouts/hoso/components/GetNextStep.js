import { useState, useEffect, useMemo } from "react";
import FullRecordsDateStep from "components/DateTimePickerModal/FullRecordsDateStep.js";
import TransferDocumentsToCompany from "components/DateTimePickerModal/TransferDocumentsToCompany.js";
import ElectricalConnectionAgreementStep from "components/DateTimePickerModal/ElectricalConnectionAgreementStep.js";
import ConfirmReceiptOfConnectionAgreementStep from "components/DateTimePickerModal/ConfirmReceiptOfConnectionAgreementStep.js";
import { ToastContainer, toast } from "react-toastify";
import MDButton from "components/MDButton";
import ProposalForAcceptanceStep from "components/DateTimePickerModal/ProposalForAcceptanceStep.js";
import CompleteTheAcceptanceTestStep from "components/DateTimePickerModal/CompleteTheAcceptanceTestStep.js";
import {useAuthUser, useSignIn} from 'react-auth-kit';
import {rolePermissionRule} from '../../authentication/sign-in/rolePermissionRule.js'

function GetNextStep({ currentStep, documentId, documentData, refreshData, role }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (methodName) => {
    if (rolePermissionRule(role,methodName))
      setOpen(true);
      else{
        toast.warning("Bạn không đủ quyền", {
          autoClose: 3000,
          closeOnClick: true,
          position: "bottom-right",
        });
      }

  };
  if (currentStep === "Xác nhận đủ HS") {
    return (
      <div>
        <MDButton
          style={{ width: "220px" }}
          variant="contained"
          color="warning"
          onClick={() => handleOpen("FullRecordsDateStep")}
        >
          {currentStep}
        </MDButton>
        <FullRecordsDateStep
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Chuyển về công ty") {
    return (
      <div>
        <MDButton
          style={{ width: "220px" }}
          variant="contained"
          color="warning"
          onClick={() => handleOpen("TransferDocumentsToCompany")}
        >
          {currentStep}
        </MDButton>
        <TransferDocumentsToCompany
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Thoả thuận Đấu nối") {
    return (
      <div>
        <MDButton
          style={{ width: "220px" }}
          variant="contained"
          color="warning"
          onClick={() => handleOpen("ElectricalConnectionAgreementStep")}
        >
          {currentStep}
        </MDButton>
        <ElectricalConnectionAgreementStep
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Nhận thỏa thuận đấu nối") {
    return (
      <div>
        <MDButton
          style={{ width: "220px" }}
          variant="contained"
          color="warning"
          onClick={() => handleOpen("ConfirmReceiptOfConnectionAgreementStep")}
        >
          {currentStep}
        </MDButton>
        <ConfirmReceiptOfConnectionAgreementStep
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Đề nghị nghiệm thu") {
    return (
      <div>
        <MDButton
          style={{ width: "220px" }}
          variant="contained"
          color="warning"
          onClick={() => handleOpen("ProposalForAcceptanceStep")}
        >
          {currentStep}
        </MDButton>
        <ProposalForAcceptanceStep
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Hoàn thành nghiệm thu") {
    return (
      <div>
        <MDButton
          style={{ width: "220px" }}
          variant="contained"
          color="warning"
          onClick={() => handleOpen("CompleteTheAcceptanceTestStep")}
        >
          {currentStep}
        </MDButton>
        <CompleteTheAcceptanceTestStep
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  return (
    <div>
      <MDButton style={{ width: "220px" }} variant="contained" color="success">
        {currentStep}
      </MDButton>
    </div>
  );
}
export default GetNextStep