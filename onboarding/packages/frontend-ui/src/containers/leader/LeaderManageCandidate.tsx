import { Component } from "react";
import Layout from "antd/lib/layout/layout";
import { Breadcrumb } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "../../styles/RecuriterManageCandidatesStyle";
import { leader_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";
import CandidateActionForLeader from "../../components/CandidateActionForLeader";
import CandidateTableForAll from "../../components/CandidateTableForAll";

type Props = {} & RouteComponentProps;

class LeaderManageCandidate extends Component<Props> {
  render() {
    return (
      <>
        <Layout style={styles.layout}>
          <Breadcrumb className="breadcrumbs">
            <Breadcrumb.Item className="breadcrumbs_items">
              <Link to={leader_breadcrumbs[0].path}>
                {leader_breadcrumbs[0].name}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{leader_breadcrumbs[2].name}</Breadcrumb.Item>
          </Breadcrumb>

          <div style={styles.searchaAndAddButton}>
            <CandidateTableForAll action={CandidateActionForLeader} />
          </div>
        </Layout>
      </>
    );
  }
}

export default withRouter(LeaderManageCandidate);