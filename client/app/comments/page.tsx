"use client";
import io from "socket.io-client";
import { TextField, Button } from "@mui/material";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollableFeed from "react-scrollable-feed";

const socket = io("http://localhost:5000");

const CommentsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [comments, setComments] = useState<
    { username: string; comment: string; id: string; timestamp: string }[]
  >([]);
  const scrollTopRef = useRef<HTMLDivElement>(null);

  const formatToTime = (timestamp: string): string => {
    const date = new Date(timestamp); // Convert the string to a Date object
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    // console.log(user);

    if (!user) {
      router.push("/"); // Redirect to login if user is not authenticated
      return;
    }

    const fetchComments = async () => {
      const { data } = await api.get("/comments");
      setComments(data);
    };

    fetchComments();

    socket.on("new_comment", (comment) => {
      setComments((prev) => [comment, ...prev]);
      scrollTopRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      socket.off("new_comment");
    };
  }, [router, user]);


  useEffect(() => {
    if (comments.length > 0) {
      scrollTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  return (
    <div className="h-screen w-screen overflow-auto">
      <div className="flex flex-col h-full px-9 overflow-x-hidden">
        <CommentINput />
        <div className="grow max-h-full flex w-full flex-col overflow-y-hidden">
          <ScrollableFeed>
            <div
              ref={scrollTopRef}
              className="w-0 h-0 pointer-events-none"
            ></div>
            <div className="flex flex-col gap-3 justify-end min-h-full">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={` bg-gray-200 rounded-lg py-1 px-3 `}
                >
                  <div className="flex gap-2 items-baseline">
                    <strong className=" text-sm">{comment.username}</strong>{" "}
                    <span className=" text-xs">
                      {formatToTime(comment.timestamp)}
                    </span>
                  </div>
                  {/* <em>{new Date(comment.timestamp).getTime().toLocaleString()}</em> */}
                  <p className=" text-[15px]">{comment.comment}</p>
                </div>
              ))
              
              }
            </div>
          </ScrollableFeed>
        </div>
      </div>
    </div>
  );
};

const CommentINput = () => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");

  const handlePostComment = async () => {
    try {
      const { data } = await api.post("/comments", {
        username: user?.username,
        comment: newComment,
      });
      socket.emit("new_comment", data); // Notify others via Socket.IO
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };
  const handlePostOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("entered");
      handlePostComment();
    }
  };
  return (
    <div className="flex gap-2 w-full my-6">
      <TextField
        label="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
        //   margin="normal"
        className="grow"
        onKeyDown={handlePostOnEnter}
      />
      <Button variant="contained" color="primary" onClick={handlePostComment}>
        Post
      </Button>
    </div>
  );
};

export default CommentsPage;
