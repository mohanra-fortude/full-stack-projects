
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./BreadCrumb.css"

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s: any) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb className="breadcrumbs">
          {pathnames.length > 0 ? (
            <Breadcrumb.Item className="breadcrumbs_items">
              <Link to="/">My Workspace</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>My Workspace</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item className="breadcrumbs_items">{capatilize(name)}</Breadcrumb.Item>
            ) : (
                <Breadcrumb.Item className="breadcrumbs_items">
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
