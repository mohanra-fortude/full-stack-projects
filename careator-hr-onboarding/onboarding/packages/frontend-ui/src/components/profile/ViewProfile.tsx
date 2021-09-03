import React, { useEffect, useState } from "react";
import {
  Layout,
  Modal,
  Form,
  Input,
  Space,
  notification,
  Breadcrumb,
  Tooltip,
} from "antd";
import { Row, Col, Button } from "antd";
import "./ViewProfile.css";
import styles from "../../styles/style";
import { Typography } from "antd";
import UserService from "../../services/UserService";
import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import { viewprofile_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import getUserData from "../../utils/UserData";
import { CameraFilled } from "@ant-design/icons";
import { constants } from "../../constants";

const { Content } = Layout;
const { Title } = Typography;

const ViewProfile = () => {
  const { firstName, lastName, email, role, userId } = getUserData();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [fileList, setFileList] = useState({ preview: "", raw: "" });
  const [picture, setPicture] = useState("../../../Images/avatar.jpg");
  const [profilePath, setProfilePath] = useState("");
  const [profileName, setProfileName] = useState("");
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);

  useEffect(() => {
    image();
  }, []);

  const passchanged = async () => {
    await UserService.passchange(userId, firstTimeLogin);
  };
  console.log(passchanged);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const passchange = () => {
    setFirstTimeLogin(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinished = async () => {
    try {
      const data = {
        userId: userId,
        oldPassword: oldpassword,
        newPassword: newpassword,
      };
      if (oldpassword === newpassword) {
        oldAndNewPasswordMatching("topRight");
      } else if (newpassword === confirmpassword) {
        await UserService.changePassword(data);
        Promise.resolve()
          .then(() => {
            correctPasswordNotification("topRight");
          })
          .then(() => setIsModalVisible(false));
      } else if (newpassword !== confirmpassword) {
        confirmPasswordFailureNotification("topRight");
      }
    } catch (error) {
      console.log(error);
      wrongPasswordNotification("topRight");
    }

    //passchanged();
  };

  //notification function starts here
  const correctPasswordNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Password changed successfully.!",
    });
  };

  const wrongPasswordNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Old password is not correct.!",
    });
  };

  const confirmPasswordFailureNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Passwords didn't match... try again!!",
    });
  };

  const uploadImageNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Image has been uploaded!",
    });
  };

  const oldAndNewPasswordMatching = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "old and new password matching!",
    });
  };
  const fileSelected = (placement: any) => {
    notification.info({
      message: `notification`,
      description: "Please Select new image",
    });
  };
  //notification function ends here

  //onchange function starts here
  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setFileList({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  //onchange function ends here

  //uploadfile function start here
  const uploadFile = async () => {
    if (fileList.raw) {
      const formData = await new FormData();
      await formData.append("imagefile", fileList.raw);
      const { data } = await UserService.uploadProfileImage(formData, userId);

      window.localStorage.setItem("profilePicture", data.filename);
      // await image();
      uploadImageNotification("topRight");
    } else {
      fileSelected("topRight");
    }
  };
  //upload file function ends here

  // getting image function starts here
  const image = async () => {
    let pic: any;
    if (pic !== picture) {
      const getImage = await UserService.getUploadedProfileImage();
      pic = getImage.config.url;
      if (
        getImage.config.url !==
        `${constants.BASE_URL}/auth/profile-image-from-aws/null`
      ) {
        setPicture(pic);
      }
    }
  };
  //getting image function ends here
  // image();

  useEffect(() => {
    if (role === "Admin") {
      setProfilePath(viewprofile_breadcrumbs[0].path);
      setProfileName(viewprofile_breadcrumbs[0].name);
    } else if (role === "Recruiter") {
      setProfilePath(viewprofile_breadcrumbs[1].path);
      setProfileName(viewprofile_breadcrumbs[1].name);
    } else if (role === "HR") {
      setProfilePath(viewprofile_breadcrumbs[2].path);
      setProfileName(viewprofile_breadcrumbs[2].name);
    } else if (role === "AM") {
      setProfilePath(viewprofile_breadcrumbs[3].path);
      setProfileName(viewprofile_breadcrumbs[3].name);
    } else if (role === "Leader") {
      setProfilePath(viewprofile_breadcrumbs[4].path);
      setProfileName(viewprofile_breadcrumbs[4].name);
    } else if (role === "Candidate") {
      setProfilePath(viewprofile_breadcrumbs[5].path);
      setProfileName(viewprofile_breadcrumbs[5].name);
    }
  });

  return (
    <>
      <div>
        <Layout
          style={{ marginLeft: "1.8rem", maxWidth: "95%" }}
          className="viewprofile-background"
        >
          <Breadcrumb className="breadcrumbs">
            <Breadcrumb.Item className="breadcrumbs_items">
              <Link to={profilePath}>{profileName}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>View Profile</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="site-layout-background viewContent ">
            <section className="profiles profileContent">
              <div className="profilesBody">
                <div className="imagePlace">
                  {fileList.preview ? (
                    <div className="imageMain">
                      <img
                        src={fileList.preview}
                        alt="dummy"
                        // width="300"
                        // height="300"
                        className="img"
                      />
                      <div className="Icon">
                        <label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChange(e)}
                          />
                          <Tooltip title="Choose Image">
                            <CameraFilled className="cameraIcon" />
                          </Tooltip>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="imageMain">
                      <img className="img" src={picture} />
                      <div className="Icon">
                        <label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChange(e)}
                          />
                          <Tooltip title="Choose Image">
                            <CameraFilled className="cameraIcon" />
                          </Tooltip>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="button">
                  <Button
                    onClick={uploadFile}
                    type="primary"
                    className="viewButton"
                  >
                    Upload
                  </Button>
                  <div></div>
                </div>
              </div>
              <div className="profilesBody">
                <div className="details">
                  <Title level={5} >
                    Name: {firstName} {lastName}
                  </Title>

                  <Title level={5} >
                    Role: {role}
                  </Title>
                  <Title level={5} >
                    Email: {email}
                  </Title>
                </div>
                <div className="button1">
                  <Button
                    onClick={showModal}
                    type="primary"
                    className="changeButton"
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </section>
            <Modal
              title="Change Password"
              visible={isModalVisible}
              className="passwordModal"
              onCancel={handleCancel}
              footer={[]}
            >
              <Form
                name="normal_login"
                layout="vertical"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinished}
              >
                <Form.Item
                  label="Old Password"
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please insert your old Password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter old password"
                    style={styles.borderRadius}
                    value={oldpassword}
                    onChange={(e: any) => setOldPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                    {
                      pattern: /(?=.*[A-Z])/,
                      message: "Password must contain at least one uppercase.",
                    },
                    {
                      pattern: /(?=.*[a-z])/,
                      message: "Password must contain at least one lowercase.",
                    },
                    {
                      pattern: /(?=.*[0-9])/,
                      message: "Password must contain at least one number.",
                    },
                    {
                      pattern: /(?=.*\W)/,
                      message:
                        "Password must contain at least one special character.",
                    },
                    {
                      pattern: /(?=.{8,})/,
                      message: "Password must contain minimum 8 characters.",
                    },
                    {
                      max: 16,
                      message: "Password must contain maximum 16 characters.",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Enter new password"
                    style={styles.borderRadius}
                    value={newpassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input confirm Password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Password not matching")
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Enter confirm password"
                    style={styles.borderRadius}
                    value={confirmpassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={styles.borderRadius}
                      onClick={passchange}
                    >
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default ViewProfile;
