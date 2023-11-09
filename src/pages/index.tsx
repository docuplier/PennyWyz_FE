import { SearchBar } from "#/components/ui/search-bar";
import { AppLayout } from "#/components/layouts/app-layout";
import { Hero } from "#/components/views/home/hero";
import { useAuthContext } from "#/contexts/auth-context";
import { useListGroup } from "#/components/views/all-lists/hooks/useListGroup";
import { useRouter } from "next/router";
import { NotAccessibleToAuthUsers } from "#/components/layouts/protectected-route";
import { Fragment } from "react";

export default function Home({
  accessibleToAuthUsers = false,
}: {
  accessibleToAuthUsers: boolean;
}) {
  const { isAuthenticated } = useAuthContext();
  const { creatNewListGroup } = useListGroup();
  const router = useRouter();

  const Wrapper = accessibleToAuthUsers ? Fragment : NotAccessibleToAuthUsers;

  return (
    <Wrapper>
      <AppLayout
        desktopHeader={
          <div className="pt-[38px]">
            <Hero isDesktop />
          </div>
        }
        mobileHeader={<Hero />}
      >
        <div className="w-full">
          <SearchBar
            navigationAction={() => {
              if (isAuthenticated) {
                creatNewListGroup();
              } else {
                router.push("/list");
              }
            }}
          />
        </div>
      </AppLayout>
    </Wrapper>
  );
}
