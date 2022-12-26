import React from 'react';
import styled from 'styled-components';
import { FaImages } from 'react-icons/fa';

const Editor = () => {
  return (
    <EditorWrapper>
      <EditorForm>
        <Header>
          <Categories>
            <select>
              <option selected>지역</option>
              <option>한경면</option>
              <option>한립읍</option>
              <option>애월읍</option>
            </select>
          </Categories>
          <button>글쓰기</button>
        </Header>
        <Title placeholder="제목을 입력하세요" required />
        <Description placeholder="본문"></Description>
        <ImageSection>
          <ImageInput>
            <label htmlFor="post_image">
              <FaImages />
              <div>사진을 등록하세요</div>
            </label>
            <input type="file" multiple id="post_image" />
          </ImageInput>
          <Images>
            <Choosen></Choosen>
            <Choosen></Choosen>
            <Choosen></Choosen>
            <Choosen></Choosen>
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

const Categories = styled.div`
ppearance: none;
  }
`;

const Title = styled.input`
  height: 60px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 30px;
  margin: 10px 0;
`;

const Description = styled.textarea`
  height: 400px;
  padding: 10px 0;
  font-size: 20px;
  margin-bottom: 10px;
  resize: none;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-left: 10px;
`;

const Choosen = styled.div`
  border: 1px solid black;
`;
