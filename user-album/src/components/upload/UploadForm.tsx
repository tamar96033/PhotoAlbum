import React, { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useApiClient } from "../../contexts/ApiClientContext";
import { FileParameter } from "../../api/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function toFileParameter(file: File): FileParameter {
    return {
        data: file,
        fileName: file.name,
    };
}

const schema = z.object({
    images: z
        .custom<FileList | undefined>()
        .refine((files) => files && files.length > 0, "Please select at least one image.")
        .refine(
            (files) => Array.from(files ?? []).every((file) => file.size <= MAX_FILE_SIZE),
            `Each file must be under 5MB`
        )
        .refine(
            (files) => Array.from(files ?? []).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            "Only .jpg, .jpeg, .png, .webp images allowed"
        ),
});

type FormData = z.infer<typeof schema>;

export function UploadForm() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const apiClient = useApiClient()
    const token = "Bearer " + localStorage.getItem('token')

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { images: undefined },
    });

    const updateFormValue = (newFiles: File[]) => {
        const dataTransfer = new DataTransfer();
        newFiles.forEach((f) => dataTransfer.items.add(f));
        form.setValue("images", dataTransfer.files);
    };

    const addFiles = (newFiles: File[]) => {
        const validNewFiles = newFiles.filter(
            (file) =>
                ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
        );

        const updatedFiles = [...files, ...validNewFiles];
        const updatedPreviews = [...previews, ...validNewFiles.map((file) => URL.createObjectURL(file))];

        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        updateFormValue(updatedFiles);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(Array.from(e.target.files));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const removeImage = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        updateFormValue(updatedFiles);
    };

    const handleUpload = async (data: FormData) => {
        setIsUploading(true);
        try {
            console.log("Uploading files:", data.images);

            const fileParameters: FileParameter[] = files.map(toFileParameter);
            const result = await apiClient.uploadMultiple(token, fileParameters)

            console.log('the files upload successfully. result:', result);
            setFiles([]);
            setPreviews([]);
            form.reset();
        } catch {
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-6">
            <div
                className="border-2 border-dashed border-gray-400 p-6 text-center rounded-md cursor-pointer hover:border-gray-800 transition"
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <input
                    type="file"
                    multiple
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={handleFileChange}
                    ref={inputRef}
                    className="hidden"
                />
                <div className="flex flex-col items-center justify-center text-black">
                    <Upload className="w-8 h-8 mb-2" />
                    <p className="text-center text-sm">Drag & drop images here, or click to select files</p>
                    <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG, WEBP (max 5MB each)</p>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((url, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={url}
                                alt={`preview-${index}`}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {form.formState.errors.images && (
                <p className="text-red-500 text-sm">{form.formState.errors.images.message}</p>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isUploading || files.length === 0}
                    //   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
                >
                    {isUploading ? "Uploading..." : `Upload ${files.length} Photo(s)`}
                </button>
            </div>
        </form>
    );
}