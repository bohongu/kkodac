import React, { useState } from 'react';
import styled from 'styled-components';
import { FaImages } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import TagDrop from './TagDrop';
import RegionDrop from './RegionDrop';
import { useRecoilValue } from 'recoil';
import { selectedRegionState } from '../../recoil/atoms';
import { selectedTagsState } from './../../recoil/atoms';
import { useMutation } from 'react-query';
import { createPost, deleteFile, postFile } from '../../api/api';

const MAX_SIZE = 3 * 1024 * 1024; /* 3MB */

interface IPostImage {
  id: string;
  url: string;
}

const Editor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const regionValue = useRecoilValue(selectedRegionState);
  const [postImage, setPostImage] = useState<IPostImage[]>([]);
  const selectTags = useRecoilValue<string[]>(selectedTagsState);
  const sendFile = useMutation(postFile);
  const sendPost = useMutation(createPost);
  const removeFile = useMutation(deleteFile);
  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.currentTarget.value);
  };

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    const formData = new FormData();
    if (!files) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (postImage.length > 5) {
        alert('사진은 최대 4장까지 등록 가능합니다.');
        return;
      }
      if (files[i].size > MAX_SIZE) {
        alert('업로드 가능한 최대 용량은 파일 당 3MB입니다.');
      } else {
        formData.append('file', files[i]);
        sendFile.mutate(formData, {
          onSuccess: (data) => {
            const ImageInfo = {
              id: data.data.id,
              url: data.data.url,
            };
            setPostImage([...postImage, ImageInfo]);
          },
        });
      }
    }
  };

  const deleteImageHandler = (id: string) => {
    removeFile.mutate(id);
    setPostImage(postImage.filter((data) => data.id !== id));
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let sendImages = [];
    if (!regionValue) {
      alert('지역을 선택해주세요 (필수)');
      return;
    }
    for (let i = 0; i < postImage.length; i++) {
      sendImages.push(postImage[i].id);
    }
    sendPost.mutate(
      {
        title,
        description,
        files: sendImages,
        tags: selectTags,
        authorId: 'test',
        regionId: regionValue,
      },
      {
        onSuccess: () => {
          console.log('input 초기화, 홈으로 가기');
        },
      },
    );
    setTitle('');
    setDescription('');
  };

  return (
    <EditorWrapper>
      <EditorForm onSubmit={formSubmitHandler}>
        <Top>
          <Title
            value={title}
            onChange={titleChangeHandler}
            placeholder="제목을 입력하세요"
          />
          <button>글쓰기</button>
        </Top>
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
              type="file"
              multiple
              id="post_image"
              onChange={addImageHandler}
              accept="image/*"
            />
          </ImageInput>
          <Images>
            {postImage.map((data, id) => (
              <Choosen photo={data.url} key={id}>
                <Delete onClick={() => deleteImageHandler(data.id)}>
                  <MdDeleteOutline />
                </Delete>
              </Choosen>
            ))}
          </Images>
        </ImageSection>
      </EditorForm>
      <TagSection>
        <Tags>
          <RegionDrop />
        </Tags>
        <Tags>
          <TagDrop />
        </Tags>
      </TagSection>
    </EditorWrapper>
  );
};

export default Editor;

const EditorWrapper = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  gap: 15px;
  border: 1px solid blue;
  width: 80%;
  padding: 15px;
`;

const EditorForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TagSection = styled.header`
  margin-right: 15px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
`;

const Tags = styled.div`
  border: 1px solid black;
  padding: 10px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    font-size: 12px;
    height: 30px;
    width: 55px;
  }
`;

const Title = styled.input`
  padding-left: 10px;
  height: 60px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 25px;
  width: 700px;
`;

const Description = styled.textarea`
  height: 500px;
  font-size: 16px;
  margin: 10px 0;
  resize: none;
  padding: 10px;
`;

const ImageSection = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  height: 180px;
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
