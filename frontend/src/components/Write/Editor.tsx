import React, { useState } from 'react';
import styled from 'styled-components';
import { FaImages } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import RegionDrop from './RegionDrop';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedRegionState,
  currentUser,
  selectedTagState,
} from '../../recoil/atoms';

import { useMutation, useQueryClient } from 'react-query';
import { createPost, deleteFile, postFile } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { FILE_MAX_SIZE } from '../../utils/jeju';
import Tag from './Tags';

interface IPostImage {
  id: string;
  url: string;
}

const Editor = () => {
  /* React-Router-Dom */
  const navigate = useNavigate();

  /* State */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postImage, setPostImage] = useState<IPostImage[]>([]);
  const [error, setError] = useState('');

  /* Recoil */
  const [regionValue, setRegionValue] = useRecoilState(selectedRegionState);
  const user = useRecoilValue(currentUser);
  const [tagList, setTagList] = useRecoilState(selectedTagState);

  /* React-Query */
  const queryClient = useQueryClient();
  const sendFile = useMutation(postFile);
  const sendPost = useMutation(createPost);
  const removeFile = useMutation(deleteFile);

  /* Handlers */
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
      if (postImage.length > 3) {
        alert('사진은 최대 4장까지 등록 가능합니다.');
        return;
      }
      if (files[i].size > FILE_MAX_SIZE) {
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

  const stringArray: string[] = [];

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let sendImages = [];
    if (!regionValue) {
      setError('지역을 선택해주세요(필수)');
      return;
    }
    for (let i = 0; i < postImage.length; i++) {
      sendImages.push(postImage[i].id);
    }

    for (let i = 0; i < tagList.length; i++) {
      stringArray.push(tagList[i].data);
    }

    let tagString = null;
    tagString = stringArray.join();

    sendPost.mutate(
      {
        title,
        description,
        files: sendImages,
        authorId: user.userId,
        regionId: regionValue,
        tags: tagList,
        tagString,
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setRegionValue('');
          setPostImage([]);
          setTagList([]);
          tagString = null;
          navigate(`/tour/${regionValue}`);
          queryClient.invalidateQueries('getPostRegion');
        },
      },
    );
  };

  return (
    <EditorWrapper>
      <EditorForm onSubmit={formSubmitHandler} noValidate>
        <Top>
          <Title
            value={title}
            onChange={titleChangeHandler}
            placeholder="제목"
          />
          <Submit>
            <div>{error ? error : null}</div>
            <button>완료</button>
          </Submit>
        </Top>
        <Region>
          <RegionDrop />
        </Region>
        <ImageSection>
          <ImageInput>
            <label htmlFor="post_image">
              <FaImages />
              <div>사진을 등록하세요</div>
              <div>( 최대 4장 )</div>
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
                  <TiDeleteOutline />
                </Delete>
              </Choosen>
            ))}
          </Images>
        </ImageSection>
        <Description
          value={description}
          onChange={descriptionChangeHandler}
          cols={50}
          rows={10}
          placeholder="본문"
        ></Description>
      </EditorForm>
      <Bottom>
        <Tag />
      </Bottom>
    </EditorWrapper>
  );
};

export default Editor;

const EditorWrapper = styled.div`
  width: 60%;
  margin-top: 70px;
`;

const EditorForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.input`
  padding-left: 10px;
  height: 40px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 18px;
  width: 330%;
  font-family: Neo;
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.hardGray};
  }
`;

const Region = styled.div``;

const ImageSection = styled.div`
  display: grid;
  grid-template-columns: 9% 91%;
  height: 180px;
`;

const ImageInput = styled.div`
  border: 2px solid ${(props) => props.theme.colors.gray};
  ${(props) => props.theme.flex.flexCenterColumn}
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    cursor: pointer;
    div {
      font-size: 5px;
      margin-top: 1rem;
    }
  }
  input {
    display: none;
  }
`;

const Images = styled.div`
  display: flex;
  gap: 5px;
  padding-left: 5px;
`;

const Choosen = styled.div<{ photo: string }>`
  border: 0.5px solid ${(props) => props.theme.colors.gray};
  background-image: url(${(props) => props.photo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  background-color: black;
  width: 25%;
  border-radius: 5px;
`;

const Delete = styled.div`
  position: absolute;
  ${(props) => props.theme.flex.flexCenter}
  color:white;
  top: 3px;
  right: 3px;
  width: 20px;
  height: 20px;
  font-size: 23px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Description = styled.textarea`
  height: 400px;
  font-size: 16px;
  margin: 10px 0;
  resize: none;
  padding: 10px;
  font-family: Neo;
  border: none;
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.hardGray};
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const Submit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 23%;

  div {
    color: red;
  }

  button {
    padding: 10px 15px;
    border: 0.5px solid ${(props) => props.theme.colors.gray};
    font-family: Neo;
    color: white;
    font-weight: bold;
    background: orange;
    border-radius: 5px;
    font-size: 15px;
  }
`;
