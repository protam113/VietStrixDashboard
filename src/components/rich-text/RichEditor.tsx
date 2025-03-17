'use client';

import { FC } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import PlaceHolder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import Tools from './Tool';

interface RichEditorProps {}

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  PlaceHolder.configure({ placeholder: 'Write here ... !' }),
];

const RichEditor: FC<RichEditorProps> = () => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      console.log('HTML Content:', editor.getHTML()); // Lấy nội dung HTML
      console.log('Text Content:', editor.getText()); // Lấy nội dung text thuần
    },
  });

  return (
    <div className="max-w-3xl mx-auto flex flex-col space-y-4">
      <Tools editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichEditor;
