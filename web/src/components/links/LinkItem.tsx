import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { useDeleteLink } from "../../hooks/useLinks";
import { useToast } from "../../hooks/useToast";
import { Link } from "../../types/link";
import { copyToClipboard, getShortUrl } from "../../utils/helpers";
import { useQueryClient } from "@tanstack/react-query";

interface LinkItemProps {
  link: Link;
  isLast?: boolean;
}

export function LinkItem({ link, isLast }: LinkItemProps) {
  const [copied, setCopied] = useState(false);
  const deleteLink = useDeleteLink();
  const { success, error } = useToast();
  const shortUrl = getShortUrl(link.shortUrl);
  const queryClient = useQueryClient();

  const handleLinkClick = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    }, 1000);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(shortUrl);
      setCopied(true);
      success("Link copiado para a área de transferência!", {
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      error("Falha ao copiar o link");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar este link?")) {
      try {
        await deleteLink.mutateAsync(link.id);
        success("Link excluído com sucesso!");
      } catch (err) {
        error("Erro ao excluir link");
      }
    }
  };

  return (
    <div
      className={`p-4 flex justify-between items-center ${!isLast ? "border-b border-gray-100" : ""}`}
    >
      <div className="flex-1">
        <a
          href={`http://localhost:3000/${link.shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
          className="text-blue-600 font-medium text-sm mb-1 hover:text-blue-800 cursor-pointer block"
        >
          brev.ly/{link.shortUrl}
        </a>
        <p className="text-gray-600 text-sm">{link.originalUrl}</p>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <p className="text-gray-400 text-xs">{link.accessCount} acessos</p>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600 p-1"
            title={copied ? "Copiado!" : "Copiar"}
          >
            <Copy size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 p-1"
            title="Deletar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
