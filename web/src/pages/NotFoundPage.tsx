import { NotFoundSVG } from "../components/ui/NotFoundSVG";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <NotFoundSVG />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Link não encontrado
        </h2>
        <p className="text-gray-600 leading-relaxed">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <a href="/" className="text-blue-600 hover:underline">
            brev.ly
          </a>
          .
        </p>
      </div>
    </div>
  );
}
