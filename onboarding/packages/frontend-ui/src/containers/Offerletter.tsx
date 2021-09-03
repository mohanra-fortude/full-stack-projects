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

const styles: any = StyleSheet.create({
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
  date: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 400,
    color: "red",
  },
  h3: {
    fontSize: 14,
    fontWeight: "heavy",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 0.5,
    height: 20,
    fontStyle: "bold",
    border: 1,
  },
  description: {
    width: "20%",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: 8,
  },
  qty: {
    width: "40%",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: 8,
  },
  rate: {
    width: "40%",
    borderRightWidth: 1,
    paddingLeft: 8,
    textAlign: "left",
  },
  logo: {
    width: 100,
    height: 30,
    marginLeft: 30,
    marginTop: 20,
  },
  Text: {
    fontSize: 10,
    lineHeight: 2,
    letterSpacing: 1,
    fontWeight: 100,
  },
  List: {
    marginLeft: 22,
    fontSize: 10,
    lineHeight: 2,
    letterSpacing: 1,
  },
  Sublist: {
    marginLeft: 10,
    fontSize: 10,
    lineHeight: 2,
    letterSpacing: 1,
    fontWeight: 100,
  },
  Subtitle: {
    fontSize: 11,
    lineHeight: 2,
    letterSpacing: 1,
    fontWeight: 900,
  },
});

type Props = {
  pdfsave: any;
};

const Offerletter: React.FC<Props> = ({ pdfsave }) => {
  const today = new Date();

  return (
    <Document>
      <Page size="A4">
        <Image style={styles.logo} src={Logo} />
        <View style={{ margin: 30, fontSize: 11 }}>
          <Text
            style={{
              fontSize: 10,
              lineHeight: 2,
              letterSpacing: 1,
            }}
          >
            Ref: CT/APPT/2021/{pdfsave.releaseNumber}
          </Text>
          <Text
            style={{
              fontSize: 10,
              marginLeft: 400,
              letterSpacing: 1,
            }}
          >
            Date: {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
          </Text>
          <Text style={styles.Text}>{pdfsave.fullName}</Text>
          <Text style={styles.Text}>{pdfsave.location}</Text>
          <Text style={{ fontSize: 10, lineHeight: 3, letterSpacing: 1 }}>
            {pdfsave.mobile}
          </Text>

          <Text style={styles.Text}>Dear {pdfsave.fullName}</Text>
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
            Appointment with Careator Technologies Private Limited
          </Text>
          <Text style={styles.Text}>
            <p>
              {" "}
              With reference to your application and discussions with our Team,
              it is my pleasure to formally invite you onboard as a{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {pdfsave.designation}
              </Text>{" "}
              with an Annual CTC{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {pdfsave.D5} (Cost-to-Company) of .The terms conditions of
                employment are explained in Annexure I. Your Place of posting
                will be{" "}
              </Text>
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {" "}
                {pdfsave.location}.
              </Text>{" "}
              <b>{}</b>
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Text}>
            <p>
              {" "}
              We request you to join us on or before{" "}
              <Text style={{ fontWeight: 900, fontSize: 12 }}>
                {pdfsave.workStartDate}
              </Text>
              . Please note that you will be completing your joining formalities{" "}
              {pdfsave.client}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Text}>
            <p>
              {" "}
              This offer is subject to your compliance with the terms conditions
              of employment that are enclosed. Please go through the same and
              return the signed duplicate copy of this letter as a token of
              acceptance by failing which this offer letter will stand revoked.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Text}>
            <p>
              {" "}
              We at Careator Technologies are pleased to extend this offer and
              the opportunity it represents with great confidence in your
              ability. We will endeavor to provide you with outstanding
              opportunities to enhance your professional development.{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Text}>
            <p>
              Please accept my heartiest congratulations on this important
              decision in your career. All the leadership team with whom you
              have interacted here at Careator would also like to extend their
              warm welcome. It is our collective hope that you will set your
              personal and professional goals high and take full advantage of
              the many opportunities you will be given by us to realize your
              full potential.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Text}>
            <p>
              {" "}
              We are sure you will have a rewarding and exciting career with
              Careator Technologies Pvt. Ltd.
            </p>
          </Text>
          <Text style={{ marginTop: 3 }}></Text>
          <Text style={styles.Subtitle}>
            <p>Sincerely yours,</p>
          </Text>
          <Text style={{ marginTop: 3 }}></Text>
          <Text style={styles.Subtitle}>
            <p style={{ fontSize: 12 }}>
              <b>For Careator Technologies</b>
            </p>
          </Text>
          <Text style={{ marginTop: 3 }}></Text>
          <Text style={styles.Subtitle}>
            <p style={{ fontSize: 12 }}>
              <b>Aditya Damuluri</b>
            </p>
          </Text>
          <Text style={{ marginTop: 3 }}></Text>
          <Text style={styles.Subtitle}>
            <p style={{ fontSize: 12 }}>
              <b>Director</b>
            </p>
          </Text>
          <Text style={{ marginTop: 5 }}></Text>
          <Text style={styles.Text}>
            <p>
              <u>Enclosures:</u>
            </p>
          </Text>
          <Text style={styles.Text}>
            Appointment Letter Terms & Conditions (Annexure I) List of Documents
            to be furnished on joining (Annexure II) Salary Break-up (Annexure
            III)
          </Text>

          <Text style={{ backgroundColor: "#D9D9D9", marginTop: 40 }}>
            Annexure I
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Text}>
            <p style={{ fontSize: 12, textDecoration: "underline" }}>
              <u>Terms and Conditions</u>
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>1. Insurance:</Text>
          <Text style={styles.Sublist}>
            <p>
              {" "}
              You will be covered under Careator Health Insurance Policy as
              stated below:
            </p>
          </Text>
          <Text style={styles.List}>
            <p style={{ fontSize: 12 }}>
              a. General Health Insurance for Employee, Spouse and two kids
              Rs.200000
            </p>
          </Text>
          <Text style={styles.List}>
            <p style={{ fontSize: 12 }}>
              b. Accidental Insurance Coverage for employee Rs.500000
            </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              Premium on the above insurance policies is part of the CTC amount
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>2. Hours of Work: </h3>
          </Text>
          <Text style={styles.List}>
            <p>
              a. When working at client location your working conditions and
              attendance would be governed by the client policies.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              b. You are expected to submit your timesheets by end of day
              Friday.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              c. During the employment, the Employee agrees to devote all his /
              her time and attention to his / her duties during normal business
              hours, except when on leave
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              d. The Employee will also be required to work reasonable
              additional hours that are necessary for the Employee to fulfill
              the requirements of the Employee’s position.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>3. Leave: </h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              Your leaves will be governed by the leave policy of the Company.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>4. Travel:</h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              Employees are governed by the Travel policy of the Company and you
              need to refer the policy for any support is required.{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>5. Transfers: </h3>
          </Text>
          <Text style={styles.List}>
            <p>
              a. You will be assigned duties and responsibilities by Management
              from time to time and you are likely to be transferred to any
              other unit, a customer of Careator or division or places where the
              Company or its associates / Promoters have got interested or its
              affiliates from time to time. The terms and conditions of your
              transfer shall be at the discretion of the Company.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              b. In the event of transfer or deputation of your services, your
              salary and other benefits will be determined in accordance with
              the Company’s policies prevalent at that time.
            </p>
          </Text>
          <Text style={{ marginTop: 15 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>6. Salary and Performance Review</h3>
          </Text>
          <Text style={styles.List}>
            <p>
              a. Careator may formally review the Employee’s performance
              annually or at such intervals as may be decided by Careator
              Management.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              b. Any increase in the Employee’s remuneration is at the sole
              discretion of Careator subject to review of performance against
              KRA’s and KPI’s assigned.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              c. Monthly salary is processed in between 7th to 10th of every
              month for the previous month, subject to the approved timesheet
            </p>
          </Text>
          <Text style={{ marginTop: 20 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>7. Expenses</h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              The Employee is required to comply with any Policies and
              Procedures in relation to the reimbursement of expenses.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>8. Restraints:</h3>
          </Text>
          <Text style={styles.List}>
            <p>
              a. Confidentiality of information: You are required not to
              indulge, communicate or pass on any information related to a task
              assigned to you or information on any aspect of the Company to
              anyone internal or external in any form.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              b. Confidentiality of Remuneration: You are required to strictly
              maintain the secrecy of any information regarding your
              remuneration/ terms of employment to any other employee of the
              Company.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              c. Ethics: You are required to deal with the Company’s money,
              material and document (Intellectual property) with utmost honesty
              and professional ethics.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              d. Professional Devotion: Your position with the Company calls for
              whole time devotion and you devote yourselves exclusively to the
              Company. You are required not to engage yourself simultaneously,
              in any other gainful or commercial employment/ business; part-time
              or full time; directly or indirectly, as long as you are employed
              with Careator Technologies or its direct Associates. You are also
              required not to involve directly or indirectly in any other
              profitable business connected with the dealings or activities of
              the Company in any way.{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>9. paratioSen Process: </h3>
          </Text>
          <Text style={styles.List}>
            <p>
              a. An employee intending to resign from the services of the
              Company will be required to submit his/her resignation letter to
              his/her reporting manager. An employee is required to serve two
              months of the notice period in case he is a confirmed employee.
              His/her reliving from the services of the Company is subject to
              acceptance of his/her Resignation by your Reporting Manager.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              b. The Company shall have the full right to terminate your
              employment immediately without notice or payment in lieu of notice
              if:
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              i. You neglect, refuse, disobey, fail or for any reason become
              unable to perform any of your duties assigned to you from time to
              time or non-compliance with the Company policies and code of
              conduct; or
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              ii. You are guilty of any misconduct whether or not in the
              performance of your duties (including but not limited to being an
              undischarged insolvent, being convicted by any criminal court,
              being involved in fraudulent acts, etc.) or commit any act which
              in the opinion of the Company is likely to bring the Company any
              disrepute whether or not such act is directly related to the
              affairs of the Company; or
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              iii. You commit any breach of any of your duties or obligations
              under this agreement or the policies of the Company.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              iv. There is a discrepancy in the copy of the
              documents/certificates given by you as proof in support of this
              offer.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              v. Any discrepancy or misleading fact found during the background
              check that will be conducted by us or by any independent agency
              approved by the management.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>vi. You are found to be medically unfit during employment.</p>
          </Text>
          <Text style={styles.List}>
            <p>
              vii. Company may terminate the employment by giving fifteen (15)
              days’ notice in writing in the event of the Product & Services the
              Consultant is hired to get cancelled / shelved due to business
              contingency or the Contract / Agreement with the Client is
              completed / terminated.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>10. Agreements:</h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              As and when called upon to do so, you agree to sign service
              agreement(s) requiring you to serve the Company (Careator
              Technologies) for specified period(s) in the event that:
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              i. You are deputed on Company’s project/assignment anywhere in
              India or abroad and/or{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              ii. The Company gives you training for any specific purpose in
              India/Abroad. In such an event, if the specified period has not
              expired at the time and desire to leave the Company’s services,
              then your leaving the Company’s services shall be governed by the
              provisions of any such service agreement(s) signed by you. The
              service agreement(s) shall be in the form prescribed by the
              Company or future agreement(s) from time to time. The salient
              features of the said Agreement(s) are as under:
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              iii. You will be required to undergo various specialized training,
              which the Company may arrange for you from time to time
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              iv. You will be required to work on any project/assignment in
              India or abroad on which the Company may depute you from time to
              time.
            </p>
          </Text>
          <Text></Text>
          <Text style={styles.List}>
            <p>
              v. You will be required to work with the Company for a specified
              period(s) after completion of any such training and/or deputation
              to any project/assignment
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              vi. In case of breach of any of the conditions of such service
              agreement(s), you will be required to pay to the Company a
              reasonable sum as liquidated damages as specified and agreed upon
              in such service agreement.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>11. Other Terms & Conditions:</h3>
          </Text>
          <Text style={styles.List}>
            <p>
              a. Post-Employment: On leaving the services of the Company, you
              shall not take up a full-time/part-time employment with any of our
              customers and Associates for a period of 1 year, unless we share
              our approval for the same
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              b. Authorization: You are not authorized to sign any letter,
              document, and paper as the case may be on behalf of Careator
              Technologies within or beyond the purview of your role until and
              unless you have a Power of Attorney or authorization from the
              Chief Operating Officer of Careator Technologies
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              c. Smoking: We owe and assure a smoke-free environment for our
              Associates, barring some areas, the entire office premises
              including conference rooms, lobbies and cafeteria are declared as
              “No-Smoking Zones”.
            </p>
          </Text>
          <Text>
            <p></p>
          </Text>
          <Text style={styles.List}>
            <p>
              d. Passwords: Access to our network, development environment and
              e-mail is through individual’s password. For security reason it is
              essential to maintain confidentiality of the same. If the password
              is forgotten, the Network Department is to reset and allow you to
              use a new password.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              e. Security: Security is an important aspect of Careator’s
              communication and office infrastructure. You are requested to mark
              your attendance through bio-metric attendance system. You need to
              show your thump impression to check in to the office premises/
              produce your identity card on demand. If there is a need for you
              to take some of the equipment’s/ products/ infrastructure out of
              the office premises for any reason you are required to attain
              authorization from your immediate manager / Finance & Admin. You
              will not enter/indulge in any activity, which is detrimental to
              the company’s integrity, security, infrastructure, network,
              records, property tools etc.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              f. Locks and Keys: Your worktable and store place is lockable and
              all locks have two key sets. Please ensure they are locked when
              unattended. One set of the keys will be given to you, and the
              duplicate will be with the Finance & Administration department on
              occupation of workstation. For official purpose, in case of
              emergencies, your manager using the duplicate key can open your
              storage locks. Please do not leave personal belongings in the
              provided storage space.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              g. Indemnification: You agree to indemnify the Company for any
              losses or damages sustained by the Company caused by or related to
              your breach of any of the provisions contained in this Terms of
              Employment.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              h. Non-Solicitation: Careator Technologies as its policy will give
              opportunities to all in the open market and will not solicit /
              approach / pursue any job aspirants / incumbents for offering the
              jobs. Whereas, Careator offers the job/s to those incumbents / job
              aspirants approaching us and applying for the suitable job with
              his / her own interest
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>12. Confidentiality:</h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              You agree at all times as part of your employment with the
              Company, you will be imparted certain information which is
              confidential in nature to the employment and thereafter (without
              limit of time); you shall (a) hold the Confidential Information in
              strictest confidence, and not to use or attempt to use the same,
              except for the benefit of the Company, and (b) not disclose or
              divulge the Confidential Information to any person or entity
              without written authorization of the Company.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>13. Intellectual Property: </h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              You agree that any proprietary rights whatsoever, including but
              not limited to, patents, copyright and design rights as a result
              of the development of and/or the application of all work produced
              by you during or as a consequence of your employment, whether
              alone or in conjunction with others and whether during normal
              working hours or not, including but not limited to any invention,
              design, discovery or improvement, computer program, documentation,
              confidential information, copyright work or other material which
              you conceive, discover or create during or in consequence of this
              employment with the Company shall belong to the Company
              absolutely.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>14. Warranty:</h3>
          </Text>
          <Text style={styles.List}>
            <p>
              a. You warrant that your joining the Company will not violate any
              agreement to which you are or have been a party to.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              b. You warrant that you will not use or disclose any confidential
              or proprietary information obtained from a third party prior to
              your employment with the Company.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              c. You warrant that you will comply with all Careator Technologies
              policies and standards and shall perform your services in a manner
              consistent with the ethical and professional standards of Careator
              Technologies.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              d. You warrant that you possess all the requisite certificates,
              licenses, permits, work visas, clearances to be able to lawfully
              perform the services.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>
              15. Authorization to make Deductions
            </h3>
          </Text>
          <Text style={styles.List}>
            <p>
              If the Employee has Incurred any debt to Careator in the course of
              the Employment that has been satisfied when the Employment ends,
              the Employee authorizes Careator to deduct the amount from the
              Employee’s final pay (for instance, where the Employee has taken
              annual leave in advance of the leave accrual) those amounts be
              Insufficient to satisfy the debt that the Employee owes to
              Careator then such debt will become due and payable immediately.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>16. Return of Property</h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              On termination of the Employment, or at any time on request by
              Careator, the Employee must deliver to Careator:
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              a. all property belonging to or leased by Careator or an Affiliate
              in the Employee’s control, including stationery, Cheque books,
              books, documents, records, disks, access cards, keys, mobile
              telephone, computer hardware, credit cards and motor vehicle
              besides knowledge in your possession via a KT Report.{" "}
            </p>
          </Text>

          <Text style={styles.List}>
            <p>
              b. The Employee’s computer log in codes and relevant passwords.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>17. Non-Compete:</h3>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              You accept that during the term of your employment, you will not,
              or indirectly, either alone or jointly with or as manager, agent,
              consultant or employee of any person, Careator Technologies or
              company, engage yourself in any activity or business which shall
              be in competition with the business of the Company.
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <p>
              18. You shall observe and will be governed by the rules and
              regulations of the Company, the policies, rules and laws of the
              land and such other or further orders, and instructions issued by
              the Management from time to time.{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <p>
              19. The above terms and conditions of employment are based on
              Company policies, procedures and other rules currently applicable
              and subject to amendments from time to time.
            </p>
          </Text>
          <Text style={{ marginTop: 20 }}></Text>
          <Text style={styles.Subtitle}>
            {" "}
            <p>
              You are requested to report at 9:30 AM on your date of joining at
              the address confirmed by our HR and kindly submit all photo copy
              of the documents and items as listed in Annexure – II & in
              original to our HR Department for verification process. All such
              documents will be returned after verification keeping the
              photocopies of the same.{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>Date:</h3>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <p>
              I, _____________________________________________ have read,
              understand and agree to be bound by the above terms and conditions
              set forth in this appointment letter. I will join Careator
              Technologies on or before_____________________.{" "}
            </p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <p>Thanking You,</p>
          </Text>
          <Text style={{ marginTop: 10 }}></Text>
          <Text style={styles.Subtitle}>
            <p>(Name & Signature)</p>
          </Text>

          <Text style={{ backgroundColor: "#D9D9D9", marginTop: 70 }}>
            <h3>Annexure II</h3>
          </Text>
          <Text style={styles.Subtitle}>
            <p>
              The following Documents and items are to be submitted, at the time
              of joining.
            </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              1. Copy of Careator Appointment Letter – Terms and Conditions duly
              signed – Annexure I
            </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>2. Copy of Compensation Letter duly signed – Annexure III</p>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              3. All educational documents such as degree/ provisional
              certificate and mark sheets of all semesters (from 10th onwards,
              Please bring the following documents in original with one set copy
              of each document for completing the joining formalities)
            </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>4. Mandatory documents like Passport and PAN Card is a must. </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>5. Color Passport size Photographs – 2 copies</p>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              6. Previous employment service certificates, employment offer,
              release letter, current company offer letter, last three months’
              payslips or Bank statement for the last 3 months, and Form 16/
              Income Certificate
            </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              7. Date of Birth & Identity Proof: You must carry and provide your
              Date of Birth Proof - either 10th class marks sheet or Aadhaar
              Card
            </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>
              8. Address Proof: You must carry and provide your Address Proof
              for Permanent and Temporary as applicable - either Passport copy
              or Aadhaar card{" "}
            </p>
          </Text>
          <Text style={styles.Sublist}>
            <p>9. BGV Authorization form</p>
          </Text>
          <Text style={styles.Sublist}>
            <p>10. Any other relevant certificates/documents</p>
          </Text>
          <Text style={styles.Sublist}>
            <p>11. PF details along with the UAN number.</p>
          </Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>
              Your offer has been made based on the information furnished by
              you. However, if there is a discrepancy in the copies of the
              documents/certificates given by you as proof in support of the
              above, the Company reserves the right to revoke the Offer of
              Appointment.
            </h3>
          </Text>
          <Text style={{ backgroundColor: "#D9D9D9", marginTop: 330 }}>
            <h3>Annexure III</h3>
          </Text>
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              textDecoration: "underline",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            SALARY STRUCTURE
          </Text>
          <Text style={{ marginTop: 20 }}></Text>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>Associate Name</Text>
            <Text style={styles.rate}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>Associate Designation</Text>
            <Text style={styles.rate}>{pdfsave.designation}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>Associate Id</Text>
            <Text style={styles.rate}>{pdfsave.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>Annual Emoluments</Text>
            <Text style={styles.rate}>{pdfsave.D5}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>Gross Salary / Month</Text>
            <Text style={styles.rate}>{pdfsave.D6}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>EARNINGS</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>A</Text>
            <Text style={styles.qty}>Basic</Text>
            <Text style={styles.rate}>{pdfsave.D9}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>B</Text>
            <Text style={styles.qty}>H R A</Text>
            <Text style={styles.rate}>{pdfsave.D10}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>C</Text>
            <Text style={styles.qty}>Transport</Text>
            <Text style={styles.rate}>{pdfsave.D11}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>D</Text>
            <Text style={styles.qty}>Medical Allowance</Text>
            <Text style={styles.rate}>{pdfsave.D12}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>E</Text>
            <Text style={styles.qty}>PF(Employer Contribution)</Text>
            <Text style={styles.rate}>{pdfsave.D13}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>F</Text>
            <Text style={styles.qty}>Special Allowance</Text>
            <Text style={styles.rate}>{pdfsave.D14}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>Cost - To - Company = Sum (A : F)</Text>
            <Text style={styles.rate}>{pdfsave.D15}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>DEDUCTIONS</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>A</Text>
            <Text style={styles.qty}>Professional Tax</Text>
            <Text style={styles.rate}>{pdfsave.D18}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>B</Text>
            <Text style={styles.qty}>PF</Text>
            <Text style={styles.rate}>{pdfsave.D19}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}>C</Text>
            <Text style={styles.qty}>Insurance</Text>
            <Text style={styles.rate}>{pdfsave.D20}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>Total Deduction</Text>
            <Text style={styles.rate}>{pdfsave.D21}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.qty}>
              Net Take Home = (Earnings - Deductions)
            </Text>
            <Text style={styles.rate}>{pdfsave.D23}</Text>
          </View>
          <Text style={{ marginTop: "5rem" }}></Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3> </h3>
            </Text>
          </Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3>NOTE: </h3>
            </Text>
          </Text>
          <Text style={styles.List}>
            <Text>
              <p>
                (1) All payments would be as per the company's rules and
                regulations and administrative procedures.
              </p>
            </Text>
          </Text>
          <Text style={styles.List}>
            <Text>
              <p>
                (1) All payments would be as per the company's rules and
                regulations and administrative procedures.
              </p>
            </Text>
          </Text>
          <Text style={styles.List}>
            <p>
              (2) The above Salary is subjective to leaves availed. Leaves are
              as per the HR Policy.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (3) Eligible for 1 Earned Leave for the Month Completed excluding
              Joining Month.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>(4) Not more than 2 EL can be availed in a month. </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (5) All payments are subject to Tax Deduction at Source,
              appropriate documents to be produced for Tax Exemption.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (6) Basic + Special Allowance + Performance Incentive are Taxable
              Components.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>(7) Basic is 40% of Monthly CTC and HRA is 40% of Basic.</p>
          </Text>
          <Text style={styles.List}>
            <p>
              (8) House Rent Allowance will be taxable in case Housing Loan
              benefits are being availed for IT exemption. Bills to be produced.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (9) Medical Allowance is up to Rs. 15,000.00 per annum maximum
              permissible as per Income Tax Rule. Bills to be produced.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (10) Conveyance Allowance is up to Rs. 19,200.00 per annum maximum
              permissible as per Income Tax Rule. Bills to be produced.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (11) Employee & Employer contribution to PF is calculated on 15%
              of your basic (with a cap of Rs.15000 of basic) as per the PF ACT.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (12) Medical Insurance is Mandatory for all Employees and Optional
              to Add Spouse and up to 2 Children. GMI is a part of CTC.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>(13) Professional Tax is as per the prevailing slabs.</p>
          </Text>
          <Text style={styles.List}>
            <p>
              (14) An appropriate TDS Declaration is to be provided with proof
              else the total income is subjected to Income Tax Calculation.
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (15) The salary structure is liable for modification from time to
              time.{" "}
            </p>
          </Text>
          <Text style={styles.List}>
            <p>
              (16) Monthly compensation is processed on or before 10th of the
              Month for the previous month, subject to the approved timesheet.{" "}
            </p>
          </Text>
          <Text style={styles.Subtitle}>
            <Text>
              {" "}
              <h3> </h3>
            </Text>
          </Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>For Careator Technologies </h3>
          </Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>Aditya Damuluri </h3>
          </Text>
          <Text style={styles.Subtitle}>
            <h3 style={{ fontSize: 12 }}>Director </h3>
          </Text>
          <Text
            style={{
              marginLeft: 300,
              marginTop: -70,
              fontSize: 10,
              lineHeight: 2,
              letterSpacing: 1,
              fontWeight: 100,
            }}
          >
            <h3 style={{ fontSize: 12 }}>
              Employee Signature with Name and Date{" "}
            </h3>
          </Text>
          <Text
            style={{
              marginLeft: 300,
              lineHeight: 2,
              letterSpacing: 1,
              fontWeight: 100,
            }}
          >
            <h3> ------------------------------------------------</h3>
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Offerletter;
