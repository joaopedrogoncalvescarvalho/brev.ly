import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useCreateLink } from "../../hooks/useLinks";
import { createLinkSchema, CreateLinkFormData } from "../../schemas/linkSchema";

interface CreateLinkFormProps {
  onSuccess?: () => void;
}

export function CreateLinkForm({ onSuccess }: CreateLinkFormProps) {
  const createLinkMutation = useCreateLink();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
  });

  const onSubmit = async (data: CreateLinkFormData) => {
    try {
      const payload = {
        originalUrl: data.originalUrl,
        ...(data.shortUrl && { shortUrl: data.shortUrl }),
      };

      await createLinkMutation.mutateAsync(payload);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-600 mb-6">Novo link</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 uppercase">
            LINK ORIGINAL
          </label>
          <Input
            type="url"
            placeholder="linkedin.com/in/myprofile"
            error={errors.originalUrl?.message}
            className="w-full"
            {...register("originalUrl")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 uppercase">
            LINK ENCURTADO
          </label>
          <Input
            type="text"
            placeholder="brev.ly/Linkedin-Profile"
            error={errors.shortUrl?.message}
            className="w-full"
            {...register("shortUrl")}
          />
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting || createLinkMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-6"
        >
          Salvar link
        </Button>

        {createLinkMutation.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-red-800">
              {(createLinkMutation.error as any)?.response?.data?.error ||
                "Erro ao criar link. Tente novamente."}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
