'use client';

import React from 'react';

import { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const [, setSelection] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleFormat = (format: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    let newText = value;

    switch (format) {
      case 'bold':
        newText =
          value.substring(0, start) +
          `**${selectedText}**` +
          value.substring(end);
        break;
      case 'italic':
        newText =
          value.substring(0, start) +
          `_${selectedText}_` +
          value.substring(end);
        break;
      case 'underline':
        newText =
          value.substring(0, start) +
          `<u>${selectedText}</u>` +
          value.substring(end);
        break;
      case 'ul':
        newText =
          value.substring(0, start) +
          `\n- ${selectedText}` +
          value.substring(end);
        break;
      case 'ol':
        newText =
          value.substring(0, start) +
          `\n1. ${selectedText}` +
          value.substring(end);
        break;
    }

    onChange(newText);

    // Set focus back to textarea and restore selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = end + (newText.length - value.length);
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-1 border rounded-md p-1 bg-background">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormat('bold')}
                type="button"
              >
                <Bold className="h-4 w-4" />
                <span className="sr-only">Bold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormat('italic')}
                type="button"
              >
                <Italic className="h-4 w-4" />
                <span className="sr-only">Italic</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormat('underline')}
                type="button"
              >
                <Underline className="h-4 w-4" />
                <span className="sr-only">Underline</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="h-4 w-px bg-border mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormat('ul')}
                type="button"
              >
                <List className="h-4 w-4" />
                <span className="sr-only">Bullet List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormat('ol')}
                type="button"
              >
                <ListOrdered className="h-4 w-4" />
                <span className="sr-only">Numbered List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[150px]"
        onSelect={(e) => {
          const target = e.target as HTMLTextAreaElement;
          setSelection({
            start: target.selectionStart,
            end: target.selectionEnd,
          });
        }}
      />
    </div>
  );
}
