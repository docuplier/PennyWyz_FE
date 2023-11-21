import { CustomDialog } from "#/components/reusables/custom-dialog";
import { useRouter } from "next/router";
import { Typography } from "../ui/typography";
import { TAlertDialog } from "#/contexts/alert-dialog-context";
import { SuccessIcon } from "#/assets/svgs/success-icon";
import { ErrorIcon } from "#/assets/svgs/error-icon";
import {
  CopyIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { ReactNode } from "react";
import { SocialMediaShare } from "#/lib/social-media-share";
import { useClipboard } from "@mantine/hooks";
import { showToast } from "#/lib/toast";
import { CustomInput } from "./custom-input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { TextDivider } from "../ui/text-divider";
import { useParams } from "next/navigation";
import { useAppMutation } from "#/http";
import { API_URLS } from "#/http/api-urls";
import useReactGA from "#/http/hooks/useReactGA";

const sms = new SocialMediaShare();

export const ShareDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const params = useParams();

  const url = sms.getPageUrl(`list/public/${params?.id}`);

  const { copy } = useClipboard();

  const { eventTrack } = useReactGA();

  const shareViaEmailMutation = useAppMutation({
    url: API_URLS.SEND_LIST_INITIAL,
    hasIdParams: true,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<{ email: string }>();

  const onSubmit = (data: any) => {
    try {
      shareViaEmailMutation.mutate(
        {
          idParams: `/${params?.id}/send`,
          emails: [data.email],
        } as any,
        {
          onSuccess: () => {
            eventTrack({
              category: "SHARING",
              label: "SHARE_LIST",
              action: "User shared list via email",
            });
            reset();
            showToast({ title: "List successfully shared" });
          },
          onError: () => {
            showToast({ title: "Error sharing list", type: "error" });
          },
        }
      );
    } catch (e) {}
  };

  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      className="max-w-[350px] top-[20%] translate-y-[-20%]"
      bodyClassName="pt-0"
      preventOutsideClose
      dialogHeader="Share"
    >
      <section>
        <div className="mb-[10px] font-medium">
          <Typography text="Add a Collaborator" size={16} />
        </div>
        <form className="space-y-[16px]" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            register={register}
            rules={{ required: { value: true, message: "Enter your email" } }}
            errorMessage={errors["email"]?.message}
          />

          <div>
            <Button fullWidth className="mt-[10px]" isLoading={false}>
              Share
            </Button>
          </div>
        </form>
        <div className="mt-[40px] mb-[30px]">
          <TextDivider text="or share via" />
        </div>
        <div className="flex items-center mt-[20px] justify-between">
          <Typography text="Share on" />

          <div className="flex gap-[6px]">
            <ShareIconButton
              icon={<TwitterIcon />}
              onClick={() => {
                eventTrack({
                  category: "SHARING",
                  label: "SHARE_LIST",
                  action: "User shared list via twitter",
                });
                sms.twitter({
                  text: "Check this list I created easily with pennywyz",
                  url,
                });
              }}
            />
            <ShareIconButton icon={<InstagramIcon />} />
            <ShareIconButton
              icon={<FacebookIcon />}
              onClick={() => {
                eventTrack({
                  category: "SHARING",
                  label: "SHARE_LIST",
                  action: "User shared list via facebook",
                });
                sms.facebook({ url });
              }}
            />
            <ShareIconButton
              icon={<LinkedinIcon />}
              onClick={() => {
                eventTrack({
                  category: "SHARING",
                  label: "SHARE_LIST",
                  action: "User shared list via linkedin",
                });
                sms.linkedIn({
                  text: "Hey there",
                  url: "https://pennywyz.com",
                });
              }}
            />
            <ShareIconButton
              icon={<CopyIcon />}
              onClick={() => {
                eventTrack({
                  category: "SHARING",
                  label: "SHARE_LIST",
                  action: "User copied link to share",
                });
                copy(url);
                showToast({ title: "Link successfully copied" });
              }}
            />
          </div>
        </div>
      </section>
    </CustomDialog>
  );
};

const ShareIconButton = ({
  icon,
  onClick,
}: {
  icon: ReactNode;
  onClick?: VoidFunction;
}) => {
  return (
    <button
      className="w-[40px] h-[40px] bg-pennywyz-yellow-t1 grid place-items-center rounded-full"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
