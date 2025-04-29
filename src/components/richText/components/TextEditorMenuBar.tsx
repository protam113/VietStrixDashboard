import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiListOrdered2,
  RiDoubleQuotesL,
  RiCodeSSlashLine,
  RiLink,
  RiImageLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { IoListOutline } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { Button as ImageButton } from '@/components/ui/button';
import { useUploadMedia } from '@/hooks/media/useMedia';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

// CustomDialog component
const CustomDialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className="z-50 bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const CustomDialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 text-lg font-semibold">{children}</div>
);

const CustomDialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h3>{children}</h3>
);

const CustomDialogContent = ({ children }: { children: React.ReactNode }) => (
  <div className="py-2">{children}</div>
);

const CustomDialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 flex justify-between">{children}</div>
);

interface ButtonProps {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  tooltip?: string;
}

const Button = ({
  onClick,
  isActive,
  disabled = false,
  children,
  tooltip,
}: ButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`toolbar-button ${isActive ? 'active' : ''}`}
    title={tooltip}
  >
    {children}
  </button>
);

export default function TextEditorMenuBar({ editor }) {
  const { mutate: uploadMedia } = useUploadMedia();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkInput]);

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Ensure file input change does not bubble
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
      // Reset the input value to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);

    uploadMedia(
      { file, path: '/desc' },
      {
        onSuccess: (data) => {
          console.log('Raw upload response:', JSON.stringify(data, null, 2));
          if (data && data.url && data.url.url) {
            const imageUrl = data.url.url;
            setUploadedImage(imageUrl);
          } else {
            console.error('Invalid response format:', data);
            alert('Failed to upload image: Invalid response format');
          }
          setIsUploading(false);
        },
        onError: (error) => {
          console.error('Upload failed:', error);
          setIsUploading(false);
          alert('Failed to upload image. Please try again.');
        },
      }
    );
  };

  const insertUploadedImage = () => {
    if (uploadedImage) {
      editor.chain().focus().setImage({ src: uploadedImage }).run();
      setImageUploadOpen(false);
      resetUpload();
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
  };

  const isInCodeBlock = editor.isActive('codeBlock');

  const formattingButtons = [
    {
      icon: <RiBold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      tooltip: 'Bold (Ctrl+B)',
    },
    {
      icon: <RiItalic className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      tooltip: 'Italic (Ctrl+I)',
    },
    {
      icon: <RiStrikethrough className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      tooltip: 'Strikethrough',
    },
  ];

  const listAndQuoteButtons = [
    {
      icon: <IoListOutline className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      tooltip: 'Bullet List',
    },
    {
      icon: <RiListOrdered2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      tooltip: 'Numbered List',
    },
    {
      icon: <RiDoubleQuotesL className="size-5" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      tooltip: 'Blockquote',
    },
  ];

  const headingButtons = [1, 2, 3].map((level) => ({
    icon: `H${level}`,
    onClick: () => editor.chain().focus().toggleHeading({ level }).run(),
    isActive: editor.isActive('heading', { level }),
    tooltip: `Heading ${level}`,
  }));

  const advancedButtons = [
    {
      icon: <RiCodeSSlashLine className="size-5" />,
      onClick: () => {
        if (editor.isActive('codeBlock')) {
          editor.chain().focus().exitCode().run();
        } else {
          editor.chain().focus().toggleCodeBlock().run();
        }
      },
      isActive: isInCodeBlock,
      tooltip: isInCodeBlock
        ? 'Exit Code Block (Shift+Enter or Esc)'
        : 'Code Block',
    },
    {
      icon: <RiLink className="size-5" />,
      onClick: () => setShowLinkInput(!showLinkInput),
      isActive: editor.isActive('link'),
      tooltip: 'Insert Link',
    },
    {
      icon: <RiImageLine className="size-5" />,
      onClick: () => setImageUploadOpen(true),
      isActive: false,
      tooltip: 'Insert Image',
    },
  ];

  const allButtons = [
    ...formattingButtons,
    ...listAndQuoteButtons,
    ...headingButtons,
    ...advancedButtons,
  ];

  return (
    <div className="editor-menu-bar">
      <div className="button-group">
        {allButtons.map(({ icon, onClick, isActive, tooltip }, index) => (
          <div key={index} className="button-wrapper">
            <Button onClick={onClick} isActive={isActive} tooltip={tooltip}>
              {icon}
            </Button>
            {index < allButtons.length - 1 && (
              <span className="separator">|</span>
            )}
          </div>
        ))}
      </div>

      {isInCodeBlock && (
        <div className="code-block-indicator">
          <span className="code-mode-label">CODE MODE</span>
          <Button
            onClick={() => editor.chain().focus().exitCode().run()}
            isActive={false}
            tooltip="Exit Code Block"
          >
            <RiLogoutBoxLine className="size-5" />
            <span className="exit-code-text">Exit Code</span>
          </Button>
        </div>
      )}

      {showLinkInput && (
        <div className="floating-input-panel">
          <input
            ref={linkInputRef}
            type="text"
            placeholder="Enter URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addLink();
              } else if (e.key === 'Escape') {
                setShowLinkInput(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="floating-input-buttons">
            <button onClick={addLink} className="add-button">
              Add
            </button>
            <button
              onClick={() => setShowLinkInput(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <CustomDialog open={imageUploadOpen} onOpenChange={setImageUploadOpen}>
        <CustomDialogHeader>
          <CustomDialogTitle>Upload image</CustomDialogTitle>
        </CustomDialogHeader>

        <CustomDialogContent>
          {!uploadedImage ? (
            <div
              className={cn(
                'border-2 border-dashed rounded-lg p-12 transition-colors flex flex-col items-center justify-center gap-4',
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25'
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-sm text-muted-foreground">
                    Uploading image...
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-full bg-muted p-4">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      Drag image here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports JPG, PNG and GIF
                    </p>
                  </div>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    onClick={(e) => e.stopPropagation()} // Prevent file input click from bubbling
                  />
                  <ImageButton
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default behavior
                      e.stopPropagation(); // Prevent click from bubbling
                      fileInputRef.current?.click();
                    }}
                  >
                    Select File
                  </ImageButton>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image
                  src={uploadedImage || '/placeholder.svg'}
                  alt="Uploaded image"
                  fill
                />
                <button
                  className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetUpload();
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </CustomDialogContent>

        <CustomDialogFooter>
          <button
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setImageUploadOpen(false);
              resetUpload();
            }}
          >
            Cancel
          </button>

          {uploadedImage && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                insertUploadedImage();
              }}
            >
              Add to Editor
            </button>
          )}
        </CustomDialogFooter>
      </CustomDialog>
    </div>
  );
}
