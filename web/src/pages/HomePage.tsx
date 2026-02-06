import { CreateLinkForm } from "../components/forms/CreateLinkForm";
import { LinkList } from "../components/links/LinkList";

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <CreateLinkForm />
        </div>
        <div>
          <LinkList />
        </div>
      </div>
    </div>
  );
}
