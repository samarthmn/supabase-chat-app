import { useEffect, useState } from "react";
import { supabaseClient } from "../service/supabase";
import { v4 as uuidv4 } from "uuid";

export type MESSAGE = {
  id: string;
  message: string;
  user_id: string;
  created_at: string;
};

const useMessage = () => {
  const [messages, setMessages] = useState<MESSAGE[]>([]);
  const [limit, setLimit] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabaseClient.from("messages").on("INSERT", handleInsert).subscribe();
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    supabaseClient
      .from("messages")
      .select()
      .order("created_at", { ascending: false })
      .limit(limit)
      .then((data) => {
        setLoading(false);
        if (!data.error && data.data) {
          data.data.reverse();
          setMessages(data.data);
        }
      });
  }, [limit]);

  const handleInsert = (payload: { new: MESSAGE }) => {
    setMessages([...messages, payload.new]);
  };

  const addNewMessage = async (user_id: string, message: string) => {
    const { data, error } = await supabaseClient
      .from("messages")
      .insert([{ id: uuidv4(), user_id, message }]);
    return { data, error };
  };

  const increaseLimit = () => {
    setLimit(limit + 5);
  };

  return {
    loading,
    messages,
    addNewMessage,
    increaseLimit,
  };
};

export default useMessage;
