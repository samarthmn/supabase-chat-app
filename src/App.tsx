import { useEffect, useState } from "react";
import { Col, Layout, List, Row } from "antd";
import { supabaseClient } from "./service/supabase";
import { User } from "@supabase/supabase-js";
import useAuth from "./hooks/useAuth";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";

const { Header, Content } = Layout;

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const { getSession } = useAuth();
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((auth, session) => {
      switch (auth) {
        case "SIGNED_IN":
          session?.user && setUser(session.user);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        case "USER_UPDATED":
          session?.user && setUser(session.user);
          break;
      }
    });
  }, []);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
    // eslint-disable-next-line
  }, []);
  const onLogout = () => supabaseClient.auth.signOut();
  console.log(user, "user");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "white", fontSize: "1.5rem", cursor: "pointer" }}>
          SupaBase Chat App
        </div>
        <div style={{ display: "flex" }}>
          {!user ? (
            <>
              <div
                style={{ color: "white", fontSize: "1rem", cursor: "pointer" }}
                onClick={() => setLoginModal(true)}
              >
                Login
              </div>
              <div
                style={{ color: "white", fontSize: ".9rem", padding: "0 1em" }}
              >
                or
              </div>
              <div
                style={{ color: "white", fontSize: "1rem", cursor: "pointer" }}
                onClick={() => setSignUpModal(true)}
              >
                Sign Up
              </div>
            </>
          ) : (
            <div
              style={{ color: "white", fontSize: "1rem", cursor: "pointer" }}
              onClick={onLogout}
            >
              ({user.email}) - Logout
            </div>
          )}
        </div>
      </Header>
      <Content>
        <Row justify="center" align="middle">
          <Col xs={22} sm={20} md={16}>
            <LoginModal
              isModalOpen={loginModal}
              onClose={() => setLoginModal(false)}
            />
            <SignUpModal
              isModalOpen={signUpModal}
              onClose={() => setSignUpModal(false)}
            />
            <List
              itemLayout="vertical"
              dataSource={["asd", "asdas"]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
