"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";

const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log("ORG: ", organization);
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-white">Thread</FormLabel>
              <FormControl className=" focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                <Textarea
                  rows={10}
                  placeholder="Enter your thoughts.."
                  className="border border-neutral-900 bg-neutral-950 text-white "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className=" bg-violet-600">
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
