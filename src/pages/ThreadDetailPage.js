import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchThreadById,
  createComment,
  vote,
} from "../features/threads/threadsSlice";
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";
import Loading from "../components/Loading";
import { formatDate } from "../utils/date";
import "./ThreadDetailPage.css";

const ThreadDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { threadId } = useParams();
  const {
    selectedThread, selectedStatus, actionStatus, error,
  } = useSelector(
    (state) => state.threads,
  );
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (threadId) {
      dispatch(fetchThreadById(threadId));
    }
  }, [dispatch, threadId]);

  const handleCommentSubmit = async ({ content }) => {
    try {
      await dispatch(createComment({ threadId, content })).unwrap();
      await dispatch(fetchThreadById(threadId));
    } catch (err) {
      // handled by slice
    }
  };

  const handleVote = async (voteType, commentId = null) => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(vote({ threadId, commentId, voteType })).unwrap();
      await dispatch(fetchThreadById(threadId));
    } catch (err) {
      // handled by slice
    }
  };

  const getVoteStatus = (item) => {
    if (!auth.user) return 0;
    if (item.upVotesBy?.includes(auth.user.id)) return 1;
    if (item.downVotesBy?.includes(auth.user.id)) return -1;
    return 0;
  };

  if (selectedStatus === "loading") {
    return <Loading />;
  }

  if (!selectedThread) {
    return (
      <p className="error-message">
        Thread tidak ditemukan atau sedang dimuat.
      </p>
    );
  }

  return (
    <main className="thread-detail-page">
      <article className="thread-detail-card">
        <header>
          <h1>{selectedThread.title}</h1>
          <p className="thread-detail-meta">
            {formatDate(selectedThread.createdAt)} •{" "}
            {selectedThread.category || "General"}
          </p>
        </header>
        <div className="thread-detail-owner">
          {selectedThread.owner?.avatar && (
            <img
              src={selectedThread.owner.avatar}
              alt={selectedThread.owner.name}
            />
          )}
          <div>
            <strong>{selectedThread.owner?.name || "Pengguna"}</strong>
            <span>{selectedThread.totalComments} komentar</span>
          </div>
        </div>
        <section className="thread-detail-body">
          <p>{selectedThread.body}</p>
        </section>
        <div className="thread-detail-actions">
          <button
            type="button"
            className={getVoteStatus(selectedThread) === 1 ? "active" : ""}
            onClick={() => handleVote(1)}
          >
            Upvote ({selectedThread.upVotesBy.length})
          </button>
          <button
            type="button"
            className={
              getVoteStatus(selectedThread) === -1 ? "active negative" : ""
            }
            onClick={() => handleVote(-1)}
          >
            Downvote ({selectedThread.downVotesBy.length})
          </button>
          <button type="button" onClick={() => handleVote(0)}>
            Netral
          </button>
        </div>
      </article>

      <section className="thread-comments-section">
        <h2>Komentar</h2>
        {selectedThread.comments.length === 0 && (
          <p>Belum ada komentar. Jadilah yang pertama berpartisipasi.</p>
        )}
        {selectedThread.comments.map((comment) => (
          <div key={comment.id} className="thread-comment-card">
            <CommentItem comment={comment} />
            <div className="comment-actions">
              <button
                type="button"
                className={getVoteStatus(comment) === 1 ? "active" : ""}
                onClick={() => handleVote(1, comment.id)}
              >
                Upvote ({comment.upVotesBy.length})
              </button>
              <button
                type="button"
                className={
                  getVoteStatus(comment) === -1 ? "active negative" : ""
                }
                onClick={() => handleVote(-1, comment.id)}
              >
                Downvote ({comment.downVotesBy.length})
              </button>
              <button type="button" onClick={() => handleVote(0, comment.id)}>
                Netral
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="comment-form-area">
        {auth.token ? (
          <CommentForm
            onSubmit={handleCommentSubmit}
            status={actionStatus}
            error={error}
          />
        ) : (
          <div className="login-prompt">
            <h2>Login untuk berkomentar</h2>
            <p>Masuk supaya bisa berpartisipasi dan memberi tanggapan.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ThreadDetailPage;
