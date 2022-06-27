import { Pagination, Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IReview, IRootState } from "../../types";
import Loader from "../extras/Loader/Loader";
import "./ReviewList.scss";

const Review = (review: IReview) => {
  return (
    <div className="review">
      <div className="review-header">{review.title}</div>
      <div className="review-rating">
        <Rating value={Number(review.rating)} precision={0.5} readOnly />
      </div>
      <div
        className="review-review"
        dangerouslySetInnerHTML={{ __html: review.review }}
      ></div>
      <div className="review-info">
        <div className="review-user">
          <i className="fa-solid fa-user"></i>
          {review.user}
        </div>
        <div className="review-time">{review.created_at}</div>
      </div>
    </div>
  );
};

const ReviewList = ({ productId }: { productId: number }) => {
  const [reviews, setReviews] = useState<{ count: number; reviews: IReview[] }>(
    { count: 0, reviews: [] }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [reviewPage, setReviewPage] = useState<number>(1);

  const { isAuth, user, token } = useSelector(
    (state: IRootState) => state.user
  );

  const location = useLocation();

  const handlePostReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(
      `/api/reviews`,
      {
        title,
        rating,
        review,
        product: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRating(5);
    setReview("");
    setTitle("");
    fetchReviews();
  };

  const fetchReviews = () => {
    setLoading(true);
    axios.get(`/api/reviews/${productId}?page=${reviewPage}`).then((res) => {
      setReviews({ count: res.data["count"], reviews: res.data["results"] });
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, reviewPage]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, val: number) => {
    setReviewPage(val);
  };

  return (
    <div className="reviewlist-container">
      {loading ? (
        <Loader size="medium" />
      ) : reviews.reviews.length > 0 ? (
        <>
          <div className="reviewlist-sort-bar">
            <div>Sort By</div>
          </div>
          <div className="reviewlist">
            {reviews.reviews.map((r) => (
              <Review
                key={r._id}
                _id={r._id}
                user={r.user}
                title={r.title}
                rating={r.rating}
                review={r.review}
                created_at={new Date(r.created_at).toDateString()}
              />
            ))}
          </div>
          <div className="pagination-area">
            <Pagination
              onChange={handlePageChange}
              page={reviewPage}
              color="secondary"
              count={Math.ceil(reviews.count / 4)}
            />
          </div>
        </>
      ) : (
        ""
      )}
      <div className="reviewlist-post-container">
        <div className="reviewlist-post-header">Write your Review</div>
        {isAuth || user ? (
          <form onSubmit={handlePostReview} className="reviewlist-post">
            <div className="review-rating">
              <Rating
                onChange={(e, nV) => setRating(nV)}
                value={rating}
                precision={0.5}
                size="large"
              />
            </div>
            <div className="reviewlist-post-inputcontainer">
              <div>Title</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </div>

            <div className="reviewlist-post-inputcontainer">
              <div>Review</div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                cols={3}
                placeholder="Review"
              />
            </div>
            <button type="submit">Post</button>
          </form>
        ) : (
          <div className="reviewlist-login">
            You need to{" "}
            <Link to="/login" state={location.pathname}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
