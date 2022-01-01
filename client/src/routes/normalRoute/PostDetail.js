import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUEST,
} from '../../redux/types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import styled from 'styled-components';
import { GrowingSpinner } from '../../components/Spinner';
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import { editorConfiguration } from '../../components/editor/EditorConfig';
import Comments from '../../components/comments/Comments';

const Ul = styled.ul`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 12px;
  li {
    button {
      margin-top: -3px;
      border: 0;
      background-color: transparent;
    }
    & > * {
      font-weight: 500;
      &:hover {
        color: #26a8ed;
      }
    }
  }
  @media ${props => props.theme.pc} {
    li {
      margin: 0 8px;
    }
  }
  @media ${props => props.theme.mo} {
    padding-top: 5px;
    li {
      margin: 0 5px;
      font-size: 13px;
    }
  }
`;
const Button = styled.button``;
const PostDetailWrapper = styled.section`
  .post-header {
    border-top: solid 4px #313131;
    border-bottom: solid 1px #dadada;
    span {
      color: #26a8ed;
    }
    h2 {
      margin: 6px 0 9px;
    }
    p {
      color: #7b7b7b;
    }
    @media ${props => props.theme.pc} {
      padding: 20px 2px;
      margin-bottom: 40px;
      span {
        font-size: 16px;
      }
      h2 {
        font-size: 34px;
      }
      p {
        font-size: 14px;
      }
    }
    @media ${props => props.theme.mo} {
      padding: 15px 0;
      margin-bottom: 15px;
      span {
        font-size: 15px;
      }
      h2 {
        font-size: 23px;
        line-height: 1.3;
      }
      p {
        font-size: 13px;
      }
    }
  }
`;
const Content = styled.article`
  line-height: 1.8;
`;
const CommentBox = styled.article`
  margin-top: 48px;
  .reply_tit {
    font-weight: 700;
    color: #1d1b1b;
    border-bottom: solid 1px #dadada;
    span {
      font-weight: 400;
    }
    & + form > textarea {
      margin-top: 0;
    }
  }
  .reply_content {
    .reply_top {
      b {
        margin-right: 10px;
        color: #2c2828;
      }
      span {
        font-size: 13px;
        color: #9d9d9d;
      }
    }
    .reply_txt {
      margin-top: 10px;
      line-height: 1.6;
    }
  }
  @media ${props => props.theme.pc} {
    .reply_tit {
      margin-bottom: 35px;
      padding-bottom: 20px;
      font-size: 18px;
    }
    .reply_content {
      margin-bottom: 40px;
      .reply_top {
        b {
          font-size: 16px;
        }
      }
    }
    .reply_txt {
      font-size: 15px;
    }
  }
  @media ${props => props.theme.mo} {
    .reply_tit {
      margin-bottom: 15px;
      padding-bottom: 10px;
      font-size: 18px;
    }
    .reply_content {
      margin-bottom: 25px;
      .reply_top {
        b {
          font-size: 15px;
        }
      }
    }
    .reply_txt {
      font-size: 14px;
    }
  }
`;

function PostDetail(req) {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    state => state.post,
  );
  const { userId, userName } = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.comment);
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    const confirm_test = window.confirm('정말 삭제할래요?');

    if (confirm_test) {
      dispatch({
        type: POST_DELETE_REQUEST,
        payload: {
          id: req.match.params.id,
          token: localStorage.getItem('token'),
        },
      });
      history.push('/');
    } else return;
  };

  const EditButton = (
    <>
      <Ul>
        <li>
          <Link to="/">홈으로</Link>
        </li>
        <li>
          <Link to={`/post/${req.match.params.id}/edit`}>수정하기</Link>
        </li>
        <li>
          <Button onClick={onDeleteClick}>삭제하기</Button>
        </li>
      </Ul>
    </>
  );

  const HomeButton = (
    <>
      <Ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </Ul>
    </>
  );

  const Body = postDetail && (
    <PostDetailWrapper>
      {userId === creatorId ? EditButton : HomeButton}
      <article className="post-header">
        <span>{postDetail.category.category_name}</span>
        <h2>{postDetail.title}</h2>
        <p>{postDetail.date.substring(0, 10)}</p>
      </article>
      {postDetail && postDetail.comments ? (
        <>
          <Content>
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Content>
          <CommentBox>
            <p className="reply_tit">
              댓글 <span>{comments && comments.length}</span>
            </p>
            {Array.isArray(comments)
              ? comments.map(
                  ({ contents, creator, date, _id, creator_name }, index) =>
                    date && (
                      <div key={_id + index} className="reply_content">
                        <div className="reply_top">
                          <b>{creator_name ? creator_name : creator}</b>
                          <span>{date}</span>
                        </div>
                        <div className="reply_txt">{contents}</div>
                      </div>
                    ),
                )
              : 'creator'}
            <Comments
              id={req.match.params.id}
              user={userId}
              userName={userName}
            />
          </CommentBox>
        </>
      ) : (
        <h1>Hi</h1>
      )}
    </PostDetailWrapper>
  );

  console.log(comments);

  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
}

export default PostDetail;
