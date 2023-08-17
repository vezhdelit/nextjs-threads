"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  userType: string;
}

const UserCard = ({ id, name, username, imgUrl, userType }: Props) => {
  const router = useRouter();
  return (
    <article className="flex flex-col justify-between gap-4 max-sm:rounded-xl max-sm:bg-midnight max-sm:p-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 sm:items-center">
        <Image
          src={imgUrl}
          alt="user logo"
          width={58}
          height={58}
          className="rounded-full border-2 border-midnight"
        />

        <div className=" flex-1 text-ellipsis">
          <h4 className="text-white">{name}</h4>
          <p className=" text-sm text-white"> @{username}</p>
        </div>
      </div>

      <Button
        className="h-auto min-w-[74px] rounded-lg bg-violet-600 text-[12px] text-white"
        onClick={() => router.push(`/profile/${id}`)}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
