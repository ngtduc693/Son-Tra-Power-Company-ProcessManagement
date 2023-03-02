import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { Link } from 'react-router-dom';
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css";
import { COLUMNS } from "./columnsReport.js";
import { db, addData } from "../../authentication/components/firebase.js";
import { convertTimestampToDate, convertDateTimeToString } from "../../../components//utils.js";
import { collection, getDocs, query } from "firebase/firestore";
import MDBox from "components/MDBox";
import "../../../assets/theme/styles.css"
import MDButton from "components/MDButton/index.js";
const ReportDocument = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const gridStyle = useMemo(() => ({ height: '700px', width: '100%' }), []);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState(COLUMNS);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    //editable: true,
    sortable: true,
    filter: true,
    resizable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  }));

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Group',
      minWidth: 170,
      field: 'athlete',
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);
  async function getDocuments() {
    const q = query(collection(db, "Documents"));
    const querySnapshot = await getDocs(q);
    const docData = [];
    querySnapshot.forEach((doc) => {
      docData.push(doc.data());
    });
    return docData;
  }
  
  async function fetchData() {
    const docData = await getDocuments();
    const data = await docData.map((current) => {
      return {
        ...current,
        TepDinhKemLucTaoHoSo: [{name: "Xem tệp khi tạo hồ sơ" , link: current.TepDinhKemLucTaoHoSo},{name: "Xem tệp khi chuyển về phòng" , link: current.TepDinhKemChuyenVePKT},
        {name: "Xem tệp khi tạo hồ sơ thoả thuận" , link: current.TepDinhKemHoSoThoaThuan}, {name: "Xem tệp nhận thoả thuận" , link: current.TepDinhKemNgayNhanThoaThuan}, 
        {name: "Xem tệp khi nghiệm thu" , link: current.TepDinhKemNgayDeNghiNghiemThu}, {name: "Xem tệp khi hoàn thành nghiệm thu" , link: current.TepDinhKemNgayHoanThanhNghiemThu}],
        
      };
    });

    setRowData(data);
  }
  // Example load data from sever
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MDBox style={containerStyle} mt={1} mb={2}>
      <MDBox mb={2}>
      <MDButton mb={2} onClick={onBtnExport} color="primary">Xuất báo cáo</MDButton>
      </MDBox>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-material" style={gridStyle}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          sideBar={'columns'}
          suppressExcelExport={true}
          autoGroupColumnDef={autoGroupColumnDef}
          rowGroupPanelShow={'always'}
          pivotPanelShow={'always'}
          pagination={true}
        />
      </div>
    </MDBox>
  );
};
export default ReportDocument;

