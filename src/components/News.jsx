import React, { useEffect, useReducer, useState } from "react";
import { newsData } from "../data/FetchData";
import { newsReducer } from "../data/NewsReducer";
import moment from "moment";
moment.locale("ru");
const initialState = {
  post: [],
};

const News = () => {
  const [state, dispatch] = useReducer(newsReducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    if (fetching && currentPage <= 10) {
      newsData(`https://api.hnpwa.com/v0/news/${currentPage}.json`)
        .then((res) => {
          dispatch({
            type: "GET",
            payload: [...state.post, ...res.data],
          });
          console.log(currentPage);
          setCurrentPage((page) => page + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      if (currentPage <= 10) setFetching(true);
    }
  };

  return (
    <>
      <div>
        <button
          className="sort_btn"
          onClick={() =>
            dispatch({
              type: "SORT_DATE",
              payload: state.post,
            })
          }
        >
          Sort by date
        </button>
        <table>
          <thead>
            <tr>
              <td
                className="time_add"
                onClick={() =>
                  dispatch({
                    type: "SORT_DATE",
                    payload: state.post,
                  })
                }
              >
                Time added
              </td>
              <td
                onClick={() =>
                  dispatch({
                    type: "SORT_TITLE",
                    payload: state.post,
                  })
                }
              >
                Title
              </td>
              <td
                className="domain"
                onClick={() =>
                  dispatch({
                    type: "SORT_DOMAIN",
                    payload: state.post,
                  })
                }
              >
                Domain
              </td>
            </tr>
          </thead>
          <tbody>
            {state.post.map((res) => (
              <tr key={res.id}>
                <td className="time_add">
                  {moment(res.time * 1000).format("lll")}
                </td>
                <td className="title">
                  <a href={res.url} target="_blank">
                    {res.title}
                  </a>
                </td>
                <td className="domain">
                  <a href={res.url} target="_blank">
                    {res.domain}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default News;
