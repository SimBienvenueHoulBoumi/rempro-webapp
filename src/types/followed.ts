export type FollowedDto = {
  id?: number;
  name: string;
  levelType: string;
  levelNumber: number;
  episodeNumber: number;
};

export interface FollowedItem {
  id: number;
  name: string;
  levelType: "MOVIE" | "ANIME" | "SERIES" | string;
  levelNumber: number;
  episodeNumber: number;
  updatedAt: string;
  createdAt: string;
  createdBy: {
    id: number;
    username: string;
    password: string;
    updatedAt: string;
    createdAt: string;
    role: "ADMIN" | "USER" | string;
    authorities: {
      authority: string;
    }[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
  };
}


export interface UseFollowedReturn {
  loading: boolean;
  error: string | null;
  followedList: FollowedItem[] | null;
  fetchFollowed: () => Promise<void>;
  addFollowed: (follow: FollowedDto) => Promise<void | null>;
  modifyFollowed: (id: number, follow: FollowedDto) => Promise<void | null>;
  removeFollowed: (id: number) => Promise<void | null>;
}