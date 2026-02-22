import { RedirectIcon } from "../ui/RedirectIcon";

export function Header() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <RedirectIcon color="#2C46B1" size={32} showWrapper={false} />
            <h1 className="text-xl font-bold text-gray-900">brev.ly</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
