export type RequestsType = {
  _id: string;
  from: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
};

export type UserType = {
  _id?: string;
  name?: string;
  image?: string;
};
