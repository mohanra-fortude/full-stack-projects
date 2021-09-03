import { Component } from "react";
import Layout from "antd/lib/layout/layout";
import { Breadcrumb } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "../../styles/RecuriterManageCandidatesStyle";
import CandidateActionForHr from "../../components/CandidateActionForHr";
import CandidateTableForAll from "../../components/CandidateTableForAll";

type Props = {} & RouteComponentProps;

class HrManageCandidate extends Component<Props> {
  render() {
    return (
      <>
        <Layout style={styles.layout}>
          <Breadcrumb style={styles.breadcrumb}>
            <Breadcrumb.Item>
              <Link to="/hr/workspace">My Workspace</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Manage Candidates</Breadcrumb.Item>
          </Breadcrumb>

          <div style={styles.searchaAndAddButton}>
            <CandidateTableForAll action={CandidateActionForHr} />
          </div>
        </Layout>
      </>
    );
  }
}

export default withRouter(HrManageCandidate);
