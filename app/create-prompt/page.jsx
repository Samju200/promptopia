"use client";

import { useState } from "react";
("react");
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [sumbitting, setSumbitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setSumbitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setSumbitting(false);
    }
  };
  return (
    <Form
      type="Create"
      handleSubmit={createPrompt}
      post={post}
      setPost={setPost}
      sumbitting={sumbitting}
    />
  );
};

export default CreatePrompt;
