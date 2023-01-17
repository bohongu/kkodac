interface IPostFileMapper {
  file: {
    fileId: string;
    _id: string;
    createdAt: string;
    fileName: string;
    fileUrl: string;
    deployName: string;
  };
}

interface IPostTagMapper {
  tag: {
    name: string;
  };
}

export interface IPost {
  postId: string;
  createdAt: string;
  updatedAt: string;
  tagString: string;
  title: string;
  fileMappers: IPostFileMapper[];
  tagMappers: IPostTagMapper[];
  authorId: {
    userId: string;
    userName: string;
    nickname: string;
    user_refresh_token: null;
  };
  regionId: {
    name: string;
  };
}

export interface IPostDetail extends IPost {
  description: string;
}
