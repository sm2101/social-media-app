import React, { useState } from "react";
import { Popover, Badge, Tabs, List, Avatar } from "antd";
import { Link } from "react-router-dom";
import { isEmpty } from "../../Validators/Validators";
import { migrateAll } from "../../Functions/notif";
const { TabPane } = Tabs;

const Notifications = ({
  newNotif,
  readNotif,
  getNotifications,
  placement,
}) => {
  const [visible, setVisible] = useState(false);
  const markAsRead = () => {
    migrateAll()
      .then((res) => {
        getNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVisibleChange = () => {
    if (visible && newNotif.length > 0) {
      markAsRead();
    }
    setVisible(!visible);
  };
  const extra = {
    right: (
      <button className="btn text-muted" onClick={getNotifications}>
        <i className="fas fa-sync-alt"></i>
      </button>
    ),
  };
  const content = (
    <div className="notif-popover">
      <div className="row">
        <Tabs
          defaultActiveKey="1"
          animated={true}
          centered
          size="small"
          tabBarExtraContent={extra}
        >
          <TabPane tab="New" key="1">
            <div className="notif-cont">
              {isEmpty(newNotif) ? (
                <p className="text-muted text-center">No new Notifications</p>
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={newNotif}
                  renderItem={(item) => (
                    <Link
                      to={
                        item.postId
                          ? `/post/${item.postId}`
                          : `/user/${item.user._id}`
                      }
                    >
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar src={item.user.image}>
                              {item.user.username[0].toUpperCase()}
                            </Avatar>
                          }
                          title={`${item.user.username}`}
                          description={
                            item.type === "followed"
                              ? "Followed You"
                              : `${item.type} your post`
                          }
                        />
                      </List.Item>
                    </Link>
                  )}
                ></List>
              )}
            </div>
          </TabPane>
          <TabPane tab="Read" key="2">
            <div className="notif-cont">
              {isEmpty(readNotif) ? (
                <p className="text-muted text-center">No Notifications</p>
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={readNotif}
                  renderItem={(item) => (
                    <Link
                      to={
                        item.postId
                          ? `/post/${item.postId}`
                          : `/user/${item.user._id}`
                      }
                    >
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar src={item.user.image}>
                              {item.user.username[0].toUpperCase()}
                            </Avatar>
                          }
                          title={`${item.user.username}`}
                          description={
                            item.type === "followed"
                              ? "Followed You"
                              : `${item.type} your post`
                          }
                        />
                      </List.Item>
                    </Link>
                  )}
                ></List>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      placement={placement || "bottomRight"}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <button className="btn">
        <Badge count={newNotif && newNotif.length} size="small">
          <i className="fas fa-bell"></i>
        </Badge>
      </button>
    </Popover>
  );
};

export default Notifications;
