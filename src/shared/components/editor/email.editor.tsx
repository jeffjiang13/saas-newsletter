"use client";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import React, { useEffect, useRef, useState } from "react";
import { DefaultJsonData } from "@/assets/mails/default";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { saveEmail } from "@/actions/save.email";
import toast from "react-hot-toast";
import { GetEmailDetails } from "@/actions/get.email-details";
import { sendEmail } from "@/shared/utils/email.sender";
import { getSubscribers } from "@/actions/get.subscribers1";

const Emaileditor = ({ subjectTitle }: { subjectTitle: string }) => {
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState<any | null>(DefaultJsonData);
  const { user } = useClerk();
  const emailEditorRef = useRef<EditorRef>(null);
  const history = useRouter();

  const sendToAllSubscribers = async () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data) => {
      const { html } = data;
      if (!user?.id) {
        toast.error("User ID is undefined. Cannot fetch subscribers.");
        return;
      }
      const emails = await getSubscribers({ newsLetterOwnerId: user.id });
      if (emails && emails.length > 0) {
        await sendEmail({
          userEmail: emails,
          subject: subjectTitle,
          content: html,
        }).then(() => {
          toast.success("Email sent to all subscribers successfully!");
          history.push("/dashboard/write");
        });
      } else {
        toast.error("No subscribers found.");
      }
    });
  };


  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
      await sendEmail({
        userEmail: ["jeff.jiang212@gmail.com"],
        subject: subjectTitle,
        content: html,
      }).then((res) => {
        toast.success("Email sent successfully!");
        history.push("/dashboard/write");
      });
    });
  };

  useEffect(() => {
    getEmailDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer: any = emailEditorRef.current?.editor;
    unlayer.loadDesign(jsonData);
  };

  const saveDraft = async () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design } = data;
      await saveEmail({
        title: subjectTitle,
        content: JSON.stringify(design),
        newsLetterOwnerId: user?.id!,
      }).then((res: any) => {
        toast.success(res.message);
        history.push("/dashboard/write");
      });
    });
  };

  const getEmailDetails = async () => {
    await GetEmailDetails({
      title: subjectTitle,
      newsLetterOwnerId: user?.id!,
    }).then((res: any) => {
      if (res) {
        setJsonData(JSON.parse(res?.content));
      }
      setLoading(false);
    });
  };

  return (
    <>
      {!loading && (
        <div className="w-full h-[90vh] relative">
          <EmailEditor
            minHeight={"80vh"}
            ref={emailEditorRef}
            onReady={onReady}
          />
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button
              className="hover:bg-gray-200 bg-white cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
              onClick={saveDraft}
            >
              <span className="opacity-[.7]">Save Draft</span>
            </Button>
            <Button
              className="bg-[#000] hover:bg-gray-500 text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={exportHtml}
            >
              <span>Send</span>
            </Button>
            <Button
              className="bg-blue-500 text-white cursor pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={sendToAllSubscribers}
            >
              <span>Send to All</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Emaileditor;
