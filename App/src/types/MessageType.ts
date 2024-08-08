export type MessageType = {
  _id: string;
  senderId: {
    _id: string;
    name: string;
  };
  receiverId: string;
  message: string;
  timeStamp: string;
};
