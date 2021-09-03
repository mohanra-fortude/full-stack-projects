import DocumentService from "../../services/DocumentService";
import FileSaver from "file-saver";

async function downloadFile(fileName: string, candUserId: string) {
  const file = await DocumentService.getDocument(fileName, candUserId);
  FileSaver.saveAs(`${file.config.url}`);
}

function setDocStatus(role: string, status: string, remark: string) {
  let statusInfo = { status: "", remarks: "" };
  if (status === "approved") {
    if (role === "HR") statusInfo.status = "HRA";
    else if (role === "Recruiter") statusInfo.status = "RA";
    statusInfo.remarks = remark;
  }
  if (status === "rejected") {
    if (role === "Recruiter") statusInfo.status = "RR";
    else if (role === "HR") statusInfo.status = "HRR";
    statusInfo.remarks = remark;
  }
  return statusInfo;
}

export { downloadFile, setDocStatus };
