import { useEffect, useState } from "react";
import { Col, Layout, List, Row, Form, Input } from "antd";
import { supabaseClient } from "./service/supabase";
import { User } from "@supabase/supabase-js";
import useAuth from "./hooks/useAuth";
import Header from "./components/Header";
import MessageList from "./components/MessageList";

const { Content } = Layout;

const App = () => {
  const [user, setUser] = useState<User | null>(null);
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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header user={user} />
      <Content>
        <MessageList user={user} />
      </Content>
    </Layout>
  );
};

export default App;
