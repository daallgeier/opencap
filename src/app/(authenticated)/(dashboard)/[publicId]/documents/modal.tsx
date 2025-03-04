"use client";

import { useState } from "react";
import Modal from "@/components/shared/modal";
import Uploader from "@/components/ui/uploader";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

type DocumentUploadModalProps = {
  trigger: React.ReactNode;
  companyPublicId: string;
};

const DocumentUploadModal = ({
  trigger,
  companyPublicId,
}: DocumentUploadModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutateAsync } = api.document.create.useMutation();

  return (
    <Modal
      title="Upload a document"
      subtitle="Upload a document to your company's document library."
      trigger={trigger}
      dialogProps={{
        open,
        onOpenChange: (val) => {
          setOpen(val);
        },
      }}
    >
      <Uploader
        identifier={companyPublicId}
        keyPrefix="generic-document"
        onSuccess={async (uploadedData) => {
          await mutateAsync({
            name: uploadedData.name,
            bucketId: uploadedData.id,
          });

          router.refresh();
          setOpen(false);
        }}
      />
    </Modal>
  );
};

export default DocumentUploadModal;
