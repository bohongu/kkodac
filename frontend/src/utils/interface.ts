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

interface IRecommendTagMapper {
  tag: {
    _id: string;
    tagId: string;
    createdAt: string;
    name: string;
  };
}

export interface IPost {
  postId: string;
  createdAt: string;
  updatedAt: string;
  tagString: string;
  title: string;
  description: string;
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

export interface IRecommendPost extends IPost {
  tagMappers: IRecommendTagMapper[];
}

export interface IPostDetail {
  postId: string;
  createdAt: string;
  title: string;
  description: string;
  tagString: string;
  fileMappers: {
    file: {
      fileUrl: string;
    };
  }[];
  tagMappers: {
    tag: {
      tagId: string;
    };
  }[];
  authorId: {
    userId: string;
    socialFileId: string | null;
    username: string;
    nickname: string;
  };
  regionId: {
    name: string;
  };
  likes: {
    user: {
      userId: string;
      socialFileId: string | null;
      nickname: string;
      fileId: {
        fileUrl: string;
      };
    };
  }[];
  commentMappers: {
    comment: {
      commentId: string;
      description: string;
      createdAt: string;
      authorId: {
        userId: string;
        socialFileId: string | null;
        username: string;
        nickname: string;
        fileId: {
          fileUrl: string;
        };
      };
    };
  }[];
}

export interface IGetUser {
  result: {
    userId: string;
    socialFileId: string | null;
    username: string;
    nickname: string;
    introduce: string;
    fileId: {
      fileUrl: string;
    };
  };
  follow: {
    count: string;
  }[];
  follower: {
    count: string;
  }[];
}
