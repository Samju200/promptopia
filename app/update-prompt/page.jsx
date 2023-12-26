"use client";

import { useState, useEffect } from "react";
("react");

import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [sumbitting, setSumbitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const respose = await fetch(`/api/prompt/${promptId}`);
      const data = await respose.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSumbitting(true);
    if (!promptId) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
      type="Edit"
      handleSubmit={updatePrompt}
      post={post}
      setPost={setPost}
      sumbitting={sumbitting}
    />
  );
};

export default EditPrompt;
