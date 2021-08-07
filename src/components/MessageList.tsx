import { useRef } from "react";
import { User } from "@supabase/supabase-js";
import {
  message as messageAlert,
  Col,
  List,
  Row,
  Form,
  Input,
  Button,
  Comment,
  Tooltip,
  FormInstance,
} from "antd";
import moment from "moment";
import useMessage, { MESSAGE } from "../hooks/useMessage";

const MessageList = ({ user }: { user: User | null }) => {
  const { messages, addNewMessage, increaseLimit, loading } = useMessage();
  const formRef = useRef<FormInstance>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const onNewMessage = async ({ message }: MESSAGE) => {
    if (user?.id) {
      formRef.current?.resetFields();
      await addNewMessage(user.id, message);
      listRef.current?.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "auto",
      });
    } else if (message) {
      messageAlert.error("Please Login / Sign Up", 2.5);
    } else {
      messageAlert.error("Enter Message", 2.5);
    }
  };
  return (
    <>
      <Row justify="center">
        <Col xs={15}>
          <Row justify="center" align="middle" style={{ padding: 10 }}>
            <Button onClick={increaseLimit}>Load More</Button>
          </Row>
          <Row justify="center" align="middle">
            <Col
              xs={24}
              style={{ height: "80vh", overflow: "auto" }}
              ref={listRef}
            >
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={messages}
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
                renderItem={(item, index) => (
                  <Comment
                    key={index}
                    author={item.user_id}
                    content={item.message}
                    datetime={
                      <Tooltip
                        title={moment(item.created_at).format(
                          "MMM DD YYYY, h:mm:ss A"
                        )}
                      >
                        <span>{moment(item.created_at).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Form
                ref={formRef}
                layout="vertical"
                initialValues={{ email: "", password: "" }}
                style={{ display: "flex" }}
                onFinish={onNewMessage}
              >
                <Form.Item name="message" style={{ flex: 1, margin: ".5em" }}>
                  <Input placeholder="Your Message" />
                </Form.Item>
                <Form.Item name="message" style={{ margin: ".5em" }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MessageList;
