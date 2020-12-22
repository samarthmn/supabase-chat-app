import { useRef } from "react";
import { User } from "@supabase/supabase-js";
import { Col, List, Row, Form, Input, Button } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import useMessage, { MESSAGE } from "../hooks/useMessage";

const MessageList = ({ user }: { user: User | null }) => {
  const { messages, addNewMessage, increaseLimit, loading } = useMessage();
  const formRef = useRef<any>();
  const onNewMessage = ({ message }: MESSAGE) => {
    formRef.current.resetFields();
    user?.id && addNewMessage(user.id, message);
  };
  return (
    <Row justify="center" align="middle">
      <Col xs={22} sm={20} md={16}>
        <InfiniteScroll loadMore={increaseLimit} hasMore={false}>
          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={messages}
            style={{
              height: "80vh",
              display: "flex",
              flexDirection: "column-reverse",
            }}
            renderItem={(item, index) => {
              return (
                <>
                  {index === 0 && (
                    <List.Item style={{ placeContent: "center" }}>
                      <Button onClick={increaseLimit}>Load More</Button>
                    </List.Item>
                  )}
                  <List.Item>
                    <List.Item.Meta
                      title={item.message}
                      description={`${new Date(
                        item.created_at
                      ).toLocaleDateString()}, ${new Date(
                        item.created_at
                      ).toLocaleTimeString()}`}
                      style={
                        item.user_id === user?.id ? { textAlign: "end" } : {}
                      }
                    />
                  </List.Item>
                </>
              );
            }}
          />
        </InfiniteScroll>
        <Form
          ref={(e) => (formRef.current = e)}
          layout="vertical"
          initialValues={{ email: "", password: "" }}
          wrapperCol={{ style: { textAlign: "center" } }}
          style={{ display: "flex" }}
          onFinish={onNewMessage}
        >
          <Form.Item
            name="message"
            style={{ width: "100%", margin: "0em 1em" }}
          >
            <Input placeholder="Your Message" />
          </Form.Item>
          <Form.Item name="message">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default MessageList;
