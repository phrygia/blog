import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { editorConfiguration } from '../../components/editor/EditorConfig';
import Myinit from '../../components/editor/UploadAdpater';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { POST_EDIT_UPLOADING_REQUEST } from '../../redux/types';

const Form = styled.form`
  .ck-content {
    height: 600px;
  }
  & > div {
    margin-bottom: 15px;
  }
  .label-content {
    display: block;
    margin: 10px 0;
    font-weight: 700;
  }
  .ck-content {
    height: 550px;
  }
  @media ${props => props.theme.mo} {
    padding-top: 10px;
    .MuiInputLabel-animated {
      font-size: 15px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 30px 10px 10px;
    border: 0;
    background-color: #15171a;
    color: #fff;
  }
  @media ${props => props.theme.pc} {
    button {
      width: 140px;
      height: 44px;
      font-size: 14px;
    }
  }
  @media ${props => props.theme.mo} {
    button {
      width: 120px;
      height: 40px;
      font-size: 13px;
    }
  }
`;

function PostEdit() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [formValue, setFormValue] = useState({
    title: '',
    contents: '',
    fileUrl: '',
    category: '',
  });
  const { postDetail } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = e => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const { title, contents, fileUrl, category } = formValue;
    const token = localStorage.getItem('token');
    const id = postDetail._id;
    const body = { title, contents, fileUrl, category, token, id };
    dispatch({
      type: POST_EDIT_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const cancel = e => {
    e.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    setFormValue({
      title: postDetail.title,
      contents: postDetail.contents,
      fileUrl: postDetail.fileUrl,
      category: postDetail.category.category_name,
    });
  }, [
    postDetail.title,
    postDetail.contents,
    postDetail.fileUrl,
    postDetail.category.category_name,
  ]);

  const getDataFromChEditor = (e, editor) => {
    const data = editor.getData();

    if (data && data.match('<img src=')) {
      const whereImg_start = data.indexOf('<img src=');
      console.log(whereImg_start);
      let whereImg_end = '';
      let ext_name_find = '';
      let result_img_url = '';
      const ext_name = ['jpeg', 'jpg', 'png'];

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          console.log('data', data.indexOf(`${ext_name[i]}`));
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }

        if (ext_name_find === 'jpeg') {
          result_img_url = data.substring(
            whereImg_start + 10,
            whereImg_end + 4,
          );
        } else {
          result_img_url = data.substring(
            whereImg_start + 10,
            whereImg_end + 3,
          );
        }

        setFormValue({
          ...formValue,
          fileUrl: result_img_url,
          contents: data,
        });
      }
    } else {
      setFormValue({
        ...formValue,
        fileUrl: '',
        contents: data,
      });
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Form onSubmit={onSubmit}>
            <TextField
              id="title"
              label="Title"
              name="title"
              defaultValue={postDetail.title}
              fullWidth
              required
              onChange={onChange}
            />
            <TextField
              id="category"
              label="Category"
              name="category"
              defaultValue={postDetail.category.category_name}
              fullWidth
              required
              onChange={onChange}
            />
            <label className="label-content">Content</label>
            <CKEditor
              editor={ClassEditor}
              config={editorConfiguration}
              data={postDetail.contents}
              onReady={Myinit}
              onBlur={getDataFromChEditor}
            />
            <ButtonBox>
              <button type="submit">수정하기</button>
              <button type="button" onClick={cancel}>
                취소하기
              </button>
            </ButtonBox>
          </Form>
        </div>
      ) : (
        <div>progress...</div>
      )}
    </div>
  );
}

export default PostEdit;
