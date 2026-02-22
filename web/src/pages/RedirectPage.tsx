import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RedirectIcon } from "../components/ui/RedirectIcon";
import { NotFoundPage } from "../pages/NotFoundPage";
import { useLinkByShortUrl } from "../hooks/useLinks";
import { linkService } from "../services/api";

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const { data: link, isLoading, error } = useLinkByShortUrl(shortUrl!);

  useEffect(() => {
    if (link) {
      linkService
        .incrementAccessCount(shortUrl!)
        .then(() => {
          window.location.href = link.originalUrl;
        })
        .catch(() => {
          window.location.href = link.originalUrl;
        });
    }
  }, [link, shortUrl]);

  if (!shortUrl) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <RedirectIcon />
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Redirecionando...
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="text-gray-600 text-sm">
            Não foi redirecionado?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Acesse aqui
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <RedirectIcon />
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Redirecionando...
        </h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          O link será aberto automaticamente em alguns instantes.
        </p>
        <p className="text-gray-600 text-sm">
          Não foi redirecionado?{" "}
          <a href={link?.originalUrl} className="text-blue-600 hover:underline">
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  );
}
