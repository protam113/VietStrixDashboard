'use client';

import React from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import {
  getCommands,
  getExtraCommands,
} from '@uiw/react-md-editor/commands-cn';

export default function App() {
  const [value, setValue] = React.useState<string | undefined>(
    '**Hello world!!!**'
  );

  const handleSave = () => {
    console.log('Saved content:', value);
    // Here you can also implement any additional save functionality
  };

  return (
    <div>
      <MDEditor
        value={value}
        preview="edit"
        commands={[...getCommands()]}
        extraCommands={[...getExtraCommands()]}
        onChange={(val) => setValue(val)}
        // style={{ backgroundColor: '#1e1e1e', color: '#000' }} // Màu nền tối
      />
      <button
        onClick={handleSave}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Save
      </button>
    </div>
  );
}
