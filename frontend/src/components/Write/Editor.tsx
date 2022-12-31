import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaImages } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const MAX_SIZE = 3 * 1024 * 1024; /* 3MB */

const Editor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.currentTarget.value);
  };

  const imageRef = useRef(null);
  const [postImage, setPostImage] = useState<string[]>([]);

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    let imageUrlLists = [...postImage];
    if (!files) {
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
      /* axios */
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_SIZE) {
        alert('업로드 가능한 최대 용량은 파일 당 3MB입니다.');
      } else {
        const currentImageUrl = URL.createObjectURL(files[i]);
        imageUrlLists.push(currentImageUrl);
      }
    }
    setPostImage(imageUrlLists);
  };

  const deleteImageHandler = (url: string) => {
    setPostImage(postImage.filter((image) => image !== url));
    /* 사진 삭제 API */
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <EditorWrapper>
      <EditorForm onSubmit={formSubmitHandler}>
        <Header>
          <Categories>
            <select>
              <option>지역</option>
              <option>한경면</option>
              <option>한립읍</option>
              <option>애월읍</option>
            </select>
          </Categories>
          <button>글쓰기</button>
        </Header>
        <Title
          value={title}
          onChange={titleChangeHandler}
          placeholder="제목을 입력하세요"
        />
        <Description
          value={description}
          onChange={descriptionChangeHandler}
          cols={50}
          rows={10}
          placeholder="본문"
        ></Description>
        <ImageSection>
          <ImageInput>
            <label htmlFor="post_image">
              <FaImages />
              <div>사진을 등록하세요</div>
            </label>
            <input
              ref={imageRef}
              type="file"
              multiple
              id="post_image"
              onChange={addImageHandler}
              accept="image/*"
            />
          </ImageInput>
          <Images>
            {postImage.map((url, id) => (
              <Choosen photo={url} key={id}>
                <Delete onClick={() => deleteImageHandler(url)}>
                  <MdDeleteOutline />
                </Delete>
              </Choosen>
            ))}
          </Images>
        </ImageSection>
      </EditorForm>
    </EditorWrapper>
  );
};

export default Editor;

const EditorWrapper = styled.div`
  border: 1px solid blue;
  width: 60%;
  padding: 10px;
`;

const EditorForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Categories = styled.div``;

const Title = styled.input`
  padding-left: 10px;
  height: 60px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 25px;
  margin: 10px 0;
`;

const Description = styled.textarea`
  height: 400px;
  font-size: 16px;
  margin-bottom: 10px;
  resize: none;
  padding: 10px;
`;

const ImageSection = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  height: 200px;
  margin-bottom: 10px;
`;

const ImageInput = styled.div`
  border: 1px solid black;
  ${(props) => props.theme.flex.flexCenterColumn}
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    cursor: pointer;
    div {
      font-size: 10px;
      margin-top: 1rem;
    }
  }
  input {
    display: none;
  }
`;

const Images = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 10px;
`;

const Choosen = styled.div<{ photo: string }>`
  border: 1px solid black;
  background-image: url(${(props) => props.photo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  background-color: black;
  width: 250px;
`;

const Delete = styled.div`
  position: absolute;
  ${(props) => props.theme.flex.flexCenter}
  color:white;
  right: 0;
  width: 25px;
  height: 25px;
  font-size: 23px;
`;
