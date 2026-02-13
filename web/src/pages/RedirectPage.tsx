import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ExternalLink, Zap } from "lucide-react";
import { Loading } from "../components/ui/Loading";
import { NotFoundPage } from "../pages/NotFoundPage";
import { useLinkByShortUrl } from "../hooks/useLinks";
import { linkService } from "../services/api";

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const { data: link, isLoading, error } = useLinkByShortUrl(shortUrl!);

  useEffect(() => {
    if (link) {
      // Increment access count and redirect
      linkService
        .incrementAccessCount(shortUrl!)
        .then(() => {
          window.location.href = link.originalUrl;
        })
        .catch(() => {
          // If increment fails, still redirect
          window.location.href = link.originalUrl;
        });
    }
  }, [link, shortUrl]);

  if (!shortUrl) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-100 to-primary-200 mb-8 animate-pulse">
            <Zap className="h-10 w-10 text-primary-600" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <Loading size="lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Redirecionando...
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Aguarde enquanto redirecionamos você para o destino.
              <br />
              <span className="text-sm text-gray-500">
                Isso deve levar apenas alguns segundos.
              </span>
            </p>

            <div className="pt-4">
              <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600 font-mono">
                brev.ly/{shortUrl}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 mb-8">
          <ExternalLink className="h-10 w-10 text-green-600" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <Loading size="lg" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Redirecionando...
          </h2>
          <p className="text-gray-600">Você será redirecionado em instantes</p>
        </div>
      </div>
    </div>
  );
}
