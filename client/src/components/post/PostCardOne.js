import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noImg from '../../assets/img/noImg.jpg';

const Ul = styled.ul`
  li {
    .post_card_image {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      overflow: hidden;
    }
    .post_card_excerpt {
      color: #3c484e;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .post_card_footer {
      color: #7b7b7b;
    }
    &:hover {
      .post_card_title {
        color: #26a8ed;
      }
    }
  }
  @media ${props => props.theme.pc} {
    max-width: 1020px;
    grid-gap: 35px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    li {
      .post_card_image {
        height: 250px;
      }
      .post_card_title {
        margin: 20px 0 13px;
        font-size: 20px;
        line-height: 1.15;
      }
      .post_card_excerpt {
        margin-bottom: 14px;
        font-size: 16px;
        line-height: 1.4;
      }
      .post_card_footer {
        font-size: 15px;
      }
    }
  }
  @media ${props => props.theme.mo} {
    li {
      .post_card_image {
        height: 170px;
      }
      .post_card_title {
        margin: 15px 0 8px;
        font-size: 17px;
        line-height: 1.3;
      }
      .post_card_excerpt {
        font-size: 14px;
        line-height: 1.6;
      }
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  }
`;

function PostCardOne({ posts }) {
  const extension = ['.jpeg', '.png', '.jpg'];
  return (
    <Ul>
      {Array.isArray(posts)
        ? posts.map(
            (
              { _id, title, fileUrl, contents, category, date, views },
              index,
            ) => {
              const url = extension.find(val => {
                if (fileUrl.split('http')[1].indexOf(val) !== -1) return val;
              });
              const imgUrl = fileUrl ? fileUrl.split(url)[0] + url : noImg;

              return (
                <li key={_id + index}>
                  <Link to={`/post/${_id}`}>
                    <div
                      className="post_card_image"
                      style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                    <h2 className="post_card_title">{title}</h2>
                    <p className="post_card_excerpt">
                      {contents
                        .replace(
                          /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g,
                          ' ',
                        )
                        .substring(0, 200)}
                    </p>
                    <div className="post_card_footer">
                      <span>{date.substring(0, 10)}</span>
                    </div>
                  </Link>
                </li>
              );
            },
          )
        : ''}
    </Ul>
  );
}

export default PostCardOne;
