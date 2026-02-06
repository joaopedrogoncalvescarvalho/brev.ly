import { Download, Link } from "lucide-react";
import { Button } from "../ui/Button";
import { Loading } from "../ui/Loading";
import { LinkItem } from "./LinkItem";
import { useLinks, useExportCSV } from "../../hooks/useLinks";
import { downloadFile } from "../../utils/helpers";

interface LinkListProps {
  showEmptyState?: boolean;
}

export function LinkList({ showEmptyState = true }: LinkListProps) {
  const { data: links, isLoading, error } = useLinks();
  const exportCSV = useExportCSV();

  const handleExportCSV = async () => {
    try {
      const result = await exportCSV.mutateAsync();
      downloadFile(result.downloadUrl, "links-report.csv");
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <Loading text="Carregando links..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center text-red-600">
          <p>Erro ao carregar os links. Tente novamente.</p>
        </div>
      </div>
    );
  }

  if (!links || links.length === 0) {
    if (!showEmptyState) return null;

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-600">Meus links</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            isLoading={exportCSV.isPending}
            disabled={true}
            className="text-gray-400 border-gray-200 cursor-not-allowed"
          >
            <Download className="h-4 w-4 mr-1" />
            Baixar CSV
          </Button>
        </div>
        <div className="text-center py-12">
          <Link className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-600">Meus links</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          isLoading={exportCSV.isPending}
          className="text-gray-600 border-gray-300"
        >
          <Download className="h-4 w-4 mr-1" />
          Baixar CSV
        </Button>
      </div>

      <div className="space-y-0">
        {links.map((link, index) => (
          <LinkItem
            key={link.id}
            link={link}
            isLast={index === links.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
