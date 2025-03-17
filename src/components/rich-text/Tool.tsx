import { FC } from 'react';
import { Icons } from '@/assets/icons';
import ToolButton from './toolButton';
import { ChainedCommands, Editor } from '@tiptap/react';

interface ToolProps {
  editor: Editor | null;
}

const tools = [
  {
    task: 'bold',
    icon: <Icons.FaBold size={20} />,
  },
  {
    task: 'italic',
    icon: <Icons.FaItalic size={20} />,
  },
  {
    task: 'underline',
    icon: <Icons.FaUnderline size={20} />,
  },
  {
    task: 'code',
    icon: <Icons.FaCode size={20} />,
  },
  {
    task: 'code curly',
    icon: <Icons.BiCodeCurly size={20} />,
  },
  {
    task: 'strike',
    icon: <Icons.BiStrikethrough size={20} />,
  },
  {
    task: 'list-ol',
    icon: <Icons.FaListOl size={20} />,
  },
  {
    task: 'list-ul',
    icon: <Icons.FaListUl size={20} />,
  },
  {
    task: 'align-right',
    icon: <Icons.FaAlignRight size={20} />,
  },
  {
    task: 'align-left',
    icon: <Icons.FaAlignLeft size={20} />,
  },
  {
    task: 'align-center',
    icon: <Icons.FaAlignCenter size={20} />,
  },
] as const;

const chainMethods = (
  editor: Editor | null,
  command: (chain: ChainedCommands) => ChainedCommands
) => {
  if (!editor) return;

  command(editor.chain().focus()).run();
};

type TaskType = (typeof tools)[number]['task'];

const Tools: FC<ToolProps> = ({ editor }) => {
  const handleOnClick = (task: TaskType) => {
    switch (task) {
      case 'bold':
        return chainMethods(editor, (chain) => chain.toggleBold());
      case 'italic':
        return chainMethods(editor, (chain) => chain.toggleItalic());
      case 'underline':
        return chainMethods(editor, (chain) => chain.toggleUnderline());
      case 'code':
        return chainMethods(editor, (chain) => chain.toggleCode());
      case 'code curly':
        return chainMethods(editor, (chain) => chain.toggleCodeBlock());
      case 'strike':
        return chainMethods(editor, (chain) => chain.toggleStrike());
      case 'list-ol':
        return chainMethods(editor, (chain) => chain.toggleOrderedList());
      case 'list-ul':
        return chainMethods(editor, (chain) => chain.toggleBulletList());
      case 'align-right':
        return chainMethods(editor, (chain) => chain.setTextAlign('right'));
      case 'align-left':
        return chainMethods(editor, (chain) => chain.setTextAlign('left'));
      case 'align-center':
        return chainMethods(editor, (chain) => chain.setTextAlign('center'));
    }
  };
  return (
    <div>
      {tools.map(({ icon, task }) => {
        return (
          <ToolButton
            key={task} // Add this unique key prop based on the task
            onClick={() => handleOnClick(task)}
            active={
              editor?.isActive(task) ||
              editor?.isActive('align', { textAlign: task })
            }
          >
            {icon}
          </ToolButton>
        );
      })}
    </div>
  );
};

export default Tools;
