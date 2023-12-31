import { atom } from "recoil";

const AvatarState = atom({
  key: "avatar",
  default: {
    name: "Jane Doe",
    src: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
});

export { AvatarState };
