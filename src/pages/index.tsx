import { SearchBar } from "#/components/ui/search-bar";
import { AppLayout } from "#/components/layouts/app-layout";
import { Hero } from "#/components/views/home/hero";
import { useAuthContext } from "#/contexts/auth-context";
import { useListGroup } from "#/components/views/all-lists/hooks/useListGroup";
import { useRouter } from "next/router";
import { NotAccessibleToAuthUsers } from "#/components/layouts/protectected-route";

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const { creatNewListGroup } = useListGroup();
  const router = useRouter();

  return (
    <NotAccessibleToAuthUsers>
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
    </NotAccessibleToAuthUsers>
  );
}
