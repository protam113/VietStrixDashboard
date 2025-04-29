// ContentSection.tsx - Main Editor Component
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextEditorMenuBar from './components/TextEditorMenuBar';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Markdown } from 'tiptap-markdown';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Blockquote from '@tiptap/extension-blockquote';
import Strike from '@tiptap/extension-strike';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Heading from '@tiptap/extension-heading';
import { FaClipboard } from 'react-icons/fa';
import CodeBlock from '@tiptap/extension-code-block';
import { debounce } from 'lodash';

export const CustomCodeBlock = CodeBlock.extend({
  addKeyboardShortcuts() {
    return {
      'Shift-Enter': ({ editor }) => {
        if (editor.isActive('codeBlock')) {
          return editor.chain().focus().exitCode().run();
        }
        return false;
      },
      Escape: ({ editor }) => {
        if (editor.isActive('codeBlock')) {
          return editor.chain().focus().exitCode().run();
        }
        return false;
      },
    };
  },
});

export const CodeBlockComponent = ({
  value,
  language,
}: {
  value: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-block-wrapper">
      <pre className="code-block" data-language={language || 'text'}>
        <code>{value}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="copy-button"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : <FaClipboard />}
      </button>
    </div>
  );
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContentSection({
  value,
  onChange,
}: RichTextEditorProps) {
  const [markdown, setMarkdown] = useState('');
  const shouldUpdateParent = useRef(true);
  const editorInitialized = useRef(false);

  // Debounce the markdown update to prevent excessive re-renders
  const debouncedSetMarkdown = useCallback(
    debounce((content: string) => {
      setMarkdown(content);
    }, 250),
    []
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        strike: false,
        codeBlock: false, // Disable default, use our custom one
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CustomCodeBlock.configure({
        HTMLAttributes: {
          class: 'custom-code-block',
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class:
            'bg-blue-100 border-l-4 border-blue-500 pl-4 italic text-blue-800 mb-4 text-lg',
        },
      }),
      Strike,
      Image,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Markdown,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'editor-main-content',
      },
      handleKeyDown: (_view, event) => {
        if (event.key === 'Escape' && editor?.isActive('codeBlock')) {
          editor.chain().focus().exitCode().run();
          return true;
        }
        return false;
      },
    },
    onUpdate({ editor }) {
      const markdownContent = editor.storage.markdown?.getMarkdown() || '';
      debouncedSetMarkdown(markdownContent);

      if (shouldUpdateParent.current && editorInitialized.current) {
        onChange(markdownContent);
      }
    },
  });

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        editorInitialized.current = true;
      }, 100);
    }
  }, [editor]);

  return (
    <main className="editor-container">
      <div className="editor-wrapper">
        <div className="editor-panel">
          <TextEditorMenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>

        <div className="preview-panel">
          <h2 className="preview-title">🧪 Live Preview:</h2>
          <div className="prose  markdown-preview">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                blockquote: ({ children }) => (
                  <blockquote className="custom-blockquote">
                    {children}
                  </blockquote>
                ),
                code: ({ inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');

                  if (!inline) {
                    return (
                      <CodeBlockComponent
                        value={String(children).replace(/\n$/, '')}
                        language={match ? match[1] : undefined}
                      />
                    );
                  }

                  return (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}
