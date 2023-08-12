import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
type Props = {};

const CreateThreadPage = async (props: Props) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboard");
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
};

export default CreateThreadPage;
