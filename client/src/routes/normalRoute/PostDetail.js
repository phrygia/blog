import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { POST_DELETE_REQUEST, POST_DETAIL_LOADING_REQUEST, USER_LOADING_REQUEST } from '../../redux/types'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import { GrowingSpinner } from '../../components/Spinner'
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor'
import { editorConfiguration } from '../../components/editor/EditorConfig'
import Comments from '../../components/comments/Comments'

const Button = styled.button``
const Content = styled.article`
  line-height: 1.8;
`
const CommentBox = styled.article``

function PostDetail(req) {
  const dispatch = useDispatch()
  const { postDetail, creatorId, title, loading } = useSelector((state) => state.post)
  const { userId, userName } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const history = useHistory()

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    })
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    })
  }, [dispatch, req.match.params.id])

  const onDeleteClick = () => {
    const confirm_test = window.confirm('정말 삭제할래요?')

    if (confirm_test) {
      dispatch({
        type: POST_DELETE_REQUEST,
        payload: {
          id: req.match.params.id,
          token: localStorage.getItem('token'),
        },
      })
      history.push('/')
    } else return
  }

  const EditButton = (
    <>
      <Grid container justify="center" alignItems="center">
        <Paper>
          <Link to="/">Home</Link>
        </Paper>
        <Paper>
          <Link to={`/post/${req.match.params.id}/edit`}>Edit Post</Link>
        </Paper>
        <Paper>
          <Button onClick={onDeleteClick}>Delete</Button>
        </Paper>
      </Grid>
    </>
  )

  console.log(postDetail)
  const HomeButton = (
    <>
      <Grid container justify="center" alignItems="center">
        <Paper>
          <Link to="/">Home</Link>
        </Paper>
      </Grid>
    </>
  )

  const Body = postDetail && (
    <section>
      {userId === creatorId ? EditButton : HomeButton}
      <article className="post-header">
        <p>
          {postDetail.category.category_name} {postDetail.date.substring(0, 10)}
        </p>
        <h2>{postDetail.title}</h2>
      </article>
      {postDetail && postDetail.comments ? (
        <>
          <Content>
            <CKEditor editor={BalloonEditor} data={postDetail.contents} config={editorConfiguration} disabled="true" />
          </Content>
          <span>{postDetail.views}</span>
          <CommentBox>
            {Array.isArray(comments)
              ? comments.map(
                  ({ contents, creator, date, _id, creator_name }, index) =>
                    date && (
                      <div key={_id + index}>
                        {creator_name ? creator_name : creator}
                        {date.split(' ')[0]}
                        {date.split(' ')[1]}
                        {contents}
                      </div>
                    )
                )
              : 'creator'}
            <Comments id={req.match.params.id} user={userId} userName={userName} />
          </CommentBox>
        </>
      ) : (
        <h1>Hi</h1>
      )}
    </section>
  )

  console.log(comments)

  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  )
}

export default PostDetail
