import { Component } from "react";
import Layout from "antd/lib/layout/layout";
import { Breadcrumb } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "../../styles/RecuriterManageCandidatesStyle";
import CandidateTableForAll from "../../components/CandidateTableForAll";
import CandidateActionForAm from "../../components/CandidateActionForAm";
import { account_manager_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";

type Props = {} & RouteComponentProps;

class AmManageCandidates extends Component<Props> {
  render() {
    return (
      <>
        <Layout style={styles.layout}>
          <Breadcrumb className="breadcrumbs">
            <Breadcrumb.Item className="breadcrumbs_items">
              <Link to={account_manager_breadcrumbs[0].path}>
                {account_manager_breadcrumbs[0].name}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {account_manager_breadcrumbs[2].name}
            </Breadcrumb.Item>
          </Breadcrumb>

          <CandidateTableForAll action={CandidateActionForAm} />
        </Layout>
      </>
    );
  }
}

export default withRouter(AmManageCandidates);
