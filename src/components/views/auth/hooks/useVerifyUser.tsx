import { Typography } from "#/components/ui/typography";
import { useAlertDialog } from "#/contexts/alert-dialog-context";
import { useAppMutation } from "#/http";
import { API_URLS } from "#/http/api-urls";
import { useRouter } from "next/router";

export const useVerifyUser = () => {
  const verifyUserMutation = useAppMutation({
    url: API_URLS.VERIFY_USER,
    method: "PUT",
    hasIdParams: true,
  });

  const alertDialog = useAlertDialog();
  const router = useRouter();

  const handleVerifyUser = ({ id }: { id: string }) => {
    verifyUserMutation.mutate(
      {
        idParams: `/${id}/verify`,
      } as any,
      {
        onSuccess: (data) => {
          alertDialog.render({
            title: "Email Verified",
            iconType: "success",
            onCloseCallBack: () => router.push("/"),
            content: (
              <>
                <Typography
                  text={`You can now go back to your list.`}
                  size={12}
                  className="text-center"
                />
              </>
            ),
          });
        },
        onError: (data) => {
          alertDialog.render({
            title: "Error",
            iconType: "error",
            onCloseCallBack: () => router.push("/"),
            content: (
              <>
                <Typography
                  text={`Error verifying your email`}
                  size={12}
                  className="text-center"
                />
              </>
            ),
          });
        },
      }
    );
  };

  return {
    verifyUserMutation,
    handleVerifyUser,
  };
};
