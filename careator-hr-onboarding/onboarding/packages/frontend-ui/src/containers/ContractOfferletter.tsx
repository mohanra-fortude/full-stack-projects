import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import Logo from "../images/Logo.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  PDFViewer: {
    width: 800,
    height: 500,
  },
  Text: {
    fontSize: 10,
    lineHeight: 2,
    letterSpacing: 1,
    fontWeight: 100,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 30,
    marginLeft: 80,
    marginTop: 20,
  },
  List: {
    marginLeft: 22,
    fontSize: 10,
    lineHeight: 2,
    letterSpacing: 1,
  },
  Subtitle: {
    fontSize: 12,
    lineHeight: 2,
    letterSpacing: 1,
    fontWeight: "bold",
    marginTop: 12,
  },

  h3: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

type Props = {
  contractpdf: any;
};

const ContractOfferletter: React.FC<Props> = ({ contractpdf }) => {
  return (
    <Document>
      <Page size="A4">
        <Image style={styles.image} src={Logo} />
        <View style={{ margin: 30, fontSize: 11 }}>
          <Text
            style={{
              marginTop: 25,
              textAlign: "center",
              textDecoration: "underline",
              fontSize: 12,
              fontWeight: "bold",
              lineHeight: 3,
            }}
          >
            {" "}
            STATEMENT OF WORK (SOW)
          </Text>
          <Text style={{ marginTop: 10 }}></Text>

          <Text style={styles.Text}>
            <p>
              This Statement of Work (“SOW”), entered into as of{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {contractpdf?.workStartDate}
              </Text>
              (“Effective Date”) by and between A. Careator Technologies Private
              Limited, (hereinafter referred as ‘Careator’) a company duly
              incorporated under the Companies Act, 1956, having its Registered
              Office at RAM SVR, Plot # 4/2 Sector 1, HUDA Techno Enclave,
              Madhapur, Hyderabad – 500 081, Telangana, India, and B.{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {contractpdf?.fullName}{" "}
              </Text>{" "}
              , Age holding PAN{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {contractpdf?.panCard}
              </Text>{" "}
              and permanent residence address is{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {contractpdf?.location}
              </Text>{" "}
              hereinafter referred as{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                ‘Consultant’
              </Text>
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3>ENGAGEMENT </h3>
          </Text>
          <Text style={styles.Text}>
            <p>
              This is a contract for services, under which Consultant agrees to
              provide professional and technical services specified herewith for
              Careator Client,{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {contractpdf?.client}.
              </Text>{" "}
              For the avoidance of doubt there is no contractual relationship
              between the Consultant and Client of Careator; Client has agreed
              to engage from Careator the Services of Consultant, for the
              purposes of and limited to the Project, and Careator has agreed to
              engage the Consultant to provide the Services.
            </p>
          </Text>
          <Text style={styles.Subtitle}>
            <h3>1. RESPONSIBILITIES: </h3>
          </Text>
          <Text style={styles.List}>
            <p>
              • Consultant would follow the development process defined by
              Client{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Consultant to share timesheets of tasks performed weekly or as
              and when requested with Careator SPOC{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Consultant will give minimum of 3 working days’ notice for any
              leave requests{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Client Project Manager would assign the tasks to the Consultant
              as per the requirements of the project{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Client Project Manager would monitor and track the progress of
              the project{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>• Client shall be responsible for the following: </p>
          </Text>
          <Text style={styles.List}>
            <p>
              o Provide reasonable access and assistance necessary for provision
              of Services.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              o Provide reading manuals, executive summaries, or any other
              necessary documentation at the time of initiation of the Services
              so that Contractor may perform the Services.{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 120 }}></Text>
          <Text style={styles.Subtitle}>
            <h3>2. ENGAGEMENT DETAILS </h3>
          </Text>
          <Text style={styles.List}>
            <p>
              • Project Start Date :
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {contractpdf?.workStartDate}{" "}
              </Text>
            </p>
          </Text>
          <Text style={styles.List}>
            <p>• Project End Date : </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Rate per Month :
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {contractpdf?.D6}
              </Text>{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>• Taxes and Other Levies : Statutory Taxes as applicable </p>
          </Text>
          <Text style={styles.List}>
            <p>• Work Timings : As per Client Request </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Working Hours : Minimum 8 Hours / Man Day or 40 Hours / Man Week{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>• Work Days : Monday to Friday </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Leaves & Holidays : Eligible for 1 Leave per Month. Holidays as
              per Client Holiday{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>• Work Location : Remote</p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3>3. PAYMENT TERMS</h3>
          </Text>
          <Text style={styles.List}>
            <p>
              • Consultant to submit approved timesheet by 03rd of the month for
              the previous month.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Consultant will be paid on or before 10th of following month for
              the previous month efforts.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Any reimbursements of expenses shall be made only if prior
              approval of Client is obtained and on submission of relevant
              supporting documents{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3>4. TERMINATION</h3>
          </Text>
          <Text style={styles.Text}>
            <p>
              Where the Consultant decides to terminate the SOW, including for
              convenience, Consultant must submit, in writing, a fifteen (15)
              calendar day written notice to Careator. In such an event
              following activities shall be performed during the termination
              notice period{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Consultant will deliver all services completed or in progress up
              to the date of termination.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Subject to payment obligations on a pro-rata basis for
              performance of ongoing SOW(s) when the termination for convenience
              occurs the Consultant shall return all Client property,
              Confidential Information, Work Product and Intellectual Property.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              • Consultant shall cooperate with Client to develop a
              comprehensive plan for transferring the Services back to the
              Client.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>Careator may terminate this SOW without notice for </p>
          </Text>
          <Text style={styles.List}>
            <p>• material breach of the contract </p>
          </Text>

          <Text style={styles.List}>
            <p>• insolvency of Careator or Client </p>
          </Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3> </h3>
            </Text>
          </Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3> </h3>
            </Text>
          </Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3> </h3>
            </Text>
          </Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3> </h3>
            </Text>
          </Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3> </h3>
            </Text>
          </Text>
          <Text style={styles.Text}>
            <h3>5. GENERAL </h3>
          </Text>
          <Text style={styles.Text}>
            <p>
              1. Leaves: Consultant to forecast and obtain approval from Client
              at least 3 working days prior for all planned leaves unless leaves
              taken on medical or personal emergency, which needs to be informed
              immediately by mail and later necessary proofs may have to be
              produced as applicable{" "}
            </p>
          </Text>
          <Text style={styles.Text}>
            <p>
              2. Force majeure: If a party is obstructed in performing any of
              its obligations by an event outside its reasonable control, then
              performance to the extent obstructed is suspended for so long as
              the obstruction continues. Whilst performance has been suspended
              for more than 7 days, either party may terminate the Contract by
              immediate written notice.{" "}
            </p>
          </Text>
          <Text style={styles.Text}>
            <p>
              3. Waiver: Failure to enforce any of these terms is not a waiver
              of a party’s rights and shall not prejudice its rights to take
              action in respect of the same or any later breach.{" "}
            </p>
          </Text>
          <Text style={styles.Text}>
            <p>
              4. Severability: Any part of a Term which is wholly or partially
              void, invalid, or unenforceable shall be severed from the
              remainder (which remains enforceable).{" "}
            </p>
          </Text>
          <Text style={styles.Text}>
            <p>
              5. Notices: Any notice to be given by either party to the other
              shall be in writing, may be sent a) by recorded delivery, and
              shall be deemed served 2 days after posting, or b) by email.{" "}
            </p>
          </Text>
          <Text style={styles.Text}>
            <p>
              (a) Law: These terms shall be construed and governed by the laws
              of India and the State of Telangana, and both parties’ further
              consent to jurisdiction and courts of Hyderabad and Secunderabad.{" "}
            </p>
          </Text>
          <Text style={styles.Subtitle}>
            <h3>
              SIGNING PROVISIONS Signed by Consultant with legal signature on
              the Effective Date{" "}
            </h3>
          </Text>
          <Text style={styles.Text}>
            <h3>Signed on behalf of Careator on the Effective Date by </h3>
          </Text>
          <Text style={styles.Text}>
            <Text style={{ fontWeight: 900, fontSize: 12 }}>
              {" "}
              {contractpdf?.fullName}
            </Text>
          </Text>
          <Text style={styles.Text}>
            <h3>Consultant </h3>
          </Text>

          <Text
            style={{
              marginLeft: 400,
              marginTop: -50,
              fontSize: 10,
              lineHeight: 2,
              letterSpacing: 1,
              fontWeight: 100,
            }}
          >
            <h3>Aditya Damuluri </h3>
          </Text>
          <Text
            style={{
              marginLeft: 400,
              lineHeight: 2,
              letterSpacing: 1,
              fontWeight: 100,
            }}
          >
            <p>Director </p>
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ContractOfferletter;
